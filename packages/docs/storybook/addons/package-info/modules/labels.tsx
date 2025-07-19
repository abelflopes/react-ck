import React, { useEffect, useMemo } from "react";
import { addons, types, useAddonState } from "storybook/manager-api";
import { CONFIG, type PackageInfoState } from "../util";

export const registerLabelsAddon = (): void => {
  const labelAddons: Array<keyof typeof CONFIG.labelAddons> = ["version"] satisfies Array<
    keyof PackageInfoState
  >;

  for (const entry of labelAddons) {
    const addonType = types.TOOL;
    const addonInfo = CONFIG.labelAddons[entry];

    /* eslint-disable react-hooks/rules-of-hooks -- lint not able to detect that output is a react component */
    addons.add(addonInfo.id, {
      title: addonInfo.title,
      type: addonType,
      render: () => {
        const [addonState] = useAddonState<PackageInfoState | undefined>(CONFIG.id);
        const data = useMemo(() => addonState?.[entry], [addonState]);

        return data ? (
          <b
            style={{
              margin: "0",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 6px",
              fontSize: "13px",
              top: "-0.5px",
              position: "relative",

              color: "#000",
            }}>
            {data}
          </b>
        ) : null;
      },
    });
    /* eslint-enable */
  }
};
