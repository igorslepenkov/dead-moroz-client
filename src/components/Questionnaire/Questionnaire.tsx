import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormInput } from "../FormInput";
import { FormInputGroup } from "../FormInputGroup";
import { FormInputLabel } from "../FormInputLabel";

import { NextButton, Question, QuestionTitle } from "./style";

interface IProps {
  closeQuestionnaire: () => void;
}

interface IAnswers {
  country: string;
  city: string;
  hobbies: string;
  birthdate: string;
  pastYearDescription: string;
  goodDeeds: string;
}

interface IQuestionProps {
  isEnabled: boolean;
  buttonClickHandler: () => void;
}

export const Questionnaire = ({ closeQuestionnaire }: IProps) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<IAnswers>();

  const Question1 = ({ isEnabled, buttonClickHandler }: IQuestionProps) => {
    return (
      <Question isEnabled={isEnabled}>
        <QuestionTitle>Question 1</QuestionTitle>
        <FormInputGroup>
          <FormInputLabel htmlFor="country">
            What country are you from?
          </FormInputLabel>
          <FormInput
            id="country"
            type="text"
            isError={!!errors.country}
            {...register("country", {
              required: "Please enter your country",
            })}
          />
        </FormInputGroup>
        <NextButton onClick={buttonClickHandler}>Next question</NextButton>
      </Question>
    );
  };

  const Question2 = ({ isEnabled, buttonClickHandler }: IQuestionProps) => {
    return (
      <Question isEnabled={isEnabled}>
        <FormInputGroup>
          <FormInputLabel htmlFor="city">What city do you live?</FormInputLabel>
          <FormInput
            id="city"
            type="text"
            isError={!!errors.city}
            {...register("city", {
              required: "Please enter your city",
            })}
          />
        </FormInputGroup>
        <NextButton onClick={buttonClickHandler}>Next question</NextButton>
      </Question>
    );
  };

  const Question3 = ({ isEnabled, buttonClickHandler }: IQuestionProps) => {
    return (
      <Question isEnabled={isEnabled}>
        <FormInputGroup>
          <FormInputLabel htmlFor="birthdate">
            Please enter your birthdate
          </FormInputLabel>
          <FormInput
            id="birthdate"
            type="date"
            isError={!!errors.birthdate}
            {...register("birthdate", {
              required: "Please enter your birthdate",
            })}
          />
        </FormInputGroup>
        <NextButton onClick={buttonClickHandler}>Next question</NextButton>
      </Question>
    );
  };

  const Question4 = ({ isEnabled, buttonClickHandler }: IQuestionProps) => {
    return (
      <Question isEnabled={isEnabled}>
        <FormInputGroup>
          <FormInputLabel htmlFor="hobbies">
            What are your hobbies(what do you like to do)?
          </FormInputLabel>
          <FormInput
            id="hobbies"
            type="textarea"
            isError={!!errors.hobbies}
            {...register("hobbies", {
              required: "Please enter your hobbies",
            })}
          />
        </FormInputGroup>
        <NextButton onClick={buttonClickHandler}>Next question</NextButton>
      </Question>
    );
  };

  const Question5 = ({ isEnabled, buttonClickHandler }: IQuestionProps) => {
    return (
      <Question isEnabled={isEnabled}>
        <FormInputGroup>
          <FormInputLabel htmlFor="past-year-description">
            Tell Dead Moroz about what the past year was like to you
          </FormInputLabel>
          <FormInput
            id="past-year-description"
            type="textarea"
            isError={!!errors.pastYearDescription}
            {...register("pastYearDescription", {
              required: "Please enter your enter your description of past year",
            })}
          />
        </FormInputGroup>
        <NextButton onClick={buttonClickHandler}>Next question</NextButton>
      </Question>
    );
  };

  const Question6 = ({ isEnabled, buttonClickHandler }: IQuestionProps) => {
    return (
      <Question isEnabled={isEnabled}>
        <FormInputGroup>
          <FormInputLabel htmlFor="goodDeeds">
            Tell Dead Moroz about what good deeds you have commited
          </FormInputLabel>
          <FormInput
            id="goodDeeds"
            type="textarea"
            isError={!!errors.goodDeeds}
            {...register("goodDeeds", {
              required: "Please enter your good deeds for the passing year",
            })}
          />
        </FormInputGroup>
        <NextButton onClick={buttonClickHandler}>
          Submit Your Answers!
        </NextButton>
      </Question>
    );
  };

  const questions = [
    Question1,
    Question2,
    Question3,
    Question4,
    Question5,
    Question6,
  ];

  const onSubmit = (data: IAnswers) => {
    console.log(data);
  };

  const [enabledQuestion, setEnabledQuestion] = useState<number>(0);

  const goToTheNextQuestionOrSubmit = () => {
    clearErrors();
    trigger();
    if (
      errors.birthdate ||
      errors.city ||
      errors.country ||
      errors.goodDeeds ||
      errors.hobbies ||
      errors.pastYearDescription
    ) {
      return;
    }
    if (enabledQuestion === questions.length - 1) {
      handleSubmit(onSubmit);
    }
    setEnabledQuestion(enabledQuestion + 1);
  };

  return (
    <>
      {questions.map((Question, idx) => (
        <Question
          key={idx}
          isEnabled={enabledQuestion === idx}
          buttonClickHandler={goToTheNextQuestionOrSubmit}
        />
      ))}
    </>
  );
};
