import styled from "styled-components";
import { Color, fonts } from "../../ui";

export const StyledAddChildReviewForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  column-gap: 10%;
  row-gap: 10px;
  max-width: 500px;
`;

export const CancelButon = styled.button`
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
