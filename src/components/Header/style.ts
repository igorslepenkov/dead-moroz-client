import { Link } from "react-router-dom";
import styled from "styled-components";

import { Color, fonts, Media, shadows } from "../../ui";

export const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1fr;
  align-items: center;
  justify-content: space-around;
  height: 120px;
  padding: 0 20px;
  background: linear-gradient(
    80.43deg,
    #04494d 4.54%,
    #09425e 53.26%,
    #324382 96.24%
  );
  border-radius: 5px 5px 8px 8px;

  ${Media.SM} {
    min-height: 80px;
    grid-template-columns: 10fr 5fr;
    grid-template-rows: 1fr;
  }
`;

export const LogoText = styled.h2`
  ${fonts.h2}
  color: ${Color.White};
`;

export const Logo = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  &:hover ${LogoText} {
    color: ${Color.PrimaryBorder};
  }

  &:active ${LogoText} {
    color: ${Color.PrimaryFocused};
  }

  ${Media.SM} {
    justify-content: unset;
  }
`;

export const Navbar = styled.nav`
  display: none;
  justify-content: space-between;

  ${Media.SM} {
    display: flex;
  }
`;

export const Navlink = styled(Link)`
  ${fonts.h3}
  text-decoration: none;
  color: ${Color.White};

  &:hover {
    color: ${Color.PrimaryBorder};
  }

  &:active {
    color: ${Color.PrimaryFocused};
  }
`;

export const SignOutLink = styled.a`
  ${fonts.h3}
  text-decoration: none;
  color: ${Color.White};
  cursor: pointer;

  &:hover {
    color: ${Color.PrimaryBorder};
  }

  &:active {
    color: ${Color.PrimaryFocused};
  }
`;

export const BurgerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin-bottom: 10px;
  background-color: ${Color.White};
  border-radius: 20px;

  &:active {
    ${shadows.shadow8Inset(Color.PrimaryPressed)}
  }
`;
