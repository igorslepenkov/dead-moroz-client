import styled from "styled-components";
import { IFullChild } from "../../types";
import { Color, fonts, Media, shadows } from "../../ui";

interface IChildDetailProps {
  gridArea: keyof IFullChild | "translate";
}

export const ChildDetailedInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;

  ${Media.MD} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

export const ChildProfileDetails = styled.section`
  display: grid;
  grid-template-areas:
    "translate title avatar"
    "id id id"
    "profileId profileId profileId"
    "name name name"
    "email email email"
    "country country country"
    "city city city"
    "birthdate birthdate birthdate"
    "hobbies hobbies hobbies"
    "goodDeeds goodDeeds goodDeeds"
    "pastYearDescription pastYearDescription pastYearDescription";
  padding: 20px;
  row-gap: 7px;
  ${shadows.shadow8()}
`;

export const ProfileTitle = styled.h2`
  display: flex;
  justify-content: center;
  ${fonts.h3}
  color: ${Color.InfoMain};
`;

export const ChildProfileDetail = styled.div<IChildDetailProps>`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  grid-area: ${({ gridArea }) => gridArea};
  padding: 5px;
  border-bottom: 2px solid ${Color.InfoBorder};
`;

export const AvatarDetailWrapper = styled.div<IChildDetailProps>`
  display: flex;
  justify-content: flex-end;
  grid-area: ${({ gridArea }) => gridArea};
`;

export const DetailKey = styled.h3`
  ${fonts.bodyTextLarge}
  color: ${Color.InfoMain};
  text-transform: capitalize;
`;

export const DetailValue = styled.p`
  ${fonts.bodyTextNormal}
  color: ${Color.PrimaryMain};
`;

export const PresentsTableWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  ${shadows.shadow8()}
`;

export const Title = styled.h3`
  ${fonts.h3}
  color: ${Color.InfoMain};
  text-align: center;
  margin: 5px;
`;
