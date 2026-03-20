import * as React from "react";
import { AlertCircle, ChevronDown, Check } from "lucide-react";

export interface NumberInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  units?: string[];
  selectedUnit?: string;
  onChange?: (value: string) => void;
  onUnitChange?: (unit: string) => void;
}

export function NumberInput({
  label,
  placeholder = "Placeholder",
  value,
  required = false,
  error,
  disabled = false,
  units = ["Unit", "Lorem", "Ipsum"],
  selectedUnit,
  onChange,
  onUnitChange,
}: NumberInputProps) {
  const [internalValue, setInternalValue] = React.useState(value ?? "");
  const [currentUnit, setCurrentUnit] = React.useState(selectedUnit ?? (units[0] ?? "Unit"));
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [inputBorder, setInputBorder] = React.useState("transparent");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const hasError = Boolean(error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleUnitSelect = (unit: string) => {
    setCurrentUnit(unit);
    setDropdownOpen(false);
    onUnitChange?.(unit);
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeBorderColor = hasError ? "#ee4646" : "#08364b";

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
          {required && <span> *</span>}
        </label>
      )}

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "62px",
          borderRadius: "4px",
          backgroundColor: "#f5ebcb",
          border: `2px solid ${hasError ? "#ee4646" : inputBorder}`,
          paddingLeft: "20px",
          paddingRight: "13px",
          boxSizing: "border-box",
          opacity: disabled ? 0.5 : 1,
          transition: "border-color 0.15s ease",
        }}
        onMouseEnter={() => {
          if (!hasError && inputBorder === "transparent") {
            setInputBorder("rgba(8, 54, 75, 0.3)");
          }
        }}
        onMouseLeave={() => {
          if (!hasError && inputBorder === "rgba(8, 54, 75, 0.3)") {
            setInputBorder("transparent");
          }
        }}
      >
        <input
          type="number"
          value={internalValue}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={hasError}
          aria-required={required}
          onChange={handleChange}
          onFocus={() => setInputBorder(activeBorderColor)}
          onBlur={() => setInputBorder(hasError ? "#ee4646" : "transparent")}
          style={{
            flex: 1,
            height: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#08364b",
            fontSize: "18px",
            fontFamily: "'Halyard Display', sans-serif",
            fontWeight: 400,
            cursor: disabled ? "not-allowed" : "text",
          }}
        />

        {/* Unit dropdown trigger */}
        <div ref={dropdownRef} style={{ flexShrink: 0 }}>
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
              backgroundColor: dropdownOpen
                ? "rgba(8, 54, 75, 0.15)"
                : "rgba(8, 54, 75, 0.08)",
              border: "none",
              cursor: disabled ? "not-allowed" : "pointer",
              color: "#08364b",
              fontSize: "14px",
              fontFamily: "'Halyard Display', sans-serif",
              fontWeight: 400,
              transition: "background-color 0.15s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              if (!dropdownOpen) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(8, 54, 75, 0.15)";
              }
            }}
            onMouseLeave={(e) => {
              if (!dropdownOpen) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(8, 54, 75, 0.08)";
              }
            }}
          >
            {currentUnit}
            <ChevronDown
              size={14}
              color="#08364b"
              style={{
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.15s ease",
              }}
            />
          </button>

          {/* Dropdown menu */}
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
                boxShadow: "0 4px 16px rgba(8, 54, 75, 0.12)",
              }}
            >
              {units.map((unit) => {
                const isSelected = unit === currentUnit;
                return (
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
                      fontWeight: 400,
                      width: "100%",
                      textAlign: "left",
                      transition: "background-color 0.1s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        "rgba(8, 54, 75, 0.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        "transparent";
                    }}
                  >
                    {unit}
                    {isSelected && (
                      <Check size={14} color="#08364b" style={{ flexShrink: 0 }} />
                    )}
                  </button>
                );
              })}
            </div>
          )}
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
