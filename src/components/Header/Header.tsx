import { DeadMorozLogo } from "../../assets";
import { useToggle } from "../../hooks";
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
import { NotificationModal } from "../NotificationModal";
import {
  StyledHeader,
  Logo,
  LogoText,
  Navbar,
  Navlink,
  SignOutLink,
} from "./style";

export const Header = () => {
  const [isModalOpen, toggleModal] = useToggle(false);

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
          status={userSignOutError ? "error" : "success"}
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
