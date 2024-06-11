/**
 * NOTE: sorting affects router behavior
 * NOTE: do not use numeric keys to prevent JS auto sorting
 */

export const routesList = {
  root: "/",
  home: "/home",
  error: "*",
} as const;

export type RouteIndex = keyof typeof routesList;

export type AppRoute = (typeof routesList)[RouteIndex];
