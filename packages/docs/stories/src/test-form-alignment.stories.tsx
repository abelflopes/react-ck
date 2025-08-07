import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { FormField, Grid, Input, Button, Select, Chip, Manager, Checkbox } from "react-ck";

const meta: Meta = {
  title: "Test/Form Alignment",
  decorators: [
    (Story): React.ReactElement => (
      <Manager usePortal={false}>
        <Story />
      </Manager>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const demo: Story = {
  parameters: {
    layout: "padded",
  },

  render: (): React.ReactElement => (
    <form>
      <div
        style={{
          height: "1px",
          backgroundColor: "red",
          opacity: 0.2,
          position: "relative",
          top: 36,
        }}
      />

      <Grid align="start">
        <Grid.Column size={1}>
          <Button>Button</Button>
        </Grid.Column>
        <Grid.Column size={1}>
          <Input type="text" placeholder="Text" />
        </Grid.Column>
        <Grid.Column size={1}>
          <Input type="date" />
        </Grid.Column>
        <Grid.Column size={1}>
          <FormField>
            <Input type="text" placeholder="Text" />
          </FormField>
        </Grid.Column>
        <Grid.Column>
          <Select required>
            <Select.Option value="a1">A</Select.Option>
            <Select.Option value="a2">A</Select.Option>
            <Select.Option>B</Select.Option>
            <Select.Option>C</Select.Option>
          </Select>
        </Grid.Column>
        <Grid.Column>
          <FormField>
            <Select required>
              <Select.Option value="a1">A</Select.Option>
              <Select.Option value="a2">A</Select.Option>
              <Select.Option>B</Select.Option>
              <Select.Option>C</Select.Option>
            </Select>
          </FormField>
        </Grid.Column>
        <Grid.Column size={1}>
          <FormField>
            <Input type="date" required />
          </FormField>
        </Grid.Column>
        <Grid.Column size={2}>
          <FormField>
            <Select placeholder="Disallow deselect" allowDeselect={false}>
              <Select.Option>X</Select.Option>
              <Select.Option>Y</Select.Option>
              <Select.Option>Z</Select.Option>
            </Select>
          </FormField>
        </Grid.Column>
        <Grid.Column size={1}>
          <FormField variation="inline">
            <Checkbox />
          </FormField>
        </Grid.Column>
        <Grid.Column size={1}>
          <FormField variation="inline">
            <Checkbox isToggle />
          </FormField>
        </Grid.Column>
      </Grid>
      <Grid align="start">
        <Grid.Column size={1}>
          <Button>Button</Button>
        </Grid.Column>
        <Grid.Column size={1}>
          <Input type="text" placeholder="Text" />
        </Grid.Column>
        <Grid.Column size={1}>
          <FormField>
            <Input type="text" placeholder="Text" />
          </FormField>
        </Grid.Column>
        <Grid.Column>
          <Select placeholder="Multiple" multiple>
            <Select.Option value="Apple" disabled />
            <Select.Option>Guaraná</Select.Option>
            <Select.Option value="bnn">Banana</Select.Option>
            <Select.Option value="orange">Orange</Select.Option>
            <Select.Option
              value="lemon"
              displayValue={
                <>
                  LEMON! <Chip>Favorite</Chip>
                </>
              }>
              Lemon 🍋 <Chip skin="primary">Popular</Chip> <Chip>Favorite</Chip>
            </Select.Option>
            <Select.Option value="mango">
              <span>
                <b>Exotic</b> mango
              </span>
            </Select.Option>
          </Select>
        </Grid.Column>
        <Grid.Column>
          <FormField>
            <Select placeholder="Multiple" multiple>
              <Select.Option value="Apple" disabled />
              <Select.Option>Guaraná</Select.Option>
              <Select.Option value="bnn">Banana</Select.Option>
              <Select.Option value="orange">Orange</Select.Option>
              <Select.Option
                value="lemon"
                displayValue={
                  <>
                    LEMON! <Chip>Favorite</Chip>
                  </>
                }>
                Lemon 🍋 <Chip skin="primary">Popular</Chip> <Chip>Favorite</Chip>
              </Select.Option>
              <Select.Option value="mango">
                <span>
                  <b>Exotic</b> mango
                </span>
              </Select.Option>
            </Select>
          </FormField>
        </Grid.Column>
      </Grid>
      <Grid align="centered">
        <Grid.Column>
          <Button skinVariation="muted">Normal Button</Button>
        </Grid.Column>
        <Grid.Column>
          <Button skinVariation="muted" as="a" skin="secondary">
            Link Button
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button size="s" skinVariation="muted">
            Normal Button
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button size="s" skinVariation="muted" as="a" skin="secondary">
            Link Button
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button size="xs" skinVariation="muted">
            Normal Button
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button size="xs" skinVariation="muted" as="a" skin="secondary">
            Link Button
          </Button>
        </Grid.Column>
      </Grid>
      <Grid align="centered" spacing="l">
        <Grid.Column>
          <Button skinVariation="muted">
            Normal
            <br /> Button
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button skinVariation="muted" as="a" skin="secondary">
            Link
            <br /> Button
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button size="s" skinVariation="muted">
            Normal
            <br /> Button
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button size="s" skinVariation="muted" as="a" skin="secondary">
            Link
            <br /> Button
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button size="xs" skinVariation="muted">
            Normal
            <br /> Button
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button size="xs" skinVariation="muted" as="a" skin="secondary">
            Link
            <br /> Button
          </Button>
        </Grid.Column>
      </Grid>
      <Grid align="centered" spacing="l">
        <Grid.Column>
          <Button as="a" skin="secondary" skinVariation="ghost">
            Contact support
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button type="reset" skin="secondary">
            Reset
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button>Submit</Button>
        </Grid.Column>
      </Grid>
    </form>
  ),
};
