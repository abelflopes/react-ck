/* eslint-disable react-hooks/rules-of-hooks -- exception for storybook */
import React, { useState, useCallback, useEffect } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { Text, InfiniteScroll, Flex, Card, Skeleton, Spinner, Manager } from "react-ck";
import { configureStory } from "@react-ck/storybook-utils";

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
): Array<{
  id: number;
  title: string;
  content: string;
  timestamp: string;
}> =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: faker.lorem.sentence(3),
    content: faker.lorem.paragraph(),
    timestamp: faker.date.recent().toLocaleDateString(),
  }));

const INITIAL_ITEMS = 3;
const TOTAL_ITEMS = 15;

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
  },
  render: () => {
    const [items, setItems] = useState(generateMockItems(0));
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const handleLoadMore = useCallback(() => {
      setLoadingMore(true);

      setTimeout(() => {
        const newItems = generateMockItems(3);
        setItems((prev) => [...prev, ...newItems]);
        setLoadingMore(false);
      }, 1500);
    }, []);

    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setItems(generateMockItems(INITIAL_ITEMS));
        setLoading(false);
      }, 1500);
    }, []);

    return (
      <Flex direction="column" align="stretch" spacing="s">
        <InfiniteScroll
          loaded={items.length}
          total={TOTAL_ITEMS}
          loading={loading}
          loadingMore={loadingMore}
          loadingElement={customLoadingElement}
          loadingMoreElement={customLoadingMoreElement}
          loadMoreButton="Load more items"
          displayLoadMore
          onLoadMore={handleLoadMore}>
          <Flex direction="column" align="stretch" spacing="s">
            {items.map((item) => (
              <Card key={item.id} skin="bordered">
                <Text skin="bold" margin="none">
                  {item.title}
                </Text>
                <Text margin="top" variation="small">
                  {item.content}
                </Text>
              </Card>
            ))}
          </Flex>
        </InfiniteScroll>
      </Flex>
    );
  },
};
/* eslint-enable react-hooks/rules-of-hooks */
