import { ReactNode } from "react";
import { StyledFormInputLabel } from "./style";

interface IProps {
  htmlFor: string;
  children: ReactNode;
}

export const FormInputLabel = ({ htmlFor, children }: IProps) => {
  return (
    <StyledFormInputLabel htmlFor={htmlFor}>{children}</StyledFormInputLabel>
  );
};
