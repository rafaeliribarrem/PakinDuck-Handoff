import * as React from "react";
import { AlertCircle, X } from "lucide-react";

export interface FileUploadProps {
  label?: string;
  accept?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (file: File | null) => void;
}

/* Folder‑upload icon — exact SVG from the Figma spec */
function FolderUploadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 14V5a1 1 0 011-1h4l2 2h6a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 8v5M9 8L7 10M9 8l2 2"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FileUpload({
  label,
  accept,
  disabled = false,
  error,
  onChange,
}: FileUploadProps) {
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const hasError = Boolean(error);

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFileName(file ? file.name : null);
    onChange?.(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileName(null);
    onChange?.(null);
  };

  const borderColor = hasError
    ? "#ee4646"
    : isHovered && !disabled
    ? "rgba(8, 54, 75, 0.3)"
    : "transparent";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        fontFamily: "'Halyard Display', sans-serif",
      }}
    >
      {/* Label */}
      {label && (
        <span
          style={{
            color: "#08364b",
            fontSize: "20px",
            lineHeight: 1.5,
            fontWeight: 400,
          }}
        >
          {label}
        </span>
      )}

      {/* Hidden native input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={handleChange}
        style={{ display: "none" }}
        aria-hidden="true"
      />

      {/* Clickable field */}
      <div
        onClick={handleClick}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={label ?? "File upload"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
        style={{
          backgroundColor: "#f5ebcb",
          paddingLeft: "20px",
          paddingRight: "24px",
          paddingTop: "20px",
          paddingBottom: "20px",
          borderRadius: "4px",
          border: `2px solid ${borderColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          transition: "border-color 0.15s ease",
          outline: "none",
          userSelect: "none",
          width: "100%",
        }}
      >
        {/* Left: "Choose file" + filename */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <span
            style={{
              color: "#08364b",
              fontSize: "18px",
              fontWeight: 400,
              fontFamily: "'Halyard Display', sans-serif",
              lineHeight: 1.5,
              flexShrink: 0,
            }}
          >
            Choose file
          </span>
          <span
            style={{
              color: "#08364b",
              fontSize: "18px",
              fontWeight: 300,
              fontFamily: "'Halyard Display', sans-serif",
              lineHeight: 1.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
              minWidth: 0,
            }}
          >
            {fileName ?? "No file choosen"}
          </span>
        </div>

        {/* Right: icon */}
        {fileName ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear file"
            style={{
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            <X size={20} color="#fd7638" strokeWidth={2.5} />
          </button>
        ) : (
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "6px",
              backgroundColor: "#fd7638",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FolderUploadIcon />
          </div>
        )}
      </div>

      {/* Error message */}
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
