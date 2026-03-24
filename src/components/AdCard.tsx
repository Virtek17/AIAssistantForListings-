import { Typography } from "antd";
import { CATEGORY_LABELS, type Category } from "../api/index.ts";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

interface AdCardProps {
  id: number;
  title: string;
  category: Category;
  price: number;
  needsRevision?: boolean;
  image?: string;
}

export const AdCard = ({
  id,
  title,
  category,
  price,
  needsRevision,
  image,
}: AdCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid #F0F0F0",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        boxSizing: "border-box",
      }}
      onClick={() => navigate(`/ads/${id}`)}
    >
      {/* Контейнер изображения */}
      <div
        style={{
          height: 160,
          backgroundColor: "#FAFAFA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderRadius: "0px 0px 8px 8px",
        }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ fontSize: 40, opacity: 0.2 }}>🖼️</span>
        )}

        {/* Категория (поверх фото) */}
        <div
          style={{
            position: "absolute",
            left: 12,
            bottom: -10,
            backgroundColor: "#FFFFFF",
            border: "1px solid #D9D9D9",
            borderRadius: 6,
            padding: "0 12px",
            fontSize: 14,
            color: "rgba(43, 43, 43, 0.85)",
            zIndex: 2,
          }}
        >
          {CATEGORY_LABELS[category]}
        </div>
      </div>

      <div
        style={{
          padding: "20px 16px 16px 16px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "rgba(0, 0, 0, 0.85)",
            marginBottom: 4,
            overflow: "hidden",
            minHeight: "44px",
          }}
        >
          {title}
        </Text>

        <Title
          level={4}
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "rgba(0, 0, 0, 0.45)",
            margin: "0 0 4px 0",
          }}
        >
          {price.toLocaleString()} ₽
        </Title>

        {needsRevision && (
          <div
            style={{
              marginTop: "auto",
              padding: "4px 10px",
              backgroundColor: "#FFF7E6",
              color: "#FAAD14",
              fontSize: 14,
              fontWeight: 400,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 6,
              width: "fit-content",
            }}
          >
            <div style={{ fontSize: 20, lineHeight: 0 }}>•</div>
            Требует доработок
          </div>
        )}
      </div>
    </div>
  );
};
