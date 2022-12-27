import { useEffect } from "react";
import {
  getUserError,
  getUserIsLoading,
  getUserServerMessage,
  useAppSelector,
  getModalIsOpen,
  getChildInfoIsLoading,
  getChildInfoError,
  getChildInfoServerMessage,
  getMorozInfoGeneralLoading,
  getMorozInfoGeneralError,
  getMorozInfoElvesLoading,
  getMorozInfoElvesError,
  getMorozInfoElvesMessage,
  useAppDispatch,
  toggleModal,
} from "../../store";
import {
  NotificationModal,
  NotificationModalStatus,
} from "../NotificationModal";

export const ModalListener = () => {
  const isModalOpen = useAppSelector(getModalIsOpen);

  const dispatch = useAppDispatch();

  const handleToggleModal = () => {
    dispatch(toggleModal());
  };

  const userloading = useAppSelector(getUserIsLoading);
  const userError = useAppSelector(getUserError);
  const userMessage = useAppSelector(getUserServerMessage);

  const childInfoIsLoading = useAppSelector(getChildInfoIsLoading);
  const childInfoError = useAppSelector(getChildInfoError);
  const childInfoMessage = useAppSelector(getChildInfoServerMessage);

  const morozInfoGeneralLoading = useAppSelector(getMorozInfoGeneralLoading);
  const morozInfoGeneralError = useAppSelector(getMorozInfoGeneralError);

  const morozInfoElvesLoading = useAppSelector(getMorozInfoElvesLoading);
  const morozInfoElvesError = useAppSelector(getMorozInfoElvesError);
  const morozInfoElvesMessage = useAppSelector(getMorozInfoElvesMessage);

  useEffect(() => {
    if (
      userloading ||
      childInfoIsLoading ||
      morozInfoGeneralLoading ||
      morozInfoElvesLoading
    ) {
      return;
    }
    handleToggleModal();
  }, [
    userError,
    userMessage,
    childInfoError,
    childInfoMessage,
    morozInfoGeneralError,
    morozInfoElvesError,
    morozInfoElvesMessage,
  ]);

  if (userError || userMessage) {
    return (
      <>
        <NotificationModal
          isOpen={isModalOpen}
          status={
            userError
              ? NotificationModalStatus.Error
              : NotificationModalStatus.Success
          }
          message={userError ? userError : userMessage || "Oooooooooooooops"}
          handler={handleToggleModal}
        />
      </>
    );
  }

  if (childInfoError || childInfoMessage) {
    return (
      <>
        <NotificationModal
          isOpen={isModalOpen}
          status={
            childInfoError
              ? NotificationModalStatus.Error
              : NotificationModalStatus.Success
          }
          message={
            childInfoError
              ? childInfoError
              : childInfoMessage || "Oooooooooooooops"
          }
          handler={handleToggleModal}
        />
      </>
    );
  }

  if (morozInfoGeneralError) {
    return (
      <>
        <NotificationModal
          isOpen={isModalOpen}
          status={NotificationModalStatus.Error}
          message={morozInfoGeneralError}
          handler={handleToggleModal}
        />
      </>
    );
  }

  if (morozInfoElvesError || morozInfoElvesMessage) {
    return (
      <>
        <NotificationModal
          isOpen={isModalOpen}
          status={
            morozInfoElvesError
              ? NotificationModalStatus.Error
              : NotificationModalStatus.Success
          }
          message={
            morozInfoElvesError
              ? morozInfoElvesError
              : morozInfoElvesMessage || "Oooooooooooooops"
          }
          handler={handleToggleModal}
        />
      </>
    );
  }

  return null;
};
