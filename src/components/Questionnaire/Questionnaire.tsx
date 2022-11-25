import { useState, FunctionComponent } from "react";

import { useForm } from "react-hook-form";

import { createChildProfile, useAppDispatch } from "../../store";

import { IChildProfile } from "../../types";

import { IQuestionProps, Question } from "../Question";

interface IProps {
  closeQuestionnaire: () => void;
}

export type QuestionObject = {
  title: keyof IChildProfile;
  element: FunctionComponent<IQuestionProps>;
};

type QuestionFields = Omit<IChildProfile, "avatar">;

enum QuestionField {
  Country = "country",
  City = "city",
  Birthdate = "birthdate",
  Hobbies = "hobbies",
  PastYearDescription = "pastYearDescription",
  GoodDeeds = "goodDeeds",
}

const questions: Array<keyof QuestionFields> = [
  QuestionField.Country,
  QuestionField.City,
  QuestionField.Birthdate,
  QuestionField.Hobbies,
  QuestionField.PastYearDescription,
  QuestionField.GoodDeeds,
];

export const Questionnaire = ({ closeQuestionnaire }: IProps) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<IChildProfile>({ mode: "onBlur" });

  const dispatch = useAppDispatch();

  const onSubmit = (data: IChildProfile) => {
    data.birthdate = new Date(data.birthdate).toString();
    dispatch(createChildProfile(data));
  };

  const [enabledQuestion, setEnabledQuestion] =
    useState<keyof QuestionFields>("country");

  const goToTheNextQuestionOrSubmit = () => {
    trigger();

    if (enabledQuestion === questions[questions.length - 1]) {
      handleSubmit(onSubmit)();
      closeQuestionnaire();
      return;
    }

    const currentQuestion = questions.find(
      (question) => question === enabledQuestion
    ) as keyof QuestionFields;

    const currentQuestionIdx = questions.indexOf(currentQuestion);

    if (errors[enabledQuestion]) {
      return;
    }

    setEnabledQuestion(questions[currentQuestionIdx + 1]);
  };

  return (
    <>
      {questions.map((questionTitle) => {
        return (
          <Question
            fieldName={questionTitle}
            isEnabled={enabledQuestion === questionTitle}
            register={register}
            buttonClickHandler={goToTheNextQuestionOrSubmit}
            errors={errors[questionTitle] || null}
          />
        );
      })}
    </>
  );
};
