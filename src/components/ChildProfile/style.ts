import styled from "styled-components";

import { Color, fonts, Media, shadows } from "../../ui";

export const StyledChildProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: auto;
  padding: 30px;
  background-color: ${Color.White};
  border-radius: 30px;

  ${Media.MD} {
    width: 80%;
    align-items: flex-start;
    ${shadows.shadow8()}
  }
`;

export const ChildProfileField = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;

  ${Media.MD} {
    text-align: start;
  }
`;

export const ChildProfileFieldTitle = styled.h3`
  ${fonts.h3}
  color: ${Color.InfoMain};
  text-transform: uppercase;
`;

export const ChildProfileFieldBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  ${fonts.bodyTextLarge}
  color: ${Color.PrimaryMain};
`;

export const ProfileTitle = styled.h2`
  ${fonts.h2}
  color: ${Color.PrimaryMain};
  text-transform: uppercase;
  text-align: center;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ProfileAvatar = styled.img`
  border-radius: 10px;
  max-width: 100px;
  max-height: 100px;

  ${Media.MD} {
    max-width: 200px;
    max-height: 200px;
  }
`;

export const AddAvatarButton = styled.button`
  max-width: 200px;
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
