import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";

import { ChildPresentsTable, Page } from "../../components";
import { generateRandomIdenticonAvatar } from "../../utils";

import { Entries, IFullChild } from "../../types";

import {
  AvatarDetailWrapper,
  ChildDetailedInfo,
  ChildProfileDetail,
  ChildProfileDetails,
  DetailKey,
  DetailValue,
  Title,
  PresentsTableWrapper,
  ProfileTitle,
  Review,
  ReviewsWrapper,
  NoReviews,
} from "./style";
import {
  getChildInfo,
  useAppDispatch,
  useAppSelector,
  fetchChildInfo,
} from "../../store";
import { useEffect } from "react";

type ChildDetailsParams = {
  id: string;
};

export enum ChildDetailsKey {
  Id = "id",
  ProfileId = "profileId",
  Email = "email",
  Name = "name",
  Country = "country",
  City = "city",
  Birthdate = "birthdate",
  Hobbies = "hobbies",
  GoodDeeds = "goodDeeds",
  PastYearDescription = "pastYearDescription",
  Avatar = "avatar",
}

type ChildFullInfoShow = Omit<IFullChild, "createdAt" | "updatedAt" | "role">;

export const ChildDetailedInfoPage = () => {
  const { id } = useParams<keyof ChildDetailsParams>() as ChildDetailsParams;

  const dispatch = useAppDispatch();

  const childInfo = useAppSelector(getChildInfo);

  useEffect(() => {
    if (id) {
      const fetchChildInfoEffect = async () => {
        dispatch(fetchChildInfo(Number(id)));
      };

      fetchChildInfoEffect();
    }
  }, [id, dispatch]);

  if (childInfo) {
    const { child, presents, reviews } = childInfo;

    const getHumanFriendlyTitle = (title: keyof typeof child): string => {
      switch (title) {
        case ChildDetailsKey.Birthdate:
          return "Birth Date";
        case ChildDetailsKey.PastYearDescription:
          return "Past Year Description";
        case ChildDetailsKey.GoodDeeds:
          return "Good Deeds";
        case ChildDetailsKey.ProfileId:
          return "Profile Id";
        default:
          return title;
      }
    };

    const getBody = (
      key: keyof ChildFullInfoShow,
      value: string | { url: string | null }
    ) => {
      switch (key) {
        case ChildDetailsKey.Avatar:
          return (
            <AvatarDetailWrapper key={key} gridArea={ChildDetailsKey.Avatar}>
              <Avatar
                alt={child.name}
                src={
                  child.avatar.url || generateRandomIdenticonAvatar(child.email)
                }
              />
            </AvatarDetailWrapper>
          );
        case ChildDetailsKey.Birthdate:
          return (
            <ChildProfileDetail key={key} gridArea={key}>
              <DetailKey>{getHumanFriendlyTitle(key)}</DetailKey>
              <DetailValue>
                {(typeof value === "string" || typeof value === "number") &&
                  new Date(value).toDateString()}
              </DetailValue>
            </ChildProfileDetail>
          );
        default:
          return (
            <ChildProfileDetail key={key} gridArea={key}>
              <DetailKey>{getHumanFriendlyTitle(key)}</DetailKey>
              <DetailValue>
                {(typeof value === "string" || typeof value === "number") &&
                  value}
              </DetailValue>
            </ChildProfileDetail>
          );
      }
    };

    const childProfileEntries = Object.entries(child).filter(
      ([key]) => key !== "createdAt" && key !== "updatedAt" && key !== "role"
    ) as Entries<ChildFullInfoShow>;

    return (
      <Page>
        <ChildDetailedInfo>
          <ChildProfileDetails>
            <ProfileTitle>Profile</ProfileTitle>
            {childProfileEntries.map(([key, value]) => {
              return getBody(key, value.toString());
            })}
          </ChildProfileDetails>
          <PresentsTableWrapper>
            <Title>Wishlist</Title>
            <ChildPresentsTable presents={presents} />
          </PresentsTableWrapper>
          <ReviewsWrapper>
            <Title>Reviews</Title>
            {reviews.length > 0 ? (
              reviews.map((review) => {
                return (
                  <Review key={review.id}>
                    <p>Date: {new Date(review.createdAt).toDateString()}</p>
                    <p>Score: {review.score}</p>
                    <p>Comment: {review.comment}</p>
                  </Review>
                );
              })
            ) : (
              <NoReviews>There are no reviews at the moment</NoReviews>
            )}
          </ReviewsWrapper>
        </ChildDetailedInfo>
      </Page>
    );
  }

  return null;
};
