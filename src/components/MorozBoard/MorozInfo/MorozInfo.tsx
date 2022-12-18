import { useEffect } from "react";
import {
  fetchMorozInfoGeneral,
  getMorozInfoGeneral,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import {
  CardInfo,
  CardTitle,
  InfoCard,
  InfoCardList,
  StyledMorozInfo,
} from "./style";

export const MorozInfo = () => {
  const morozInfoGeneral = useAppSelector(getMorozInfoGeneral);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchMorozInfoGeneralFunc = async () => {
      dispatch(fetchMorozInfoGeneral());
    };

    fetchMorozInfoGeneralFunc();
  }, []);

  if (morozInfoGeneral) {
    const {
      elves: { count, invited, acceptedInvitation, notAcceptedInvitation },
      children: { count: childrenCount, withReviewCount, withoutReviewCount },
    } = morozInfoGeneral;
    return (
      <StyledMorozInfo>
        <InfoCard>
          <CardTitle>Elves</CardTitle>
          <InfoCardList>
            <CardInfo>Count: {count}</CardInfo>
            <CardInfo>Invited: {invited}</CardInfo>
            <CardInfo>Accepted invitation: {acceptedInvitation}</CardInfo>
            <CardInfo>
              Not accepted invitation: {notAcceptedInvitation}
            </CardInfo>
          </InfoCardList>
        </InfoCard>
        <InfoCard>
          <CardTitle>Children</CardTitle>
          <InfoCardList>
            <CardInfo>Count: {childrenCount}</CardInfo>
            <CardInfo>Reviewed: {withReviewCount}</CardInfo>
            <CardInfo>Not reviewed: {withoutReviewCount}</CardInfo>
          </InfoCardList>
        </InfoCard>
      </StyledMorozInfo>
    );
  }

  return null;
};
