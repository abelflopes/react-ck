export interface Item {
  id: string;
  element: React.ReactNode;
}

export type ElementCreator = (id: Item["id"]) => Item["element"];
