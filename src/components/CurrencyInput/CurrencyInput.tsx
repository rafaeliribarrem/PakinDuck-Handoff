import * as React from "react";
import { AlertCircle } from "lucide-react";

const CurrencySymbolIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.83347 0C5.2936 6.33333e-05 5.6668 0.373133 5.6668 0.833333V1.38932C6.89553 1.54356 8.1146 2.02981 8.95647 2.91341C9.2738 3.24655 9.26147 3.77368 8.92847 4.09115C8.59527 4.40851 8.06753 4.39563 7.75013 4.0625C7.26627 3.5548 6.5038 3.2121 5.6668 3.07161V7.11913C6.4702 7.32907 7.34513 7.57673 8.045 7.97133C8.4786 8.21587 8.8912 8.53967 9.19413 8.987C9.50367 9.44427 9.66673 9.984 9.6668 10.6003C9.6668 11.7239 9.07593 12.5729 8.2644 13.1217C7.53087 13.6177 6.6022 13.8834 5.6668 13.9675V14.5C5.6668 14.9602 5.2936 15.3333 4.83347 15.3333C4.37327 15.3333 4.00013 14.9602 4.00013 14.5V13.931C3.45674 13.8576 2.9208 13.7251 2.42133 13.5287C1.47955 13.1581 0.601767 12.5366 0.0997133 11.6055C-0.118447 11.2005 0.0333401 10.6949 0.438253 10.4765C0.843247 10.2585 1.34876 10.4096 1.56716 10.8145C1.82698 11.2963 2.33045 11.7021 3.03135 11.9779C3.33359 12.0967 3.6614 12.1846 4.00013 12.2441V8.39973C3.28105 8.19413 2.53547 7.93533 1.91873 7.54493C1.00365 6.96553 0.33344 6.07215 0.33344 4.71419C0.333467 3.71245 0.79446 2.91503 1.47927 2.36068C2.1438 1.82287 3.0081 1.51707 3.88293 1.39583C3.92167 1.39047 3.961 1.38684 4.00013 1.38216V0.833333C4.00013 0.373147 4.37327 8.66667e-05 4.83347 0ZM5.6668 12.2943C6.33853 12.2153 6.92027 12.0185 7.3308 11.7409C7.78107 11.4363 8.00013 11.0627 8.00013 10.6003C8.00007 10.2928 7.92353 10.0832 7.81393 9.9212C7.6976 9.74953 7.51073 9.58373 7.226 9.4232C6.80973 9.18853 6.28307 9.01613 5.6668 8.84573V12.2943ZM4.00013 3.06511C3.38303 3.16593 2.87256 3.37751 2.5281 3.65625C2.18349 3.93519 2.00013 4.27715 2.00011 4.71419C2.00011 5.40253 2.28851 5.80617 2.81065 6.13672C3.13824 6.34407 3.53973 6.507 4.00013 6.65627V3.06511Z" fill="#08364B"/>
  </svg>
);

export interface CurrencyInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  currencySymbol?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export function CurrencyInput({
  label,
  placeholder = "Enter amount in USD",
  value,
  currencySymbol = "$",
  required = false,
  error,
  disabled = false,
  onChange,
}: CurrencyInputProps) {
  const [internalValue, setInternalValue] = React.useState(value ?? "");
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const hasError = Boolean(error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const borderColor = hasError
    ? "#ee4646"
    : focused
    ? "#08364b"
    : hovered
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
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          height: "62px",
          padding: "0 20px",
          backgroundColor: "#f5ebcb",
          borderRadius: "4px",
          border: `2px solid ${borderColor}`,
          boxSizing: "border-box",
          opacity: disabled ? 0.5 : 1,
          transition: "border-color 0.15s ease",
        }}
      >
        {/* Currency icon */}
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          {currencySymbol === "$" ? (
            <CurrencySymbolIcon />
          ) : (
            <span style={{ fontSize: "16px", lineHeight: 1, fontWeight: 400, color: "#08364b" }}>
              {currencySymbol}
            </span>
          )}
        </div>

        <input
          type="number"
          min="0"
          step="0.01"
          value={internalValue}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={hasError}
          aria-required={required}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
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
