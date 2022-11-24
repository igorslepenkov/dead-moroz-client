import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Color, fonts, shadows } from "../../ui";

export const MenuWrapper = styled(motion.div)`
  position: fixed;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const StyledMenu = styled.div`
  display: grid;
  grid-template-rows: 2fr 8fr;
  width: 100%;
  height: 100%;
`;

export const MenuTop = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 120px;
  background: linear-gradient(
    80.43deg,
    #04494d 4.54%,
    #09425e 53.26%,
    #324382 96.24%
  );
`;

export const MenuTopText = styled.h2`
  ${fonts.h2}
  color: ${Color.White};
`;

export const MenuContent = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 5%;
  padding-top: 15%;
  background-color: ${Color.White};
`;

export const MenuLink = styled(Link)`
  ${fonts.h2}
  text-decoration: none;
  color: ${Color.PrimaryMain};

  &:hover {
    color: ${Color.PrimaryHover};
  }
`;

export const CloseMenuButton = styled.button`
  position: absolute;
  top: 3%;
  right: 3%;
  padding: 10px;
  background-color: ${Color.White};
  border: none;
  border-radius: 20px;

  &:active {
    ${shadows.shadow8Inset(Color.PrimaryPressed)}
  }
`;
