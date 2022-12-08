import { ReactNode } from "react";
import { StyledPage } from "./style";

interface IProps {
  backgroundImagePath?: string;
  children: ReactNode;
}

export const Page = ({ children, backgroundImagePath }: IProps) => {
  return (
    <StyledPage backgroundImagePath={backgroundImagePath}>
      {children}
    </StyledPage>
  );
};
