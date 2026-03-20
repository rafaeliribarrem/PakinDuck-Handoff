import * as React from "react";
import { AlertCircle, Check, X } from "lucide-react";

export interface YesNoProps {
  label?: string;
  value?: boolean | null;
  disabled?: boolean;
  error?: string;
  onChange?: (value: boolean) => void;
}

function YesNoButton({
  children,
  selected,
  disabled,
  onClick,
  borderRadius,
}: {
  children: React.ReactNode;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
  borderRadius: string;
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  const borderColor = selected
    ? "#08364b"
    : isHovered && !disabled
    ? "rgba(8, 54, 75, 0.3)"
    : "transparent";

  return (
    <button
      onClick={() => !disabled && onClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      style={{
        height: "62px",
        padding: "0 20px",
        backgroundColor: "#f5ebcb",
        border: `2px solid ${borderColor}`,
        borderRadius,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontFamily: "'Halyard Display', sans-serif",
        fontSize: "18px",
        color: "#08364b",
        fontWeight: 400,
        boxSizing: "border-box",
        transition: "border-color 0.15s ease",
        outline: "none",
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

export function YesNo({
  label,
  value = null,
  disabled = false,
  error,
  onChange,
}: YesNoProps) {
  const [selected, setSelected] = React.useState<boolean | null>(value);
  const hasError = Boolean(error);

  const handleSelect = (val: boolean) => {
    setSelected(val);
    onChange?.(val);
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

      <div style={{ display: "flex", flexDirection: "row", gap: "0" }}>
        <YesNoButton
          selected={selected === true}
          disabled={disabled}
          onClick={() => handleSelect(true)}
          borderRadius="4px 0 0 4px"
        >
          <Check size={16} color="#08364b" />
          Yes
        </YesNoButton>

        <YesNoButton
          selected={selected === false}
          disabled={disabled}
          onClick={() => handleSelect(false)}
          borderRadius="0 4px 4px 0"
        >
          <X size={16} color="#08364b" />
          No
        </YesNoButton>
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
