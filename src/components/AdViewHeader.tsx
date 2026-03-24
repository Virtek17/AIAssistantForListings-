import { Typography, Button, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

import { formatDate } from "../utils/formatDate";

export const AdViewHeader = ({ item }: { item?: any }) => {
  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Верхний ряд: Название и Цена */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Title
          level={2}
          style={{
            fontSize: 30,
            fontWeight: 500,
            margin: 0,
            color: "rgba(0, 0, 0, 0.85)",
          }}
        >
          {item?.title || "Без названия"}
        </Title>
        <Title
          level={2}
          style={{
            fontSize: 30,
            fontWeight: 500,
            margin: 0,
            color: "rgba(0, 0, 0, 0.85)",
          }}
        >
          {item?.price?.toLocaleString() || 0} ₽
        </Title>
      </div>

      {/* Нижний ряд: Кнопка и Даты */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{
            height: 41,
            padding: "0 20px",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 500,
            backgroundColor: "#1890FF",
          }}
          onClick={() => navigate(`/ads/${item?.id}/edit`)}
        >
          Редактировать
        </Button>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 2,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#848388",
              fontWeight: 400,
            }}
          >
            Опубликовано: {formatDate(item?.createdAt || "—")}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#848388",
              fontWeight: 400,
            }}
          >
            Отредактировано: {formatDate(item?.updatedAt || "—")}
          </Text>
        </div>
      </div>
    </div>
  );
};
