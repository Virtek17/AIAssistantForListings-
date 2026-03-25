import { Descriptions } from "antd";
import { PARAM_LABELS, VALUE_LABELS } from "../../../utils/constants";

export const AdParams = ({ params }: { params?: Record<string, string> }) => {
  if (!params) return null;

  return (
    <Descriptions
      column={1}
      colon={false}
      labelStyle={{
        fontSize: 16,
        fontWeight: 600,
        color: "rgba(0, 0, 0, 0.45)",
        width: "148px",
      }}
      contentStyle={{
        fontSize: 16,
        fontWeight: 400,
        color: "#1E1E1E",
        marginLeft: 12,
      }}
    >
      {Object.entries(params).map(([key, value]) => {
        if (value === undefined || value === null || value === "") return null;
        return (
          <Descriptions.Item key={key} label={PARAM_LABELS[key] || key}>
            {VALUE_LABELS[value] || value}
          </Descriptions.Item>
        );
      })}
    </Descriptions>
  );
};
