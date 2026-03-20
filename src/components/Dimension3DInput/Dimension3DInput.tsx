import * as React from "react";
import { AlertCircle, ChevronDown, Check } from "lucide-react";

export interface Dimension3DInputProps {
  label?: string;
  widthPlaceholder?: string;
  lengthPlaceholder?: string;
  heightPlaceholder?: string;
  width?: string;
  length?: string;
  height?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  units?: string[];
  selectedUnit?: string;
  onWidthChange?: (value: string) => void;
  onLengthChange?: (value: string) => void;
  onHeightChange?: (value: string) => void;
  onUnitChange?: (unit: string) => void;
}

const UNIT_DECIMALS: Record<string, number> = {
  Cm: 1,
  m: 2,
  mm: 0,
  in: 2,
};

function getDecimals(unit: string): number {
  return UNIT_DECIMALS[unit] ?? 2;
}

function maskNumeric(value: string, decimals: number): string {
  let cleaned = value.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");
  if (parts.length > 2) {
    cleaned = parts[0] + "." + parts.slice(1).join("");
  }
  if (decimals === 0) {
    cleaned = cleaned.split(".")[0];
  } else if (parts.length === 2 && parts[1].length > decimals) {
    cleaned = parts[0] + "." + parts[1].slice(0, decimals);
  }
  return cleaned;
}

function formatOnBlur(value: string, decimals: number): string {
  if (value === "") return "";
  const num = parseFloat(value);
  if (isNaN(num)) return "";
  if (decimals === 0) return Math.round(num).toString();
  return num.toFixed(decimals);
}

const fontStyle: React.CSSProperties = {
  fontSize: "18px",
  fontFamily: "'Halyard Display', sans-serif",
  fontWeight: 400,
};

function DimensionField({
  value,
  placeholder,
  disabled,
  decimals,
  onValueChange,
  onFocus,
  onBlur,
}: {
  value: string;
  placeholder: string;
  disabled: boolean;
  decimals: number;
  onValueChange: (val: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const masked = maskNumeric(e.target.value, decimals);
    onValueChange(masked);
  }

  function handleBlur() {
    const formatted = formatOnBlur(value, decimals);
    onValueChange(formatted);
    onBlur();
  }

  return (
    <div
      style={{
        display: "inline-grid",
        alignItems: "center",
        minWidth: "1ch",
      }}
    >
      <span
        aria-hidden
        style={{
          ...fontStyle,
          gridArea: "1 / 1",
          visibility: "hidden",
          whiteSpace: "pre",
          pointerEvents: "none",
          color: value ? "#08364b" : "rgba(8,54,75,0.5)",
        }}
      >
        {value || placeholder}
      </span>
      <input
        type="text"
        inputMode="decimal"
        size={1}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={handleBlur}
        style={{
          ...fontStyle,
          gridArea: "1 / 1",
          width: "100%",
          minWidth: 0,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "#08364b",
          padding: 0,
          cursor: disabled ? "not-allowed" : "text",
        }}
      />
    </div>
  );
}

export function Dimension3DInput({
  label,
  widthPlaceholder = "Width",
  lengthPlaceholder = "Length",
  heightPlaceholder = "Height",
  width,
  length,
  height,
  required = false,
  error,
  disabled = false,
  units = ["Cm", "m", "mm", "in"],
  selectedUnit,
  onWidthChange,
  onLengthChange,
  onHeightChange,
  onUnitChange,
}: Dimension3DInputProps) {
  const [internalWidth, setInternalWidth] = React.useState(width ?? "");
  const [internalLength, setInternalLength] = React.useState(length ?? "");
  const [internalHeight, setInternalHeight] = React.useState(height ?? "");
  const [currentUnit, setCurrentUnit] = React.useState(selectedUnit ?? (units[0] ?? "Cm"));
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const hasError = Boolean(error);
  const decimals = getDecimals(currentUnit);

  const handleUnitSelect = (unit: string) => {
    setCurrentUnit(unit);
    setDropdownOpen(false);
    onUnitChange?.(unit);
    const newDecimals = getDecimals(unit);
    if (internalWidth) {
      const formatted = formatOnBlur(internalWidth, newDecimals);
      setInternalWidth(formatted);
      onWidthChange?.(formatted);
    }
    if (internalLength) {
      const formatted = formatOnBlur(internalLength, newDecimals);
      setInternalLength(formatted);
      onLengthChange?.(formatted);
    }
    if (internalHeight) {
      const formatted = formatOnBlur(internalHeight, newDecimals);
      setInternalHeight(formatted);
      onHeightChange?.(formatted);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const borderColor = hasError
    ? "#ee4646"
    : focused
    ? "#08364b"
    : hovered
    ? "rgba(8, 54, 75, 0.3)"
    : "transparent";

  const separatorStyle: React.CSSProperties = {
    color: "#08364b",
    fontSize: "18px",
    opacity: 0.5,
    flexShrink: 0,
    userSelect: "none",
    padding: "0 8px",
    lineHeight: "62px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", fontFamily: "'Halyard Display', sans-serif" }}>
      {label && (
        <label style={{ color: "#08364b", fontSize: "18px", lineHeight: 1, fontWeight: 400 }}>
          {label}{required && <span> *</span>}
        </label>
      )}

      <div
        ref={containerRef}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: "0",
          minHeight: "62px",
          padding: "0 13px 0 20px",
          backgroundColor: "#f5ebcb",
          borderRadius: "4px",
          border: `2px solid ${borderColor}`,
          boxSizing: "border-box",
          opacity: disabled ? 0.5 : 1,
          width: "fit-content",
          transition: "border-color 0.15s ease",
        }}
      >
        <DimensionField
          value={internalWidth}
          placeholder={widthPlaceholder}
          disabled={disabled}
          decimals={decimals}
          onValueChange={(val) => { setInternalWidth(val); onWidthChange?.(val); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        <span style={separatorStyle}>x</span>

        <DimensionField
          value={internalLength}
          placeholder={lengthPlaceholder}
          disabled={disabled}
          decimals={decimals}
          onValueChange={(val) => { setInternalLength(val); onLengthChange?.(val); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        <span style={separatorStyle}>x</span>

        <DimensionField
          value={internalHeight}
          placeholder={heightPlaceholder}
          disabled={disabled}
          decimals={decimals}
          onValueChange={(val) => { setInternalHeight(val); onHeightChange?.(val); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {/* Unit dropdown */}
        <div style={{ flexShrink: 0, marginLeft: "16px" }}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => setDropdownOpen((o) => !o)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              height: "36px",
              padding: "0 12px",
              borderRadius: "3px",
              backgroundColor: dropdownOpen ? "rgba(8,54,75,0.15)" : "rgba(8,54,75,0.08)",
              border: "none",
              cursor: disabled ? "not-allowed" : "pointer",
              color: "#08364b",
              fontSize: "14px",
              fontFamily: "'Halyard Display', sans-serif",
              whiteSpace: "nowrap",
              transition: "background-color 0.15s ease",
            }}
          >
            {currentUnit}
            <ChevronDown
              size={14}
              color="#08364b"
              style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s ease" }}
            />
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 0.5rem)",
                right: 0,
                backgroundColor: "#f5ebcb",
                borderRadius: "4px",
                padding: "4px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                minWidth: "92px",
                zIndex: 100,
                boxShadow: "0 4px 16px rgba(8,54,75,0.12)",
              }}
            >
              {units.map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => handleUnitSelect(unit)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "36px",
                    padding: "0 8px",
                    borderRadius: "3px",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    color: "#08364b",
                    fontSize: "14px",
                    fontFamily: "'Halyard Display', sans-serif",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(8,54,75,0.08)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
                >
                  {unit}
                  {unit === currentUnit && <Check size={14} color="#08364b" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {hasError && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <AlertCircle size={16} color="#ee4646" style={{ flexShrink: 0 }} />
          <span style={{ color: "#ee4646", fontSize: "18px", lineHeight: 1, fontFamily: "'Halyard Display', sans-serif" }}>{error}</span>
        </div>
      )}
    </div>
  );
}
