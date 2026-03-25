import {
  Divider,
  Typography,
  Row,
  Col,
  Result,
  Button,
  Space,
  Spin,
} from "antd";
import { AdViewHeader } from "../components/AdViewHeader";
import { BackButton } from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../components/MainLayout";
import { useAdDetails } from "../features/ad-view/hooks/useAdDetails";
import { AdViewSkeleton } from "../features/ad-view/components/AdViewSkeleton";
import { AdParams } from "../features/ad-view/components/AdParams";
import { AdRevisionAlert } from "../features/ad-view/components/AdRevisionAlert";

const { Title, Paragraph } = Typography;

export const AdViewPage = () => {
  const navigate = useNavigate();
  const {
    data: item,
    isLoading,
    isError,
    isFetching,
    refetch,
    missingFields,
  } = useAdDetails();

  if (isLoading) return <AdViewSkeleton />;

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
      <Spin spinning={isFetching}>
        <Space style={{ marginBottom: 24 }}>
          <BackButton label="Назад к списку" onClick={() => navigate("/ads")} />
        </Space>

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
                <AdRevisionAlert fields={missingFields} />
              )}

              {/* Характеристики */}
              <div>
                <Title level={3} style={{ fontSize: 22, marginBottom: 20 }}>
                  Характеристики
                </Title>
                <AdParams params={item?.params} />
              </div>
            </div>
          </Col>
        </Row>
      </Spin>
    </MainLayout>
  );
};
