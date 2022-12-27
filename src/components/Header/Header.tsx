import { DeadMorozLogo } from "../../assets";
import { useToggle, useWindowSize } from "../../hooks";
import { ROUTES_URL } from "../../router";
import {
  getUser,
  getUserIsLoggedIn,
  signOutUser,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { USER_ROLES } from "../../types";
import { MediaBreakpoints } from "../../ui";
import { BurgerButton } from "../BurgerButton";
import { Menu } from "../Menu";
import { ModalListener } from "../ModalLisntener";
import {
  StyledHeader,
  Logo,
  LogoText,
  Navbar,
  Navlink,
  SignOutLink,
  BurgerWrapper,
} from "./style";

export const Header = () => {
  const [isMenuOpen, toggleMenu] = useToggle();

  const { width: widnowWidth } = useWindowSize();

  const user = useAppSelector(getUser);
  const isUserLoggedIn = useAppSelector(getUserIsLoggedIn);
  const dispatch = useAppDispatch();

  const signOutOnClick = () => {
    dispatch(signOutUser());
  };

  return (
    <StyledHeader>
      <Logo to={ROUTES_URL.HOME}>
        <DeadMorozLogo />
        <LogoText>Dead Moroz App</LogoText>
      </Logo>
      {widnowWidth < MediaBreakpoints.MD && (
        <BurgerWrapper onClick={toggleMenu}>
          <BurgerButton isOpen={isMenuOpen} />
        </BurgerWrapper>
      )}
      {widnowWidth < MediaBreakpoints.MD && (
        <Menu isOpen={isMenuOpen} toggle={toggleMenu} />
      )}
      <Navbar>
        <Navlink to={ROUTES_URL.HOME}>Home</Navlink>
        {user && user.role === USER_ROLES.Child && (
          <>
            <Navlink to={ROUTES_URL.CHILD_PROFILE}>Profile</Navlink>
            <Navlink to={ROUTES_URL.CHILD_WISHLIST}>Wishlist</Navlink>
          </>
        )}

        {user &&
          (user.role === USER_ROLES.Elf ||
            user.role === USER_ROLES.DeadMoroz) && (
            <>
              <Navlink to={ROUTES_URL.ElfDashboard}>Dashboard</Navlink>
            </>
          )}
        {user && user.role === USER_ROLES.DeadMoroz && (
          <>
            <Navlink to={ROUTES_URL.MorozBoard}>MorozBoard</Navlink>
          </>
        )}
        {isUserLoggedIn ? (
          <SignOutLink onClick={signOutOnClick}>Sign Out</SignOutLink>
        ) : (
          <Navlink to={ROUTES_URL.AUTHENTICATION}>Register / Sign In</Navlink>
        )}
      </Navbar>
      <ModalListener />
    </StyledHeader>
  );
};
