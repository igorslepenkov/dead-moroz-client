import { IChildProfile } from "../../types";
import {
  ChildProfileField,
  ChildProfileFieldBody,
  ChildProfileFieldTitle,
  StyledChildProfile,
} from "./style";

interface IProps {
  childProfile: IChildProfile;
}

export const ChildProfile = ({ childProfile }: IProps) => {
  const childProfileEntries = Object.entries(childProfile);
  return (
    <StyledChildProfile>
      {childProfileEntries.map(([title, body]) => {
        return (
          <ChildProfileField>
            <ChildProfileFieldTitle>{title}</ChildProfileFieldTitle>
            <ChildProfileFieldBody>{body}</ChildProfileFieldBody>
          </ChildProfileField>
        );
      })}
    </StyledChildProfile>
  );
};
