import * as React from "react";
import { AlertCircle, Trash2 } from "lucide-react";

export interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  preview?: string;
}

export interface FileUploadDropzoneProps {
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  disabled?: boolean;
  error?: string;
  dropzoneText?: string;
  onChange?: (files: File[]) => void;
}

/* Folder-upload icon — exact SVG from the Figma spec */
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

/* Trash icon — exact SVG from the Figma spec */
function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14"
        stroke="#ee4646"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function truncateFilename(name: string, maxLength: number = 24): string {
  if (name.length <= maxLength) return name;
  const ext = name.lastIndexOf(".");
  if (ext === -1) return name.slice(0, maxLength - 3) + "...";
  const extension = name.slice(ext);
  const base = name.slice(0, maxLength - 3 - extension.length);
  return `${base}...${extension}`;
}

export function FileUploadDropzone({
  accept,
  multiple = true,
  maxSizeMB = 4,
  disabled = false,
  error,
  dropzoneText,
  onChange,
}: FileUploadDropzoneProps) {
  const [files, setFiles] = React.useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const hasError = Boolean(error);

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const processFiles = React.useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      const newFiles: UploadedFile[] = Array.from(fileList).map((file) => ({
        file,
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        progress: 0,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      }));

      setFiles((prev) => {
        const updated = multiple ? [...prev, ...newFiles] : newFiles;
        onChange?.(updated.map((f) => f.file));
        return updated;
      });

      // Simulate upload progress
      newFiles.forEach((uploadedFile) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 20 + 10;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
          }
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadedFile.id ? { ...f, progress } : f
            )
          );
        }, 300);
      });
    },
    [multiple, onChange]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) URL.revokeObjectURL(fileToRemove.preview);
      const updated = prev.filter((f) => f.id !== id);
      onChange?.(updated.map((f) => f.file));
      return updated;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!disabled) processFiles(e.dataTransfer.files);
  };

  React.useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
    };
  }, []);

  const dropzoneBorderColor = hasError
    ? "#ee4646"
    : isDragOver
    ? "#08364b"
    : "rgba(0, 0, 0, 0.1)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
        fontFamily: "'Halyard Display', sans-serif",
      }}
    >
      {/* Hidden native input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        style={{ display: "none" }}
        aria-hidden="true"
      />

      {/* Dropzone area */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Drag and drop files or click to browse"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
        style={{
          backgroundColor: "#f5ebcb",
          border: `1px dashed ${dropzoneBorderColor}`,
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "40px",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          transition: "border-color 0.15s ease",
          outline: "none",
          userSelect: "none",
        }}
      >
        {/* Folder upload icon */}
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            backgroundColor: "#fd7638",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FolderUploadIcon />
        </div>

        {/* Text */}
        <div
          style={{
            color: "#08364b",
            fontSize: "18px",
            lineHeight: 1.4,
            textAlign: "center",
            fontWeight: 400,
          }}
        >
          {dropzoneText ?? (
            <>
              Upload a project image
              <br />
              or, click to browse ({maxSizeMB}MB max)
            </>
          )}
        </div>
      </div>

      {/* File list */}
      {files.map((uploadedFile) => (
        <div
          key={uploadedFile.id}
          style={{
            backgroundColor: "#f5ebcb",
            borderRadius: "4px",
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
            padding: "16px",
          }}
        >
          {/* Thumbnail */}
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "4px",
              backgroundColor: "rgba(8, 54, 75, 0.1)",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {uploadedFile.preview && (
              <img
                src={uploadedFile.preview}
                alt={uploadedFile.file.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
          </div>

          {/* File info + progress */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              minWidth: 0,
            }}
          >
            {/* Filename + size + delete */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    color: "#08364b",
                    fontSize: "16px",
                    fontWeight: 300,
                    fontFamily: "'Halyard Display', sans-serif",
                    lineHeight: 1.5,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {truncateFilename(uploadedFile.file.name)}
                </span>
                <span
                  style={{
                    color: "#08364b",
                    fontSize: "16px",
                    fontWeight: 300,
                    fontFamily: "'Halyard Display', sans-serif",
                    lineHeight: 1.5,
                    opacity: 0.5,
                    flex: 1,
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatFileSize(uploadedFile.file.size)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFile(uploadedFile.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "20px",
                  height: "20px",
                  flexShrink: 0,
                }}
                aria-label={`Remove ${uploadedFile.file.name}`}
              >
                <TrashIcon />
              </button>
            </div>

            {/* Progress bar */}
            {uploadedFile.progress < 100 && (
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "12px",
                    backgroundColor: "rgba(8, 54, 75, 0.1)",
                    borderRadius: "900px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${uploadedFile.progress}%`,
                      backgroundColor: "#08364b",
                      borderRadius: "900px",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
                <span
                  style={{
                    color: "#08364b",
                    fontSize: "14px",
                    fontWeight: 300,
                    fontFamily: "'Halyard Display', sans-serif",
                    lineHeight: 1.5,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {Math.round(uploadedFile.progress)}%
                </span>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Error message */}
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
