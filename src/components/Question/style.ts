import styled from "styled-components";
import { Color, fonts } from "../../ui";

interface IQuestionProps {
  isEnabled: boolean;
}

export const StyledQuestion = styled.div<IQuestionProps>`
  display: ${({ isEnabled }) => (isEnabled ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const QuestionTitle = styled.h3`
  margin: 10px 0;
  ${fonts.h2}
  color: ${Color.PrimaryMain};
`;

export const NextButton = styled.button`
  padding: 8px 16px;
  background-color: ${Color.PrimaryMain};
  border: 3px solid transparent;
  border-radius: 4px;
  ${fonts.bodyTextLarge};
  color: ${Color.White};

  &:hover {
    background-color: ${Color.PrimaryHover};
  }

  &:active {
    background-color: ${Color.PrimaryPressed};
  }

  &:focus {
    border: 3px solid ${Color.PrimaryFocused};
  }
`;
