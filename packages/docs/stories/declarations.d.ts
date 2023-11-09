declare module "*.md" {
  const content: string;
  export default content;
}

declare module "*.module.scss" {
  const content: Record<string, string>;
  export default content;
}
