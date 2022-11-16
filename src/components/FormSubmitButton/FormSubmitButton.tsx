import { ReactNode } from "react";
import { StyledFormSubmitButton } from "./style";

interface IProps {
  children: ReactNode;
}

export const FormSubmitButton = ({ children }: IProps) => {
  return (
    <StyledFormSubmitButton type="submit">{children}</StyledFormSubmitButton>
  );
};
