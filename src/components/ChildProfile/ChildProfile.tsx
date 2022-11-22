import { IChildProfile } from "../../types";
import {
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
                    return <ProfileAvatar src={body.url} />;
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
