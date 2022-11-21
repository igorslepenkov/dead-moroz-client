import { forwardRef } from "react";
import { StyledFormTextarea } from "./style";

interface ITextareaStyleProps {
  isError: boolean;
}

type TextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  ITextareaStyleProps;

export const FormTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => <StyledFormTextarea {...props} ref={ref} />
);
