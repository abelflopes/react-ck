import "react";

declare module "react" {
  // Force merge of interface to allow usage of css variables
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
