import styled from "styled-components";
import { Color, fonts, Media } from "../../ui";

export const StyledAddNewElfForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${Media.SM} {
    width: 350px;
    margin: 20px auto;
  }

  ${Media.MD} {
    width: 500px;
  }
`;

export const CloseButon = styled.button`
  padding: 8px 16px;
  background-color: ${Color.DangerMain};
  border: 3px solid transparent;
  border-radius: 4px;
  ${fonts.bodyTextLarge};
  color: ${Color.White};
  cursor: pointer;

  &:hover {
    background-color: ${Color.DangerHover};
  }

  &:active {
    background-color: ${Color.DangerPressed};
  }

  &:focus {
    border: 3px solid ${Color.DangerFocus};
  }
`;
