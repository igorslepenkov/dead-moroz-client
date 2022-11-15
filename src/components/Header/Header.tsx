import { DeadMorozLogo } from "../../assets";
import { ROUTES_URL } from "../../router";
import { StyledHeader, Logo, LogoText, Navbar, Navlink } from "./style";

export const Header = () => {
  return (
    <StyledHeader>
      <Logo to={ROUTES_URL.HOME}>
        <DeadMorozLogo />
        <LogoText>Dead Moroz App</LogoText>
      </Logo>
      <Navbar>
        <Navlink to={ROUTES_URL.HOME}>Home</Navlink>
        <Navlink to={ROUTES_URL.HOME}>About Us</Navlink>
        <Navlink to={ROUTES_URL.HOME}>Register / Sign In</Navlink>
      </Navbar>
    </StyledHeader>
  );
};
