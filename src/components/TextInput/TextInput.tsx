import * as React from "react";
import { AlertCircle } from "lucide-react";

export interface TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export function TextInput({
  label,
  placeholder = "Placeholder",
  value,
  required = false,
  error,
  disabled = false,
  onChange,
}: TextInputProps) {
  const [internalValue, setInternalValue] = React.useState(value ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const hasError = Boolean(error);

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
        <label
          style={{
            color: "#08364b",
            fontSize: "18px",
            lineHeight: 1,
            fontWeight: 400,
          }}
        >
          {label}
          {required && <span style={{ color: "#08364b" }}> *</span>}
        </label>
      )}

      <input
        value={internalValue}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={hasError}
        aria-required={required}
        onChange={handleChange}
        style={{
          height: "62px",
          width: "100%",
          borderRadius: "4px",
          padding: "0 20px",
          backgroundColor: "#f5ebcb",
          color: "#08364b",
          fontSize: "18px",
          fontFamily: "'Halyard Display', sans-serif",
          fontWeight: 400,
          border: `2px solid ${hasError ? "#ee4646" : "transparent"}`,
          outline: "none",
          boxSizing: "border-box",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
          transition: "border-color 0.15s ease",
        }}
        onFocus={(e) => {
          if (!hasError) e.currentTarget.style.borderColor = "#08364b";
        }}
        onBlur={(e) => {
          if (!hasError) e.currentTarget.style.borderColor = "transparent";
        }}
        onMouseEnter={(e) => {
          if (!hasError && document.activeElement !== e.currentTarget) {
            e.currentTarget.style.borderColor = "rgba(8, 54, 75, 0.3)";
          }
        }}
        onMouseLeave={(e) => {
          if (!hasError && document.activeElement !== e.currentTarget) {
            e.currentTarget.style.borderColor = "transparent";
          }
        }}
      />

      {hasError && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <AlertCircle
            size={16}
            color="#ee4646"
            style={{ flexShrink: 0 }}
          />
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
