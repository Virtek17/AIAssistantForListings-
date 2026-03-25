import { Button, Col, Divider, Row, Skeleton, Space } from "antd";
import { MainLayout } from "../../../components/MainLayout";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const AdViewSkeleton = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Space style={{ marginBottom: 24 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/ads")}
          style={{ borderRadius: 8 }}
          disabled
        >
          Назад к списку
        </Button>
      </Space>

      <Skeleton active paragraph={{ rows: 4 }} style={{ marginBottom: 32 }} />

      <Divider style={{ borderColor: "#E8E8E8", margin: "32px 0" }} />

      <Row gutter={[48, 32]}>
        <Col xs={24} lg={10}>
          <Skeleton.Image
            active
            style={{ width: 450, height: 300, marginBottom: 32 }}
          />
          <Skeleton active paragraph={{ rows: 3 }} />
        </Col>

        <Col xs={24} lg={14}>
          <Skeleton active paragraph={{ rows: 6 }} />
        </Col>
      </Row>
    </MainLayout>
  );
};
