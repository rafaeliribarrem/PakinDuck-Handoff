import * as React from "react";
import { AlertCircle } from "lucide-react";

export interface ToggleProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: (checked: boolean) => void;
}

export function Toggle({
  label = "Label",
  checked = false,
  disabled = false,
  error,
  onChange,
}: ToggleProps) {
  const [isChecked, setIsChecked] = React.useState(checked);
  const [isHovered, setIsHovered] = React.useState(false);
  const hasError = Boolean(error);

  const handleToggle = () => {
    if (disabled) return;
    const next = !isChecked;
    setIsChecked(next);
    onChange?.(next);
  };

  const borderColor = hasError
    ? "#ee4646"
    : isHovered && !disabled
    ? "rgba(8, 54, 75, 0.3)"
    : "transparent";

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
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f5ebcb",
          height: "62px",
          padding: "0 20px",
          borderRadius: "4px",
          border: `2px solid ${borderColor}`,
          boxSizing: "border-box",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "border-color 0.15s ease",
        }}
        onClick={handleToggle}
      >
        <span
          style={{
            color: "#08364b",
            fontSize: "18px",
            lineHeight: 1,
            fontWeight: 400,
            width: "125px",
            flexShrink: 0,
          }}
        >
          {label}
        </span>

        {/* Switch track */}
        <div
          style={{
            width: "44px",
            height: "24px",
            borderRadius: "9000px",
            backgroundColor: isChecked ? "#fd7638" : "#cbc2b1",
            padding: "2px",
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
            flexShrink: 0,
            transition: "background-color 0.2s ease",
            position: "relative",
          }}
        >
          {/* Knob */}
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              flexShrink: 0,
              position: "absolute",
              left: isChecked ? "calc(100% - 22px)" : "2px",
              transition: "left 0.2s ease",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          />
        </div>
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
