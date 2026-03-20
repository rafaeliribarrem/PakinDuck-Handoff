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
  const [currentUnit, setCurrentUnit] = React.useState(selectedUnit ?? (units[0] ?? "Cm"));
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const hasError = Boolean(error);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const borderColor = hasError ? "#ee4646" : focused ? "#08364b" : hovered ? "rgba(8,54,75,0.3)" : "transparent";

  const inputStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#08364b",
    fontSize: "18px",
    fontFamily: "'Halyard Display', sans-serif",
    fontWeight: 400,
    padding: 0,
    cursor: disabled ? "not-allowed" : "text",
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "62px",
          padding: "0 13px 0 20px",
          backgroundColor: "#f5ebcb",
          borderRadius: "4px",
          border: `2px solid ${borderColor}`,
          boxSizing: "border-box",
          opacity: disabled ? 0.5 : 1,
          transition: "border-color 0.15s ease",
          width: "100%",
        }}
      >
        <input type="number" placeholder={widthPlaceholder} defaultValue={width} disabled={disabled}
          onChange={(e) => onWidthChange?.(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={inputStyle} />

        <span style={{ color: "#08364b", fontSize: "18px", opacity: 0.5, flexShrink: 0, userSelect: "none", padding: "0 4px" }}>x</span>

        <input type="number" placeholder={lengthPlaceholder} defaultValue={length} disabled={disabled}
          onChange={(e) => onLengthChange?.(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={inputStyle} />

        <span style={{ color: "#08364b", fontSize: "18px", opacity: 0.5, flexShrink: 0, userSelect: "none", padding: "0 4px" }}>x</span>

        <input type="number" placeholder={heightPlaceholder} defaultValue={height} disabled={disabled}
          onChange={(e) => onHeightChange?.(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={inputStyle} />

        <div style={{ flexShrink: 0 }}>
          <button type="button" disabled={disabled} onClick={() => setDropdownOpen((o) => !o)}
            style={{
              display: "flex", alignItems: "center", gap: "8px", height: "36px", padding: "0 12px",
              borderRadius: "3px", backgroundColor: dropdownOpen ? "rgba(8,54,75,0.15)" : "rgba(8,54,75,0.08)",
              border: "none", cursor: disabled ? "not-allowed" : "pointer", color: "#08364b",
              fontSize: "14px", fontFamily: "'Halyard Display', sans-serif", whiteSpace: "nowrap",
              transition: "background-color 0.15s ease",
            }}>
            {currentUnit}
            <ChevronDown size={14} color="#08364b" style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s ease" }} />
          </button>

          {dropdownOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 0.5rem)", right: 0,
              backgroundColor: "#f5ebcb", borderRadius: "4px", padding: "4px",
              display: "flex", flexDirection: "column", gap: "4px", minWidth: "92px",
              zIndex: 100, boxShadow: "0 4px 16px rgba(8,54,75,0.12)",
            }}>
              {units.map((unit) => (
                <button key={unit} type="button"
                  onClick={() => { setCurrentUnit(unit); setDropdownOpen(false); onUnitChange?.(unit); }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    height: "36px", padding: "0 8px", borderRadius: "3px", border: "none",
                    backgroundColor: "transparent", cursor: "pointer", color: "#08364b",
                    fontSize: "14px", fontFamily: "'Halyard Display', sans-serif", width: "100%",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(8,54,75,0.08)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}>
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
