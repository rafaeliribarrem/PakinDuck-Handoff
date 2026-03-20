import * as React from "react";
import { AlertCircle } from "lucide-react";

export interface PillSelectProps {
  label?: string;
  options?: string[];
  value?: string[];
  disabled?: boolean;
  error?: string;
  onChange?: (value: string[]) => void;
}

function Pill({
  option,
  selected,
  disabled,
  onToggle,
}: {
  option: string;
  selected: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  const borderColor = selected
    ? "#08364b"
    : isHovered && !disabled
    ? "rgba(8, 54, 75, 0.3)"
    : "transparent";

  return (
    <button
      onClick={() => !disabled && onToggle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      style={{
        height: "48px",
        minWidth: "96px",
        padding: "0 20px",
        backgroundColor: "#f5ebcb",
        border: `2px solid ${borderColor}`,
        borderRadius: "9000px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontFamily: "'Halyard Display', sans-serif",
        fontSize: "18px",
        color: "#08364b",
        fontWeight: 400,
        boxSizing: "border-box",
        transition: "border-color 0.15s ease",
        outline: "none",
        whiteSpace: "nowrap",
      }}
    >
      {option}
    </button>
  );
}

export function PillSelect({
  label,
  options = ["Option 1", "Option 2", "Option 3"],
  value = [],
  disabled = false,
  error,
  onChange,
}: PillSelectProps) {
  const [selected, setSelected] = React.useState<string[]>(value);
  const hasError = Boolean(error);

  const handleToggle = (option: string) => {
    const next = selected.includes(option)
      ? selected.filter((v) => v !== option)
      : [...selected, option];
    setSelected(next);
    onChange?.(next);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
        fontFamily: "'Halyard Display', sans-serif",
      }}
    >
      {label && (
        <span
          style={{
            color: "#08364b",
            fontSize: "18px",
            lineHeight: 1,
            fontWeight: 400,
          }}
        >
          {label}
        </span>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {options.map((option) => (
          <Pill
            key={option}
            option={option}
            selected={selected.includes(option)}
            disabled={disabled}
            onToggle={() => handleToggle(option)}
          />
        ))}
      </div>

      {hasError && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <AlertCircle size={16} color="#ee4646" style={{ flexShrink: 0 }} />
          <span
            style={{
              color: "#ee4646",
              fontSize: "18px",
              lineHeight: 1,
              fontFamily: "'Halyard Display', sans-serif",
            }}
          >
            {error}
          </span>
        </div>
      )}
    </div>
  );
}
