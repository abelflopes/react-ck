/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo } from "react";
import { addons, types, useAddonState } from "@storybook/manager-api";
// https://storybook.js.org/docs/react/addons/addon-knowledge-base#storybook-components
import { Badge } from "@storybook/components";
import { CONFIG, type PackageInfoState, labelAddons } from "../util";

export const registerLabelsAddon = (): void => {
  labelAddons.forEach((entry) => {
    const addonType = types.TOOL;
    const addonInfo = CONFIG.labelAddons[entry];

    addons.add(addonInfo.id, {
      title: addonInfo.title,
      type: addonType,
      render: () => {
        const [addonState] = useAddonState<PackageInfoState | undefined>(CONFIG.id);
        const data = useMemo(() => addonState?.[entry], [addonState]);
        return data ? <Badge status="neutral">{data}</Badge> : null;
      },
    });
  });
};
