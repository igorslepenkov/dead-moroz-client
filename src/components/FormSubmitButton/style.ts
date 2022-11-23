import styled from "styled-components";
import { Color, fonts } from "../../ui";

export const StyledFormSubmitButton = styled.button`
  padding: 8px 16px;
  background-color: ${Color.PrimaryMain};
  border: 3px solid transparent;
  border-radius: 4px;
  ${fonts.bodyTextLarge};
  color: ${Color.White};
  cursor: pointer;

  &:hover {
    background-color: ${Color.PrimaryHover};
  }

  &:active {
    background-color: ${Color.PrimaryPressed};
  }

  &:focus {
    border: 3px solid ${Color.PrimaryFocused};
  }
`;
