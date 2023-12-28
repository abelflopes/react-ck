import type { Theme } from "../types";

// ColorPrimary: "#783192",
// colorSecondary: "#59BCC8",
// textColor: "#1E2232",

export const defaultTheme: Theme = {
  color: {
    "highlight-primary-light": "hsl(185deg 50% 85%)",
    "highlight-primary": "hsl(185deg 50% 55%)",
    "highlight-primary-dark": "hsl(185deg 50% 35%)",
    "neutral-0": "#fff",
    "neutral-100": "#edf2f7",
    "neutral-200": "#DBDEEB",
    "neutral-300": "#a8aab5",
    "neutral-500": "#808080",
    "neutral-800": "#323646",
    "neutral-900": "#1E2232",
    "status-positive-light": "#e2f2e3",
    "status-positive": "#5ab289",
    "status-positive-dark": "#276749",
    "status-average-light": "#feebc8",
    "status-average": "#e6c283",
    "status-average-dark": "#9b5c2c",
    "status-negative-light": "#fed7d7",
    "status-negative": "#ed6d6d",
    "status-negative-dark": "#9b2c2c",
    "overlay-light": "rgba(255,255,255, .2)",
    "overlay-dark": "rgba(0,0,0,.2)",
  },
  font: {
    "family": "system-ui, sans-serif",
    "base-size": "14px",
  },
  spacing: {
    base: "10px",
    border: "2px",
  },
};
