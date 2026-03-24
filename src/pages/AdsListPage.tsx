import {
  Button,
  Col,
  Empty,
  Layout,
  Pagination,
  Row,
  Skeleton,
  Space,
  Spin,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { AdsControlPanel } from "../components/AdsControlPanel";
import { AdsSidebar } from "../components/AdsSidebar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAds } from "../api/index.ts";
import { AdCard } from "../components/AdCard";
import { useDebounce } from "use-debounce";
import { MainLayout } from "../components/MainLayout.tsx";
const { Title, Text } = Typography;

export const AdsListPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [onlyNeedsRevision, setOnlyNeedsRevision] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const pageSize = 10;

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: [
      "ads",
      {
        q: debouncedSearch,
        categories: selectedCategories.join(","),
        needsRevision: onlyNeedsRevision,
        page: currentPage,
        sortBy,
      },
    ],
    queryFn: () =>
      getAds({
        q: debouncedSearch,
        categories: selectedCategories.join(","),
        needsRevision: onlyNeedsRevision || undefined,
        skip: (currentPage - 1) * pageSize,
        limit: pageSize,
        sortColumn: sortBy.split("_")[0] as "title" | "createdAt",
        sortDirection: sortBy.split("_")[1] as "asc" | "desc",
      }),
  });

  const handleReset = () => {
    setSearch("");
    setSelectedCategories([]);
    setOnlyNeedsRevision(false);
    setCurrentPage(1);
    setSortBy("createdAt_desc");
  };

  if (isError) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <Typography.Title level={3}>Упс! Ошибка загрузки</Typography.Title>
        <Button onClick={() => refetch()}>Попробовать снова</Button>
      </div>
    );
  }

  return (
    <MainLayout>
      <div style={{ marginBottom: 16, marginLeft: 8 }}>
        <Space orientation="vertical" size={0}>
          <Title level={2} style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>
            Мои объявления
          </Title>
          <Text style={{ fontSize: 18, color: "#848388" }}>
            {data?.total || 0} объявлений
          </Text>
        </Space>
      </div>

      <AdsControlPanel
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        sortBy={sortBy}
        onSortChange={(val) => {
          setSortBy(val);
          setCurrentPage(1);
        }}
      />

      <Layout style={{ background: "transparent" }}>
        <AdsSidebar
          selectedCategories={selectedCategories}
          setSelectedCategories={(vals) => {
            setSelectedCategories(vals);
            setCurrentPage(1);
          }}
          onlyNeedsRevision={onlyNeedsRevision}
          setOnlyNeedsRevision={(val) => {
            setOnlyNeedsRevision(val);
            setCurrentPage(1);
          }}
          isCategoryOpen={isCategoryOpen}
          setIsCategoryOpen={setIsCategoryOpen}
          onReset={handleReset}
        />

        <Content style={{ paddingLeft: 24 }}>
          {isLoading ? (
            <Row gutter={[12, 12]}>
              {Array.from({ length: 10 }).map((_, i) => (
                <Col
                  key={i}
                  style={{ flex: "0 0 20%", maxWidth: "20%", height: 300 }}
                >
                  {/* TODO: поправить скелетон */}
                  <Skeleton active />
                </Col>
              ))}
            </Row>
          ) : data?.items.length ? (
            <>
              <Spin spinning={isFetching}>
                <Row gutter={[12, 12]}>
                  {data.items.map((item) => (
                    <Col
                      key={item.id}
                      style={{ flex: "0 0 20%", maxWidth: "20%" }}
                    >
                      <AdCard
                        id={item.id}
                        category={item.category}
                        price={item.price}
                        title={item.title}
                        needsRevision={item.needsRevision}
                      />
                    </Col>
                  ))}
                </Row>
              </Spin>
              <Pagination
                current={currentPage}
                total={data.total}
                pageSize={pageSize}
                onChange={setCurrentPage}
                style={{ marginTop: 40, textAlign: "center" }}
                showSizeChanger={false}
              />
            </>
          ) : (
            <Empty description="Объявлений не найдено" />
          )}
        </Content>
      </Layout>
    </MainLayout>
  );
};
