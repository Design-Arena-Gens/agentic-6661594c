"use client";

import { useState, useEffect } from "react";
import ClockWidget from "./components/ClockWidget";
import CustomizationPanel from "./components/CustomizationPanel";

export interface ClockConfig {
  // Time format
  timeFormat: "12" | "24";
  showSeconds: boolean;

  // Date format
  dateFormat: "short" | "long" | "numeric";
  showDate: boolean;
  showDay: boolean;

  // Style
  clockStyle: "minimal" | "bold" | "outlined" | "neon" | "gradient";
  fontSize: number;
  fontWeight: number;

  // Colors
  timeColor: string;
  dateColor: string;
  backgroundColor: string;
  accentColor: string;

  // Effects
  glowEffect: boolean;
  glowIntensity: number;
  shadowEffect: boolean;
  blurBackground: boolean;

  // Animation
  animateTransition: boolean;
  animationSpeed: number;

  // Layout
  alignment: "left" | "center" | "right";
  verticalAlignment: "top" | "middle" | "bottom";
  spacing: number;

  // Advanced
  customFont: string;
  borderRadius: number;
  opacity: number;
  showAmPm: boolean;
  separatorStyle: "colon" | "dot" | "space" | "none";
}

export default function Home() {
  const [config, setConfig] = useState<ClockConfig>({
    timeFormat: "24",
    showSeconds: true,
    dateFormat: "long",
    showDate: true,
    showDay: true,
    clockStyle: "bold",
    fontSize: 96,
    fontWeight: 700,
    timeColor: "#ffffff",
    dateColor: "#888888",
    backgroundColor: "#000000",
    accentColor: "#00ff00",
    glowEffect: true,
    glowIntensity: 20,
    shadowEffect: true,
    blurBackground: false,
    animateTransition: true,
    animationSpeed: 300,
    alignment: "center",
    verticalAlignment: "middle",
    spacing: 16,
    customFont: "system-ui",
    borderRadius: 24,
    opacity: 100,
    showAmPm: true,
    separatorStyle: "colon",
  });

  const [showPanel, setShowPanel] = useState(true);

  // Load saved config from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("clockConfig");
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load config:", e);
      }
    }
  }, []);

  // Save config to localStorage
  useEffect(() => {
    localStorage.setItem("clockConfig", JSON.stringify(config));
  }, [config]);

  const updateConfig = (updates: Partial<ClockConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const resetConfig = () => {
    const defaultConfig: ClockConfig = {
      timeFormat: "24",
      showSeconds: true,
      dateFormat: "long",
      showDate: true,
      showDay: true,
      clockStyle: "bold",
      fontSize: 96,
      fontWeight: 700,
      timeColor: "#ffffff",
      dateColor: "#888888",
      backgroundColor: "#000000",
      accentColor: "#00ff00",
      glowEffect: true,
      glowIntensity: 20,
      shadowEffect: true,
      blurBackground: false,
      animateTransition: true,
      animationSpeed: 300,
      alignment: "center",
      verticalAlignment: "middle",
      spacing: 16,
      customFont: "system-ui",
      borderRadius: 24,
      opacity: 100,
      showAmPm: true,
      separatorStyle: "colon",
    };
    setConfig(defaultConfig);
  };

  return (
    <div className="min-h-screen flex">
      <ClockWidget config={config} />

      {showPanel && (
        <CustomizationPanel
          config={config}
          updateConfig={updateConfig}
          resetConfig={resetConfig}
          onClose={() => setShowPanel(false)}
        />
      )}

      {!showPanel && (
        <button
          onClick={() => setShowPanel(true)}
          className="fixed top-4 right-4 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all"
        >
          ⚙️ Customize
        </button>
      )}
    </div>
  );
}
