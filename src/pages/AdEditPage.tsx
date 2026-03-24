import {
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Typography,
  Space,
  Result,
  Spin,
  message,
  Modal,
} from "antd";
import { BulbOutlined } from "@ant-design/icons";
import { MainLayout } from "../components/MainLayout";
import { CategoryFields } from "./CategoryFields";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdById, updateAd } from "../api/index.ts";
import { useEffect, useRef, useState } from "react";
import { useAdDraftStore } from "../store/useAdDraftStore.ts";
import {
  FindPriceWithAI,
  improveDescriptionWithAI,
} from "../services/aiService.ts";

const { Title } = Typography;
const { TextArea } = Input;

export const AdEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { setDraft, getDraft, clearDraft } = useAdDraftStore();
  const [messageApi, contextHolder] = message.useMessage();
  const draftModalShown = useRef(false);

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPriceAiLoading, setIsPriceAiLoading] = useState(false);

  useEffect(() => {
    if (draftModalShown.current) return;

    const savedDraft = getDraft(id!);
    if (savedDraft) {
      draftModalShown.current = true;
      Modal.confirm({
        title: "Найдено неопубликованное изменение",
        content: "Восстановить данные из черновика?",
        okText: "Да",
        cancelText: "Нет",
        onOk: () => form.setFieldsValue(savedDraft),
        onCancel: () => clearDraft(id!),
      });
    }
  }, [id]);

  const mutation = useMutation({
    mutationFn: (values: any) => updateAd(id!, values),
    onSuccess: () => {
      clearDraft(id!);
      messageApi.success("Объявление успешно обновлено!");
      queryClient.invalidateQueries({ queryKey: ["ad", id] });
      navigate(`/ads/${id}`);
    },
    onError: (error: any) => {
      const messageText =
        error.response?.data?.error || error.message || "Ошибка сети";
      messageApi.error(`Ошибка: ${messageText}`);
      console.error("Полная ошибка:", error);
    },
  });

  const handleFinish = (values: any) => {
    mutation.mutate(values);
  };

  const {
    data: item,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ad", id],
    queryFn: () => getAdById(id!),
    enabled: !!id,
  });

  const handleAiClick = async () => {
    const { title, category, params, description } = form.getFieldsValue();
    setIsAiLoading(true);
    try {
      const suggestion = await improveDescriptionWithAI(
        title,
        category,
        params,
        description,
      );
      setAiSuggestion(suggestion);
      setIsModalOpen(true);
    } catch (e) {
      messageApi.error("Не удалось подключиться к AI");
    } finally {
      setIsAiLoading(false);
    }
  };
  const handlePriceAiClick = async () => {
    const { title, category, params, description } = form.getFieldsValue();

    // Небольшая проверка, чтобы ИИ было от чего отталкиваться
    if (!title) return messageApi.warning("Введите название для оценки");

    setIsPriceAiLoading(true);
    try {
      const suggestedPrice = await FindPriceWithAI(
        title,
        category,
        params,
        description,
      );

      if (suggestedPrice) {
        Modal.confirm({
          title: "Результат оценки AI",
          content: `Рекомендуемая рыночная цена: ${suggestedPrice.toLocaleString()} ₽. Применить это значение?`,
          okText: "Применить",
          cancelText: "Отмена",
          onOk: () => {
            form.setFieldValue("price", suggestedPrice);
            // Важно обновить черновик, так как setFieldValue не триггерит onValuesChange
            setDraft(id!, form.getFieldsValue());
          },
        });
      }
    } catch (e) {
      messageApi.error("Не удалось получить оценку цены");
    } finally {
      setIsPriceAiLoading(false);
    }
  };

  useEffect(() => {
    if (item) {
      form.setFieldsValue(item);
    }
  }, [item, form]);

  const category = Form.useWatch("category", form);

  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Spin size="large" />
      </div>
    );
  if (isError) return <Result status="error" title="Ошибка загрузки" />;

  return (
    <MainLayout>
      {contextHolder}
      <Title level={2} style={{ marginBottom: 32 }}>
        Редактирование объявления
      </Title>

      <Form
        form={form}
        layout="vertical"
        initialValues={{ category: "electronics" }}
        style={{ maxWidth: 800 }}
        onFinish={handleFinish}
        onValuesChange={(_, allValues) => {
          setDraft(id!, allValues);
        }}
      >
        {/* Категория */}
        <Form.Item label="Категория" name="category">
          <Select
            style={{ maxWidth: 300 }}
            onChange={() => form.setFieldValue("params", {})}
          >
            <Select.Option value="electronics">Электроника</Select.Option>
            <Select.Option value="real_estate">Недвижимость</Select.Option>
            <Select.Option value="auto">Авто</Select.Option>
          </Select>
        </Form.Item>

        <Divider style={{ margin: "24px 0" }} />

        {/* Название */}
        <Form.Item
          label="Название"
          name="title"
          required
          tooltip="Введите краткое название товара"
        >
          <Input placeholder="MacBook Pro 16" allowClear />
        </Form.Item>

        {/* Цена */}
        <Form.Item label="Цена" required>
          <Space align="start">
            <Form.Item name="price" noStyle>
              <InputNumber
                style={{ width: 400 }}
                placeholder="64000"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }
                parser={(value) => value!.replace(/\s?|/g, "")}
              />
            </Form.Item>
            <Button
              type="text"
              icon={<BulbOutlined />}
              style={{
                backgroundColor: "#FFF7E6",
                color: "#D48806",
                borderRadius: 6,
              }}
              loading={isPriceAiLoading} // Добавляем лоадер
              onClick={handlePriceAiClick} // Привязываем клик
            >
              Узнать рыночную цену
            </Button>
          </Space>
        </Form.Item>

        <Divider style={{ margin: "24px 0" }} />

        <Title level={4} style={{ marginBottom: 20 }}>
          Характеристики
        </Title>

        {/* Динамические поля */}
        <div>
          {category === "electronics" && <CategoryFields.Electronics />}
          {category === "auto" && <CategoryFields.Auto />}
          {category === "real_estate" && <CategoryFields.RealEstateFields />}
        </div>

        <Divider style={{ margin: "24px 0" }} />

        {/* Описание */}
        <Form.Item label="Описание" name="description">
          <TextArea
            rows={4}
            placeholder="Введите описание товара..."
            maxLength={1000}
            showCount
          />
        </Form.Item>

        <Button
          type="text"
          icon={<BulbOutlined />}
          style={{
            backgroundColor: "#FFF7E6",
            color: "#D48806",
            borderRadius: 6,
            marginBottom: 24,
          }}
          onClick={handleAiClick}
        >
          Улучшить описание
        </Button>

        {/* Кнопки действий */}
        <Form.Item>
          <Space size={12}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ borderRadius: 8, padding: "0 32px" }}
              loading={mutation.isPending}
            >
              Сохранить
            </Button>
            <Button
              size="large"
              style={{ borderRadius: 8, padding: "0 32px" }}
              onClick={() => navigate(`/ads/${id}`)}
            >
              Отменить
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Modal
        title="Улучшенное описание"
        open={isModalOpen}
        onOk={() => {
          form.setFieldValue("description", aiSuggestion);
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
        okText="Применить изменения"
        width={800}
      >
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <h4>Было:</h4>
            <p>{form.getFieldValue("description")}</p>
          </div>
          <div style={{ flex: 1, backgroundColor: "#f6ffed", padding: 10 }}>
            <h4>Стало:</h4>
            <p>{aiSuggestion}</p>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};
