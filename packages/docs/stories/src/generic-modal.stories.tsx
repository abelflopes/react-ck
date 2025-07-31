import React, { useState } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { Text, Button, Container, Image, Modal, type ModalProps, Manager, Input } from "react-ck";
import { configureStory } from "@react-ck/storybook-utils";

const meta: Meta<typeof Modal> = {
  title: "Generic/Modal",
  ...configureStory(Modal, {
    parameters: {
      layout: "padded",
    },
    decorators: [
      (Story): React.ReactElement => (
        <Manager usePortal={false}>
          <Story />
        </Manager>
      ),
    ],
  }),
};

const render = (props: ModalProps): React.ReactElement => {
  // eslint-disable-next-line react-hooks/rules-of-hooks -- not recognized inside stories
  const [open, setOpen] = useState(false);

  return (
    <Container size="s">
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem asperiores illo, commodi unde
        illum voluptatibus. Sed non numquam iste aliquid!
      </Text>

      <Button
        onClick={() => {
          setOpen(true);
        }}>
        Open
      </Button>
      {open ? (
        <Modal
          {...props}
          onDismiss={() => {
            setOpen(false);
          }}
        />
      ) : null}
    </Container>
  );
};

export default meta;

type Story = StoryObj<typeof meta>;

const header = (
  <Modal.Header actions={<Input type="search" placeholder="Search" />}>
    {faker.lorem.sentence(1)}
  </Modal.Header>
);

const footer = (
  <Modal.Footer
    actions={
      <Button>
        <Button>{faker.lorem.word()}</Button>
      </Button>
    }>
    {faker.lorem.sentence(6)}
  </Modal.Footer>
);

export const Component: Story = {
  args: {
    children: (
      <>
        {header}

        <Text margin="none">{faker.lorem.sentence(6)}</Text>

        {footer}
      </>
    ),
  },
  render,
};

export const Dismissable: Story = {
  ...Component,
  args: {
    ...Component.args,
    onDismiss: () => {},
  },
};

export const BigContent: Story = {
  args: {
    children: (
      <>
        {header}

        <Text margin="bottom">{faker.lorem.paragraphs(19)}</Text>

        <Image alt="Image" src={faker.image.urlPicsumPhotos()} fullWidth />

        <Text margin="top">{faker.lorem.paragraphs(20)}</Text>

        {footer}
      </>
    ),
  },
  render,
};

export const FullHeight: Story = {
  args: {
    size: "full",
    sizeVariation: "full-height",
    children: (
      <>
        {header}

        <div style={{ height: "100%", backgroundColor: "pink" }}>
          <Text margin="bottom">{faker.lorem.paragraphs(19)}</Text>
        </div>

        {footer}
      </>
    ),
  },
  render,
};

export const OnlyContent: Story = {
  args: {
    children: <Text margin="none">{faker.lorem.sentence(6)}</Text>,
  },
  render,
};

export const OnlyContentAndHeader: Story = {
  args: {
    children: (
      <>
        {header}

        <Text margin="none">{faker.lorem.sentence(6)}</Text>
      </>
    ),
  },
  render,
};

export const OnlyContentAndFooter: Story = {
  args: {
    children: (
      <>
        <Text margin="none">{faker.lorem.sentence(6)}</Text>

        {footer}
      </>
    ),
  },
  render,
};
