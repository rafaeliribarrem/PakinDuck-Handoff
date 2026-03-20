import * as React from "react";
import { AlertCircle, Minus, Plus } from "lucide-react";

export interface StepperProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

export function Stepper({
  label,
  value = 10,
  min = 0,
  max = 999,
  step = 1,
  required = false,
  error,
  disabled = false,
  onChange,
}: StepperProps) {
  const [internalValue, setInternalValue] = React.useState(value);
  const [editing, setEditing] = React.useState(false);
  const [inputText, setInputText] = React.useState(String(value));
  const [hovered, setHovered] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const hasError = Boolean(error);

  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  const commit = (v: number) => {
    const clamped = clamp(v);
    setInternalValue(clamped);
    setInputText(String(clamped));
    onChange?.(clamped);
  };

  const handleDecrement = () => { if (!disabled) commit(internalValue - step); };
  const handleIncrement = () => { if (!disabled) commit(internalValue + step); };

  const handleClick = () => {
    if (disabled) return;
    setEditing(true);
    setInputText(String(internalValue));
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleInputBlur = () => {
    const parsed = parseFloat(inputText);
    if (!isNaN(parsed)) commit(parsed);
    else setInputText(String(internalValue));
    setEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") inputRef.current?.blur();
    if (e.key === "Escape") { setInputText(String(internalValue)); setEditing(false); }
  };

  const borderColor = hasError ? "#ee4646" : hovered && !disabled ? "rgba(8,54,75,0.3)" : "transparent";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontFamily: "'Halyard Display', sans-serif" }}>
      {label && (
        <label style={{ color: "#08364b", fontSize: "18px", lineHeight: 1, fontWeight: 400 }}>
          {label}{required && <span> *</span>}
        </label>
      )}

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "40px",
          height: "62px",
          padding: "0 24px",
          backgroundColor: "#f5ebcb",
          borderRadius: "4px",
          border: `2px solid ${borderColor}`,
          boxSizing: "border-box",
          opacity: disabled ? 0.5 : 1,
          transition: "border-color 0.15s ease",
        }}
      >
        {/* Minus */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || internalValue <= min}
          aria-label="Decrease"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: disabled || internalValue <= min ? "not-allowed" : "pointer",
            color: "#08364b",
            opacity: internalValue <= min ? 0.3 : 1,
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Minus size={14} strokeWidth={2} />
        </button>

        {/* Value — click to edit */}
        {editing ? (
          <input
            ref={inputRef}
            type="number"
            value={inputText}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            style={{
              width: "40px",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#08364b",
              fontSize: "18px",
              fontFamily: "'Halyard Display', sans-serif",
              fontWeight: 400,
              textAlign: "center",
              padding: 0,
            }}
          />
        ) : (
          <span
            onClick={handleClick}
            style={{
              color: "#08364b",
              fontSize: "18px",
              fontFamily: "'Halyard Display', sans-serif",
              fontWeight: 400,
              lineHeight: 1,
              minWidth: "19px",
              textAlign: "center",
              cursor: disabled ? "not-allowed" : "text",
              userSelect: "none",
            }}
          >
            {internalValue}
          </span>
        )}

        {/* Plus */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || internalValue >= max}
          aria-label="Increase"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: disabled || internalValue >= max ? "not-allowed" : "pointer",
            color: "#08364b",
            opacity: internalValue >= max ? 0.3 : 1,
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Plus size={14} strokeWidth={2} />
        </button>
      </div>

      {hasError && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <AlertCircle size={16} color="#ee4646" style={{ flexShrink: 0 }} />
          <span style={{ color: "#ee4646", fontSize: "18px", lineHeight: 1, fontFamily: "'Halyard Display', sans-serif" }}>
            {error}
          </span>
        </div>
      )}
    </div>
  );
}
