import styled from "styled-components";
import { Color, fonts } from "../../ui";

interface TextareaStyleProps {
  isError: boolean;
}

export const StyledFormTextarea = styled.textarea<TextareaStyleProps>`
  height: 100px;
  border: 1px solid
    ${({ isError }) => {
      if (!isError) {
        return Color.LightGray;
      }
      return Color.DangerMain;
    }};
  border-radius: 4px;
  padding: 6px 12px;
  color: ${Color.DarkGray};
  outline: none;

  &::placeholder {
    ${fonts.bodyTextNormal}
    color: ${Color.Gray};
    opacity: 1;
  }

  &:hover {
    border: 1px solid ${Color.PrimaryHover};
  }

  &:focus {
    border: 3px solid ${Color.PrimaryBorder};
  }
`;
