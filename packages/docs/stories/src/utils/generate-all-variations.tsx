import React from "react";
import { generateDescribedCombinations, type PropsMap } from "@react-ck/misc-utils";
import { Grid, type GridColumnProps, type GridProps } from "@react-ck/grid/src";
import { Snippet } from "@react-ck/provisional/src";

export const generateAllVariations = <T extends object>(
  render: (props: T) => React.ReactNode,
  data: PropsMap<T>,
  options?: {
    align?: GridProps["align"];
    colSize?: GridColumnProps["size"];
  },
): React.ReactElement => (
  <Grid align={options?.align ?? "end"}>
    {generateDescribedCombinations<T>(data).map(({ combination, description }) => (
      <Grid.Column key={description} size={options?.colSize ?? 3}>
        {render(combination)}
        <br />
        <br />
        <Snippet>{description}</Snippet>
      </Grid.Column>
    ))}
  </Grid>
);
