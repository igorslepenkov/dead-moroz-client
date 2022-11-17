import { useForm } from "react-hook-form";

import { FormSubmitButton } from "../FormSubmitButton";
import { FormNotification } from "../FormNotification";
import { FormInput } from "../FormInput";
import { FormInputLabel } from "../FormInputLabel";

import { StyledSignUpForm, FormInputGroup } from "./style";

import { emailRegex } from "../../regexp";

import { useToggle } from "../../hooks";

import {
  getUserError,
  getUserIsLoading,
  getUserServerMessage,
  signUpUser,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { NotificationModal } from "../NotificationModal";

interface ISignUpFormFields {
  email: string;
  password: string;
  confirm: string;
  name: string;
}

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ISignUpFormFields>();

  const [isModalOpen, toggleModal] = useToggle(false);

  const userSignUpError = useAppSelector(getUserError);
  const userServerMessage = useAppSelector(getUserServerMessage);
  const userIsLoading = useAppSelector(getUserIsLoading);

  const dispatch = useAppDispatch();

  const onSubmit = ({ password, confirm, email, name }: ISignUpFormFields) => {
    if (password !== confirm) {
      setError("confirm", { message: "Confirmation does not match password" });
      return;
    }

    dispatch(signUpUser({ name, email, password }));
    toggleModal();
    reset();
  };

  return (
    <StyledSignUpForm onSubmit={handleSubmit(onSubmit)}>
      <FormInputGroup>
        <FormInputLabel htmlFor="name">Name</FormInputLabel>
        <FormInput
          id="name"
          placeholder="Enter your name"
          type="text"
          error={!!errors.name}
          {...register("name", {
            required: "Please provide your name",
            minLength: {
              value: 3,
              message: "Your name has to be at least 3 symbols length",
            },
            maxLength: {
              value: 50,
              message: "Your name has to be max 50 symbols length",
            },
          })}
        />
        {errors.name && (
          <FormNotification type="error">
            {errors.name.message}
          </FormNotification>
        )}
      </FormInputGroup>
      <FormInputGroup>
        <FormInputLabel htmlFor="email">Email</FormInputLabel>
        <FormInput
          id="email"
          placeholder="Enter your email"
          type="email"
          error={!!errors.name}
          {...register("email", {
            required: "Please provide your email",
            pattern: {
              value: emailRegex,
              message: "It seems that you provided invalid email",
            },
          })}
        />
        {errors.email && (
          <FormNotification type="error">
            {errors.email.message}
          </FormNotification>
        )}
      </FormInputGroup>
      <FormInputGroup>
        <FormInputLabel htmlFor="password">Password</FormInputLabel>
        <FormInput
          id="password"
          placeholder="Enter your password"
          type="password"
          error={!!errors.name}
          {...register("password", {
            required: "Please provide your password",
            minLength: {
              value: 6,
              message: "Your password has to be at least 6 symbols length",
            },
          })}
        />
        {errors.password && (
          <FormNotification type="error">
            {errors.password.message}
          </FormNotification>
        )}
      </FormInputGroup>
      <FormInputGroup>
        <FormInputLabel htmlFor="confirm">Confrim password</FormInputLabel>
        <FormInput
          id="confirm"
          placeholder="Confirm your password"
          type="password"
          error={!!errors.name}
          {...register("confirm", {
            required: "Please confirm your password",
          })}
        />
        {errors.confirm && (
          <FormNotification type="error">
            {errors.confirm.message}
          </FormNotification>
        )}
      </FormInputGroup>
      <FormSubmitButton>Sign Up</FormSubmitButton>
      {!userIsLoading && (
        <NotificationModal
          isOpen={isModalOpen}
          status={userSignUpError ? "error" : "success"}
          message={
            userSignUpError
              ? userSignUpError
              : userServerMessage || "Oooooooooooooops"
          }
          handler={toggleModal}
        />
      )}
    </StyledSignUpForm>
  );
};
