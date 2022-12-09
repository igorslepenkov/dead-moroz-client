import { useState } from "react";

import { ChildProfile, Page } from "../../components";

import { backgroundImageWinter } from "../../assets";

import { getUser, useAppSelector } from "../../store";

import { Questionnaire } from "../../components/Questionnaire";

import {
  ChildProfilePageBody,
  ChildProfileBodyText,
  ChildProfileTitle,
  Button,
} from "./style";

export enum SurveyStatus {
  Ready = "ready",
  InProcess = "inProcess",
  Success = "success",
}

export const ChildProfilePage = () => {
  const user = useAppSelector(getUser);
  const [currentSurveyStatus, setCurrentSurveyStatus] = useState<SurveyStatus>(
    () => {
      if (user && user.childProfile) {
        return SurveyStatus.Success;
      }

      return SurveyStatus.Ready;
    }
  );

  const toggleCurrentStatus = () => {
    switch (currentSurveyStatus) {
      case SurveyStatus.Ready:
        setCurrentSurveyStatus(SurveyStatus.InProcess);
        break;
      case SurveyStatus.InProcess:
        setCurrentSurveyStatus(SurveyStatus.Success);
        break;
      default:
        setCurrentSurveyStatus(SurveyStatus.Ready);
    }
  };

  if (!user) {
    return null;
  }

  if (currentSurveyStatus === SurveyStatus.Success && user.childProfile) {
    return (
      <Page>
        <ChildProfile childProfile={user.childProfile} />
      </Page>
    );
  }

  return (
    <Page backgroundImagePath={backgroundImageWinter}>
      <ChildProfilePageBody>
        {currentSurveyStatus === SurveyStatus.InProcess ? (
          <>
            <Questionnaire closeQuestionnaire={toggleCurrentStatus} />
          </>
        ) : (
          <>
            <ChildProfileTitle>
              Are you ready? Click button to start
            </ChildProfileTitle>
            <ChildProfileBodyText>
              Pass a quick questionnaire to form your own letter to Dead Moroz
            </ChildProfileBodyText>
            <Button onClick={toggleCurrentStatus}>Start !!!</Button>
          </>
        )}
      </ChildProfilePageBody>
    </Page>
  );
};
