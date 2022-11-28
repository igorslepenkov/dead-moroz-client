import { useToggle } from "../../hooks";
import {
  ElfDashboardHeader,
  ElfDashboardInfoSection,
  ElfDashboardSortingPannel,
  StyledElfDashboard,
  ElfDashboardHeaderContent,
  ElfDashboardFilter,
} from "./style";

export const ElfDashboard = () => {
  return (
    <StyledElfDashboard>
      <ElfDashboardHeader>
        <ElfDashboardHeaderContent>
          Children Interactive Dashboard
        </ElfDashboardHeaderContent>
      </ElfDashboardHeader>
      <ElfDashboardSortingPannel>
        <ElfDashboardFilter>All children</ElfDashboardFilter>
        <ElfDashboardFilter>Sort by reviews</ElfDashboardFilter>
        <ElfDashboardFilter>Sort by score</ElfDashboardFilter>
        <ElfDashboardFilter>Filter scored</ElfDashboardFilter>
      </ElfDashboardSortingPannel>
      <ElfDashboardInfoSection></ElfDashboardInfoSection>
    </StyledElfDashboard>
  );
};
