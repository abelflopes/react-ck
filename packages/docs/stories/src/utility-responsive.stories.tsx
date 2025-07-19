import React, { useRef } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import {
  ResponsiveFragment,
  useBreakpoints,
  useResponsiveProps,
  breakpoints,
  Snippet,
  Text,
  Grid,
  Manager,
} from "react-ck";
import { faker } from "@faker-js/faker";

const meta: Meta<typeof ResponsiveFragment> = {
  title: "Utility/Responsive",
  ...configureStory(ResponsiveFragment, {
    parameters: {
      source: {
        type: "code",
      },
    },
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <Story />
        </Manager>
      ),
    ],
  }),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  decorators: [
    (Story: () => React.ReactElement): React.ReactElement => (
      <>
        <Text>Switch resolution if the text is not visible below</Text>
        <Story />
      </>
    ),
  ],
  args: {
    xs: true,
    s: false,
    m: true,
    l: false,
    xxl: true,
    children: <Text>{faker.lorem.paragraphs(3)}</Text>,
  },
};

export const ShowFromResolution: Story = {
  decorators: [
    (Story: () => React.ReactElement): React.ReactElement => (
      <>
        <Text>Show from Lresultion</Text>
        <Text>Switch resolution if the text is not visible below</Text>
        <Story />
      </>
    ),
  ],
  args: {
    l: true,
    children: <Text>{faker.lorem.paragraphs(3)}</Text>,
  },
};

export const HideFromResolution: Story = {
  decorators: [
    (Story: () => React.ReactElement): React.ReactElement => (
      <>
        <Text>Hide from Lresultion</Text>
        <Text>Switch resolution if the text is not visible below</Text>
        <Story />
      </>
    ),
  ],
  args: {
    l: false,
    children: <Text>{faker.lorem.paragraphs(3)}</Text>,
  },
};

export const useResponsiveHook: Story = {
  parameters: {
    layout: "padded",
  },
  render: (): React.ReactElement => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- exception for storybook
    const ref = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks -- exception for storybook
    const breakpoints = useBreakpoints({
      active: true,
      target: ref,
    });

    return (
      <div ref={ref} style={{ width: "66vw", maxWidth: "100%" }}>
        <Snippet>{JSON.stringify(breakpoints, null, 2)}</Snippet>
      </div>
    );
  },
};

export const useResponsivePropsHook: Story = {
  parameters: {
    layout: "padded",
  },
  render: (): React.ReactElement => {
    const baseProps = {
      text: "default text",
      number: 1,
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks -- exception for storybook
    const ref = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks -- exception for storybook
    const responsiveData = useResponsiveProps({
      baseProps,
      responsive: {
        target: ref,
        xs: {
          text: "xs responsive",
        },
        s: {
          text: "s responsive",
        },
        m: {
          text: "m responsive",
          number: 10,
        },
        l: {
          text: "l responsive",
        },
        xl: {
          text: "xl responsive",
        },
        xxl: {
          text: "xxl responsive",
        },
      },
    });

    return (
      <div ref={ref} style={{ width: "66vw", maxWidth: "100%" }}>
        <Snippet>
          baseProps
          {JSON.stringify(baseProps, null, 2)}
        </Snippet>
        <Snippet>
          responsiveData
          {JSON.stringify(responsiveData, null, 2)}
        </Snippet>
      </div>
    );
  },
};

export const Sizes: Story = {
  parameters: {
    layout: "padded",
  },
  render: (): React.ReactElement => (
    <Grid>
      {Object.entries(breakpoints).map(([name, size]) => (
        <Grid.Column key={name} size={12}>
          <div style={{ width: size, background: "#eee", padding: 10 }}>
            <Text margin="none">
              {name} - {size}px
            </Text>
          </div>
        </Grid.Column>
      ))}
    </Grid>
  ),
};
