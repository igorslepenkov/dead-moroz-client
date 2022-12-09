import { Button } from "@mui/material";
import { MouseEventHandler } from "react";
import { useToggle } from "../../hooks";
import {
  deleteChildReview,
  getChildInfo,
  getUser,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { IChildReview } from "../../types";
import { AddChildReviewForm } from "../AddChildReviewForm";
import {
  DeleteButtonContainer,
  LeaveReviewButton,
  NoReviews,
  Review,
  ReviewsWrapper,
  ReviewText,
  Title,
} from "./style";

interface IProps {
  childReviews: IChildReview[];
}

export const ChildReviewList = ({ childReviews }: IProps) => {
  const [isAddReviewFormOpen, toggleAddReviewForm] = useToggle();

  const dispatch = useAppDispatch();

  const childInfo = useAppSelector(getChildInfo);
  const user = useAppSelector(getUser);

  const deleteChildReviewOnClick: MouseEventHandler<HTMLButtonElement> = ({
    currentTarget,
  }) => {
    if (childInfo && currentTarget.dataset && currentTarget.dataset.review_id) {
      const { review_id } = currentTarget.dataset;

      dispatch(deleteChildReview(Number(review_id)));
    }
  };

  return (
    <ReviewsWrapper>
      {isAddReviewFormOpen ? (
        <AddChildReviewForm toggleForm={toggleAddReviewForm} />
      ) : (
        <>
          <Title>Reviews</Title>
          {childReviews.length > 0 ? (
            childReviews.map((review) => {
              return (
                <Review key={review.id}>
                  <ReviewText>
                    Date: {new Date(review.createdAt).toDateString()}
                  </ReviewText>
                  <ReviewText>Score: {review.score}</ReviewText>
                  <ReviewText>Comment: {review.comment}</ReviewText>
                  {user && user.id === review.createdBy && (
                    <DeleteButtonContainer>
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth={false}
                        size="medium"
                        data-review_id={review.id}
                        onClick={deleteChildReviewOnClick}
                      >
                        Delete review
                      </Button>
                    </DeleteButtonContainer>
                  )}
                </Review>
              );
            })
          ) : (
            <NoReviews>There are no reviews at the moment</NoReviews>
          )}
          {user &&
          childInfo &&
          childInfo.reviews.filter((review) => review.createdBy === user.id)
            .length === 0 ? (
            <LeaveReviewButton onClick={toggleAddReviewForm}>
              Leave your review
            </LeaveReviewButton>
          ) : null}
        </>
      )}
    </ReviewsWrapper>
  );
};
