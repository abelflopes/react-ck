// This file is executed by jest on initialization
// Included through ./config.ts
// https://stackoverflow.com/questions/68468203/why-am-i-getting-textencoder-is-not-defined-in-jest

import { TextEncoder, TextDecoder } from "node:util";

Object.assign(globalThis, { TextDecoder, TextEncoder });

Object.defineProperty(globalThis, "ResizeObserver", {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

// Mock checkVisibility method for HTMLElement
if (typeof HTMLElement !== "undefined") {
  Object.defineProperty(HTMLElement.prototype, "checkVisibility", {
    writable: true,
    value: jest.fn().mockReturnValue(true),
  });
}
