import {
  Divider,
  Typography,
  Row,
  Col,
  Alert,
  Descriptions,
  Result,
  Button,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { AdViewHeader } from "../components/AdViewHeader";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAdById } from "../api";
import { PARAM_LABELS, VALUE_LABELS } from "../utils/constants";
import { getMissingFields } from "../utils/getMissingFields";
import { MainLayout } from "../components/MainLayout";

const { Title, Text, Paragraph } = Typography;

export const AdViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const idNumber = Number(id);

  const {
    data: item,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["ad", id],
    queryFn: () => getAdById(idNumber!),
    enabled: !!id,
  });

  if (isLoading) return <div>Загрузка...</div>;

  if (isError)
    return (
      <Result
        status="error"
        title="Ошибка загрузки"
        subTitle="Не удалось получить данные об объявлении"
        extra={
          <Button type="primary" onClick={() => refetch()}>
            Повторить попытку
          </Button>
        }
      />
    );

  return (
    <MainLayout>
      <AdViewHeader item={item} />

      <Divider style={{ borderColor: "#E8E8E8", margin: "32px 0" }} />

      <Row gutter={[48, 32]}>
        {/* Левая колонка: Изображение и Описание */}
        <Col xs={24} lg={10}>
          <div
            style={{
              backgroundColor: "#F0F0F0",
              borderRadius: 12,
              fontSize: 96,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              aspectRatio: "4/3",
              marginBottom: 32,
            }}
          >
            🖼️
          </div>

          <div style={{ maxWidth: 480 }}>
            <Title level={3} style={{ fontSize: 22, marginBottom: 16 }}>
              Описание
            </Title>
            <Paragraph
              style={{
                fontSize: 16,
                lineHeight: "1.6",
                color: "#1E1E1E",
              }}
            >
              {item?.description || "Отсутсвует"}
            </Paragraph>
          </div>
        </Col>

        {/* Правая колонка: Доработки и Характеристики */}
        <Col xs={24} lg={14}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Блок доработок */}
            {item?.needsRevision && (
              <Alert
                title={
                  <Text strong style={{ fontSize: 16, color: "#1E1E1E" }}>
                    Требуются доработки
                  </Text>
                }
                description={
                  <div style={{ marginTop: 4 }}>
                    <Text style={{ fontSize: 14 }}>
                      У объявления есть незаполненные поля:
                    </Text>
                    <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                      {getMissingFields(item).map((field) => (
                        <li key={field} style={{ fontSize: 14 }}>
                          {field}
                        </li>
                      ))}
                    </ul>
                  </div>
                }
                type="warning"
                showIcon
                icon={<InfoCircleOutlined style={{ marginTop: 4 }} />}
                style={{
                  backgroundColor: "#F9F1E6",
                  border: "none",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                }}
              />
            )}

            {/* Характеристики */}
            <div>
              <Title level={3} style={{ fontSize: 22, marginBottom: 20 }}>
                Характеристики
              </Title>
              <Descriptions
                column={1}
                colon={false}
                labelStyle={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "rgba(0, 0, 0, 0.45)",
                  width: "100px",
                }}
                contentStyle={{
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#1E1E1E",
                }}
              >
                {item?.params &&
                  Object.entries(item.params).map(([key, value]) => {
                    if (value === undefined || value === null || value === "")
                      return null;
                    return (
                      <Descriptions.Item
                        key={key}
                        label={PARAM_LABELS[key] || key}
                      >
                        {VALUE_LABELS[value] || value}
                      </Descriptions.Item>
                    );
                  })}
              </Descriptions>
            </div>
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
};
