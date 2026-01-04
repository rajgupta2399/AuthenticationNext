// components/ThemeAwareLoader.jsx
"use client";
import { useTheme } from "@/src/context/ThemeContext";
import NextTopLoader from "nextjs-toploader";

export default function ThemeAwareLoader() {
  const { colors } = useTheme();

  return (
    <NextTopLoader
      color={colors?.primaryColor || "#B04B34"}
      initialPosition={0.08}
      crawlSpeed={200}
      height={4}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={1000}
      shadow={`0 0 10px ${colors?.primaryColor || "#2299DD"}, 0 0 5px ${
        colors?.primaryColor || "#2299DD"
      }`}
      zIndex={1600}
      showAtBottom={false}
    />
  );
}
