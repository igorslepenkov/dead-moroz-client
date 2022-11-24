import { DeadMorozLogo } from "../../assets";
import { useToggle, useWindowSize } from "../../hooks";
import { ROUTES_URL } from "../../router";
import {
  getUserError,
  getUserIsLoading,
  getUserIsLoggedIn,
  getUserServerMessage,
  signOutUser,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { MediaBreakpoints } from "../../ui";
import { BurgerButton } from "../BurgerButton";
import { Menu } from "../Menu";
import {
  NotificationModalStatus,
  NotificationModal,
} from "../NotificationModal";
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
  const [isModalOpen, toggleModal] = useToggle();
  const [isMenuOpen, toggleMenu] = useToggle();

  const { width: widnowWidth } = useWindowSize();

  const userSignOutError = useAppSelector(getUserError);
  const userServerMessage = useAppSelector(getUserServerMessage);
  const userIsLoading = useAppSelector(getUserIsLoading);
  const isUserLoggedIn = useAppSelector(getUserIsLoggedIn);
  const dispatch = useAppDispatch();

  const signOutOnClick = () => {
    dispatch(signOutUser());
    toggleModal();
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
        <Navlink to={ROUTES_URL.HOME}>About Us</Navlink>
        {isUserLoggedIn ? (
          <SignOutLink onClick={signOutOnClick}>Sign Out</SignOutLink>
        ) : (
          <Navlink to={ROUTES_URL.AUTHENTICATION}>Register / Sign In</Navlink>
        )}
      </Navbar>
      {!userIsLoading && (
        <NotificationModal
          isOpen={isModalOpen}
          status={
            userSignOutError
              ? NotificationModalStatus.Error
              : NotificationModalStatus.Success
          }
          message={
            userSignOutError
              ? userSignOutError
              : userServerMessage || "Oooooooooooooops"
          }
          handler={toggleModal}
        />
      )}
    </StyledHeader>
  );
};
