import styled from "styled-components";

import { Color, fonts } from "../../ui";

export const StyledChildProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: auto;
  padding: 30px;
  background-color: ${Color.White};
  border-radius: 30px;
  text-align: center;
`;

export const ChildProfileField = styled.section`
  display: flex;
  flex-direction: column;
  text-align: start;
`;

export const ChildProfileFieldTitle = styled.h3`
  ${fonts.h3}
  color: ${Color.InfoMain};
  text-transform: uppercase;
`;

export const ChildProfileFieldBody = styled.p`
  ${fonts.bodyTextLarge}
  color: ${Color.PrimaryMain};
`;

export const ProfileTitle = styled.h2`
  ${fonts.h2}
  color: ${Color.PrimaryMain};
  text-transform: uppercase;
`;

export const ProfileAvatar = styled.img`
  border-radius: 10px;
`;
