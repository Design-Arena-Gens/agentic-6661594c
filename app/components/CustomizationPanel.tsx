"use client";

import { ClockConfig } from "../page";

interface CustomizationPanelProps {
  config: ClockConfig;
  updateConfig: (updates: Partial<ClockConfig>) => void;
  resetConfig: () => void;
  onClose: () => void;
}

export default function CustomizationPanel({
  config,
  updateConfig,
  resetConfig,
  onClose,
}: CustomizationPanelProps) {
  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );

  const Slider = ({
    label,
    value,
    min,
    max,
    step = 1,
    onChange,
  }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
  }) => (
    <div>
      <label className="text-xs text-gray-300 block mb-1">
        {label}: {value}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
      />
    </div>
  );

  const ColorPicker = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  }) => (
    <div>
      <label className="text-xs text-gray-300 block mb-1">{label}</label>
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded cursor-pointer border-2 border-gray-600"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm"
        />
      </div>
    </div>
  );

  const Toggle = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-gray-300">{label}</span>
      <div
        onClick={() => onChange(!value)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          value ? "bg-green-500" : "bg-gray-600"
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
            value ? "translate-x-6" : ""
          }`}
        />
      </div>
    </label>
  );

  const Select = ({
    label,
    value,
    options,
    onChange,
  }: {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
  }) => (
    <div>
      <label className="text-xs text-gray-300 block mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="w-96 bg-gray-900 border-l border-gray-800 overflow-y-auto">
      <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center z-10">
        <h2 className="text-lg font-bold">Customize Clock</h2>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
        >
          ✕
        </button>
      </div>

      <div className="p-4">
        <Section title="Time Format">
          <Select
            label="Format"
            value={config.timeFormat}
            options={[
              { value: "12", label: "12 Hour" },
              { value: "24", label: "24 Hour" },
            ]}
            onChange={(value) => updateConfig({ timeFormat: value as "12" | "24" })}
          />
          <Toggle
            label="Show Seconds"
            value={config.showSeconds}
            onChange={(value) => updateConfig({ showSeconds: value })}
          />
          {config.timeFormat === "12" && (
            <Toggle
              label="Show AM/PM"
              value={config.showAmPm}
              onChange={(value) => updateConfig({ showAmPm: value })}
            />
          )}
          <Select
            label="Separator Style"
            value={config.separatorStyle}
            options={[
              { value: "colon", label: "Colon (:)" },
              { value: "dot", label: "Dot (·)" },
              { value: "space", label: "Space" },
              { value: "none", label: "None" },
            ]}
            onChange={(value) =>
              updateConfig({
                separatorStyle: value as "colon" | "dot" | "space" | "none",
              })
            }
          />
        </Section>

        <Section title="Date Format">
          <Toggle
            label="Show Date"
            value={config.showDate}
            onChange={(value) => updateConfig({ showDate: value })}
          />
          {config.showDate && (
            <>
              <Toggle
                label="Show Day"
                value={config.showDay}
                onChange={(value) => updateConfig({ showDay: value })}
              />
              <Select
                label="Date Style"
                value={config.dateFormat}
                options={[
                  { value: "long", label: "Long (January 1, 2024)" },
                  { value: "short", label: "Short (Jan 1)" },
                  { value: "numeric", label: "Numeric (01/01/2024)" },
                ]}
                onChange={(value) =>
                  updateConfig({ dateFormat: value as "short" | "long" | "numeric" })
                }
              />
            </>
          )}
        </Section>

        <Section title="Style">
          <Select
            label="Clock Style"
            value={config.clockStyle}
            options={[
              { value: "minimal", label: "Minimal" },
              { value: "bold", label: "Bold" },
              { value: "outlined", label: "Outlined" },
              { value: "neon", label: "Neon" },
              { value: "gradient", label: "Gradient" },
            ]}
            onChange={(value) =>
              updateConfig({
                clockStyle: value as
                  | "minimal"
                  | "bold"
                  | "outlined"
                  | "neon"
                  | "gradient",
              })
            }
          />
          <Slider
            label="Font Size"
            value={config.fontSize}
            min={24}
            max={200}
            onChange={(value) => updateConfig({ fontSize: value })}
          />
          <Slider
            label="Font Weight"
            value={config.fontWeight}
            min={100}
            max={900}
            step={100}
            onChange={(value) => updateConfig({ fontWeight: value })}
          />
        </Section>

        <Section title="Colors">
          <ColorPicker
            label="Time Color"
            value={config.timeColor}
            onChange={(value) => updateConfig({ timeColor: value })}
          />
          <ColorPicker
            label="Date Color"
            value={config.dateColor}
            onChange={(value) => updateConfig({ dateColor: value })}
          />
          <ColorPicker
            label="Background Color"
            value={config.backgroundColor}
            onChange={(value) => updateConfig({ backgroundColor: value })}
          />
          <ColorPicker
            label="Accent Color"
            value={config.accentColor}
            onChange={(value) => updateConfig({ accentColor: value })}
          />
        </Section>

        <Section title="Effects">
          <Toggle
            label="Glow Effect"
            value={config.glowEffect}
            onChange={(value) => updateConfig({ glowEffect: value })}
          />
          {config.glowEffect && (
            <Slider
              label="Glow Intensity"
              value={config.glowIntensity}
              min={5}
              max={50}
              onChange={(value) => updateConfig({ glowIntensity: value })}
            />
          )}
          <Toggle
            label="Shadow Effect"
            value={config.shadowEffect}
            onChange={(value) => updateConfig({ shadowEffect: value })}
          />
          <Toggle
            label="Blur Background"
            value={config.blurBackground}
            onChange={(value) => updateConfig({ blurBackground: value })}
          />
        </Section>

        <Section title="Animation">
          <Toggle
            label="Animate Transitions"
            value={config.animateTransition}
            onChange={(value) => updateConfig({ animateTransition: value })}
          />
          {config.animateTransition && (
            <Slider
              label="Animation Speed (ms)"
              value={config.animationSpeed}
              min={100}
              max={1000}
              step={50}
              onChange={(value) => updateConfig({ animationSpeed: value })}
            />
          )}
        </Section>

        <Section title="Layout">
          <Select
            label="Horizontal Alignment"
            value={config.alignment}
            options={[
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ]}
            onChange={(value) =>
              updateConfig({ alignment: value as "left" | "center" | "right" })
            }
          />
          <Select
            label="Vertical Alignment"
            value={config.verticalAlignment}
            options={[
              { value: "top", label: "Top" },
              { value: "middle", label: "Middle" },
              { value: "bottom", label: "Bottom" },
            ]}
            onChange={(value) =>
              updateConfig({ verticalAlignment: value as "top" | "middle" | "bottom" })
            }
          />
          <Slider
            label="Spacing"
            value={config.spacing}
            min={0}
            max={50}
            onChange={(value) => updateConfig({ spacing: value })}
          />
          <Slider
            label="Opacity"
            value={config.opacity}
            min={10}
            max={100}
            onChange={(value) => updateConfig({ opacity: value })}
          />
        </Section>

        <Section title="Advanced">
          <div>
            <label className="text-xs text-gray-300 block mb-1">Custom Font</label>
            <input
              type="text"
              value={config.customFont}
              onChange={(e) => updateConfig({ customFont: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm"
              placeholder="e.g., Arial, Helvetica"
            />
          </div>
        </Section>

        <div className="mt-8 space-y-2">
          <button
            onClick={resetConfig}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
          >
            Reset to Default
          </button>
          <button
            onClick={() => {
              const dataStr = JSON.stringify(config, null, 2);
              const dataUri =
                "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
              const exportFileDefaultName = "clock-config.json";
              const linkElement = document.createElement("a");
              linkElement.setAttribute("href", dataUri);
              linkElement.setAttribute("download", exportFileDefaultName);
              linkElement.click();
            }}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            Export Config
          </button>
        </div>
      </div>
    </div>
  );
}
