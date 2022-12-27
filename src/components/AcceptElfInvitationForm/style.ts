import styled from "styled-components";
import { Media } from "../../ui";

export const StyledAcceptInvitationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 250px;

  ${Media.SM} {
    width: 350px;
  }

  ${Media.MD} {
    width: 500px;
  }
`;
