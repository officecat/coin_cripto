import "styled-components";

declare module "styled-components" {

export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    tagColor: string;
    accentColor: string;
  }
}