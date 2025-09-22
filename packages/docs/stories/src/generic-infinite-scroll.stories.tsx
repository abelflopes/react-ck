/* eslint-disable react-hooks/rules-of-hooks -- exception for storybook */
import React, { useState, useCallback, useEffect } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import {
  Text,
  InfiniteScroll,
  Flex,
  Card,
  Skeleton,
  Spinner,
  Manager,
  VirtualizedList,
  VirtualizedListProps,
} from "react-ck";
import { configureStory } from "@react-ck/storybook-utils";

const VirtualizedListWrapper: VirtualizedListProps["Wrapper"] = ({ children }) => (
  <Flex direction="column" align="stretch" spacing="s">
    {children}
  </Flex>
);

const meta: Meta<typeof InfiniteScroll> = {
  title: "Generic/InfiniteScroll",
  ...configureStory(InfiniteScroll, {
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

// Helper function to generate mock data
const generateMockItems = (
  count: number,
  idFrom: number,
): Array<{
  id: number;
  title: string;
  content: string;
  timestamp: string;
}> =>
  Array.from({ length: count }, (_, index) => ({
    id: idFrom + index + 1,
    title: faker.lorem.sentence(3),
    content: faker.lorem.paragraph(),
    timestamp: faker.date.recent().toLocaleDateString(),
  }));

const ITEMS_PER_PAGE = 3;
const TOTAL_ITEMS = 31;

const customLoadingElement = (
  <>
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </>
);

const customLoadingMoreElement = (
  <Flex justify="center" spacing="l">
    <Spinner />
    <Text margin="top" variation="small">
      Loading more items...
    </Text>
  </Flex>
);

export const Default: Story = {
  parameters: {
    layout: "padded",
    docs: {
      source: {
        type: "code",
      },
    },
  },
  args: {
    mode: "enable-once",
    loadMoreButton: "Load more items",
    displayLoadMore: true,
    loadingMoreElement: customLoadingMoreElement,
    loadingElement: customLoadingElement,
    direction: "bottom",
  },
  render: (args) => {
    const [items, setItems] = useState<ReturnType<typeof generateMockItems>>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const handleLoadMore = useCallback(() => {
      setLoadingMore(true);

      setTimeout(() => {
        const newItems = generateMockItems(ITEMS_PER_PAGE, items.length);
        setItems(() =>
          args.direction === "bottom" ? [...items, ...newItems] : [...newItems.reverse(), ...items],
        );
        setLoadingMore(false);
      }, 1500);
    }, [args.direction, items]);

    // load intially
    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        const initialItems = generateMockItems(ITEMS_PER_PAGE, 0);
        setItems(() =>
          args.direction === "bottom" ? [...initialItems] : [...initialItems.reverse()],
        );
        setLoading(false);
      }, 1500);
    }, [args.direction]);

    return (
      <div style={{ maxHeight: "50vh", overflow: "auto" }}>
        <Flex direction="column" align="stretch" spacing="s">
          <InfiniteScroll
            {...args}
            loaded={items.length}
            total={TOTAL_ITEMS}
            loading={loading}
            loadingMore={loadingMore}
            onLoadMore={handleLoadMore}>
            <VirtualizedList
              defaultItemHeight={90}
              Wrapper={VirtualizedListWrapper}
              items={items.map((item) => (
                <Card key={item.id} skin="bordered">
                  <Text skin="bold" margin="none">
                    {item.id} - {item.title}
                  </Text>
                  <Text margin="top" variation="small">
                    {item.content}
                  </Text>
                </Card>
              ))}
            />
          </InfiniteScroll>
        </Flex>
      </div>
    );
  },
};
/* eslint-enable react-hooks/rules-of-hooks */

export const Reversed: Story = {
  ...Default,
  args: {
    ...Default.args,
    direction: "top",
  },
};
