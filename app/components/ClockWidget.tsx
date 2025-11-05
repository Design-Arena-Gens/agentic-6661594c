"use client";

import { useState, useEffect } from "react";
import { ClockConfig } from "../page";

interface ClockWidgetProps {
  config: ClockConfig;
}

export default function ClockWidget({ config }: ClockWidgetProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    let ampm = "";

    if (config.timeFormat === "12") {
      ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
    }

    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    const s = String(seconds).padStart(2, "0");

    let separator = "";
    switch (config.separatorStyle) {
      case "colon":
        separator = ":";
        break;
      case "dot":
        separator = "·";
        break;
      case "space":
        separator = " ";
        break;
      case "none":
        separator = "";
        break;
    }

    let timeStr = `${h}${separator}${m}`;
    if (config.showSeconds) {
      timeStr += `${separator}${s}`;
    }

    if (config.timeFormat === "12" && config.showAmPm) {
      timeStr += ` ${ampm}`;
    }

    return timeStr;
  };

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {};

    if (config.dateFormat === "long") {
      options.month = "long";
      options.day = "numeric";
      options.year = "numeric";
    } else if (config.dateFormat === "short") {
      options.month = "short";
      options.day = "numeric";
    } else {
      options.month = "2-digit";
      options.day = "2-digit";
      options.year = "numeric";
    }

    let dateStr = time.toLocaleDateString("en-US", options);

    if (config.showDay) {
      const day = time.toLocaleDateString("en-US", { weekday: "long" });
      dateStr = `${day}, ${dateStr}`;
    }

    return dateStr;
  };

  const getClockStyle = () => {
    let style: React.CSSProperties = {
      fontSize: `${config.fontSize}px`,
      fontWeight: config.fontWeight,
      color: config.timeColor,
      fontFamily: config.customFont,
      transition: config.animateTransition
        ? `all ${config.animationSpeed}ms ease-in-out`
        : "none",
    };

    if (config.glowEffect) {
      style.textShadow = `0 0 ${config.glowIntensity}px ${config.accentColor}, 0 0 ${config.glowIntensity * 2}px ${config.accentColor}`;
    }

    if (config.shadowEffect) {
      style.textShadow = `${style.textShadow || ""} 4px 4px 8px rgba(0,0,0,0.5)`;
    }

    if (config.clockStyle === "outlined") {
      style.WebkitTextStroke = `2px ${config.accentColor}`;
      style.color = "transparent";
    }

    if (config.clockStyle === "neon") {
      style.color = config.accentColor;
      style.textShadow = `0 0 10px ${config.accentColor}, 0 0 20px ${config.accentColor}, 0 0 30px ${config.accentColor}, 0 0 40px ${config.accentColor}`;
    }

    if (config.clockStyle === "gradient") {
      style.background = `linear-gradient(135deg, ${config.timeColor}, ${config.accentColor})`;
      style.WebkitBackgroundClip = "text";
      style.backgroundClip = "text";
      style.WebkitTextFillColor = "transparent";
    }

    return style;
  };

  const getContainerStyle = (): React.CSSProperties => {
    return {
      backgroundColor: config.backgroundColor,
      opacity: config.opacity / 100,
      backdropFilter: config.blurBackground ? "blur(10px)" : "none",
      alignItems:
        config.verticalAlignment === "top"
          ? "flex-start"
          : config.verticalAlignment === "bottom"
          ? "flex-end"
          : "center",
      justifyContent:
        config.alignment === "left"
          ? "flex-start"
          : config.alignment === "right"
          ? "flex-end"
          : "center",
      padding: `${config.spacing * 2}px`,
    };
  };

  const getTextAlignment = () => {
    if (config.alignment === "left") return "text-left";
    if (config.alignment === "right") return "text-right";
    return "text-center";
  };

  return (
    <div
      className="flex-1 flex flex-col"
      style={getContainerStyle()}
    >
      <div
        className={`flex flex-col ${getTextAlignment()}`}
        style={{ gap: `${config.spacing}px` }}
      >
        <div style={getClockStyle()}>{formatTime()}</div>

        {config.showDate && (
          <div
            style={{
              fontSize: `${config.fontSize / 4}px`,
              color: config.dateColor,
              fontWeight: config.fontWeight - 200,
              fontFamily: config.customFont,
              transition: config.animateTransition
                ? `all ${config.animationSpeed}ms ease-in-out`
                : "none",
            }}
          >
            {formatDate()}
          </div>
        )}
      </div>
    </div>
  );
}
