import { ReactNode } from "react";
import { StyledPage } from "./style";

interface IProps {
  backgroundImage?: string;
  children: ReactNode;
}

export const Page = ({ children, backgroundImage }: IProps) => {
  return <StyledPage backgroundImage={backgroundImage}>{children}</StyledPage>;
};
