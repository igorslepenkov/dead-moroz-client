import { Rating } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  createChildReview,
  getChildInfo,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { FormInputGroup } from "../FormInputGroup";
import { FormInputLabel } from "../FormInputLabel";
import { FormNotification, FormNotificationType } from "../FormNotification";
import { FormSubmitButton } from "../FormSubmitButton";
import { FormTextarea } from "../FormTextarea";
import { CancelButon, StyledAddChildReviewForm } from "./style";

interface IProps {
  toggleForm: () => void;
}

interface IChildReviewFields {
  score: number;
  comment: string;
}

export const AddChildReviewForm = ({ toggleForm }: IProps) => {
  const childDetailedInfo = useAppSelector(getChildInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IChildReviewFields>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: IChildReviewFields) => {
    if (childDetailedInfo) {
      const { score, comment } = data;

      dispatch(
        createChildReview({
          score,
          comment,
        })
      );

      reset();
      toggleForm();
    }
  };

  return (
    <StyledAddChildReviewForm onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="score"
        render={({ field: { onChange, onBlur, ref } }) => {
          return (
            <Rating onChange={onChange} onBlur={onBlur} ref={ref} max={10} />
          );
        }}
      />
      <FormInputGroup>
        <FormInputLabel htmlFor="comment">Comment</FormInputLabel>
        <FormTextarea
          id="comment"
          isError={!!errors.comment}
          {...register("comment", { required: "Enter your comment" })}
        />
        {errors && errors.comment && (
          <FormNotification type={FormNotificationType.Error}>
            {errors.comment.message}
          </FormNotification>
        )}
      </FormInputGroup>
      <FormSubmitButton>Submit</FormSubmitButton>
      <CancelButon onClick={toggleForm}>Cancel</CancelButon>
    </StyledAddChildReviewForm>
  );
};
