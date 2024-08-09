import React from "react";
import { generateDescribedCombinations, type PropsMap } from "@react-ck/misc-utils";
import { Grid } from "@react-ck/grid/src";
import { Snippet } from "@react-ck/provisional/src";

export const generateAllVariations = <T extends object>(
  render: (props: T) => React.ReactElement,
  data: PropsMap<T>,
): React.ReactElement => (
  <Grid align="centered">
    {generateDescribedCombinations<T>(data).map(({ combination, description }) => (
      <Grid.Column key={description} size={3}>
        {render(combination)}
        <br />
        <br />
        <Snippet>{description}</Snippet>
      </Grid.Column>
    ))}
  </Grid>
);
