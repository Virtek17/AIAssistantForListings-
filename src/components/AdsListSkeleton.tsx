import { Row, Col, Skeleton } from "antd";

export const AdsListSkeleton = () => (
  <Row gutter={[12, 12]}>
    {Array.from({ length: 10 }).map((_, i) => (
      <Col key={i} style={{ flex: "0 0 20%", maxWidth: "20%", height: 300 }}>
        {/* TODO: поправить скелетон */}
        <Skeleton active />
      </Col>
    ))}
  </Row>
);
