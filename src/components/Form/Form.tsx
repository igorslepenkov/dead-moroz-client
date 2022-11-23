import { ReactNode } from "react";

import { StyledForm } from "./style";

interface IProps {
  children: ReactNode;
  onSubmit: () => void;
}

export const Form = ({ children, onSubmit }: IProps) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};
