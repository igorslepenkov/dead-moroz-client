export enum Media {
  XS = "@media(min-width: 320px)",
  SM = "@media(min-width: 568px)",
  MD = "@media(min-width: 768px)",
  LG = "@media(min-width: 992px)",
  XL = "@media(min-width: 1200px)",
}

interface IMediaBreakpoints {
  XS: number;
  SM: number;
  MD: number;
  LG: number;
  XL: number;
  XXL: number;
}

export const MediaBreakpoints: IMediaBreakpoints = {
  XS: 320,
  SM: 568,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1920,
};
