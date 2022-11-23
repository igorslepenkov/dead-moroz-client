import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";

import { IChildProfile } from "../../types";

import { FormInput } from "../FormInput";
import { FormInputGroup } from "../FormInputGroup";
import { FormInputLabel } from "../FormInputLabel";
import { FormTextarea } from "../FormTextarea";
import { FormNotification, FormNotificationType } from "../FormNotification";

import { NextButton, StyledQuestion, QuestionTitle } from "./style";
import { ChildProfileKey } from "../ChildProfile";

export interface IQuestionProps {
  fieldName: keyof Omit<IChildProfile, "avatar">;
  isEnabled: boolean;
  buttonClickHandler: () => void;
  register: UseFormRegister<IChildProfile>;
  errors:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<{ url: string }>>
    | null;
}

export const Question = ({
  fieldName,
  isEnabled,
  buttonClickHandler,
  register,
  errors,
}: IQuestionProps) => {
  const switchFormField = (title: keyof IChildProfile) => {
    switch (title) {
      case ChildProfileKey.Country:
        return (
          <>
            {" "}
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
          </>
        );
      case ChildProfileKey.City:
        return (
          <>
            {" "}
            <FormInputLabel htmlFor="city">
              What city do you live?
            </FormInputLabel>
            <FormInput
              id="city"
              type="text"
              isError={!!errors}
              {...register("city", {
                required: "Please enter your city",
              })}
            />
          </>
        );
      case ChildProfileKey.Birthdate:
        return (
          <>
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
          </>
        );
      case ChildProfileKey.Hobbies:
        return (
          <>
            <FormInputLabel htmlFor="hobbies">
              What are your hobbies(what do you like to do)?
            </FormInputLabel>
            <FormTextarea
              id="hobbies"
              isError={!!errors}
              {...register("hobbies", {
                required: "Please enter your hobbies",
              })}
            />
          </>
        );
      case ChildProfileKey.PastYearDescription:
        return (
          <>
            {" "}
            <FormInputLabel htmlFor="past-year-description">
              Tell Dead Moroz about what the past year was like to you
            </FormInputLabel>
            <FormTextarea
              id="past-year-description"
              isError={!!errors}
              {...register("pastYearDescription", {
                required:
                  "Please enter your enter your description of past year",
                minLength: {
                  value: 30,
                  message: "Please enter at least 30 symbols",
                },
              })}
            />
          </>
        );
      case ChildProfileKey.GooDDeeds:
        return (
          <>
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
          </>
        );
    }
  };
  return (
    <StyledQuestion isEnabled={isEnabled}>
      <QuestionTitle>{fieldName.toUpperCase()}</QuestionTitle>
      <FormInputGroup>{switchFormField(fieldName)}</FormInputGroup>
      {errors && (
        <FormNotification type={FormNotificationType.Error}>
          {errors.message}
        </FormNotification>
      )}
      <NextButton onClick={buttonClickHandler}>Next question</NextButton>
    </StyledQuestion>
  );
};
