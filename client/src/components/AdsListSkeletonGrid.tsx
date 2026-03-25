import { Row, Col, Skeleton } from "antd";

export const AdsListSkeletonGrid = () => (
  <Row gutter={[12, 12]}>
    {Array.from({ length: 10 }).map((_, i) => (
      <Col key={i} style={{ flex: "0 0 20%", maxWidth: "20%" }}>
        <div
          style={{
            borderRadius: 16,
            border: "1px solid #F0F0F0",
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
            height: 300,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Skeleton.Image
            active
            style={{ width: "100%", height: 160, borderRadius: 0 }}
          />
          <div style={{ padding: "20px 16px 16px 16px", flex: 1 }}>
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>
        </div>
      </Col>
    ))}
  </Row>
);
