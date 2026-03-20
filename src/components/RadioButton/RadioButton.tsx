import * as React from "react";
import { AlertCircle } from "lucide-react";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioButtonProps {
  options?: RadioOption[];
  value?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

function RadioItem({
  option,
  selected,
  disabled,
  onSelect,
}: {
  option: RadioOption;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={() => !disabled && onSelect()}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {/* Radio circle */}
      <div
        style={{
          flexShrink: 0,
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          border: `1px solid rgba(8,54,75,0.2)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2px",
          boxSizing: "border-box",
          transition: "border-color 0.15s ease",
          ...(selected ? { borderColor: "#fd7638" } : {}),
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

      {/* Label + description */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          fontFamily: "'Halyard Display', sans-serif",
          color: "#08364b",
          fontSize: "18px",
          lineHeight: 1,
        }}
      >
        <span style={{ fontWeight: 400 }}>{option.label}</span>
        {option.description && (
          <span style={{ opacity: 0.5, fontWeight: 400 }}>{option.description}</span>
        )}
      </div>
    </div>
  );
}

export function RadioButton({
  options = [
    { value: "1", label: "Label", description: "Standard spacing for most use cases." },
    { value: "2", label: "Label", description: "Standard spacing for most use cases." },
    { value: "3", label: "Label", description: "Standard spacing for most use cases." },
  ],
  value,
  required = false,
  error,
  disabled = false,
  onChange,
}: RadioButtonProps) {
  const [selected, setSelected] = React.useState(value ?? "");
  const hasError = Boolean(error);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
      {options.map((option) => (
        <RadioItem
          key={option.value}
          option={option}
          selected={selected === option.value}
          disabled={disabled}
          onSelect={() => { setSelected(option.value); onChange?.(option.value); }}
        />
      ))}

      {hasError && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <AlertCircle size={16} color="#ee4646" style={{ flexShrink: 0 }} />
          <span style={{ color: "#ee4646", fontSize: "18px", lineHeight: 1, fontFamily: "'Halyard Display', sans-serif" }}>{error}</span>
        </div>
      )}
    </div>
  );
}
