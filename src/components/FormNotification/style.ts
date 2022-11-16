import styled from "styled-components";
import { Color, fonts } from "../../ui";

interface INotificationProps {
  type: "success" | "error";
}

export const StyledFormNotification = styled.p<INotificationProps>`
  ${fonts.bodyTextSmall}
  color: ${({ type }) =>
    type === "error" ? Color.DangerMain : Color.SuccessMain};
`;
