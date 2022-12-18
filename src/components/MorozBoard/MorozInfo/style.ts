import styled from "styled-components";
import { Color, fonts, Media, shadows } from "../../../ui";

export const StyledMorozInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  width: 100%;
  padding: 10px;
  ${shadows.shadow6()}

  ${Media.MD} {
    height: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 0px;
  }
`;

export const InfoCard = styled.article`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  padding: 20px 10px;
  ${shadows.shadow6()}

  ${Media.SM} {
    width: 250px;
    height: 400px;
  }
`;

export const InfoCardList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  list-style: none;
`;

export const CardTitle = styled.h3`
  ${fonts.h3}
  color: ${Color.InfoMain};
  text-align: center;
`;

export const CardInfo = styled.li`
  ${fonts.bodyTextLarge}
  color: ${Color.Black};
`;
