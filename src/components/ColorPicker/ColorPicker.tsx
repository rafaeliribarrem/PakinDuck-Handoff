import * as React from "react";
import {
  ColorPicker as AriaColorPicker,
  ColorArea as AriaColorArea,
  ColorThumb as AriaColorThumb,
  ColorSlider as AriaColorSlider,
  SliderTrack as AriaSliderTrack,
  ColorField as AriaColorField,
  Input,
  Label,
  parseColor,
  type Color,
} from "react-aria-components";

export interface ColorPickerProps {
  label?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export function ColorPicker({
  label,
  value = "#FF0000",
  disabled = false,
  onChange,
}: ColorPickerProps) {
  const [color, setColor] = React.useState<Color>(() => {
    try {
      return parseColor(value);
    } catch {
      return parseColor("#FF0000");
    }
  });

  const [hexInput, setHexInput] = React.useState(
    color.toString("hex").replace("#", "").toUpperCase()
  );
  const [focusedHex, setFocusedHex] = React.useState(false);

  function handleColorChange(newColor: Color) {
    setColor(newColor);
    setHexInput(newColor.toString("hex").replace("#", "").toUpperCase());
    onChange?.(newColor.toString("hex"));
  }

  function handleHexInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.toUpperCase().replace(/[^0-9A-F]/g, "");
    setHexInput(val);
    if (/^[0-9A-Fa-f]{6}$/.test(val)) {
      try {
        const parsed = parseColor(`#${val}`);
        setColor(parsed);
        onChange?.(`#${val}`);
      } catch {
        // invalid color
      }
    }
  }

  function handleHexBlur() {
    setFocusedHex(false);
    if (!/^[0-9A-Fa-f]{6}$/.test(hexInput)) {
      setHexInput(color.toString("hex").replace("#", "").toUpperCase());
    }
  }

  return (
    <AriaColorPicker value={color} onChange={handleColorChange}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
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

        {/* Color Area - SV gradient */}
        <AriaColorArea
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness"
          style={{
            width: "100%",
            aspectRatio: "1",
            borderRadius: "4px",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <AriaColorThumb
            style={({ color: thumbColor }) => ({
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: "2px solid white",
              boxShadow:
                "0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)",
              boxSizing: "border-box",
              background: thumbColor.toString("css"),
            })}
          />
        </AriaColorArea>

        {/* Hue Slider */}
        <AriaColorSlider
          colorSpace="hsb"
          channel="hue"
          style={{
            width: "100%",
            position: "relative",
          }}
        >
          <AriaSliderTrack
            style={{
              width: "100%",
              height: "16px",
              borderRadius: "8px",
              position: "relative",
            }}
          >
            <AriaColorThumb
              style={({ color: thumbColor }) => ({
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                border: "2px solid white",
                boxShadow:
                  "0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)",
                boxSizing: "border-box",
                top: "50%",
                background: thumbColor.toString("css"),
              })}
            />
          </AriaSliderTrack>
        </AriaColorSlider>

        {/* Hex Input */}
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
            width: "100%",
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
            value={hexInput}
            onChange={handleHexInput}
            onFocus={() => setFocusedHex(true)}
            onBlur={handleHexBlur}
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
    </AriaColorPicker>
  );
}
