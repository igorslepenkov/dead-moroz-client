import { ReactNode } from "react";
import { StyledPage } from "./style";

interface IProps {
  backgroundimage?: string;
  children: ReactNode;
}

export const Page = ({ children, backgroundimage }: IProps) => {
  return <StyledPage backgroundimage={backgroundimage}>{children}</StyledPage>;
};
