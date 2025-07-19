import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import {
  FormField,
  Grid,
  Input,
  Button,
  Select,
  Attachment,
  Checkbox,
  Radio,
  Textarea,
  Chip,
  Manager,
} from "react-ck";

const meta: Meta = {
  title: "Test/Form",
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
      <Grid align="start" spacing="l">
        <Grid.Column>
          <FormField label="Text" description="Text" reserveSpace>
            <Input type="text" required />
          </FormField>
        </Grid.Column>
        <Grid.Column>
          <FormField label="Text" reserveSpace>
            <Input type="text" required />
          </FormField>
        </Grid.Column>
        <Grid.Column>
          <FormField description="Text" reserveSpace>
            <Input type="text" required />
          </FormField>
        </Grid.Column>
        <Grid.Column>
          <FormField
            inlineLabel="Retired"
            description="Are you +65 and retired?"
            variation="inline"
            reserveSpace>
            <Checkbox />
          </FormField>
        </Grid.Column>
        <Grid.Column>
          <FormField inlineLabel="Retired" variation="inline" reserveSpace>
            <Checkbox />
          </FormField>
        </Grid.Column>
        <Grid.Column>
          <FormField description="Are you +65 and retired?" variation="inline" reserveSpace>
            <Checkbox />
          </FormField>
        </Grid.Column>
        <Grid.Column>
          <FormField
            inlineLabel="Retired"
            description="Are you +65 and retired?"
            variation="inline-reverse"
            reserveSpace>
            <Checkbox />
          </FormField>
        </Grid.Column>
        <Grid.Column size={1}>
          <FormField label="Product" variation="inline-content" fullWidth reserveSpace>
            <Input type="text" defaultValue="BTC" fullWidth />
            -
            <Input type="text" defaultValue="USD" fullWidth />
          </FormField>
        </Grid.Column>
        <Grid.Column size={2}>
          <FormField
            label="What are you?"
            variation="inline-content"
            skin="ghost"
            fullWidth
            reserveSpace>
            <FormField inlineLabel="Male" variation="inline" fullWidth>
              <Radio name="gender" />
            </FormField>
            <FormField inlineLabel="Female" variation="inline" fullWidth>
              <Radio name="gender" />
            </FormField>
          </FormField>
        </Grid.Column>
      </Grid>
      <Grid align="centered" spacing="l">
        <Grid.Column size={6}>
          <Attachment format="pdf" name="file.pdf" skin="pdf" />
        </Grid.Column>
        <Grid.Column size={6}>
          <Attachment
            format="pdf"
            name="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem provident libero qui fuga fugit aliquam, ex vero error dolorum assumenda..pdf"
            skin="pdf"
          />
        </Grid.Column>
        <Grid.Column size={6}>
          <Attachment size="l" format="pdf" name="file.pdf" skin="pdf" />
        </Grid.Column>
        <Grid.Column size={6}>
          <Attachment
            size="l"
            format="pdf"
            name="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem provident libero qui fuga fugit aliquam, ex vero error dolorum assumenda..pdf"
            skin="pdf"
          />
        </Grid.Column>
      </Grid>
      <Grid align="centered" spacing="l">
        <Grid.Column size={3}>
          <FormField label="Text" description="Text" skin="muted">
            <Input type="text" required />
          </FormField>
        </Grid.Column>
        <Grid.Column size={3}>
          <FormField label="Date" description="Date" skin="muted">
            <Input type="date" required />
          </FormField>
        </Grid.Column>
        <Grid.Column size={2}>
          <FormField label="Select" description="Select" skin="muted">
            <Select required>
              <Select.Option value="a1">A</Select.Option>
              <Select.Option value="a2">A</Select.Option>
              <Select.Option>B</Select.Option>
              <Select.Option>C</Select.Option>
            </Select>
          </FormField>
        </Grid.Column>
        <Grid.Column size={2}>
          <FormField label="Select" description="Select" skin="muted">
            <Select placeholder="Select" required>
              <Select.Option>A</Select.Option>
              <Select.Option>B</Select.Option>
              <Select.Option>C</Select.Option>
            </Select>
          </FormField>
        </Grid.Column>
        <Grid.Column size={2}>
          <FormField label="Select" description="Select" skin="muted">
            <Select placeholder="Select" multiple>
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
      <Grid align="centered" spacing="l">
        <Grid.Column size={3}>
          <Input type="text" required />
        </Grid.Column>
        <Grid.Column size={3}>
          <Input type="date" required />
        </Grid.Column>
        <Grid.Column size={2}>
          <Select required>
            <Select.Option value="a1">A</Select.Option>
            <Select.Option value="a2">A</Select.Option>
            <Select.Option>B</Select.Option>
            <Select.Option>C</Select.Option>
          </Select>
        </Grid.Column>
        <Grid.Column size={2}>
          <Select placeholder="Select" required>
            <Select.Option>A</Select.Option>
            <Select.Option>B</Select.Option>
            <Select.Option>C</Select.Option>
          </Select>
        </Grid.Column>
        <Grid.Column size={2}>
          <Select placeholder="Select" multiple>
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
      </Grid>
      <Grid align="centered" spacing="l">
        <Grid.Column size={3}>
          <FormField>
            <Textarea placeholder="Address" />
          </FormField>
        </Grid.Column>
        <Grid.Column size={3}>
          <FormField>
            <Input type="text" placeholder="Username" />
          </FormField>
        </Grid.Column>
        <Grid.Column size={3}>
          <Input type="password" placeholder="Password" />
        </Grid.Column>
        <Grid.Column size={3}>
          <Select placeholder="Allow deselect" required>
            <Select.Option>A</Select.Option>
            <Select.Option>B</Select.Option>
            <Select.Option>C</Select.Option>
          </Select>
        </Grid.Column>
        <Grid.Column size={3}>
          <Select placeholder="Disallow deselect" allowDeselect={false}>
            <Select.Option>X</Select.Option>
            <Select.Option>Y</Select.Option>
            <Select.Option>Z</Select.Option>
          </Select>
        </Grid.Column>
        <Grid.Column size={3}>
          <FormField label="Name" description="Insert your full name">
            <Input type="text" placeholder="Full legal name" />
          </FormField>
        </Grid.Column>
        <Grid.Column size={3}>
          <FormField label="Email" description="Insert your company email">
            <Input type="email" placeholder="Search" />
          </FormField>
        </Grid.Column>
        <Grid.Column size={3}>
          <FormField
            inlineLabel="Retired"
            description="Are you +65 and retired?"
            variation="inline">
            <Checkbox />
          </FormField>
        </Grid.Column>
        <Grid.Column size={3}>
          <FormField label="Would you like to make a donation?" variation="inline-reverse">
            <Checkbox />
          </FormField>
        </Grid.Column>
        <Grid.Column size={4}>
          <FormField label="What are you?">
            <FormField label="Male" variation="inline">
              <Radio name="gender" />
            </FormField>
            <FormField label="Female" variation="inline">
              <Radio name="gender" />
            </FormField>
          </FormField>
        </Grid.Column>
        <Grid.Column size={4}>
          <FormField label="Lifestyle" variation="inline-reverse">
            <FormField label="Active" variation="inline">
              <Radio name="lifestyle" />
            </FormField>
            &nbsp;
            <FormField label="Sedentary" variation="inline">
              <Radio name="lifestyle" />
            </FormField>
          </FormField>
        </Grid.Column>
        <Grid.Column size={12} />
        <Grid.Column size={4}>
          <FormField label="Product" variation="inline-content">
            <Input type="text" defaultValue="BTC" fullWidth />
            -
            <Input type="text" defaultValue="USD" fullWidth />
          </FormField>
        </Grid.Column>
        <Grid.Column size={6}>
          <FormField label="Date" variation="inline-content">
            <Input type="date" />
            <Input type="time" />
            <Input type="month" />
          </FormField>
        </Grid.Column>
        <Grid.Column size={12} />
        <Grid.Column size={4}>
          <FormField label="Duration">
            <Input type="number" defaultValue="1" />-
            <Select placeholder="Period" allowDeselect={false}>
              <Select.Option>days</Select.Option>
              <Select.Option>weeks</Select.Option>
              <Select.Option>months</Select.Option>
              <Select.Option>years</Select.Option>
            </Select>
          </FormField>
        </Grid.Column>
        <Grid.Column size={4}>
          <FormField label="Duration" variation="inline">
            <Input type="number" defaultValue="1" />-
            <Select placeholder="Period" allowDeselect={false}>
              <Select.Option>days</Select.Option>
              <Select.Option>weeks</Select.Option>
              <Select.Option>months</Select.Option>
              <Select.Option>years</Select.Option>
            </Select>
          </FormField>
        </Grid.Column>
        <Grid.Column size={4}>
          <FormField label="Duration" variation="inline-reverse">
            <Input type="number" defaultValue="1" />-
            <Select placeholder="Period" allowDeselect={false}>
              <Select.Option>days</Select.Option>
              <Select.Option>weeks</Select.Option>
              <Select.Option>months</Select.Option>
              <Select.Option>years</Select.Option>
            </Select>
          </FormField>
        </Grid.Column>
        <Grid.Column size={12} />
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
