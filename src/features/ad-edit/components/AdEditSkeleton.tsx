import { Skeleton, Space } from "antd";
import { BackButton } from "../../../components/BackButton";

export const AdEditSkeleton = () => (
  <div>
    <BackButton style={{ marginBottom: 24 }} disabled />

    <Skeleton
      active
      paragraph={{ rows: 1 }}
      style={{ marginBottom: 32, width: 300 }}
    />

    <Space orientation="vertical" style={{ width: "100%", maxWidth: 800 }}>
      {/* Категория */}
      <Skeleton active paragraph={{ rows: 1 }} style={{ width: "100%" }} />

      {/* Название */}
      <Skeleton active paragraph={{ rows: 1 }} style={{ width: "100%" }} />

      {/* Цена */}
      <Skeleton active paragraph={{ rows: 1 }} style={{ width: "100%" }} />

      {/* Характеристики */}
      <Skeleton active paragraph={{ rows: 3 }} style={{ width: "100%" }} />

      {/* Описание */}
      <Skeleton active paragraph={{ rows: 4 }} style={{ width: "100%" }} />

      {/* Кнопки */}
      <Skeleton.Button active style={{ width: 200, height: 40 }} />
    </Space>
  </div>
);
