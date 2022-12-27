import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { Color, fonts, Media } from "../../ui";

interface IMenuOpenProps {
  isMenuOpen: boolean;
}

interface ISwitcherProps {
  // '$' sign in variable is for Styled Components not to render this prop to the DOM: https://styled-components.com/docs/api#transient-props
  $isActive: boolean;
}

export const StyledMorozBoard = styled.section<IMenuOpenProps>`
  display: grid;
  grid-template-columns: ${({ isMenuOpen }) =>
    isMenuOpen ? "2fr 9fr" : "1fr"};
  grid-template-rows: 1fr 9fr;
  height: calc(100vh - 120px);

  ${Media.SM} {
    height: calc(100vh - 80px);
  }
`;

export const BoardMenu = styled.aside<IMenuOpenProps>`
  z-index: 11;
  grid-column: 1 / 2;
  grid-row: 1 / 3;

  display: ${({ isMenuOpen }) => (isMenuOpen ? "grid" : "none")};
  grid-template-rows: 1fr 10fr;
  padding: 5px;
  border: 1px solid ${Color.LightGray};
  box-shadow: 2px 2px 3px ${Color.IceGray};
`;

export const BoardMenuTop = styled.div`
  grid-row: 1 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
  ${fonts.h3}
  color: ${Color.InfoMain};
  text-align: center;
`;

export const BoardMenuSwitchersList = styled.nav`
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding-top: 50px;
  overflow-y: overlay;
`;

export const Switcher = styled(Link)<ISwitcherProps>`
  padding: 10px;
  border-radius: 20px;
  text-decoration: none;
  ${fonts.h3}

  ${({ $isActive }) =>
    $isActive
      ? css`
          background-color: ${Color.InfoHover};
          color: ${Color.White};
        `
      : css`
          color: ${Color.Black};

          &:hover {
            background-color: ${Color.InfoFocus};
            color: ${Color.White};
          }
        `}
`;

export const BoardHeader = styled.header<IMenuOpenProps>`
  z-index: 10;
  ${({ isMenuOpen }) =>
    isMenuOpen
      ? css`
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        `
      : ""}

  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid ${Color.LightGray};
  border-left: none;
  box-shadow: 1px 3px 3px ${Color.IceGray};
`;

export const HeaderMenuButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const BoardContent = styled.section<IMenuOpenProps>`
  padding: 20px;
  ${({ isMenuOpen }) =>
    isMenuOpen
      ? css`
          grid-column: 2 / 3;
          grid-row: 2 / 3;
        `
      : ""}

  background-color: ${Color.WhiteGray};
`;
