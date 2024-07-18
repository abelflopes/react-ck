import { type Theme } from "../types";

// ColorPrimary: "#783192",
// colorSecondary: "#59BCC8",
// textColor: "#1E2232",

export const defaultTheme: Theme = {
  color: {
    "highlight-primary-light": "hsl(185deg 50% 95%)",
    "highlight-primary": "hsl(185deg 50% 55%)",
    "highlight-primary-dark": "hsl(185deg 50% 35%)",
    "highlight-alt": "#0052cc",
    "highlight-alt-dark": "#003e99",
    "neutral-light-1": "#fff",
    "neutral-light-1-5": "hsl(220deg 100% 20% / 5%)",
    "neutral-light-2": "hsl(220deg 100% 15% / 13%)",
    "neutral-light-3": "hsl(220deg 90% 16% / 26%)",
    "neutral-light-4": "hsl(220deg 80% 6% / 37%)",
    "neutral-dark-1": "hsl(230deg 5% 60%)",
    "neutral-dark-2": "hsl(230deg 5% 50%)",
    "neutral-dark-3": "hsl(230deg 5% 40%)",
    "neutral-dark-4": "hsl(230deg 15% 25%)",
    "neutral-dark-5": "hsl(230deg 25% 15%)",
    "status-positive-light": "#e2f2e3",
    "status-positive": "#5ab289",
    "status-positive-dark": "#276749",
    "status-average-light": "#feebc8",
    "status-average": "#e6c283",
    "status-average-dark": "#9b5c2c",
    "status-negative-light": "#fed7d7",
    "status-negative": "#ed6d6d",
    "status-negative-dark": "#9b2c2c",
    "overlay-light": "rgba(255,255,255, .4)",
    "overlay-dark": "rgba(0,0,0,.2)",
  },
  font: {
    "family": "system-ui, sans-serif",
    "base-size": "14px",
  },
  spacing: {
    base: "10px",
    border: "1px",
  },
};
