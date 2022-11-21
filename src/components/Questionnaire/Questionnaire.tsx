import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IChildProfile } from "../../types";

import { questions, IQuestionProps } from "./Questions";

interface IProps {
  closeQuestionnaire: () => void;
}

export type QuestionObject = {
  title: keyof IChildProfile;
  element: React.FunctionComponent<IQuestionProps>;
};

export const Questionnaire = ({ closeQuestionnaire }: IProps) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<IChildProfile>({ mode: "onBlur" });

  const onSubmit = (data: IChildProfile) => {
    console.log(data);
  };

  const [enabledQuestion, setEnabledQuestion] =
    useState<keyof IChildProfile>("country");

  const goToTheNextQuestionOrSubmit = () => {
    trigger();

    if (enabledQuestion === questions[questions.length - 1].title) {
      handleSubmit(onSubmit)();
      closeQuestionnaire();
      return;
    }

    const currentQuestion = questions.find(
      (question) => question.title === enabledQuestion
    ) as QuestionObject;

    const currentQuestionIdx = questions.indexOf(currentQuestion);

    if (errors[enabledQuestion]) {
      return;
    }

    setEnabledQuestion(questions[currentQuestionIdx + 1].title);
  };

  return (
    <>
      {questions.map(({ title, element: Question }) => (
        <Question
          key={title}
          isEnabled={enabledQuestion === title}
          buttonClickHandler={goToTheNextQuestionOrSubmit}
          register={register}
          errors={errors[title] || null}
        />
      ))}
    </>
  );
};
