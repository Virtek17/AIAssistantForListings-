import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Typography,
  Space,
  Result,
  Popover,
} from "antd";
import { MainLayout } from "../components/MainLayout";
import { AiButton } from "../components/AiButton";
import { BackButton } from "../components/BackButton";
import {
  CategoryFieldsAuto,
  CategoryFieldsElectronics,
  CategoryFieldsRealEstate,
} from "../features/ad-edit/components/CategoryFields.tsx";
import { useNavigate, useParams } from "react-router-dom";

import { CATEGORIES } from "../utils/constants.ts";
import { useAdEdit } from "../features/ad-edit/hooks/useAdEdit.ts";
import { AiResultPopover } from "../features/ad-edit/components/AiResultPopover.tsx";
import { AdEditSkeleton } from "../features/ad-edit/components/AdEditSkeleton.tsx";

const { Title } = Typography;
const { TextArea } = Input;

export const AdEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { form, isLoading, isError, mutation, ai, priceAi, actions } =
    useAdEdit(id!);
  const navigate = useNavigate();

  const category = Form.useWatch("category", form);
  const descriptionValue = Form.useWatch("description", form);

  if (isLoading)
    return (
      <MainLayout>
        <AdEditSkeleton />
      </MainLayout>
    );
  if (isError)
    return (
      <MainLayout>
        <Result
          status="error"
          title="Ошибка загрузки"
          subTitle="Не удалось загрузить данные объявления"
          extra={
            <BackButton
              label="Вернуться к списку"
              onClick={() => navigate("/ads")}
            />
          }
        />
      </MainLayout>
    );

  return (
    <MainLayout>
      <BackButton
        onClick={() => navigate(`/ads/${id}`)}
        style={{ marginBottom: 24 }}
      />

      <Title level={2} style={{ marginBottom: 32 }}>
        Редактирование объявления
      </Title>

      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 800 }}
        onFinish={(vals) => mutation.mutate(vals)}
        onValuesChange={(_, all) => actions.setDraft(all)}
      >
        <Form.Item label="Категория" name="category">
          <Select
            onChange={() => form.setFieldValue("params", {})}
            style={{ maxWidth: 300 }}
          >
            {Object.entries(CATEGORIES).map(([k, v]) => (
              <Select.Option key={k} value={k}>
                {v}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Название"
          name="title"
          rules={[{ required: true, message: "Обязательно" }]}
        >
          <Input placeholder="Название товара" allowClear />
        </Form.Item>

        <Form.Item label="Цена">
          <Space align="start">
            <Form.Item
              name="price"
              noStyle
              rules={[{ required: true, message: "Укажите цену" }]}
            >
              <InputNumber
                style={{ width: 400 }}
                placeholder="0"
                formatter={(val) =>
                  `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }
                parser={(val) => val!.replace(/\s?|/g, "")}
              />
            </Form.Item>

            {/* AI кнопка для Цены */}
            <Popover
              content={
                <AiResultPopover
                  status={priceAi.status as "success" | "error"}
                  suggestion={priceAi.suggestion}
                  onApply={priceAi.handleApply}
                  onClose={() => priceAi.setVisible(false)}
                  maxWidth={350}
                  preserveLineBreaks={true}
                />
              }
              open={priceAi.visible}
              trigger="click"
              placement="bottomRight"
              overlayInnerStyle={
                priceAi.status === "error" ? { backgroundColor: "#FEE8E7" } : {}
              }
              overlayClassName={
                priceAi.status === "error" ? "ai-error-popover" : ""
              }
            >
              <AiButton
                loading={priceAi.status === "loading"}
                label={
                  priceAi.status === "loading"
                    ? "Выполняется запрос"
                    : priceAi.status === "idle"
                      ? "Узнать рыночную цену"
                      : "Повторить запрос"
                }
                onClick={priceAi.handleAction}
              />
            </Popover>
          </Space>
        </Form.Item>

        <Title level={4}>Характеристики</Title>
        <div style={{ marginBottom: 24 }}>
          {category === "electronics" && <CategoryFieldsElectronics />}
          {category === "auto" && <CategoryFieldsAuto />}
          {category === "real_estate" && <CategoryFieldsRealEstate />}
        </div>

        {/* Описание */}
        <Form.Item
          label="Описание"
          name="description"
          validateStatus={!descriptionValue ? "warning" : ""}
        >
          <TextArea
            rows={4}
            showCount
            maxLength={1000}
            placeholder="Введите описание..."
          />
        </Form.Item>

        {/* AI кнопка для Описания */}
        <Popover
          content={
            <AiResultPopover
              status={ai.status as "success" | "error"}
              suggestion={ai.suggestion}
              onClose={() => ai.setVisible(false)}
              onApply={ai.handleApply}
              maxWidth={300}
              preserveLineBreaks={false}
            />
          }
          open={ai.visible}
          trigger="click"
          placement="bottomLeft"
          overlayInnerStyle={
            ai.status === "error" ? { backgroundColor: "#FEE8E7" } : {}
          }
          className={ai.status === "error" ? "ai-error-popover" : ""}
        >
          <AiButton
            loading={ai.status === "loading"}
            label={
              ai.status === "loading"
                ? "Выполняется запрос"
                : ai.status === "idle"
                  ? descriptionValue
                    ? "Улучшить описание"
                    : "Придумать описание"
                  : "Повторить запрос"
            }
            onClick={ai.handleAction}
          />
        </Popover>

        <Form.Item style={{ marginTop: 32 }}>
          <Space size={12}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={mutation.isPending}
              style={{ padding: "0 32px", borderRadius: 8 }}
            >
              Сохранить
            </Button>
            <Button
              size="large"
              onClick={() => navigate(`/ads/${id}`)}
              style={{ borderRadius: 8 }}
            >
              Отменить
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </MainLayout>
  );
};
