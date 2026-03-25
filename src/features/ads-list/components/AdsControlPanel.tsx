import { Input, Button, Select } from "antd";
import {
  SearchOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";

interface AdsControlPanelProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: "grid" | "col";
  onViewModeChange: (mode: "grid" | "col") => void;
}

export const AdsControlPanel = ({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: AdsControlPanelProps) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "12px 16px",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        gap: 24,
        justifyContent: "space-between",
        marginBottom: 16,
        boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
      }}
    >
      <div style={{ flex: 1 }}>
        <Input
          value={search}
          placeholder="Найти объявление..."
          onChange={(e) => onSearchChange(e.target.value)}
          suffix={<SearchOutlined style={{ cursor: "pointer" }} />}
          style={{
            backgroundColor: "#F6F6F8",
            border: "none",
            borderRadius: "8px ",
            padding: "5px 12px",
            fontSize: 14,
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            backgroundColor: "#F6F6F8",
            borderRadius: 8,
            padding: 2,
          }}
        >
          {/* TODO: убрать ховер */}
          <Button
            type="text"
            icon={
              <AppstoreOutlined
                style={
                  viewMode == "grid"
                    ? { color: "#1890ff" }
                    : { color: "rgba(0, 0, 0, 0.85)" }
                }
              />
            }
            style={{
              borderRadius: 0,
              borderRight: "2px solid #ffffff",
            }}
            onClick={() => onViewModeChange("grid")}
          />
          <Button
            type="text"
            icon={
              <BarsOutlined
                style={
                  viewMode == "col"
                    ? { color: "#1890ff" }
                    : { color: "rgba(0, 0, 0, 0.85)" }
                }
              />
            }
            onClick={() => onViewModeChange("col")}
          />
        </div>

        <Select
          value={sortBy}
          onChange={onSortChange}
          defaultValue="new"
          style={{
            backgroundColor: "",
            border: "4px solid #F6F6F8",
            borderRadius: 8,
            minWidth: 200,
          }}
          options={[
            { value: "createdAt_desc", label: "Сначала новые" },
            { value: "createdAt_asc", label: "Сначала старые" },
            { value: "title_asc", label: "По названию (А-Я)" },
            { value: "title_desc", label: "По названию (Я-А)" },
            { value: "price_desc", label: "Сначала дороже" },
            { value: "price_asc", label: "Сначала дешевле" },
          ]}
        />
      </div>
    </div>
  );
};
