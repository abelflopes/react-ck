import React, { useState } from "react";
import {
  Grid,
  type GridColumnProps,
  type GridProps,
  Snippet,
  Button,
  Divider,
  generateDescribedCombinations,
  type PropsMap,
} from "react-ck";

export const generateAllVariations = <T extends object>(
  render: (props: T) => React.ReactNode,
  data: PropsMap<T>,
  options?: {
    filter?: (props: T) => boolean;
    align?: GridProps["align"];
    colSize?: GridColumnProps["size"];
  },
): React.ReactElement => {
  // eslint-disable-next-line react-hooks/rules-of-hooks -- not applicable
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <br />

      <Button
        skin="secondary"
        skinVariation="muted"
        onClick={() => {
          setShowInfo((v) => !v);
        }}>
        {showInfo ? "Hide Info" : "Show Info"}
      </Button>

      <Divider spacing="l" />

      <Grid align={options?.align ?? "end"}>
        {generateDescribedCombinations<T>(data)
          .filter((i) => options?.filter?.(i.combination) ?? true)
          .map(({ combination, description }) => (
            <Grid.Column key={description} size={options?.colSize ?? 3} title={description}>
              {render(combination)}

              {showInfo ? (
                <>
                  <br />
                  <br />
                  <Snippet>{description}</Snippet>
                </>
              ) : null}
            </Grid.Column>
          ))}
      </Grid>
    </>
  );
};
