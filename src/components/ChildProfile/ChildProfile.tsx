import { ReactNode } from "react";
import { useToggle } from "../../hooks";
import { getUser, useAppSelector } from "../../store";
import { Entries, IChildProfile } from "../../types";
import { generateRandomIdenticonAvatar } from "../../utils";
import { AddAvatarForm } from "../AddAvatarForm";
import {
  AddAvatarButton,
  AvatarWrapper,
  ChildProfileField,
  ChildProfileFieldBody,
  ChildProfileFieldTitle,
  ProfileAvatar,
  ProfileTitle,
  StyledChildProfile,
} from "./style";

interface IProps {
  childProfile: Omit<IChildProfile, "childReviews">;
}

type ChildProfileShow = Omit<
  IChildProfile,
  "id" | "userId" | "createdAt" | "updatedAt" | "childReviews" | "childPresents"
>;

export enum ChildProfileKey {
  Country = "country",
  City = "city",
  Hobbies = "hobbies",
  Birthdate = "birthdate",
  PastYearDescription = "pastYearDescription",
  GooDDeeds = "goodDeeds",
  Avatar = "avatar",
}

type ChildProfileValues = {
  [K in keyof ChildProfileShow]: ChildProfileShow[K];
}[keyof ChildProfileShow];

const FILTER_KEYS = [
  "id",
  "userId",
  "createdAt",
  "updatedAt",
  "childReviews",
  "childPresents",
];

export const ChildProfile = ({ childProfile }: IProps) => {
  const [isAddAvatarFormOpen, toggleAddAvatarForm] = useToggle();

  const user = useAppSelector(getUser);

  const getHumanFriendlyTitle = (title: keyof ChildProfileShow): string => {
    switch (title) {
      case ChildProfileKey.Birthdate:
        return "Birth Date";
      case ChildProfileKey.PastYearDescription:
        return "Past Year Description";
      case ChildProfileKey.GooDDeeds:
        return "Good Deeds";
      default:
        return title;
    }
  };

  const getBody = (
    title: keyof ChildProfileShow,
    body: ChildProfileValues
  ): ReactNode => {
    switch (title) {
      case ChildProfileKey.Avatar:
        if (isAddAvatarFormOpen) {
          return <AddAvatarForm toggleForm={toggleAddAvatarForm} />;
        }

        if (typeof body === "object" && body.url) {
          return (
            <AvatarWrapper>
              <ProfileAvatar src={body.url} />
              <AddAvatarButton onClick={toggleAddAvatarForm}>
                Change avatar
              </AddAvatarButton>
            </AvatarWrapper>
          );
        }

        return (
          <AvatarWrapper>
            <ProfileAvatar
              src={
                user
                  ? generateRandomIdenticonAvatar(user.email)
                  : generateRandomIdenticonAvatar("anonimous")
              }
            />
            <AddAvatarButton onClick={toggleAddAvatarForm}>
              Add Avatar
            </AddAvatarButton>
          </AvatarWrapper>
        );
      case ChildProfileKey.Birthdate:
        if (typeof body === "string") {
          return new Date(body).toDateString();
        }
        return null;
      default:
        return body as string;
    }
  };

  const childProfileEntries = Object.entries(childProfile).filter(
    ([key]) => !FILTER_KEYS.includes(key)
  ) as Entries<ChildProfileShow>;

  return (
    <StyledChildProfile>
      <ProfileTitle>Profile details :</ProfileTitle>
      {childProfileEntries.map(([title, body]) => {
        return (
          <ChildProfileField key={title}>
            <ChildProfileFieldTitle>
              {getHumanFriendlyTitle(title)}:
            </ChildProfileFieldTitle>
            <ChildProfileFieldBody>
              {getBody(title, body)}
            </ChildProfileFieldBody>
          </ChildProfileField>
        );
      })}
    </StyledChildProfile>
  );
};
