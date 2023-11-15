/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo } from "react";
import { addons, types, useStorybookApi, useAddonState, useGlobals } from "@storybook/manager-api";
import * as Events from "@storybook/core-events";
import { type PackageInfo } from "../../scripts/package-info/types";
import { useData, UseDataReturn } from "@react-ck/react-hooks/src";
import { isPackageInfoList } from "../../scripts/package-info/type-guards";
// https://storybook.js.org/docs/react/addons/addon-knowledge-base#storybook-components
import { Markdown } from "@storybook/blocks";

const CONFIG = {
  id: "package-info",
  addons: {
    manager: {
      id: "package-info/manager",
      title: "Package Info Manager",
      route: "manager",
    },
    changelog: {
      id: "package-info/changelog",
      title: "Changelog",
      route: "changelog",
    },
    readme: {
      id: "package-info/readme",
      title: "Documentation",
      route: "readme",
    },
  },
};

type DocAddonKey = keyof Omit<(typeof CONFIG)["addons"], "manager">;

const docAddons: DocAddonKey[] = ["readme", "changelog"];

type PackageInfoState = Pick<UseDataReturn, "loading" | "error"> &
  Record<DocAddonKey, string | undefined>;

addons.register(CONFIG.id, (api) => {
  addons.add(CONFIG.addons.manager.id, {
    title: CONFIG.addons.manager.title,
    type: types.TAB,
    route: ({ storyId, refId }) =>
      `/${CONFIG.addons.manager.route}/${[refId, storyId].filter(Boolean).join("_")}`,
    match: ({ viewMode }) => viewMode === CONFIG.addons.manager.route,
    hidden: true,
    render: ({ active }) => {
      const [globals, updateGlobals] = useGlobals();

      useEffect(() => {
        updateGlobals({ TEST_GLOBAL: 123 });
      }, []);

      const storybookApi = useStorybookApi();
      const [addonState, setAddonState] = useAddonState<PackageInfoState>(CONFIG.id, {
        changelog: undefined,
        readme: undefined,
        loading: false,
        error: undefined,
      });

      const { loading, dataPromise, error } = useData("/packages-info.json");

      useEffect(() => {
        const handler = async (info: { storyId: string; viewMode: string }) => {
          const storyData = storybookApi.getData(info.storyId);

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
          }));

          console.log("storyData", storyData);
        };

        storybookApi.on(Events.CURRENT_STORY_WAS_SET, handler);

        return () => {
          storybookApi.off(Events.CURRENT_STORY_WAS_SET, handler);
        };
      }, [storybookApi, dataPromise]);

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

  docAddons.forEach((entry) => {
    const addonType = types.TAB;

    addons.add(CONFIG.addons[entry].id, {
      title: CONFIG.addons[entry].title,
      type: addonType,
      route: ({ storyId, refId }) =>
        `/${CONFIG.addons[entry].route}/${[refId, storyId].filter(Boolean).join("_")}`,
      match: ({ viewMode }) => viewMode === CONFIG.addons[entry].route,
      hidden: false,
      render: ({ active }) => {
        const [addonState] = useAddonState<PackageInfoState | undefined>(CONFIG.id);
        const data = useMemo(() => addonState?.[entry], [addonState]);

        useEffect(() => {
          const addonCollection = addons.getElements(addonType);
          const currAddon = addonCollection[CONFIG.addons[entry].id];

          if (!currAddon) return;

          currAddon.hidden = !data;
        }, [data]);

        return active ? (
          <div className="custom-docs-wrapper">
            <div className="custom-docs-container">
              {data && <Markdown>{data.split(":warning:").join("⚠️")}</Markdown>}

              {active && addonState?.loading && <p>Loading</p>}

              {active && addonState?.error && <p style={{ color: "red" }}>{addonState?.error}</p>}
            </div>
          </div>
        ) : null;
      },
    });
  });
});
