import { Link } from "react-router-dom";
import styled from "styled-components";

import { Color, fonts } from "../../ui";

export const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 10fr 5fr;
  align-items: center;
  justify-content: space-around;
  min-height: 80px;
  padding: 0 20px;
  background: linear-gradient(
    80.43deg,
    #04494d 4.54%,
    #09425e 53.26%,
    #324382 96.24%
  );
  border-radius: 5px 5px 8px 8px;
`;

export const LogoText = styled.h2`
  ${fonts.h2}
  color: ${Color.White};
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover ${LogoText} {
    color: ${Color.PrimaryBorder};
  }

  &:active ${LogoText} {
    color: ${Color.PrimaryFocused};
  }
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
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
