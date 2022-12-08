import { css } from "styled-components";
import { Media } from "./media";

const h1 = css`
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;

  ${Media.SM} {
    font-size: 36px;
    line-height: 44px;
  }
`;

const h2 = css`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;

  ${Media.SM} {
    font-size: 28px;
    line-height: 36px;
  }
`;

const h3 = css`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  ${Media.SM} {
    font-size: 24px;
    line-height: 28px;
  }
`;

const bodyTextLarge = css`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  ${Media.SM} {
    font-size: 16px;
    line-height: 24px;
  }
`;

const bodyTextNormal = css`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;

  ${Media.SM} {
    font-size: 14px;
    line-height: 20px;
  }
`;

const bodyTextSmall = css`
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;

  ${Media.SM} {
    font-size: 12px;
    line-height: 16px;
  }
`;

export const fonts = {
  h1,
  h2,
  h3,
  bodyTextLarge,
  bodyTextNormal,
  bodyTextSmall,
};
