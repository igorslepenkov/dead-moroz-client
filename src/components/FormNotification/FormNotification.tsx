import { ReactNode } from "react";
import { StyledFormNotification } from "./style";

export enum FormNotificationType {
  Success = "success",
  Error = "error",
}

interface IProps {
  children: ReactNode;
  type: FormNotificationType;
}

export const FormNotification = ({ children, type }: IProps) => {
  return (
    <StyledFormNotification type={type}>{children}</StyledFormNotification>
  );
};
