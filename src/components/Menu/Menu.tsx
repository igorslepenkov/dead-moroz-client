import { ROUTES_URL } from "../../router";

import { getUser, useAppSelector } from "../../store";

import { DeadMorozLogo } from "../../assets";

import {
  MenuContent,
  MenuLink,
  MenuTop,
  MenuWrapper,
  StyledMenu,
  CloseMenuButton,
  MenuTopText,
} from "./style";
import { USER_ROLES } from "../../types";
import { Portal, PortalTarget } from "../Portal";

interface IProps {
  isOpen: boolean;
  toggle: () => void;
}

export const Menu = ({ isOpen, toggle }: IProps) => {
  const user = useAppSelector(getUser);

  const variant = isOpen ? "opened" : "closed";
  const menuVariants = {
    opened: {
      x: 0,
    },
    closed: {
      x: "+100%",
    },
  };

  const transition = { x: { duration: 1 }, type: "spring", stiffness: 100 };
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

            <MenuLink to={ROUTES_URL.AUTHENTICATION} onClick={toggle}>
              Sign In / Register
            </MenuLink>

            {user && user.role === USER_ROLES.Child && (
              <MenuLink to={ROUTES_URL.CHILD_PROFILE} onClick={toggle}>
                Profile
              </MenuLink>
            )}
          </MenuContent>
        </StyledMenu>
        <CloseMenuButton onClick={toggle}>Close</CloseMenuButton>
      </MenuWrapper>
    </Portal>
  );
};
