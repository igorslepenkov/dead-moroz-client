import styled from "styled-components";
import { Color, fonts, shadows } from "../../ui";

export const Title = styled.h3`
  ${fonts.h3}
  color: ${Color.InfoMain};
  text-align: center;
  margin: 5px;
`;

export const ReviewsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  ${shadows.shadow8()}
`;

export const Review = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-bottom: 2px solid ${Color.InfoBorder};
`;

export const NoReviews = styled.p`
  ${fonts.h3}
  color: ${Color.PrimaryMain};
  text-align: center;
  margin: 5px;
`;

export const LeaveReviewButton = styled.button`
  padding: 8px 16px;
  background-color: ${Color.InfoMain};
  border: 3px solid transparent;
  border-radius: 4px;
  ${fonts.bodyTextLarge};
  color: ${Color.White};
  cursor: pointer;

  &:hover {
    background-color: ${Color.InfoHover};
  }

  &:active {
    background-color: ${Color.InfoPressed};
  }

  &:focus {
    border: 3px solid ${Color.InfoFocus};
  }
`;

export const DeleteButtonContainer = styled.div`
  margin: 5px 0;
`;

export const ReviewText = styled.p`
  ${fonts.bodyTextLarge};
  color: ${Color.PrimaryMain};
`;
