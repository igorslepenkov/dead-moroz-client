import styled from "styled-components";
import { Color, fonts } from "../../ui";

export const ChildProfilePageBody = styled.div`
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

export const ChildProfileTitle = styled.h1`
  ${fonts.h2}
  color: ${Color.PrimaryHover};
`;

export const ChildProfileBodyText = styled.p`
  ${fonts.bodyTextNormal}
  color: ${Color.InfoMain};
`;

export const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 15px;
  background-color: ${Color.InfoMain};
  ${fonts.h3}
  color: ${Color.White};
  cursor: pointer;

  &:hover {
    background-color: ${Color.InfoHover};
  }

  &:active {
    background-color: ${Color.InfoPressed};
  }
`;
