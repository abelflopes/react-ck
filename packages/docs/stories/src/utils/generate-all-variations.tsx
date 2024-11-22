import React, { useState } from "react";
import { generateDescribedCombinations, type PropsMap } from "@react-ck/misc-utils";
import { Grid, type GridColumnProps, type GridProps } from "@react-ck/grid/src";
import { Snippet } from "@react-ck/provisional/src";
import { Button } from "@react-ck/button/src";
import { Divider } from "@react-ck/divider/src";

export const generateAllVariations = <T extends object>(
  render: (props: T) => React.ReactNode,
  data: PropsMap<T>,
  options?: {
    align?: GridProps["align"];
    colSize?: GridColumnProps["size"];
  },
): React.ReactElement => {
  // eslint-disable-next-line react-hooks/rules-of-hooks -- not applicable
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <Button
        skin="secondary"
        skinVariation="muted"
        onClick={() => {
          setShowInfo((v) => !v);
        }}>
        {showInfo ? "Hide Info" : "Show Info"}
      </Button>

      <Divider />

      <Grid align={options?.align ?? "end"}>
        {generateDescribedCombinations<T>(data).map(({ combination, description }) => (
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
