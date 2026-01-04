"use client";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";

function clsx(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

const HashtagIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M11.097 1.515a.75.75 0 0 1 .589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 1 1 1.47.294L16.665 7.5h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.2 6h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103H3.75a.75.75 0 0 1 0-1.5h3.885l1.2-6H5.25a.75.75 0 0 1 0-1.5h3.885l1.08-5.397a.75.75 0 0 1 .882-.588ZM10.365 9l-1.2 6h4.47l1.2-6h-4.47Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

// Optimized HSL to Hex conversion
function hslToHex({ h, s, l }) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// Optimized Hex to HSL conversion
function hexToHsl(hex) {
  let r, g, b;

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16) / 255;
    g = parseInt(hex[1] + hex[1], 16) / 255;
    b = parseInt(hex[2] + hex[2], 16) / 255;
  } else {
    r = parseInt(hex.slice(0, 2), 16) / 255;
    g = parseInt(hex.slice(2, 4), 16) / 255;
    b = parseInt(hex.slice(4, 6), 16) / 255;
  }

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Memoized canvas component to prevent unnecessary re-renders
const DraggableColorCanvas = React.memo(({ h, s, l, onColorChange }) => {
  const [dragging, setDragging] = useState(false);
  const colorAreaRef = useRef(null);
  const animationRef = useRef(null);

  // Throttled color calculation
  const calculateSaturationAndLightness = useCallback(
    (clientX, clientY) => {
      if (!colorAreaRef.current) return;

      const rect = colorAreaRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));

      const newSaturation = Math.round((x / rect.width) * 100);
      const newLightness = 100 - Math.round((y / rect.height) * 100);

      onColorChange({ s: newSaturation, l: newLightness });
    },
    [onColorChange]
  );

  // RAF-based smooth dragging
  const handleMouseMove = useCallback(
    (e) => {
      if (!dragging) return;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      animationRef.current = requestAnimationFrame(() => {
        calculateSaturationAndLightness(e.clientX, e.clientY);
      });
    },
    [dragging, calculateSaturationAndLightness]
  );

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(true);
      calculateSaturationAndLightness(e.clientX, e.clientY);
    },
    [calculateSaturationAndLightness]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (!dragging) return;
      e.preventDefault();

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      animationRef.current = requestAnimationFrame(() => {
        const touch = e.touches[0];
        if (touch) {
          calculateSaturationAndLightness(touch.clientX, touch.clientY);
        }
      });
    },
    [dragging, calculateSaturationAndLightness]
  );

  const handleTouchStart = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(true);
      const touch = e.touches[0];
      if (touch) {
        calculateSaturationAndLightness(touch.clientX, touch.clientY);
      }
    },
    [calculateSaturationAndLightness]
  );

  const handleTouchEnd = useCallback(() => {
    setDragging(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    dragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  // Memoized gradient style to prevent unnecessary re-renders
  const canvasStyle = useMemo(
    () => ({
      background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${h}, 100%, 50%))`,
      position: "relative",
      cursor: dragging ? "grabbing" : "grab",
    }),
    [h, dragging]
  );

  const selectorStyle = useMemo(
    () => ({
      left: `${s}%`,
      top: `${100 - l}%`,
      transform: "translate(-50%, -50%)",
      backgroundColor: `hsl(${h}, ${s}%, ${l}%)`,
      pointerEvents: "none",
    }),
    [h, s, l]
  );

  return (
    <div
      ref={colorAreaRef}
      className="h-48 w-full touch-none overscroll-none rounded-xl border border-zinc-200 dark:border-zinc-700"
      style={canvasStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div
        className="absolute w-5 h-5 rounded-full border-2 border-white shadow-lg transition-transform duration-100"
        style={selectorStyle}
      />
    </div>
  );
});

DraggableColorCanvas.displayName = "DraggableColorCanvas";

function sanitizeHex(val) {
  return val.replace(/[^a-fA-F0-9]/g, "").toUpperCase();
}

const ColorPicker = React.memo(({ default_value = "#B04B34", onChange }) => {
  const [internalColor, setInternalColor] = useState(() => {
    const hex = sanitizeHex(default_value.replace("#", ""));
    const fullHex =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex;
    const hsl = hexToHsl(fullHex);
    return { ...hsl, hex: fullHex };
  });

  const lastExternalValueRef = useRef(default_value);
  const onChangeRef = useRef(onChange);
  const debounceRef = useRef(null);

  // Update ref when onChange changes
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Debounced onChange callback
  const debouncedOnChange = useCallback((hexValue) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (onChangeRef.current) {
        onChangeRef.current(hexValue);
      }
    }, 16); // ~60fps
  }, []);

  // Sync with external changes (debounced)
  useEffect(() => {
    if (default_value !== lastExternalValueRef.current) {
      const hex = sanitizeHex(default_value.replace("#", ""));
      const fullHex =
        hex.length === 3
          ? hex
              .split("")
              .map((c) => c + c)
              .join("")
          : hex;

      if (fullHex.length === 6) {
        const hsl = hexToHsl(fullHex);
        setInternalColor({ ...hsl, hex: fullHex });
        lastExternalValueRef.current = default_value;
      }
    }
  }, [default_value]);

  const handleColorUpdate = useCallback(
    (updates) => {
      setInternalColor((prev) => {
        const newColor = { ...prev, ...updates };
        const hex = hslToHex(newColor);
        const finalColor = { ...newColor, hex: hex.replace("#", "") };

        // Debounce the onChange call
        debouncedOnChange(finalColor.hex);

        return finalColor;
      });
    },
    [debouncedOnChange]
  );

  const handleHexInputChange = useCallback(
    (newVal) => {
      const hex = sanitizeHex(newVal);
      const fullHex =
        hex.length === 3
          ? hex
              .split("")
              .map((c) => c + c)
              .join("")
          : hex;

      if (fullHex.length === 6) {
        const hsl = hexToHsl(fullHex);
        const newColor = { ...hsl, hex: fullHex };
        setInternalColor(newColor);
        debouncedOnChange(fullHex);
      } else {
        setInternalColor((prev) => ({ ...prev, hex: hex }));
      }
    },
    [debouncedOnChange]
  );

  const handleHueChange = useCallback(
    (hue) => {
      handleColorUpdate({ h: hue });
    },
    [handleColorUpdate]
  );

  const handleCanvasChange = useCallback(
    (updates) => {
      handleColorUpdate(updates);
    },
    [handleColorUpdate]
  );

  // Memoized styles and values
  const hueSliderBackground = useMemo(
    () => ({
      background:
        "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
    }),
    []
  );

  const previewColor = useMemo(
    () => `#${internalColor.hex}`,
    [internalColor.hex]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .color-picker-range {
              -webkit-appearance: none;
              appearance: none;
              width: 100%;
              height: 12px;
              border-radius: 6px;
              background: transparent;
              cursor: pointer;
            }
            
            .color-picker-range::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              background: white;
              border: 2px solid #e4e4e7;
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 1px 3px rgba(0,0,0,0.3);
              transition: all 0.1s ease;
            }
            
            .color-picker-range::-moz-range-thumb {
              width: 20px;
              height: 20px;
              background: white;
              border: 2px solid #e4e4e7;
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 1px 3px rgba(0,0,0,0.3);
              transition: all 0.1s ease;
            }
            
            .dark .color-picker-range::-webkit-slider-thumb {
              border: 2px solid #3f3f46;
              background: #18181b;
            }
            
            .dark .color-picker-range::-moz-range-thumb {
              border: 2px solid #3f3f46;
              background: #18181b;
            }
            
            .color-picker-range::-webkit-slider-thumb:hover {
              transform: scale(1.1);
            }
            
            .color-picker-range::-moz-range-thumb:hover {
              transform: scale(1.1);
            }
          `,
        }}
      />

      <div className="w-full max-w-[380px] select-none flex flex-col items-center gap-4 overscroll-none rounded-2xl border border-zinc-200 bg-white p-4 shadow-md dark:border-zinc-700 dark:bg-zinc-900">
        <DraggableColorCanvas
          h={internalColor.h}
          s={internalColor.s}
          l={internalColor.l}
          onColorChange={handleCanvasChange}
        />

        <div className="w-full">
          <input
            type="range"
            min="0"
            max="360"
            value={internalColor.h}
            onChange={(e) => handleHueChange(Number(e.target.value))}
            className="color-picker-range"
            style={hueSliderBackground}
          />
        </div>

        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <HashtagIcon className="size-4 text-zinc-600 dark:text-zinc-400" />
          </div>
          <input
            value={internalColor.hex}
            onChange={(e) => handleHexInputChange(e.target.value)}
            className="w-full pl-10 pr-12 py-2 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
            placeholder="HEX"
            maxLength={6}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div
              className="w-6 h-6 rounded border border-zinc-200 dark:border-zinc-600 transition-colors duration-150"
              style={{ backgroundColor: previewColor }}
            />
          </div>
        </div>
      </div>
    </>
  );
});

ColorPicker.displayName = "ColorPicker";

export default ColorPicker;
