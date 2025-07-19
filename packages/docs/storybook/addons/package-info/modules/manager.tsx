import { useEffect } from "react";
import { addons, types, useAddonState, useStorybookApi } from "storybook/manager-api";
import * as Events from "storybook/internal/core-events";
import { useData } from "@react-ck/react-hooks/src";
import { isPackageInfoList } from "@react-ck/packages-info/src/type-guards";
import { CONFIG, type PackageInfoState } from "../util";

const sanitizeStr = (str: string): string => str.replace(/-/gu, "");

export const registerManagerAddon = (): void => {
  /* eslint-disable react-hooks/rules-of-hooks -- lint not able to detect that output is a react component */
  addons.add(CONFIG.commonAddons.manager.id, {
    title: CONFIG.commonAddons.manager.title,
    type: types.TOOL,
    hidden: true,
    render: ({ active }) => {
      const api = useStorybookApi();
      const [addonState, setAddonState] = useAddonState<PackageInfoState>(CONFIG.id, {
        changelog: undefined,
        readme: undefined,
        loading: false,
        error: undefined,
        version: undefined,
        packagesInfo: [],
        currPackageInfo: undefined,
      });

      const { loading, dataPromise, error } = useData("./packages-info.json");

      useEffect(() => {
        if (loading) return;

        const handler = (info: { storyId: string; viewMode: string }): void => {
          void (async (): Promise<void> => {
            const storyData = api.getData(info.storyId);

            const data = await dataPromise;

            if (!isPackageInfoList(data))
              throw new TypeError("Unsupported package info data format");

            const currPackageInfo = data.find(({ id, subfolders }) => {
              const [scope, name] = id.split("/");

              const sanitizedStoryId = sanitizeStr(storyData.id);
              const sanitizedPackageName = sanitizeStr(name ?? scope);
              const storyIdIncludesPackageName = sanitizedStoryId.includes(sanitizedPackageName);
              const subfoldersIncludesPackageName = subfolders
                .map((i) => sanitizeStr(i.split("/").reverse()[0]))
                .some((subfolder) => sanitizedStoryId.includes(subfolder));
              const found = storyIdIncludesPackageName || subfoldersIncludesPackageName;

              return found;
            });

            setAddonState((state) => ({
              error: state.error,
              loading: state.loading,
              changelog: currPackageInfo?.markdown.changelog,
              readme: currPackageInfo?.markdown.readme,
              version:
                currPackageInfo &&
                `${currPackageInfo.packageJson.name}@${currPackageInfo.packageJson.version}`,
              currPackageInfo,
              packagesInfo: data,
            }));
          })();
        };

        api.on(Events.CURRENT_STORY_WAS_SET, handler);

        return () => {
          api.off(Events.CURRENT_STORY_WAS_SET, handler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps -- setAddonState as dep will cause maximum depth stack exceeded
      }, [api, dataPromise, loading]);

      useEffect(() => {
        setAddonState((state) => ({
          ...state,
          loading,
          error,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps -- setAddonState as dep will cause maximum depth stack exceeded
      }, [loading, error]);

      return active ? (
        <code>
          <pre>{JSON.stringify({ active, addonState }, undefined, 2)}</pre>
        </code>
      ) : null;
    },
  });
  /* eslint-enable */
};
