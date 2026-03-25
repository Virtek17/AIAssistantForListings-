import { Button, type ButtonProps } from "antd";
import { BulbOutlined, LoadingOutlined } from "@ant-design/icons";

interface AiButtonProps extends ButtonProps {
  loading?: boolean;
  label?: string;
}

export const AiButton = ({
  loading = false,
  label = "AI помощник",
  ...props
}: AiButtonProps) => (
  <Button
    icon={loading ? <LoadingOutlined /> : <BulbOutlined />}
    loading={loading}
    style={{
      backgroundColor: "#FFF7E6",
      color: "#D48806",
      borderRadius: 6,
      ...props.style,
    }}
    {...props}
  >
    {label}
  </Button>
);
