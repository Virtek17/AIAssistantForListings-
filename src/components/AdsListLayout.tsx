import { Col, Row } from "antd";
import React from "react";

interface AdsListLayoutProps {
  type: "grid" | "col";
  children: React.ReactNode;
}

export const AdsListLayout = ({ type, children }: AdsListLayoutProps) => {
  if (type === "grid") {
    return (
      <Row gutter={[12, 12]}>
        {React.Children.map(children, (child) => (
          <Col style={{ flex: "0 0 20%", maxWidth: "20%" }}>{child}</Col>
        ))}
      </Row>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {children}
    </div>
  );
};
