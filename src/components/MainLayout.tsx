import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export const MainLayout = ({ children }: any) => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#F7F5F8",
        padding: "32px 12px",
      }}
    >
      <Content style={{ maxWidth: 1335, margin: "0 auto", width: "100%" }}>
        {children}
      </Content>
    </Layout>
  );
};
