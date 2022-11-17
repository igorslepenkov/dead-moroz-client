import { ReactNode } from "react";
import { StyledPage } from "./style";

interface IProps {
  children: ReactNode;
}

export const Page = ({ children }: IProps) => {
  return <StyledPage>{children}</StyledPage>;
};
