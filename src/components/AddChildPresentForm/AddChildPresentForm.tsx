import { useForm } from "react-hook-form";
import { addChildPresentToWishlist, useAppDispatch } from "../../store";
import { FormInput } from "../FormInput";
import { FormInputGroup } from "../FormInputGroup";
import { FormInputLabel } from "../FormInputLabel";
import { FormNotification, FormNotificationType } from "../FormNotification";
import { FormSubmitButton } from "../FormSubmitButton";
import { StyledAddAvatarForm, CancelButon } from "./style";

interface IProps {
  toggleForm: () => void;
}

interface IChildPresentFields {
  name: string;
  image: FileList;
}

export const AddChildPresentForm = ({ toggleForm }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IChildPresentFields>();

  const dispatch = useAppDispatch();

  const onSubmit = ({ name, image }: IChildPresentFields) => {
    const imageFile = image.item(0);
    if (imageFile && name) {
      dispatch(addChildPresentToWishlist({ name, image: imageFile }));
    } else if (!imageFile && name) {
      dispatch(addChildPresentToWishlist({ name }));
    }

    reset();
    toggleForm();
  };
  return (
    <StyledAddAvatarForm onSubmit={handleSubmit(onSubmit)}>
      <FormInputGroup>
        <FormInputLabel htmlFor="name">Present name</FormInputLabel>
        <FormInput
          id="name"
          isError={!!errors.name}
          {...register("name", { required: "Enter present's name" })}
        />
      </FormInputGroup>
      <FormInputGroup>
        <FormInputLabel htmlFor="image">Present name</FormInputLabel>
        <FormInput
          id="image"
          isError={!!errors.image}
          type="file"
          {...register("image")}
        />
      </FormInputGroup>
      {errors && errors.name && (
        <FormNotification type={FormNotificationType.Error}>
          {errors.name.message}
        </FormNotification>
      )}
      <FormSubmitButton>Submit</FormSubmitButton>
      <CancelButon onClick={toggleForm}>Cancel</CancelButon>
    </StyledAddAvatarForm>
  );
};
