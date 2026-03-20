import * as React from "react";
import { Calendar, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

export interface DatePickerProps {
  label?: string;
  value?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function formatDate(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstWeekday(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function DatePicker({
  label,
  value,
  disabled = false,
  error,
  onChange,
}: DatePickerProps) {
  const today = new Date();

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    value ? new Date(value) : null
  );
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [hoveredDay, setHoveredDay] = React.useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = React.useState(
    selectedDate ? selectedDate.getMonth() : today.getMonth()
  );
  const [currentYear, setCurrentYear] = React.useState(
    selectedDate ? selectedDate.getFullYear() : today.getFullYear()
  );

  const containerRef = React.useRef<HTMLDivElement>(null);
  const hasError = Boolean(error);

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const triggerBorderColor = hasError
    ? "#ee4646"
    : open
    ? "#08364b"
    : hovered
    ? "rgba(8,54,75,0.3)"
    : "transparent";

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstWeekday = getFirstWeekday(currentYear, currentMonth);
  const daysInPrevMonth = getDaysInMonth(
    currentMonth === 0 ? currentYear - 1 : currentYear,
    currentMonth === 0 ? 11 : currentMonth - 1
  );

  const cells: { day: number; type: "prev" | "current" | "next" }[] = [];

  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, type: "prev" });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, type: "current" });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, type: "next" });
  }

  function handlePrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }

  function handleNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }

  function handleSelectDay(day: number) {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(date);
    setOpen(false);
    onChange?.(formatDate(date));
  }

  function isToday(day: number) {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  }

  function isSelected(day: number) {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  }

  function getDayBg(day: number, type: string) {
    if (type !== "current") return "transparent";
    if (isSelected(day)) return "#08364b";
    if (hoveredDay === day) return "rgba(8,54,75,0.08)";
    if (isToday(day)) return "rgba(255,255,255,0.8)";
    return "transparent";
  }

  function getDayColor(day: number, type: string) {
    if (type !== "current") return "#7f908b";
    if (isSelected(day)) return "#ffffff";
    return "#08364b";
  }

  const weeks: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

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
        </label>
      )}

      <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((o) => !o)}
          onMouseEnter={() => !disabled && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-haspopup="dialog"
          aria-expanded={open}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%",
            height: "62px",
            padding: "0 20px",
            backgroundColor: "#f5ebcb",
            borderRadius: "4px",
            border: `2px solid ${triggerBorderColor}`,
            boxSizing: "border-box",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
            transition: "border-color 0.15s ease",
            textAlign: "left",
          }}
        >
          <Calendar size={22} color="#08364b" style={{ flexShrink: 0 }} />
          <span
            style={{
              color: "#08364b",
              fontSize: "18px",
              fontFamily: "'Halyard Display', sans-serif",
              fontWeight: 400,
              opacity: selectedDate ? 1 : 0.5,
            }}
          >
            {selectedDate ? formatDate(selectedDate) : "Pick a date"}
          </span>
        </button>

        {open && (
          <div
            role="dialog"
            aria-label="Date picker calendar"
            style={{
              position: "absolute",
              top: "calc(100% + 0.5rem)",
              left: 0,
              zIndex: 100,
              backgroundColor: "#f5ebcb",
              borderRadius: "6px",
              border: "1px solid rgba(0,0,0,0.1)",
              padding: "12px",
              width: "276px",
              boxShadow: "0 4px 16px rgba(8,54,75,0.12)",
              boxSizing: "border-box",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <button
                type="button"
                onClick={handlePrevMonth}
                style={{
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "6px",
                  border: "1px solid rgba(24,24,27,0.1)",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <ChevronLeft size={16} color="#08364b" />
              </button>

              <span
                style={{
                  color: "#08364b",
                  fontSize: "16px",
                  fontWeight: 700,
                  fontFamily: "'Halyard Display', sans-serif",
                }}
              >
                {MONTH_NAMES[currentMonth]} {currentYear}
              </span>

              <button
                type="button"
                onClick={handleNextMonth}
                style={{
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "6px",
                  border: "1px solid rgba(24,24,27,0.1)",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <ChevronRight size={16} color="#08364b" />
              </button>
            </div>

            {/* Day headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 36px)",
                marginBottom: "4px",
                justifyContent: "center",
              }}
            >
              {DAY_HEADERS.map((d) => (
                <div
                  key={d}
                  style={{
                    width: "36px",
                    textAlign: "center",
                    color: "rgba(8,54,75,0.5)",
                    fontSize: "14px",
                    fontFamily: "'Halyard Display', sans-serif",
                    paddingBottom: "4px",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              {weeks.map((week, wi) => (
                <div
                  key={wi}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 36px)",
                    justifyContent: "center",
                    gap: "2px 0",
                  }}
                >
                  {week.map(({ day, type }, di) => (
                    <button
                      key={`${type}-${day}-${di}`}
                      type="button"
                      onClick={() => type === "current" && handleSelectDay(day)}
                      onMouseEnter={() =>
                        type === "current" && setHoveredDay(day)
                      }
                      onMouseLeave={() => setHoveredDay(null)}
                      style={{
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "6px",
                        border: "none",
                        backgroundColor: getDayBg(day, type),
                        color: getDayColor(day, type),
                        fontSize: "14px",
                        fontFamily: "'Halyard Display', sans-serif",
                        cursor: type === "current" ? "pointer" : "default",
                        padding: 0,
                        transition: "background-color 0.1s ease",
                      }}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
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
