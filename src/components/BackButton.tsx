import { Button, type ButtonProps } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

interface BackButtonProps extends ButtonProps {
  label?: string;
}

export const BackButton = ({ label = "Назад", ...props }: BackButtonProps) => (
  <Button
    icon={<ArrowLeftOutlined />}
    style={{
      borderRadius: 8,
      ...props.style,
    }}
    {...props}
  >
    {label}
  </Button>
);
