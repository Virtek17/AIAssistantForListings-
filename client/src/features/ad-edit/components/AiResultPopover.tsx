import { Button, Space, Typography } from "antd";

const { Text, Paragraph } = Typography;

interface AiResultPopoverProps {
  status: "success" | "error";
  suggestion: string;
  onApply: () => void;
  onClose: () => void;
  maxWidth?: number;
  preserveLineBreaks?: boolean;
}

export const AiResultPopover = ({
  status,
  suggestion,
  onApply,
  onClose,
  maxWidth = 350,
  preserveLineBreaks = false,
}: AiResultPopoverProps) => (
  <div style={{ maxWidth }}>
    {status === "success" ? (
      <>
        <Text strong>Ответ AI:</Text>
        <div style={{ margin: "12px 0", fontSize: 13, lineHeight: "1.6" }}>
          {preserveLineBreaks ? (
            <Paragraph style={{ whiteSpace: "pre-line", marginBottom: 0 }}>
              {suggestion}
            </Paragraph>
          ) : (
            suggestion
          )}
        </div>
        <Space size={8}>
          <Button type="primary" size="small" onClick={onApply}>
            Применить
          </Button>
          <Button size="small" onClick={onClose}>
            Закрыть
          </Button>
        </Space>
      </>
    ) : (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Text type="danger" strong style={{ color: "#C00F0C", fontSize: 12 }}>
          Произошла ошибка при запросе к AI
        </Text>
        <Text style={{ color: "#1E1E1E", fontSize: 12, fontWeight: 400 }}>
          Попробуйте повторить запрос или закройте уведомление
        </Text>
        <Button
          block
          size="small"
          onClick={onClose}
          style={{
            backgroundColor: "#FCB3AD",
            width: "fit-content",
          }}
        >
          Закрыть
        </Button>
      </div>
    )}
  </div>
);
