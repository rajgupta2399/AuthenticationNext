"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/src/context/ThemeContext";
import ColorPicker from "./ColorPicker";

export default function ThemeCustomizationPage() {
  const { colors, updateColors, refreshTheme, isLoading } = useTheme();
  console.log("all colors", colors);
  const [userRole, setUserRole] = useState("superAdmin");
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#B04B34",
    secondaryColor: "#8b5cf6",
    tertiaryColor: "#10b981",
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync local state with context
  useEffect(() => {
    if (colors && Object.keys(colors).length > 0) {
      setThemeSettings(colors);
    }
  }, [colors]);

  const colorVariables = [
    {
      name: "For AppHeader",
      key: "secondaryColor",
    },
    {
      name: "For Buttons, Active Links, Top Loader.",
      key: "primaryColor",
    },

    {
      name: "For Menu and SubMenu",
      key: "tertiaryColor",
    },
  ];

  const handleColorChange = (key, value) => {
    // Ensure value is in proper hex format (with #)
    const hexValue = value.startsWith("#") ? value : `#${value}`;
    const newSettings = { ...themeSettings, [key]: hexValue };
    setThemeSettings(newSettings);
  };

  const saveTheme = async () => {
    try {
      setIsUpdating(true);
      await updateColors(themeSettings);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save theme:", error);
      alert("Failed to save theme changes. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const resetTheme = async () => {
    const defaultSettings = {
      primaryColor: colors.primaryColor,
      tertiaryColor: colors.tertiaryColor,
      secondaryColor: colors.secondaryColor,
    };

    setThemeSettings(defaultSettings);

    try {
      setIsUpdating(true);
      await updateColors(defaultSettings);
    } catch (error) {
      console.error("Failed to reset theme:", error);
      alert("Failed to reset theme. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Update the ColorPickerCard component to accept props
  const ColorPickerCard = ({ color, themeSettings, onColorChange }) => (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">
            {color.name}
          </label>
          {color.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {color.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            {themeSettings[color.key]}
          </span>
          <div
            className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600"
            style={{ backgroundColor: themeSettings[color.key] }}
          ></div>
        </div>
      </div>

      <div className="flex justify-center">
        <ColorPicker
          default_value={themeSettings[color.key]}
          onChange={(hexValue) => onColorChange(color.key, hexValue)}
        />
      </div>

      <div className="mt-2">
        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
          Hex Code:
        </label>
        <input
          type="text"
          value={themeSettings[color.key].replace("#", "")}
          onChange={(e) => onColorChange(color.key, e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Enter hex code"
          maxLength={6}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 ">
      <div className=" mx-auto">
        <div className="mb-8">
          <h1 className="text-md md:text-md font-bold text-gray-800 dark:text-white mb-2">
            Theme Customization
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Customize your application's color scheme. Changes are saved and
            applied globally to all users.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center mt-4">
            <div className="w-full p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-gray-100 dark:bg-gray-800 p-6 space-y-4 animate-pulse"
                  >
                    <div className="h-4 w-1/2 rounded-md bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-3 w-2/3 rounded-md bg-gray-200 dark:bg-gray-600"></div>
                    <div className="h-48 w-full rounded-md bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-6 w-1/2 rounded-md bg-gray-200 dark:bg-gray-600"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {colorVariables.map((color) => (
                <ColorPickerCard
                  key={color.key}
                  color={color}
                  themeSettings={themeSettings}
                  onColorChange={handleColorChange}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <button
                onClick={saveTheme}
                disabled={isUpdating}
                className="px-6 py-3 bg-[var(--primary-color)] hover:opacity-90 disabled:bg-gray-400 text-white rounded-lg font-medium transition-all flex items-center justify-center min-w-[140px]"
                style={{
                  backgroundColor: themeSettings.primaryColor,
                  opacity: isUpdating ? 0.7 : 1,
                }}
              >
                {isUpdating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  "Save Theme"
                )}
              </button>

              {/* Optional: Reset button using secondary color */}
              <button
                onClick={resetTheme}
                disabled={isUpdating}
                className="px-6 py-3 hover:opacity-90 disabled:bg-gray-400 text-white rounded-lg font-medium transition-all min-w-[140px]"
                style={{
                  backgroundColor: themeSettings.primaryColor,
                  opacity: isUpdating ? 0.7 : 1,
                }}
              >
                Reset to Default
              </button>

              {isSaved && (
                <div className="ml-auto flex items-center text-green-600 dark:text-green-400">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Theme saved successfully!
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
