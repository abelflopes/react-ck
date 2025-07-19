import React, { useEffect, useMemo, useState } from "react";
import { addons, types, useAddonState } from "storybook/manager-api";
import { Markdown } from "@react-ck/storybook-utils";
import { CONFIG, type PackageInfoState } from "../util";
import { IconButton } from "storybook/internal/components";

export const registerMarkdownAddon = (): void => {
  const markdownAddons: Array<keyof typeof CONFIG.markdownAddons> = [
    "changelog",
    "readme",
  ] satisfies Array<keyof PackageInfoState>;

  for (const entry of markdownAddons) {
    const addonType = types.TOOL;
    const addonInfo = CONFIG.markdownAddons[entry];

    /* eslint-disable react-hooks/rules-of-hooks -- lint not able to detect that output is a react component */
    addons.add(addonInfo.id, {
      title: addonInfo.title,
      type: addonType,
      render: (): React.ReactNode => {
        const [addonState] = useAddonState<PackageInfoState | undefined>(CONFIG.id);

        const data = useMemo(() => addonState?.[entry], [addonState]);

        const [open, setOpen] = useState(false);

        useEffect(() => {
          const addonCollection = addons.getElements(addonType);
          const currAddon = addonCollection[addonInfo.id];

          if (!currAddon) return;

          currAddon.hidden = !data;
        }, [data]);

        return data ? (
          <>
            <IconButton onClick={() => setOpen(true)}>{addonInfo.title}</IconButton>

            {open && data && (
              <dialog
                open
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1000,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20,
                  boxSizing: "border-box",
                }}
                onClick={() => setOpen(false)}>
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: "100%",
                    maxHeight: "100%",
                    backgroundColor: "white",
                    maxWidth: 800,
                    padding: 40,
                    margin: "0 auto",
                    whiteSpace: "pre-wrap",
                    overflowY: "auto",
                    borderRadius: 20,
                    scrollbarWidth: "none",
                    cursor: "default",
                    boxSizing: "border-box",
                  }}>
                  {data ? <Markdown>{data.split(":warning:").join("⚠️")}</Markdown> : null}

                  {addonState?.loading ? <p>Loading</p> : null}

                  {addonState?.error ? <p style={{ color: "red" }}>{addonState.error}</p> : null}
                </div>
              </dialog>
            )}
          </>
        ) : null;
      },
    });
    /* eslint-enable */
  }
};
