import styled from "styled-components";

import { Color, fonts } from "../../ui";

export const StyledChildProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: auto;
  padding: 30px;
  background-color: ${Color.White};
  border-radius: 30px;
  text-align: center;
`;

export const ChildProfileField = styled.section`
  display: flex;
  flex-direction: column;
`;

export const ChildProfileFieldTitle = styled.h3`
  ${fonts.h3}
  color: ${Color.InfoMain};
`;

export const ChildProfileFieldBody = styled.p`
  ${fonts.bodyTextLarge}
  color: ${Color.PrimaryMain};
`;
