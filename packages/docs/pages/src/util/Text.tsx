import React, { useState } from "react";
import { Text, type TextVariation, type TextSkin } from "@react-ck/text";
import { faker } from "@faker-js/faker";
import { Typeset } from "@storybook/blocks";
import { Manager } from "@react-ck/manager";
import { ShadowDom } from "./ShadowDom";

const sampleText = faker.lorem.sentence(3);

export const skins: TextSkin[] = [
  "default",
  "bold",
  "link",
  "link_hidden",
  "inverted",
  "soft",
  "highlight-primary",
  "negative",
];

export const variations: TextVariation[] = [
  "banner",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "small",
  "extra-small",
];

/**
 * Uses shadow dom to fetch styles form rendered nodes without interference
 */

export const TextDemo = (): React.ReactNode => {
  // oject of: { fontFamily: {fontWeight: fontSize[]} }
  const [computedStyles, setComputedStyles] = useState<Record<string, Record<string, string[]>>>(
    {},
  );

  return (
    <>
      {Object.entries(computedStyles).map(([fontFamily, values]) => (
        <React.Fragment key={fontFamily}>
          {Object.entries(values)
            .reverse()
            .map(([fontWeight, variations]) => (
              <React.Fragment key={fontWeight}>
                <Typeset
                  fontSizes={variations}
                  fontWeight={Number(fontWeight)}
                  sampleText={sampleText}
                  fontFamily={fontFamily}
                />
              </React.Fragment>
            ))}
        </React.Fragment>
      ))}

      <ShadowDom cssQuerySelector='[data-module="storybook-styles"]'>
        <div
          style={{
            opacity: 0,
            pointerEvents: "none",
            height: 0,
            width: 0,
            position: "absolute",
            overflow: "hidden",
          }}>
          <Manager>
            aaaaa
            {variations.map((variation) => (
              <Text
                key={variation}
                variation={variation}
                as={
                  <div
                    ref={(r) => {
                      if (!r) return;

                      const { fontFamily, fontWeight, fontSize } = window.getComputedStyle(r);

                      console.log("fontFamily", fontFamily);

                      setComputedStyles((v) => ({
                        ...v,
                        [fontFamily]: {
                          ...v[fontFamily],
                          [fontWeight]: [...(v[fontFamily]?.[fontWeight] ?? []), fontSize],
                        },
                      }));
                    }}
                    style={{ display: "block" }}
                  />
                }>
                {sampleText}
              </Text>
            ))}
          </Manager>
        </div>
      </ShadowDom>
    </>
  );
};
