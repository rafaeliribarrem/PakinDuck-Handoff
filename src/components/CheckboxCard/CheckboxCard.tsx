import * as React from "react";
import { AlertCircle, Check } from "lucide-react";

export interface CheckboxCardOption {
  value: string;
  label: string;
  description?: string;
  imageUrl?: string;
}

export interface CheckboxCardProps {
  options?: CheckboxCardOption[];
  value?: string[];
  label?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (values: string[]) => void;
}

function CheckboxCardItem({
  option,
  checked,
  disabled,
  onToggle,
}: {
  option: CheckboxCardOption;
  checked: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = React.useState(false);

  const borderColor = checked
    ? "#08364b"
    : hovered && !disabled
    ? "rgba(8,54,75,0.3)"
    : "transparent";

  return (
    <div
      onClick={() => !disabled && onToggle()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        minHeight: "86px",
        backgroundColor: "#f5ebcb",
        borderRadius: "4px",
        border: `2px solid ${borderColor}`,
        padding: "20px",
        boxSizing: "border-box",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "border-color 0.15s ease",
      }}
    >
      {/* Left side: checkbox + text */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* Checkbox square */}
        <div
          style={{
            flexShrink: 0,
            width: "14px",
            height: "14px",
            borderRadius: "2px",
            border: `1px solid ${checked ? "transparent" : "rgba(8,54,75,0.2)"}`,
            backgroundColor: checked ? "#08364b" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            transition: "background-color 0.15s ease, border-color 0.15s ease",
          }}
        >
          {checked && (
            <Check
              size={10}
              color="#ffffff"
              strokeWidth={3}
            />
          )}
        </div>

        {/* Text column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            fontFamily: "'Halyard Display', sans-serif",
            fontSize: "18px",
            lineHeight: 1,
          }}
        >
          <span
            style={{
              color: checked ? "#fd7638" : "#08364b",
              fontWeight: 400,
              transition: "color 0.15s ease",
            }}
          >
            {option.label}
          </span>
          {option.description && (
            <span
              style={{
                color: "#08364b",
                opacity: 0.5,
                fontWeight: 400,
              }}
            >
              {option.description}
            </span>
          )}
        </div>
      </div>

      {/* Right side: image thumbnail */}
      {option.imageUrl && (
        <img
          src={option.imageUrl}
          alt={option.label}
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "4px",
            objectFit: "cover",
            flexShrink: 0,
            marginLeft: "16px",
          }}
        />
      )}
    </div>
  );
}

export function CheckboxCard({
  options = [
    { value: "1", label: "Option One", description: "Description for option one." },
    { value: "2", label: "Option Two", description: "Description for option two." },
    { value: "3", label: "Option Three", description: "Description for option three." },
  ],
  value,
  label,
  disabled = false,
  error,
  onChange,
}: CheckboxCardProps) {
  const [selected, setSelected] = React.useState<string[]>(value ?? []);
  const hasError = Boolean(error);

  const handleToggle = (val: string) => {
    const next = selected.includes(val)
      ? selected.filter((v) => v !== val)
      : [...selected, val];
    setSelected(next);
    onChange?.(next);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
      {label && (
        <span
          style={{
            fontFamily: "'Halyard Display', sans-serif",
            fontSize: "14px",
            color: "#08364b",
            fontWeight: 500,
            marginBottom: "4px",
          }}
        >
          {label}
        </span>
      )}

      {options.map((option) => (
        <CheckboxCardItem
          key={option.value}
          option={option}
          checked={selected.includes(option.value)}
          disabled={disabled}
          onToggle={() => handleToggle(option.value)}
        />
      ))}

      {hasError && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "4px",
          }}
        >
          <AlertCircle size={16} color="#ee4646" style={{ flexShrink: 0 }} />
          <span
            style={{
              color: "#ee4646",
              fontSize: "14px",
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
