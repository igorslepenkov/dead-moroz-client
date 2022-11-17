import { useForm } from "react-hook-form";

import { Form } from "../Form";
import { FormInput } from "../FormInput";
import { FormInputGroup } from "../FormInputGroup";
import { FormInputLabel } from "../FormInputLabel";
import { FormNotification, FormNotificationType } from "../FormNotification";
import { FormSubmitButton } from "../FormSubmitButton";
import {
  NotificationModalStatus,
  NotificationModal,
} from "../NotificationModal";

import { useToggle } from "../../hooks";

import { emailRegex } from "../../regexp";

import {
  getUserError,
  getUserIsLoading,
  getUserServerMessage,
  signInUser,
  useAppDispatch,
  useAppSelector,
} from "../../store";

interface ISignInFormFields {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignInFormFields>();

  const [isModalOpen, toggleModal] = useToggle(false);

  const userSignInError = useAppSelector(getUserError);
  const userServerMessage = useAppSelector(getUserServerMessage);
  const userIsLoading = useAppSelector(getUserIsLoading);

  const dispatch = useAppDispatch();

  const onSubmit = ({ password, email }: ISignInFormFields) => {
    dispatch(signInUser({ email, password }));
    toggleModal();
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInputGroup>
        <FormInputLabel htmlFor="email">Email</FormInputLabel>
        <FormInput
          id="email"
          placeholder="Enter your email"
          type="email"
          isError={!!errors.email}
          {...register("email", {
            required: "Please provide your email",
            pattern: {
              value: emailRegex,
              message: "It seems that you provided invalid email",
            },
          })}
        />
        {errors.email && (
          <FormNotification type={FormNotificationType.Error}>
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
          isError={!!errors.password}
          {...register("password", {
            required: "Please provide your password",
            minLength: {
              value: 6,
              message: "Your password has to be at least 6 symbols length",
            },
          })}
        />
        {errors.password && (
          <FormNotification type={FormNotificationType.Error}>
            {errors.password.message}
          </FormNotification>
        )}
      </FormInputGroup>
      <FormSubmitButton>Sign Up</FormSubmitButton>
      {!userIsLoading && (
        <NotificationModal
          isOpen={isModalOpen}
          status={
            userSignInError
              ? NotificationModalStatus.Error
              : NotificationModalStatus.Success
          }
          message={
            userSignInError
              ? userSignInError
              : userServerMessage || "Oooooooooooooops"
          }
          handler={toggleModal}
        />
      )}
    </Form>
  );
};
