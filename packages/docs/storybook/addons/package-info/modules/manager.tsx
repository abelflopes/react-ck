/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { addons, types, useAddonState, useStorybookApi } from "@storybook/manager-api";
import * as Events from "@storybook/core-events";
import { useData } from "@react-ck/react-hooks/src";
import { isPackageInfoList } from "../../../scripts/package-info/type-guards";
import { CONFIG, type PackageInfoState } from "../util";

export const registerManagerAddon = (): void => {
  addons.add(CONFIG.commonAddons.manager.id, {
    title: CONFIG.commonAddons.manager.title,
    type: types.TAB,
    route: ({ storyId, refId }) =>
      `/${CONFIG.commonAddons.manager.route}/${[refId, storyId].filter(Boolean).join("_")}`,
    match: ({ viewMode }) => viewMode === CONFIG.commonAddons.manager.route,
    hidden: true,
    render: ({ active }) => {
      const api = useStorybookApi();
      const [addonState, setAddonState] = useAddonState<PackageInfoState>(CONFIG.id, {
        changelog: undefined,
        readme: undefined,
        loading: false,
        error: undefined,
        version: undefined,
      });

      const { loading, dataPromise, error } = useData("./packages-info.json");

      useEffect(() => {
        const handler = async (info: { storyId: string; viewMode: string }): void => {
          const storyData = api.getData(info.storyId);

          const data = await dataPromise;

          if (!isPackageInfoList(data)) throw new TypeError("Unsupported package info data format");

          const storyIdParts = storyData.id.split("-");

          const currPackageInfo = data.find(({ id }) => {
            const packageName = id.split("/")[1];

            return packageName && storyIdParts.includes(packageName);
          });

          setAddonState((state) => ({
            error: state.error,
            loading: state.loading,
            changelog: currPackageInfo?.markdown.changelog,
            readme: currPackageInfo?.markdown.readme,
            version:
              currPackageInfo &&
              `${currPackageInfo.packageJson.name}@${currPackageInfo.packageJson.version}`,
          }));
        };

        api.on(Events.CURRENT_STORY_WAS_SET, handler);

        return () => {
          api.off(Events.CURRENT_STORY_WAS_SET, handler);
        };
      }, [api, dataPromise]);

      useEffect(() => {
        setAddonState((state) => ({
          ...state,
          loading,
          error,
        }));
      }, [loading, error]);

      return active ? (
        <code>
          <pre>{JSON.stringify({ active, addonState }, undefined, 2)}</pre>
        </code>
      ) : null;
    },
  });
};
