import { useNavigate } from "react-router-dom";

import { ROUTES_URL } from "../../router";

import {
  getUser,
  signOutUser,
  useAppDispatch,
  useAppSelector,
} from "../../store";

import { USER_ROLES } from "../../types";

import { DeadMorozLogo } from "../../assets";

import { Portal, PortalTarget } from "../Portal";

import {
  MenuContent,
  MenuLink,
  MenuTop,
  MenuWrapper,
  StyledMenu,
  CloseMenuButton,
  MenuTopText,
  SignOutMenuLink,
} from "./style";

interface IProps {
  isOpen: boolean;
  toggle: () => void;
}

export const Menu = ({ isOpen, toggle }: IProps) => {
  const user = useAppSelector(getUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(signOutUser());
    navigate(ROUTES_URL.HOME);
    toggle();
  };

  const variant = isOpen ? "opened" : "closed";
  const menuVariants = {
    opened: {
      x: 0,
    },
    closed: {
      x: "+100%",
    },
  };

  const transition = { x: { duration: 0.9 }, type: "spring", stiffness: 100 };
  return (
    <Portal target={PortalTarget.MENU}>
      <MenuWrapper
        variants={menuVariants}
        initial="closed"
        animate={variant}
        transition={transition}
      >
        <StyledMenu>
          <MenuTop>
            <DeadMorozLogo />
            <MenuTopText>Dead Moroz App</MenuTopText>
          </MenuTop>
          <MenuContent>
            <MenuLink to={ROUTES_URL.HOME} onClick={toggle}>
              Home
            </MenuLink>

            {user && user.role === USER_ROLES.Child && (
              <>
                <MenuLink to={ROUTES_URL.CHILD_PROFILE} onClick={toggle}>
                  Profile
                </MenuLink>
                <MenuLink to={ROUTES_URL.CHILD_WISHLIST} onClick={toggle}>
                  Whishlist
                </MenuLink>
              </>
            )}

            {user && user.role === USER_ROLES.Elf && (
              <>
                <MenuLink to={ROUTES_URL.ElfDashboard} onClick={toggle}>
                  Dashboard
                </MenuLink>
              </>
            )}

            {user ? (
              <SignOutMenuLink onClick={signOut}>Sign Out</SignOutMenuLink>
            ) : (
              <MenuLink to={ROUTES_URL.AUTHENTICATION} onClick={toggle}>
                Sign In / Register
              </MenuLink>
            )}
          </MenuContent>
        </StyledMenu>
        <CloseMenuButton onClick={toggle}>Close</CloseMenuButton>
      </MenuWrapper>
    </Portal>
  );
};
