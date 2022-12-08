import styled from "styled-components";
import { shadows, Color, fonts, Media } from "../../ui";

interface ITabProps {
  active: boolean;
}

export const AuthFormWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 9fr;
  column-gap: 10px;
  row-gap: 10px;
  padding: 15px;
  margin: auto;
  width: 300px;
  ${shadows.shadow8()}

  ${Media.SM} {
    width: 400px;
  }
`;

export const FormTab = styled.button<ITabProps>`
  box-sizing: border-box;
  border: 5px solid transparent;
  border-bottom: ${({ active }) =>
    active
      ? `5px solid ${Color.PrimaryPressed}`
      : `5px solid ${Color.PrimaryHover}`};

  background-color: ${Color.White};

  ${fonts.h3}
  color: ${({ active }) => (active ? Color.PrimaryPressed : Color.DarkGray)};

  cursor: pointer;

  &:hover {
    border-bottom: 5px solid ${Color.PrimaryFocused};
    color: ${Color.PrimaryHover};
  }

  &:active {
    border: 5px solid ${Color.PrimaryHover};
  }
`;

export const AuthFormInnerWrapper = styled.div`
  grid-column: 1 / 3;
  grid-row: 2 / 3;

  display: flex;
  justify-content: center;
  align-items: stretch;
`;
