import styled from "styled-components";
import { Color, fonts } from "../../ui";

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  min-height: 50px;
  background: linear-gradient(
    80.43deg,
    #04494d 4.54%,
    #09425e 53.26%,
    #324382 96.24%
  );
  border-radius: 4px 4px 0px 0px;
`;

export const Title = styled.h2`
  ${fonts.h2}
  color: ${Color.White};
`;
