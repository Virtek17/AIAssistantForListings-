import { Typography } from "antd";
import { CATEGORY_LABELS, type Category } from "../../api/index";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { RevisionBadge } from "../RevisionBadge";

const { Text, Title } = Typography;

interface AdCardProps {
  id: string | number;
  title: string;
  category: Category;
  price: number;
  needsRevision?: boolean;
  image?: string;
}

export const AdCardForCol = ({
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
        height: 132,
        display: "flex",
        cursor: "pointer",
        boxSizing: "border-box",
      }}
      onClick={() => navigate(`/ads/${id}`)}
    >
      {/* Контейнер изображения */}
      <div
        style={{
          width: 179,
          backgroundColor: "#FAFAFA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
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
      </div>

      <div
        style={{
          padding: "16px 16px 16px 24px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Text
          style={{ fontSize: 14, fontWeight: 400, color: "#848388" }}
          className="font-inter"
        >
          {CATEGORY_LABELS[category]}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "rgba(0, 0, 0, 0.85)",
          }}
          className="font-inter"
        >
          {title}
        </Text>

        <Title
          level={4}
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "rgba(0, 0, 0, 0.45)",
            margin: 0,
          }}
          className="font-inter"
        >
          {formatCurrency(price)}
        </Title>

        {needsRevision && <RevisionBadge />}
      </div>
    </div>
  );
};
