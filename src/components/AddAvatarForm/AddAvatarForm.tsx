import { useForm } from "react-hook-form";
import { addAvatarToChildProfile, useAppDispatch } from "../../store";
import { FormNotification, FormNotificationType } from "../FormNotification";

import { FormSubmitButton } from "../FormSubmitButton";
import { AddAvatarField, CloseButon, StyledAddAvatarForm } from "./style";

interface IProps {
  toggleForm: () => void;
}

export const AddAvatarForm = ({ toggleForm }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ avatar: FileList }>();

  const dispatch = useAppDispatch();

  const onSubmit = async (data: { avatar: FileList }) => {
    const avatar = data.avatar.item(0);
    if (avatar) {
      const reader = new FileReader();
      reader.readAsDataURL(avatar);
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          dispatch(addAvatarToChildProfile(reader.result));
          reset();
          toggleForm();
        }
      };
    }
  };

  return (
    <StyledAddAvatarForm onSubmit={handleSubmit(onSubmit)}>
      <AddAvatarField
        type="file"
        {...register("avatar", { required: "Please choose your avatar" })}
      />
      <FormSubmitButton>Submit</FormSubmitButton>
      <CloseButon onClick={toggleForm}>Cancel</CloseButon>
      {errors.avatar && (
        <FormNotification type={FormNotificationType.Error}>
          {errors.avatar.message}
        </FormNotification>
      )}
    </StyledAddAvatarForm>
  );
};
