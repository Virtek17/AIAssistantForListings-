import {
  Button,
  Empty,
  Layout,
  Pagination,
  Result,
  Space,
  Spin,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { AdsControlPanel } from "../features/ads-list/components/AdsControlPanel.tsx";
import { AdsSidebar } from "../features/ads-list/components/AdsSidebar.tsx";
import { AdCardForGrid } from "../components/AdCard/AdCardForGrid.tsx";
import { AdCardForCol } from "../components/AdCard/AdCardForCol.tsx";
import { MainLayout } from "../components/MainLayout.tsx";
import { AdsListLayout } from "../components/AdsListLayout.tsx";
import { useViewStore } from "../store/useViewStore.ts";
import { AdsListSkeletonGrid } from "../components/AdsListSkeletonGrid.tsx";
import { AdsListSkeletonCol } from "../components/AdsListSkeletonCol.tsx";
import { useAdsFiltering } from "../features/ads-list/hooks/useAdsFiltering.ts";
const { Title, Text } = Typography;

export const AdsListPage = () => {
  const { viewMode, setViewMode } = useViewStore();
  const pageSize = 10;
  const { state, actions, query } = useAdsFiltering(pageSize);
  const { data, isLoading, isError, isFetching, refetch } = query;

  if (isError) {
    return (
      <Result
        status="error"
        title="Ошибка загрузки"
        extra={<Button onClick={() => refetch()}>Попробовать снова</Button>}
      />
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
        search={state.search}
        onSearchChange={actions.setSearch}
        sortBy={state.sortBy}
        onSortChange={actions.setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <Layout style={{ background: "transparent" }}>
        <AdsSidebar
          selectedCategories={state.selectedCategories}
          setSelectedCategories={actions.setSelectedCategories}
          onlyNeedsRevision={state.onlyNeedsRevision}
          setOnlyNeedsRevision={actions.setOnlyNeedsRevision}
          isCategoryOpen={state.isCategoryOpen}
          setIsCategoryOpen={actions.setIsCategoryOpen}
          onReset={actions.handleReset}
        />

        <Content style={{ paddingLeft: 24 }}>
          {isLoading ? (
            viewMode === "grid" ? (
              <AdsListSkeletonGrid />
            ) : (
              <AdsListSkeletonCol />
            )
          ) : data?.items.length ? (
            <>
              <Spin spinning={isFetching}>
                <AdsListLayout type={viewMode}>
                  {data.items.map((item) =>
                    viewMode === "grid" ? (
                      <AdCardForGrid
                        id={item.id}
                        category={item.category}
                        price={item.price}
                        title={item.title}
                        needsRevision={item.needsRevision}
                      />
                    ) : (
                      <AdCardForCol
                        id={item.id}
                        category={item.category}
                        price={item.price}
                        title={item.title}
                        needsRevision={item.needsRevision}
                      />
                    ),
                  )}
                </AdsListLayout>
              </Spin>
              <Pagination
                current={state.currentPage}
                total={data.total}
                pageSize={pageSize}
                onChange={actions.setCurrentPage}
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
