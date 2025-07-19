import path from "node:path";
import bunyan from "bunyan";
import bformat from "bunyan-format";

// Config

export const destFolder = path.resolve(__dirname, "../src/icons/");

// Util

export const logger = bunyan.createLogger({
  name: "Icons prebuild",
  level: "debug",
  stream: bformat({ outputMode: "short" }),
});
