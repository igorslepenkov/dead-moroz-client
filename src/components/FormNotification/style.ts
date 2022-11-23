import styled from "styled-components";
import { Color, fonts } from "../../ui";
import { FormNotificationType } from "./FormNotification";

interface INotificationProps {
  type: FormNotificationType;
}

export const StyledFormNotification = styled.p<INotificationProps>`
  ${fonts.bodyTextSmall}
  color: ${({ type }) =>
    type === FormNotificationType.Error ? Color.DangerMain : Color.SuccessMain};
`;
