import { useForm } from "react-hook-form";

import { Form } from "../Form";
import { FormSubmitButton } from "../FormSubmitButton";
import { FormNotification, FormNotificationType } from "../FormNotification";
import { FormInput } from "../FormInput";
import { FormInputLabel } from "../FormInputLabel";
import { FormInputGroup } from "../FormInputGroup";

import { emailRegex } from "../../regexp";

import { signUpUser, useAppDispatch } from "../../store";

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
  const dispatch = useAppDispatch();

  const onSubmit = ({ password, confirm, email, name }: ISignUpFormFields) => {
    if (password !== confirm) {
      setError("confirm", { message: "Confirmation does not match password" });
      return;
    }

    dispatch(signUpUser({ name, email, password }));
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInputGroup>
        <FormInputLabel htmlFor="name">Name</FormInputLabel>
        <FormInput
          id="name"
          placeholder="Enter your name"
          type="text"
          isError={!!errors.name}
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
          <FormNotification type={FormNotificationType.Error}>
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
      <FormInputGroup>
        <FormInputLabel htmlFor="confirm">Confrim password</FormInputLabel>
        <FormInput
          id="confirm"
          placeholder="Confirm your password"
          type="password"
          isError={!!errors.confirm}
          {...register("confirm", {
            required: "Please confirm your password",
          })}
        />
        {errors.confirm && (
          <FormNotification type={FormNotificationType.Error}>
            {errors.confirm.message}
          </FormNotification>
        )}
      </FormInputGroup>
      <FormSubmitButton>Sign Up</FormSubmitButton>
    </Form>
  );
};
