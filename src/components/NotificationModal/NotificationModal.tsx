import { Portal, PortalTarget } from "../Portal";
import {
  CloseButton,
  ModalNotification,
  ModalNotificationWrapper,
  ModalStatusHeading,
  StyledModal,
  MarkWrapper,
} from "./style";

import { AlertTriangle, SuccessMark } from "../../assets/icons";

export enum NotificationModalStatus {
  Success = "success",
  Error = "error",
}

interface IProps {
  isOpen: boolean;
  status: NotificationModalStatus;
  message: string;
  handler: () => void;
}

export const NotificationModal = ({
  isOpen,
  status,
  message,
  handler,
}: IProps) => {
  return isOpen ? (
    <Portal target={PortalTarget.MODAL}>
      <StyledModal>
        <ModalNotificationWrapper>
          <MarkWrapper>
            {status === NotificationModalStatus.Success ? (
              <SuccessMark />
            ) : (
              <AlertTriangle />
            )}
          </MarkWrapper>
          <CloseButton status={status} type="button" onClick={handler}>
            Close
          </CloseButton>
          <ModalStatusHeading status={status}>
            {status.toUpperCase()}
          </ModalStatusHeading>
          <ModalNotification>{message}</ModalNotification>
        </ModalNotificationWrapper>
      </StyledModal>
    </Portal>
  ) : null;
};
