// TODO: add annotations
// should be synced with ./styles/shared.scss
export const elevationMap = {
  // Base level
  root: 1,
  // Sticky / navigation elements
  sticky: 100,
  // Floating non-blocking elements
  floating: 200,
  // Blocking elements
  overlay: 300,
  // High relevance floating blocking elements
  popup: 400,
} as const;

export type Elevation = keyof typeof elevationMap;
