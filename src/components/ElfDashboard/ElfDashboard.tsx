import { useEffect, useState } from "react";
import { useGetChildrenResponse } from "../../hooks";
import { GetChildrenOptions } from "../../types";
import { ChildrenListingTable } from "../ChildrenListingTable";
import {
  ElfDashboardHeader,
  ElfDashboardContent,
  ElfDashboardSortingPannel,
  StyledElfDashboard,
  ElfDashboardHeaderContent,
  ElfDashboardFilter,
  ElfDashboardFilterWrapper,
  ElfDashboardFilterNotificator,
} from "./style";

export const ElfDashboard = () => {
  const {
    children,
    page,
    incrementPage,
    decrementPage,
    setPage,
    queryParams,
    setQueryParams,
  } = useGetChildrenResponse();

  const [sortByName, setSortByName] = useState<"ASC" | "DESC">("ASC");
  const [sortByScore, setSortByScore] = useState<"ASC" | "DESC" | null>(null);
  const [filterByScore, setFilterByScore] = useState<
    "scored" | "not_scored" | null
  >(null);

  const toggleSortByNameOnClick = () => {
    if (sortByName === "ASC") {
      setSortByName("DESC");
    }

    if (sortByName === "DESC") {
      setSortByName("ASC");
    }
  };

  const toggleSortByScoreOnClick = () => {
    if (!sortByScore) {
      setSortByScore("ASC");
    }

    if (sortByScore === "ASC") {
      setSortByScore("DESC");
    }

    if (sortByScore === "DESC") {
      setSortByScore(null);
    }
  };

  const toggleFilterOnClick = () => {
    if (!filterByScore) {
      setFilterByScore("scored");
    }

    if (filterByScore === "scored") {
      setFilterByScore("not_scored");
    }

    if (filterByScore === "not_scored") {
      setFilterByScore(null);
    }
  };

  useEffect(() => {
    setQueryParams(
      (() => {
        const options: Partial<GetChildrenOptions> = {
          sort_type: null,
          sort_order: null,
          filter_type: null,
        };

        if (sortByName) {
          options.sort_type = "name";
          options.sort_order = sortByName;
        }

        if (sortByScore) {
          options.sort_type = "score";
          options.sort_order = sortByScore;
        }

        if (filterByScore) {
          options.filter_type = filterByScore;
        }

        return options;
      })()
    );
  }, [sortByName, sortByScore, filterByScore]);

  return (
    <StyledElfDashboard>
      <ElfDashboardHeader>
        <ElfDashboardHeaderContent>
          Children Interactive Dashboard
        </ElfDashboardHeaderContent>
      </ElfDashboardHeader>
      <ElfDashboardSortingPannel>
        <ElfDashboardFilterWrapper>
          <ElfDashboardFilter onClick={toggleSortByNameOnClick}>
            All children
          </ElfDashboardFilter>
          {queryParams.sort_type === "name" && (
            <ElfDashboardFilterNotificator>
              {queryParams.sort_order}
            </ElfDashboardFilterNotificator>
          )}
        </ElfDashboardFilterWrapper>

        <ElfDashboardFilterWrapper>
          <ElfDashboardFilter onClick={toggleSortByScoreOnClick}>
            Sort by score
          </ElfDashboardFilter>
          {queryParams.sort_type === "score" && (
            <ElfDashboardFilterNotificator>
              {queryParams.sort_order}
            </ElfDashboardFilterNotificator>
          )}
        </ElfDashboardFilterWrapper>

        <ElfDashboardFilterWrapper>
          <ElfDashboardFilter onClick={toggleFilterOnClick}>
            Filter scored | unscored
          </ElfDashboardFilter>
          {queryParams.filter_type && (
            <ElfDashboardFilterNotificator>
              {queryParams.filter_type}
            </ElfDashboardFilterNotificator>
          )}
        </ElfDashboardFilterWrapper>
      </ElfDashboardSortingPannel>
      <ElfDashboardContent>
        <ChildrenListingTable children={children} />
      </ElfDashboardContent>
    </StyledElfDashboard>
  );
};
