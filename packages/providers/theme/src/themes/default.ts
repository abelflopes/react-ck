import type { Theme } from "../types";

// ColorPrimary: "#783192",
// colorSecondary: "#59BCC8",
// textColor: "#1E2232",

export const defaultTheme: Theme = {
  color: {
    "highlight-primary-light": "hsl(185deg 50% 85%)",
    "highlight-primary": "hsl(185deg 50% 55%)",
    "highlight-primary-dark": "hsl(185deg 50% 35%)",
    "highlight-alt": "#0052cc",
    "highlight-alt-dark": "#003e99",
    "neutral-0": "#fff",
    "neutral-100": "hsl(230deg 40% 95%)",
    "neutral-200": "hsl(230deg 30% 90%)",
    "neutral-300": "hsl(230deg 10% 80%)",
    "neutral-400": "hsl(230deg 5% 70%)",
    "neutral-500": "hsl(230deg 5% 60%)",
    "neutral-600": "hsl(230deg 5% 50%)",
    "neutral-700": "hsl(230deg 5% 40%)",
    "neutral-800": "hsl(230deg 15% 25%)",
    "neutral-900": "hsl(230deg 25% 15%)",
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
