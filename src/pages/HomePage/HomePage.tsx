import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  HomepageBody,
  SignInButton,
  HomepageTitle,
  HomepageBodyText,
} from "./style";

import { NotificationModal, Page } from "../../components";

import { homepageBackgroundImage } from "../../assets";

import { ROUTES_URL } from "../../router";

import { ConfrimationStatus, useConfirmationParams } from "../../hooks";

import { NotificationModalStatus } from "../../components/NotificationModal";

export const HomePage = () => {
  const navigate = useNavigate();
  const onSignInClick = () => {
    navigate(ROUTES_URL.AUTHENTICATION);
  };

  const { confirmation, error } = useConfirmationParams();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const toggleConfirmationModal = () => {
    setIsConfirmationModalOpen(!isConfirmationModalOpen);
  };

  useEffect(() => {
    if (confirmation) {
      toggleConfirmationModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmation]);

  return (
    <Page backgroundImage={homepageBackgroundImage}>
      <HomepageBody>
        <HomepageTitle>Welcome to Dead Moroz App!</HomepageTitle>
        <HomepageBodyText>Please sign in to continue</HomepageBodyText>
        <SignInButton onClick={onSignInClick}>Sign In !</SignInButton>
      </HomepageBody>
      {confirmation && (
        <NotificationModal
          isOpen={isConfirmationModalOpen}
          status={
            confirmation === ConfrimationStatus.Success
              ? NotificationModalStatus.Success
              : NotificationModalStatus.Error
          }
          message={
            confirmation === ConfrimationStatus.Success
              ? "Your confirmation was successful. You may continue using app"
              : error || "Seem confirmation was not successful"
          }
          handler={toggleConfirmationModal}
        />
      )}
    </Page>
  );
};
