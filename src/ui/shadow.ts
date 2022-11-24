import { css } from "styled-components";

const shadow2 = (shadowColor = "rgba(0, 0, 0, 0.12)") => css`
  box-shadow: 0px 2px 4px ${shadowColor};
`;

const shadow4 = (shadowColor = "rgba(0, 0, 0, 0.1)") => css`
  box-shadow: 0px 4px 8px ${shadowColor};
`;

const shadow6 = (shadowColor = "rgba(0, 0, 0, 0.1)") => css`
  box-shadow: 0px 6px 12px ${shadowColor};
`;

const shadow8 = (shadowColor = "rgba(0, 0, 0, 0.08)") => css`
  box-shadow: 0px 8px 16px ${shadowColor};
`;

const shadow8Inset = (shadowColor = "rgba(0, 0, 0, 0.08)") => css`
  box-shadow: inset 0px 8px 16px ${shadowColor};
`;

export const shadows = { shadow2, shadow4, shadow6, shadow8, shadow8Inset };
