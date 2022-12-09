import styled, { css } from "styled-components";

interface IPageProps {
  backgroundImagePath?: string;
}

export const StyledPage = styled.main<IPageProps>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  ${({ backgroundImagePath }) => {
    if (backgroundImagePath) {
      return css`
        background-image: url(${backgroundImagePath});
        background-size: 100% 100%;
      `;
    }
  }}
`;
