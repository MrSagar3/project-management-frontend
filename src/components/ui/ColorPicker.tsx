import { useState, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";

import { ColorInput } from "./ColorInput";

import { ColorPickerProps } from "@/types/components";

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement | null>(null);

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center gap-2 w-full">
      <div
        className="w-[40px] h-[40px] rounded cursor-pointer flex-shrink-0"
        style={{
          backgroundColor: color,
          border: "1px solid #ccc",
        }}
        onClick={toggleColorPicker}></div>

      <ColorInput
        id="color"
        name="color"
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter color"
        className="flex-grow border rounded h-[40px] px-2 bg-white"
      />

      {showColorPicker && (
        <div
          ref={colorPickerRef}
          className="absolute z-10 p-2 bg-white border shadow"
          style={{ top: "100%", left: 0, marginTop: "8px" }}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
