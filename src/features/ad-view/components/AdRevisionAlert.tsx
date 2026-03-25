import { Alert, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface AdRevisionAlertProps {
  fields: string[];
}

export const AdRevisionAlert = ({ fields }: AdRevisionAlertProps) => {
  if (fields.length === 0) return null;

  return (
    <Alert
      type="warning"
      showIcon
      icon={<InfoCircleOutlined style={{ marginTop: 4 }} />}
      style={{
        backgroundColor: "#F9F1E6",
        border: "none",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      }}
      title={
        <Text strong style={{ fontSize: 16, color: "#1E1E1E" }}>
          Требуются доработки
        </Text>
      }
      description={
        <div style={{ marginTop: 4 }}>
          <Text style={{ fontSize: 14 }}>
            У объявления есть незаполненные поля:
          </Text>
          <ul
            style={{
              marginTop: 8,
              paddingLeft: 20,
              marginBottom: 0,
            }}
          >
            {fields.map((field) => (
              <li key={field} style={{ fontSize: 14, color: "#1E1E1E" }}>
                {field}
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
};
