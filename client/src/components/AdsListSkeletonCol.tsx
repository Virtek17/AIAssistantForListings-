import { Skeleton } from "antd";

export const AdsListSkeletonCol = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        style={{
          borderRadius: 16,
          border: "1px solid #F0F0F0",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
          height: 132,
          display: "flex",
          boxSizing: "border-box",
        }}
      >
        <Skeleton.Image
          active
          style={{ width: 179, height: 132, borderRadius: 8 }}
        />
        <div style={{ padding: "16px 16px 16px 24px", flex: 1 }}>
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
      </div>
    ))}
  </div>
);
