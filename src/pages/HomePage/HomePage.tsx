import { useEffect, useState } from "react";

import { HomepageBody } from "./style";

import {
  NotificationModal,
  NotificationModalStatus,
  Page,
} from "../../components";

import { homepageBackgroundImage } from "../../assets";

import { ConfrimationStatus, useConfirmationParams } from "../../hooks";

import { HomePageContent } from "./HomePageContent";

export const HomePage = () => {
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
    <Page backgroundImagePath={homepageBackgroundImage}>
      <HomepageBody>
        <HomePageContent />
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
