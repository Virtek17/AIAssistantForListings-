import React from "react";
import { Layout, Typography, Checkbox, Switch, Button, Divider } from "antd";
import { UpOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const { Title, Text } = Typography;

interface AdsSidebarProps {
  selectedCategories: string[];
  setSelectedCategories: (values: string[]) => void;
  onlyNeedsRevision: boolean;
  setOnlyNeedsRevision: (value: boolean) => void;
  onReset: () => void;
  isCategoryOpen: boolean;
  setIsCategoryOpen: (value: boolean) => void;
}

export const AdsSidebar: React.FC<AdsSidebarProps> = ({
  selectedCategories,
  setSelectedCategories,
  onlyNeedsRevision,
  setOnlyNeedsRevision,
  onReset,
  isCategoryOpen,
  setIsCategoryOpen,
}) => {
  const categoriesOptions = [
    { label: "Авто", value: "auto" },
    { label: "Электроника", value: "electronics" },
    { label: "Недвижимость", value: "real_estate" },
  ];

  return (
    <Sider width={256} style={{ background: "transparent" }}>
      <div
        style={{
          borderRadius: 8,
          padding: 16,
          backgroundColor: "#FFFFFF",
          marginBottom: 10,
        }}
      >
        <Title level={4} style={{ margin: "0 0 10px 0", fontSize: 16 }}>
          Фильтры
        </Title>

        <div
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <Text strong style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.85)" }}>
            Категория
          </Text>
          <UpOutlined
            style={{
              fontSize: 12,
              transition: "transform 0.3s",
              transform: isCategoryOpen ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />
        </div>

        <div
          style={{ display: isCategoryOpen ? "block" : "none", marginTop: 12 }}
        >
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
            value={selectedCategories}
            onChange={(values) => setSelectedCategories(values as string[])}
          >
            {categoriesOptions.map((co) => (
              <Checkbox
                key={co.value}
                value={co.value}
                style={{ fontSize: 14 }}
              >
                {co.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>

        <Divider style={{ margin: "10px 0" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            Только требующие доработок
          </Text>
          <Switch checked={onlyNeedsRevision} onChange={setOnlyNeedsRevision} />
        </div>
      </div>

      <Button
        block
        type="text"
        onClick={onReset}
        style={{
          height: 41,
          borderRadius: 8,
          color: "#848388",
          backgroundColor: "#FFFFFF",
        }}
      >
        Сбросить фильтры
      </Button>
    </Sider>
  );
};
