import * as React from "react";
import { AlertCircle } from "lucide-react";

export interface RadioCardOption {
  value: string;
  label: string;
  description?: string;
  imageUrl?: string;
}

export interface RadioCardProps {
  options?: RadioCardOption[];
  value?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

function RadioCardItem({
  option,
  selected,
  disabled,
  onSelect,
}: {
  option: RadioCardOption;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = React.useState(false);

  const borderColor = selected
    ? "#08364b"
    : hovered && !disabled
    ? "rgba(8,54,75,0.3)"
    : "transparent";

  return (
    <div
      onClick={() => !disabled && onSelect()}
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
      {/* Left side: radio circle + text */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* Radio circle */}
        <div
          style={{
            flexShrink: 0,
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            border: `1px solid ${selected ? "#fd7638" : "rgba(8,54,75,0.2)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            transition: "border-color 0.15s ease",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#fd7638",
              opacity: selected ? 1 : 0,
              transition: "opacity 0.15s ease",
            }}
          />
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
              color: selected ? "#fd7638" : "#08364b",
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

export function RadioCard({
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
}: RadioCardProps) {
  const [selected, setSelected] = React.useState(value ?? "");
  const hasError = Boolean(error);

  const handleSelect = (val: string) => {
    setSelected(val);
    onChange?.(val);
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
        <RadioCardItem
          key={option.value}
          option={option}
          selected={selected === option.value}
          disabled={disabled}
          onSelect={() => handleSelect(option.value)}
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
