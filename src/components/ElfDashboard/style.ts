import styled from "styled-components";
import { Color, fonts, Media } from "../../ui";

export const StyledElfDashboard = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 10fr;
  grid-template-columns: 10fr;
  height: calc(100vh - 80px);

  ${Media.SM} {
    grid-template-rows: 1fr 10fr;
    grid-template-columns: 2fr 10fr;
  }
`;

export const ElfDashboardHeader = styled.header`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  z-index: 10;
  display: grid;
  grid-template-columns: 2fr 10fr;
  grid-template-rows: 1fr;
  background-color: ${Color.InfoHover};
  opacity: 0.8;
  color: ${Color.White};
`;

export const ElfDashboardHeaderContent = styled.div`
  grid-column: 2 / 3;
  ${fonts.h2}
  color: ${Color.White};
  text-align: center;
  padding: 10px 10px;
`;

export const ElfDashboardSortingPannel = styled.aside`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  padding: 0 7px;
  background-color: ${Color.PrimaryHover};

  ${Media.SM} {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    flex-direction: column;
    justify-content: center;
    gap: 15%;
  }
`;

export const ElfDashboardFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
`;

export const ElfDashboardFilter = styled.h3`
  ${fonts.h3}
  color: ${Color.White};
  cursor: pointer;

  &:hover {
    color: ${Color.IceGray};
  }
`;

export const ElfDashboardFilterNotificator = styled.p`
  ${fonts.bodyTextLarge}
  color: ${Color.DangerMain};
`;

export const ElfDashboardContent = styled.section`
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  padding: 10px 0;
  background-color: ${Color.LightGray};

  ${Media.SM} {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    padding: 10px;
  }
`;
