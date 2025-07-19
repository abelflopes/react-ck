import React, { useCallback, useRef, useState } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import {
  Dialog,
  Dropdown,
  Menu,
  Modal,
  Tooltip,
  Button,
  Text,
  Grid,
  Select,
  Card,
  Alert,
  Snackbar,
  useSnackbar,
  Manager,
  Icon,
} from "react-ck";
import { faker } from "@faker-js/faker";
import { IconVerticalDots } from "@react-ck/icon/icons/IconVerticalDots";
import { IconTrash } from "@react-ck/icon/icons/All";

const meta: Meta = {
  title: "Test/Elevation",
  decorators: [
    (Story): React.ReactElement => {
      const [portalEnabled, setPortalEnabled] = useState(true);

      return (
        <Manager usePortal={portalEnabled}>
          <Snackbar>
            <Text>
              DOM Portal: {portalEnabled ? "on" : "off"} &nbsp;
              <Button
                skin="secondary"
                skinVariation="muted"
                size="s"
                onClick={() => {
                  setPortalEnabled((v) => !v);
                }}>
                Toggle
              </Button>
            </Text>

            <Text>{faker.lorem.paragraph(100)}</Text>

            <Story />
          </Snackbar>
        </Manager>
      );
    },
  ],
};

const ActionDelete = ({
  onClose,
  onSuccess,
}: Readonly<{ onClose: () => void; onSuccess: () => void }>): React.ReactElement => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Menu.Item
        skin="negative"
        onClick={() => {
          setDialogOpen(true);
        }}>
        Delete
      </Menu.Item>

      <Dialog
        heading="Confirm Deletion"
        open={dialogOpen}
        actions={
          <>
            <Button skin="secondary" skinVariation="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              skin="negative"
              icon={
                <Icon>
                  <IconTrash />
                </Icon>
              }
              onClick={() => {
                onSuccess();
              }}>
              Delete
            </Button>
          </>
        }
        onDismiss={onClose}>
        <Text margin="none">
          Are you sure you want to delete this job? This action cannot be undone.
        </Text>
      </Dialog>
    </>
  );
};

const Actions = (): React.ReactElement => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const snackbar = useSnackbar();

  const onClose = useCallback(() => {
    setDropdownOpen(false);
  }, []);

  return (
    <>
      <Button
        size="xs"
        skin="secondary"
        skinVariation="ghost"
        type="button"
        rootRef={buttonRef}
        icon={
          <Icon>
            <IconVerticalDots />
          </Icon>
        }
        onClick={(e) => {
          e.preventDefault();
          setDropdownOpen((v) => !v);
        }}
      />

      <Dropdown anchorRef={buttonRef} open={dropdownOpen} onClose={onClose}>
        <Menu>
          <Menu.Item
            onClick={() => {
              snackbar.add(() => <Alert skin="positive">Run Again</Alert>, {
                duration: "short",
              });
              onClose();
            }}>
            Run Again
          </Menu.Item>

          <ActionDelete
            onClose={onClose}
            onSuccess={() => {
              snackbar.add(() => <Alert skin="positive">Deleted</Alert>, {
                duration: "short",
              });
              onClose();
            }}
          />
        </Menu>
      </Dropdown>
    </>
  );
};

const WithModal = ({ children }: { readonly children: React.ReactNode }): React.ReactElement => {
  const [open, setOpen] = useState(false);

  const toggleOpen = (): void => {
    setOpen((v) => !v);
  };

  return (
    <>
      <Button skin="primary" skinVariation="muted" onClick={toggleOpen}>
        Toggle modal
      </Button>

      <Modal open={open} onDismiss={toggleOpen}>
        <Modal.Header>Modal</Modal.Header>
        {children}
        <Modal.Footer
          actions={
            <Button skin="secondary" skinVariation="muted" onClick={toggleOpen}>
              Close
            </Button>
          }
        />
      </Modal>
    </>
  );
};

const WithDialog = ({ children }: { readonly children: React.ReactNode }): React.ReactElement => {
  const [open, setOpen] = useState(false);

  const toggleOpen = (): void => {
    setOpen((v) => !v);
  };

  return (
    <>
      <Button skin="primary" skinVariation="muted" onClick={toggleOpen}>
        Toggle dialog
      </Button>

      <Dialog
        heading="Dialog"
        open={open}
        actions={
          <Button skin="secondary" skinVariation="muted" onClick={toggleOpen}>
            Close
          </Button>
        }
        onDismiss={toggleOpen}>
        {children}
      </Dialog>
    </>
  );
};

const WithDropdown = ({ children }: { readonly children: React.ReactNode }): React.ReactElement => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const toggleOpen = (): void => {
    setOpen((v) => !v);
  };

  return (
    <>
      <Button rootRef={buttonRef} skin="primary" skinVariation="muted" onClick={toggleOpen}>
        Toggle dropdown
      </Button>

      <Dropdown anchorRef={buttonRef} open={open}>
        {children}
      </Dropdown>
    </>
  );
};

const WithTooltip = ({ children }: { readonly children: React.ReactNode }): React.ReactElement => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button rootRef={buttonRef} skin="primary" skinVariation="ghost">
        Hover tooltip
      </Button>

      <Tooltip anchor={buttonRef}>{children}</Tooltip>
    </>
  );
};

const Counter = (): React.ReactElement => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const toggleOpen = (): void => {
    setOpen((v) => !v);
  };

  return (
    <>
      <Menu.Item
        action={
          <Button skin="primary" skinVariation="ghost" size="s" onClick={toggleOpen}>
            Update
          </Button>
        }>
        Counter ({value})
      </Menu.Item>

      <Dialog
        heading="Change counter"
        open={open}
        actions={
          <>
            <Button
              skin="primary"
              skinVariation="muted"
              onClick={() => {
                setValue((v) => v + 1);
              }}>
              Increase
            </Button>

            <Button
              skin="negative"
              skinVariation="muted"
              onClick={() => {
                setValue((v) => v - 1);
              }}>
              Decrease
            </Button>

            <Button skin="secondary" skinVariation="muted" onClick={toggleOpen}>
              Close
            </Button>
          </>
        }
        onDismiss={toggleOpen}>
        <Text margin="none">Update the counter values</Text>
        <Text margin="none"> Counter ({value})</Text>
      </Dialog>
    </>
  );
};

const SelectField = (): React.ReactElement => (
  <Select placeholder="Select">
    <Select.Option>1</Select.Option>
    <Select.Option>2</Select.Option>
    <Select.Option>3</Select.Option>
  </Select>
);

const AllItems = ({ children }: { readonly children: React.ReactNode }): React.ReactElement => {
  const snackbar = useSnackbar();

  return (
    <Card>
      <Text variation="h2">All Items</Text>

      <Grid>
        <Grid.Column>
          <WithDropdown>{children}</WithDropdown>
        </Grid.Column>
        <Grid.Column>
          <WithModal>{children}</WithModal>
        </Grid.Column>
        <Grid.Column>
          <WithDialog>{children}</WithDialog>
        </Grid.Column>
        <Grid.Column>
          <WithTooltip>{children}</WithTooltip>
        </Grid.Column>
        <Grid.Column>
          <WithTooltip>{children}</WithTooltip>
        </Grid.Column>
        <Grid.Column>
          <Button
            onClick={() => {
              snackbar.add(() => <Alert skin="positive">Alert</Alert>, {
                duration: "short",
              });
            }}>
            Alert
          </Button>
        </Grid.Column>
      </Grid>

      <div>{children}</div>
    </Card>
  );
};

const App = (): React.ReactElement => (
  <AllItems>
    <Text>{faker.lorem.paragraph()}</Text>

    <Counter />

    <SelectField />

    <AllItems>
      <Text>{faker.lorem.paragraph()}</Text>

      <Counter />

      <SelectField />

      <Actions />
    </AllItems>
  </AllItems>
);

export default meta;

type Story = StoryObj<typeof meta>;

export const demo: Story = {
  parameters: {
    layout: "padded",
  },
  render: (): React.ReactElement => <App />,
};
