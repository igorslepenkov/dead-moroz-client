import styled from "styled-components";
import { Color, fonts } from "../../ui";

export const StyledElfDashboard = styled.div`
  display: grid;
  grid-template-rows: 1fr 10fr;
  grid-template-columns: 2fr 10fr;
  height: calc(100vh - 80px);
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
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15%;
  padding: 0 7px;
  background-color: ${Color.PrimaryHover};
`;

export const ElfDashboardFilter = styled.h3`
  ${fonts.h3}
  color: ${Color.White};
  cursor: pointer;

  &:hover {
    color: ${Color.IceGray};
  }
`;

export const ElfDashboardInfoSection = styled.section`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  background-color: ${Color.LightGray};
`;
