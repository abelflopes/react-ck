import React, { useEffect, useMemo } from "react";
import { addons, types, useAddonState } from "@storybook/manager-api";
import { Markdown } from "@react-ck/story-config";
import { CONFIG, type PackageInfoState, markdownAddons } from "../util";

export const registerMarkdownAddon = (): void => {
  for (const entry of markdownAddons) {
    const addonType = types.TAB;
    const addonInfo = CONFIG.markdownAddons[entry];

    /* eslint-disable react-hooks/rules-of-hooks -- lint not able to detect that output is a react component */
    addons.add(addonInfo.id, {
      title: addonInfo.title,
      type: addonType,
      route: ({ storyId }) => {
        const ref = `${storyId?.split("--")[0]}--docs`;
        return `/${addonInfo.route}/${ref}`;
      },
      match: ({ viewMode }) => viewMode === addonInfo.route,
      hidden: true,
      render: ({ active }) => {
        const [addonState] = useAddonState<PackageInfoState | undefined>(CONFIG.id);
        const data = useMemo(() => addonState?.[entry], [addonState]);

        useEffect(() => {
          const addonCollection = addons.getElements(addonType);
          const currAddon = addonCollection[addonInfo.id];

          if (!currAddon) return;

          currAddon.hidden = !data;
        }, [data]);

        return active ? (
          <div className="custom-docs-wrapper">
            <div className="custom-docs-container">
              {data ? <Markdown>{data.split(":warning:").join("⚠️")}</Markdown> : null}

              {addonState?.loading ? <p>Loading</p> : null}

              {addonState?.error ? <p style={{ color: "red" }}>{addonState.error}</p> : null}
            </div>
          </div>
        ) : null;
      },
    });
    /* eslint-enable */
  }
};
