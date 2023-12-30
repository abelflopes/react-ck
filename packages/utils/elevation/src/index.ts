// Should be synced with ./styles/shared.scss

/** Map of elevation levels for different UI elements  */
export const elevationMap = {
  /** Base level elevation */
  root: 1,
  /** Elevation for sticky or navigation elements */
  sticky: 100,
  /** Elevation for floating non-blocking elements  */
  floating: 200,
  /** Elevation for blocking elements  */
  overlay: 300,
  /** Elevation for high relevance floating blocking elements  */
  popup: 400,
} as const;

/** Type representing possible elevation levels  */
export type Elevation = keyof typeof elevationMap;
