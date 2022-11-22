import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";

import { IChildProfile } from "../../../types";
import { QuestionObject } from "../Questionnaire";

import { FormInput } from "../../FormInput";
import { FormInputGroup } from "../../FormInputGroup";
import { FormInputLabel } from "../../FormInputLabel";

import { NextButton, Question, QuestionTitle } from "../style";
import { FormNotification, FormNotificationType } from "../../FormNotification";
import { FormTextarea } from "../../FormTextarea";

export interface IQuestionProps {
  isEnabled: boolean;
  buttonClickHandler: () => void;
  register: UseFormRegister<IChildProfile>;
  errors:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<{ url: string }>>
    | null;
}

const Question1 = ({
  isEnabled,
  buttonClickHandler,
  register,
  errors,
}: IQuestionProps) => {
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
          isError={!!errors}
          {...register("country", {
            required: "Please enter your country",
          })}
        />
      </FormInputGroup>
      {errors && (
        <FormNotification type={FormNotificationType.Error}>
          {errors.message}
        </FormNotification>
      )}
      <NextButton onClick={buttonClickHandler}>Next question</NextButton>
    </Question>
  );
};

const Question2 = ({
  isEnabled,
  buttonClickHandler,
  register,
  errors,
}: IQuestionProps) => {
  return (
    <Question isEnabled={isEnabled}>
      <FormInputGroup>
        <FormInputLabel htmlFor="city">What city do you live?</FormInputLabel>
        <FormInput
          id="city"
          type="text"
          isError={!!errors}
          {...register("city", {
            required: "Please enter your city",
          })}
        />
      </FormInputGroup>
      {errors && (
        <FormNotification type={FormNotificationType.Error}>
          {errors.message}
        </FormNotification>
      )}
      <NextButton onClick={buttonClickHandler}>Next question</NextButton>
    </Question>
  );
};

const Question3 = ({
  isEnabled,
  buttonClickHandler,
  register,
  errors,
}: IQuestionProps) => {
  return (
    <Question isEnabled={isEnabled}>
      <FormInputGroup>
        <FormInputLabel htmlFor="birthdate">
          Please enter your birthdate
        </FormInputLabel>
        <FormInput
          id="birthdate"
          type="date"
          isError={!!errors}
          {...register("birthdate", {
            required: "Please enter your birthdate",
          })}
        />
      </FormInputGroup>
      {errors && (
        <FormNotification type={FormNotificationType.Error}>
          {errors.message}
        </FormNotification>
      )}
      <NextButton onClick={buttonClickHandler}>Next question</NextButton>
    </Question>
  );
};

const Question4 = ({
  isEnabled,
  buttonClickHandler,
  register,
  errors,
}: IQuestionProps) => {
  return (
    <Question isEnabled={isEnabled}>
      <FormInputGroup>
        <FormInputLabel htmlFor="hobbies">
          What are your hobbies(what do you like to do)?
        </FormInputLabel>
        <FormInput
          id="hobbies"
          type="textarea"
          isError={!!errors}
          {...register("hobbies", {
            required: "Please enter your hobbies",
          })}
        />
      </FormInputGroup>
      {errors && (
        <FormNotification type={FormNotificationType.Error}>
          {errors.message}
        </FormNotification>
      )}
      <NextButton onClick={buttonClickHandler}>Next question</NextButton>
    </Question>
  );
};

const Question5 = ({
  isEnabled,
  buttonClickHandler,
  register,
  errors,
}: IQuestionProps) => {
  return (
    <Question isEnabled={isEnabled}>
      <FormInputGroup>
        <FormInputLabel htmlFor="past-year-description">
          Tell Dead Moroz about what the past year was like to you
        </FormInputLabel>
        <FormTextarea
          id="past-year-description"
          isError={!!errors}
          {...register("pastYearDescription", {
            required: "Please enter your enter your description of past year",
            minLength: {
              value: 30,
              message: "Please enter at least 30 symbols",
            },
          })}
        />
      </FormInputGroup>
      {errors && (
        <FormNotification type={FormNotificationType.Error}>
          {errors.message}
        </FormNotification>
      )}
      <NextButton onClick={buttonClickHandler}>Next question</NextButton>
    </Question>
  );
};

const Question6 = ({
  isEnabled,
  buttonClickHandler,
  register,
  errors,
}: IQuestionProps) => {
  return (
    <Question isEnabled={isEnabled}>
      <FormInputGroup>
        <FormInputLabel htmlFor="goodDeeds">
          Tell Dead Moroz about what good deeds you have commited
        </FormInputLabel>
        <FormTextarea
          id="goodDeeds"
          isError={!!errors}
          {...register("goodDeeds", {
            required: "Please enter your good deeds for the passing year",
            minLength: {
              value: 10,
              message:
                "Please enter at least 10 symbols and tell Dead Moroz why he should give you a present",
            },
          })}
        />
      </FormInputGroup>
      {errors && (
        <FormNotification type={FormNotificationType.Error}>
          {errors.message}
        </FormNotification>
      )}
      <NextButton onClick={buttonClickHandler}>Submit Your Answers!</NextButton>
    </Question>
  );
};

export const questions: QuestionObject[] = [
  { title: "country", element: Question1 },
  { title: "city", element: Question2 },
  { title: "birthdate", element: Question3 },
  { title: "hobbies", element: Question4 },
  { title: "pastYearDescription", element: Question5 },
  { title: "goodDeeds", element: Question6 },
];
