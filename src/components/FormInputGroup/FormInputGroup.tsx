import { ReactNode } from "react";
import { StyledFormInputGroup } from "./style";

interface IProps {
  children: ReactNode;
}

export const FormInputGroup = ({ children }: IProps) => {
  return <StyledFormInputGroup>{children}</StyledFormInputGroup>;
};
