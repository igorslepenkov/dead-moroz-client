import { Outlet, resolvePath } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import { ROUTES_URL } from "../../router";
import { useToggle } from "../../hooks";
import {
  BoardContent,
  BoardHeader,
  BoardMenu,
  BoardMenuSwitchersList,
  BoardMenuTop,
  HeaderMenuButton,
  StyledMorozBoard,
  Switcher,
} from "./style";
import { useState } from "react";

enum MorozBoardLink {
  Info = "info",
  Elves = "elves",
  Children = "children",
}

export const MorozBoard = () => {
  const [isMenuOpen, toggleMenuOpen] = useToggle(true);
  const [activeLink, setActiveLink] = useState<MorozBoardLink>(
    MorozBoardLink.Info
  );
  const switchActiveLink = (link: MorozBoardLink) => {
    setActiveLink(link);
  };

  return (
    <StyledMorozBoard isMenuOpen={isMenuOpen}>
      <BoardMenu isMenuOpen={isMenuOpen}>
        <BoardMenuTop>MorozBoard 2.0</BoardMenuTop>
        <BoardMenuSwitchersList>
          <Switcher
            to={resolvePath(ROUTES_URL.MorozBoard)}
            isActive={activeLink === "info"}
            onClick={() => switchActiveLink(MorozBoardLink.Info)}
          >
            <i className="fa-solid fa-circle-info"></i> Info
          </Switcher>
          <Switcher
            to={ROUTES_URL.ElvesInfo}
            isActive={activeLink === "elves"}
            onClick={() => switchActiveLink(MorozBoardLink.Elves)}
          >
            <i className="fa-solid fa-user-nurse"></i> Elves
          </Switcher>
          <Switcher
            to={ROUTES_URL.ChildrenInfo}
            isActive={activeLink === "children"}
            onClick={() => switchActiveLink(MorozBoardLink.Children)}
          >
            <i className="fa-solid fa-child"></i> Children
          </Switcher>
        </BoardMenuSwitchersList>
      </BoardMenu>
      <BoardHeader isMenuOpen={isMenuOpen}>
        <HeaderMenuButton onClick={toggleMenuOpen}>
          {isMenuOpen ? (
            <MenuOpenIcon fontSize="large" />
          ) : (
            <MenuIcon fontSize="large" />
          )}
        </HeaderMenuButton>
      </BoardHeader>
      <BoardContent isMenuOpen={isMenuOpen}>
        <Outlet />
      </BoardContent>
    </StyledMorozBoard>
  );
};
