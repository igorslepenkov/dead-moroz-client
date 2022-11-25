import styled from "styled-components";
import { Color, fonts } from "../../ui";

export const StyledAddAvatarForm = styled.form`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 10%;
`;

export const AddAvatarField = styled.input`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
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
