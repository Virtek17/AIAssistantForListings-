import { Layout, type LayoutProps } from "antd";
import { Content } from "antd/es/layout/layout";
import type { ReactNode } from "react";

interface MainLayoutProps extends LayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
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
