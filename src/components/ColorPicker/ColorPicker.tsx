import * as React from "react";

export interface ColorPickerProps {
  label?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

function isValidHex(hex: string): boolean {
  return /^[0-9A-Fa-f]{6}$/.test(hex);
}

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100;
  const ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function hueToHex(hue: number): string {
  return hslToHex(hue, 100, 50);
}

export function ColorPicker({
  label,
  value = "#FF0000",
  disabled = false,
  onChange,
}: ColorPickerProps) {
  const initialHex = value.replace("#", "");
  const [hex, setHex] = React.useState(
    isValidHex(initialHex) ? initialHex.toUpperCase() : "FF0000"
  );
  const [inputValue, setInputValue] = React.useState(hex);
  const [isDraggingSv, setIsDraggingSv] = React.useState(false);
  const [isDraggingHue, setIsDraggingHue] = React.useState(false);

  const [hue, sat, lgt] = hexToHsl(hex);
  const [svHue, setSvHue] = React.useState(hue);

  // Saturation = x axis (0-100), Value/Brightness = y axis (0-100, top=100)
  // Convert HSL to SV coords (approximate)
  const lightnessToSV = (
    h: number,
    s: number,
    l: number
  ): [number, number] => {
    // Convert HSL to HSV
    const v = l + (s / 100) * Math.min(l, 100 - l);
    const sv = v === 0 ? 0 : (2 * (1 - l / v)) * 100;
    return [Math.round(sv), Math.round(v)];
  };

  const [svCoords, setSvCoords] = React.useState<[number, number]>(() =>
    lightnessToSV(hue, sat, lgt)
  );

  const svCanvasRef = React.useRef<HTMLDivElement>(null);
  const hueCanvasRef = React.useRef<HTMLDivElement>(null);

  function svToHex(h: number, s: number, v: number): string {
    // HSV to HSL
    const l = (v * (2 - s / 100)) / 2;
    const sl =
      v === 0 || (l === 0 || l === 100)
        ? 0
        : ((v - l) / Math.min(l, 100 - l)) * 100;
    return hslToHex(h, Math.round(sl), Math.round(l));
  }

  function updateFromSvCanvas(e: { clientX: number; clientY: number }) {
    if (!svCanvasRef.current) return;
    const rect = svCanvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const s = Math.round(x * 100);
    const v = Math.round((1 - y) * 100);
    setSvCoords([s, v]);
    const newHex = svToHex(svHue, s, v);
    setHex(newHex);
    setInputValue(newHex);
    onChange?.(`#${newHex}`);
  }

  function updateFromHueBar(e: { clientX: number }) {
    if (!hueCanvasRef.current) return;
    const rect = hueCanvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newHue = Math.round(x * 360);
    setSvHue(newHue);
    const [s, v] = svCoords;
    const newHex = svToHex(newHue, s, v);
    setHex(newHex);
    setInputValue(newHex);
    onChange?.(`#${newHex}`);
  }

  React.useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (isDraggingSv) updateFromSvCanvas(e);
      if (isDraggingHue) updateFromHueBar(e);
    }
    function onMouseUp() {
      setIsDraggingSv(false);
      setIsDraggingHue(false);
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDraggingSv, isDraggingHue, svHue, svCoords]);

  function handleHexInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.toUpperCase().replace(/[^0-9A-F]/g, "");
    setInputValue(val);
    if (isValidHex(val)) {
      setHex(val);
      const [h, s, l] = hexToHsl(val);
      setSvHue(h);
      setSvCoords(lightnessToSV(h, s, l));
      onChange?.(`#${val}`);
    }
  }

  function handleHexBlur() {
    if (!isValidHex(inputValue)) {
      setInputValue(hex);
    }
  }

  const huePercent = (svHue / 360) * 100;
  const [svS, svV] = svCoords;

  const [focusedHex, setFocusedHex] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
        fontFamily: "'Halyard Display', sans-serif",
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? "none" : "auto",
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

      {/* Color preview strip */}
      <div
        style={{
          height: "32px",
          width: "100%",
          borderRadius: "4px",
          backgroundColor: `#${hex}`,
          flexShrink: 0,
        }}
      />

      {/* SV gradient canvas */}
      <div
        ref={svCanvasRef}
        onMouseDown={(e) => {
          setIsDraggingSv(true);
          updateFromSvCanvas(e);
        }}
        style={{
          position: "relative",
          width: "200px",
          height: "200px",
          borderRadius: "4px",
          overflow: "hidden",
          cursor: "crosshair",
          flexShrink: 0,
          background: `
            linear-gradient(to bottom, transparent, #000),
            linear-gradient(to right, #fff, ${hueToHex(svHue)})
          `,
          userSelect: "none",
        }}
      >
        {/* Crosshair */}
        <div
          style={{
            position: "absolute",
            left: `${svS}%`,
            top: `${100 - svV}%`,
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            border: "2px solid white",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.4)",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Hue bar */}
      <div
        ref={hueCanvasRef}
        onMouseDown={(e) => {
          setIsDraggingHue(true);
          updateFromHueBar(e);
        }}
        style={{
          position: "relative",
          width: "200px",
          height: "16px",
          borderRadius: "8px",
          background:
            "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
          cursor: "pointer",
          userSelect: "none",
          flexShrink: 0,
        }}
      >
        {/* Hue thumb */}
        <div
          style={{
            position: "absolute",
            left: `${huePercent}%`,
            top: "50%",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            border: "2px solid white",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
            transform: "translate(-50%, -50%)",
            backgroundColor: `#${hueToHex(svHue)}`,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Hex input */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f5ebcb",
          height: "40px",
          borderRadius: "4px",
          border: `2px solid ${focusedHex ? "#08364b" : "transparent"}`,
          paddingLeft: "12px",
          paddingRight: "12px",
          boxSizing: "border-box",
          width: "200px",
          gap: "2px",
          transition: "border-color 0.15s ease",
        }}
      >
        <span
          style={{
            color: "#08364b",
            fontSize: "18px",
            fontFamily: "'Halyard Display', sans-serif",
            userSelect: "none",
          }}
        >
          #
        </span>
        <input
          type="text"
          maxLength={6}
          value={inputValue}
          onChange={handleHexInput}
          onBlur={handleHexBlur}
          onFocus={() => setFocusedHex(true)}
          onBlurCapture={() => setFocusedHex(false)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            color: "#08364b",
            fontSize: "18px",
            fontFamily: "'Halyard Display', sans-serif",
            fontWeight: 400,
            padding: 0,
            width: "100%",
          }}
        />
      </div>
    </div>
  );
}
