import { Page } from "../../components";

import { backgroundImageWinter } from "../../assets";

import {
  ChildProfilePageBody,
  ChildProfileBodyText,
  ChildProfileTitle,
  Button,
} from "./style";
import { Questionnaire } from "../../components/Questionnaire";

import { useToggle } from "../../hooks";

export const ChildProfile = () => {
  const [isSurveyStarted, toggleSurvey] = useToggle();
  return (
    <Page backgroundImage={backgroundImageWinter}>
      <ChildProfilePageBody>
        {isSurveyStarted ? (
          <Questionnaire closeQuestionnaire={toggleSurvey} />
        ) : (
          <>
            <ChildProfileTitle>
              Are you ready? Click button to start
            </ChildProfileTitle>
            <ChildProfileBodyText>
              Pass a quick questionnaire to form your own letter to Dead Moroz
            </ChildProfileBodyText>
            <Button onClick={toggleSurvey}>Start !!!</Button>
          </>
        )}
      </ChildProfilePageBody>
    </Page>
  );
};
