import * as React from "react";
import { AlertCircle, ChevronDown, Check } from "lucide-react";

export interface DropdownProps {
  label?: string;
  placeholder?: string;
  options?: string[];
  value?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export function Dropdown({
  label,
  placeholder = "Placeholder",
  options = ["Option 1", "Option 2", "Option 3"],
  value,
  required = false,
  error,
  disabled = false,
  onChange,
}: DropdownProps) {
  const [selected, setSelected] = React.useState(value ?? "");
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const hasError = Boolean(error);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const borderColor = hasError ? "#ee4646" : open ? "#08364b" : hovered ? "rgba(8,54,75,0.3)" : "transparent";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", fontFamily: "'Halyard Display', sans-serif" }}>
      {label && (
        <label style={{ color: "#08364b", fontSize: "18px", lineHeight: 1, fontWeight: 400 }}>
          {label}{required && <span> *</span>}
        </label>
      )}

      <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((o) => !o)}
          onMouseEnter={() => !disabled && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-haspopup="listbox"
          aria-expanded={open}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "62px",
            padding: "0 20px",
            backgroundColor: "#f5ebcb",
            borderRadius: "4px",
            border: `2px solid ${borderColor}`,
            boxSizing: "border-box",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
            transition: "border-color 0.15s ease",
            textAlign: "left",
          }}
        >
          <span style={{
            color: "#08364b",
            fontSize: "18px",
            fontFamily: "'Halyard Display', sans-serif",
            fontWeight: 400,
            opacity: selected ? 1 : 0.5,
          }}>
            {selected || placeholder}
          </span>
          <ChevronDown
            size={22}
            color="#08364b"
            style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s ease" }}
          />
        </button>

        {open && (
          <div
            role="listbox"
            style={{
              position: "absolute",
              top: "calc(100% + 0.5rem)",
              left: 0,
              right: 0,
              backgroundColor: "#f5ebcb",
              borderRadius: "4px",
              padding: "4px",
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              zIndex: 100,
              boxShadow: "0 4px 16px rgba(8,54,75,0.12)",
            }}
          >
            {options.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={option === selected}
                onClick={() => { setSelected(option); setOpen(false); onChange?.(option); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "44px",
                  padding: "0 16px",
                  borderRadius: "3px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  color: "#08364b",
                  fontSize: "18px",
                  fontFamily: "'Halyard Display', sans-serif",
                  fontWeight: 400,
                  width: "100%",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(8,54,75,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
              >
                {option}
                {option === selected && <Check size={16} color="#08364b" style={{ flexShrink: 0 }} />}
              </button>
            ))}
          </div>
        )}
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
