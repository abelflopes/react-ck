export interface Item {
  id: string;
  element: React.ReactNode;
}

export type ElementCreator = (id: Item["id"]) => Item["element"];

export interface AddOptions {
  /** Duration time for the item to be displayed */
  duration?: number;
}

export interface SnackbarContextProps {
  add: (elementCreator: ElementCreator, options?: AddOptions) => Item["id"];
  remove: (id: Item["id"]) => void;
}
