import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { type RouteIndex, routesList } from "./routes-list";
import { viewsMap } from "./view-mapping";
import { ErrorBoundary } from "react-error-boundary";

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary fallbackRender={({ error }) => <div>Error: {error.message}</div>}>
        <Outlet />
      </ErrorBoundary>
    ),
    children: Object.keys(routesList).map((i) => ({
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- to match expected types
      path: routesList[i as RouteIndex] as unknown as string,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- to match expected types
      Component: viewsMap[i as RouteIndex],
    })),
  },
]);

/**
 * Main / global router component
 */

export const DefaultRouter = (): React.ReactElement => <RouterProvider router={router} />;
