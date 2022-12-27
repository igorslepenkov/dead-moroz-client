import { useForm } from "react-hook-form";
import { emailRegex } from "../../regexp";
import { fetchMorozInfoElves, inviteNewElf, useAppDispatch } from "../../store";
import { FormInput } from "../FormInput";
import { FormInputGroup } from "../FormInputGroup";
import { FormInputLabel } from "../FormInputLabel";
import { FormNotification, FormNotificationType } from "../FormNotification";
import { FormSubmitButton } from "../FormSubmitButton";
import { CloseButon, StyledAddNewElfForm } from "./style";

interface IProps {
  closeForm: () => void;
}

interface InviteElfFormFields {
  name: string;
  email: string;
}

export const AddNewElfForm = ({ closeForm }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InviteElfFormFields>();

  const dispatch = useAppDispatch();

  const onSubmit = async (data: InviteElfFormFields) => {
    const action = await dispatch(inviteNewElf(data));

    if (action.type === "morozInfoElves/inviteNewElf/fulfilled") {
      dispatch(fetchMorozInfoElves());
    }

    reset();
    closeForm();
  };

  return (
    <StyledAddNewElfForm onSubmit={handleSubmit(onSubmit)}>
      <FormInputGroup>
        <FormInputLabel htmlFor="name">Elf name</FormInputLabel>
        <FormInput
          id="name"
          isError={!!errors.name}
          type="text"
          {...register("name", {
            required: "Please enter elf's name",
            minLength: {
              value: 3,
              message: "Name has to be at least 3 symbols length",
            },
            maxLength: {
              value: 50,
              message: "Name has to be max 50 symbols length",
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
        <FormInputLabel htmlFor="email">Elf email</FormInputLabel>
        <FormInput
          id="email"
          isError={!!errors.email}
          type="email"
          {...register("email", {
            required: "Please enter elf's email",
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
      <FormSubmitButton>Invite</FormSubmitButton>
      <CloseButon type="button" onClick={closeForm}>
        Close
      </CloseButon>
    </StyledAddNewElfForm>
  );
};
