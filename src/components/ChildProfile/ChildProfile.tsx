import { useToggle } from "../../hooks";
import { IChildProfile } from "../../types";
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
  childProfile: IChildProfile;
}

export const ChildProfile = ({ childProfile }: IProps) => {
  const [isAddAvatarFormOpen, toggleAddAvatarForm] = useToggle();

  const childProfileEntries = Object.entries(childProfile);
  return (
    <StyledChildProfile>
      <ProfileTitle>Your profile details :</ProfileTitle>
      {childProfileEntries.map(([title, body]) => {
        return (
          <ChildProfileField key={title}>
            <ChildProfileFieldTitle>
              {(() => {
                switch (title) {
                  case "birthdate":
                    return "Birth Date";
                  case "pastYearDescription":
                    return "Past Year Description";
                  case "goodDeeds":
                    return "Good Deeds";
                  default:
                    return title;
                }
              })()}
              :
            </ChildProfileFieldTitle>
            <ChildProfileFieldBody>
              {(() => {
                switch (title) {
                  case "avatar":
                    if (isAddAvatarFormOpen) {
                      return <AddAvatarForm toggleForm={toggleAddAvatarForm} />;
                    }

                    if (body.url) {
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
                      <AddAvatarButton onClick={toggleAddAvatarForm}>
                        Add Avatar
                      </AddAvatarButton>
                    );
                  case "birthdate":
                    return new Date(body).toDateString();
                  default:
                    return body;
                }
              })()}
            </ChildProfileFieldBody>
          </ChildProfileField>
        );
      })}
    </StyledChildProfile>
  );
};
