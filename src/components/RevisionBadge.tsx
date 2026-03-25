interface RevisionBadgeProps {
  text?: string;
}

export const RevisionBadge = ({
  text = "Требует доработок",
}: RevisionBadgeProps) => (
  <div
    style={{
      marginTop: "auto",
      padding: "4px 10px",
      backgroundColor: "#FFF7E6",
      color: "#FAAD14",
      fontSize: 14,
      fontWeight: 400,
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      gap: 6,
      width: "fit-content",
    }}
  >
    <div style={{ fontSize: 20, lineHeight: 0 }}>•</div>
    {text}
  </div>
);
