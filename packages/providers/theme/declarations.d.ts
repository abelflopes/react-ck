import "react";

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export = classes;
}
