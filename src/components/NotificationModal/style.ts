import styled from "styled-components";
import { Color, fonts, shadows } from "../../ui";

interface ModalStatusProps {
  status: "success" | "error";
}

export const StyledModal = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ModalNotificationWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr;
  grid-template-rows: 1fr 3fr 1fr;
  align-items: center;
  width: 300px;
  padding: 15px;
  background-color: ${Color.White};
  border: 2px solid #e7e7e7;
  border-radius: 10px;
  ${shadows.shadow8()}
  text-align: center;
`;

export const MarkWrapper = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const ModalStatusHeading = styled.h2<ModalStatusProps>`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  ${fonts.h3}
  color: ${({ status }) =>
    status === "success" ? Color.SuccessMain : Color.DangerMain};
`;

export const ModalNotification = styled.p`
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  ${fonts.bodyTextLarge}
  color: ${Color.Black};
`;

export const CloseButton = styled.button<ModalStatusProps>`
  grid-row: 3 / 4;
  grid-column: 2 / 3;
  justify-self: flex-end;
  padding: 8px 16px;
  ${fonts.bodyTextLarge}
  color: ${Color.White};
  background-color: ${({ status }) =>
    status === "success" ? Color.SuccessMain : Color.DangerMain};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ status }) =>
      status === "success" ? Color.SuccessHover : Color.DangerHover};
  }
`;
