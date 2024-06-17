/**
 * NOTE: sorting affects router behavior
 * NOTE: do not use numeric keys to prevent JS auto sorting
 */

export const routesList = {
  root: "/",
  home: "/home",
  login: "/login",
  termsOfService: "/terms-of-service",
  privacyPolicy: "/privacy-policy",
  chat: "/chat",
  error: "*",
} as const;

export type RouteIndex = keyof typeof routesList;

export type AppRoute = (typeof routesList)[RouteIndex];
