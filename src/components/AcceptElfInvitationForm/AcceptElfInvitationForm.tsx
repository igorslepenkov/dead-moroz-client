import { useForm } from "react-hook-form";

import { acceptNewElfInvitation, useAppDispatch } from "../../store";

import { FormInputLabel } from "../FormInputLabel";
import { FormInputGroup } from "../FormInputGroup";
import { FormNotification, FormNotificationType } from "../FormNotification";
import { FormSubmitButton } from "../FormSubmitButton";
import { FormInput } from "../FormInput";

import { StyledAcceptInvitationForm } from "./style";

interface IAcceptElfInvitationFields {
  password: string;
  confirm: string;
}

interface IProps {
  token: string;
}

export const AcceptElfInvitationForm = ({ token }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<IAcceptElfInvitationFields>();

  const dispatch = useAppDispatch();

  const onSubmit = ({ password, confirm }: IAcceptElfInvitationFields) => {
    if (password !== confirm) {
      setError("confirm", { message: "Password and confirmation don't match" });
      return;
    }
    dispatch(acceptNewElfInvitation({ password, token }));
    reset();
  };

  return (
    <StyledAcceptInvitationForm onSubmit={handleSubmit(onSubmit)}>
      <FormInputGroup>
        <FormInputLabel htmlFor="password">Password</FormInputLabel>
        <FormInput
          id="password"
          isError={!!errors.password}
          type="password"
          {...register("password", {
            required: "Please enter your password",
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
        <FormInputLabel htmlFor="confirm">Confirm Password</FormInputLabel>
        <FormInput
          id="confirm"
          type="password"
          isError={!!errors.confirm}
          {...register("confirm", { required: "Please confirm your password" })}
        />
        {errors.confirm && (
          <FormNotification type={FormNotificationType.Error}>
            {errors.confirm.message}
          </FormNotification>
        )}
      </FormInputGroup>
      <FormSubmitButton>Accept Invitation</FormSubmitButton>
    </StyledAcceptInvitationForm>
  );
};
