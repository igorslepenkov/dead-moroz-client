import styled, { css } from "styled-components";

interface IPageProps {
  backgroundimage?: string;
}

export const StyledPage = styled.main<IPageProps>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  ${({ backgroundimage }) => {
    if (backgroundimage) {
      return css`
        background-image: url(${backgroundimage});
        background-size: 100% 100%;
      `;
    }
  }}
`;
