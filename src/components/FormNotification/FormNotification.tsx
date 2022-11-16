import { ReactNode } from "react";
import { StyledFormNotification } from "./style";

interface IProps {
  children: ReactNode;
  type: "success" | "error";
}

export const FormNotification = ({ children, type }: IProps) => {
  return (
    <StyledFormNotification type={type}>{children}</StyledFormNotification>
  );
};
