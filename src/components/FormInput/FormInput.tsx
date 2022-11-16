import { forwardRef } from "react";
import { StyledFormInput } from "./style";

interface IInputStyleProps {
  error: boolean;
}

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  IInputStyleProps;

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <StyledFormInput {...props} ref={ref} />
);
