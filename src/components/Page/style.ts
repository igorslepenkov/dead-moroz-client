import styled, { css } from "styled-components";

interface IPageProps {
  backgroundImage?: string;
}

export const StyledPage = styled.main<IPageProps>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  ${({ backgroundImage }) => {
    if (backgroundImage) {
      return css`
        background-image: url(${backgroundImage});
        background-size: 100% 100%;
      `;
    }
  }}
`;
