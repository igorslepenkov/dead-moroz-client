import { Pagination, Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetChildrenResponse } from "../../hooks";
import {
  ChildrenFilterType,
  ChildrenSortType,
  GetChildrenOptions,
  SortOrder,
} from "../../types";
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
  PaginationWrapper,
} from "./style";

export const ElfDashboard = () => {
  const { children, total_pages, setPage, queryParams, setQueryParams } =
    useGetChildrenResponse();

  const [sortByName, setSortByName] = useState<SortOrder>(SortOrder.Asc);
  const [sortByScore, setSortByScore] = useState<SortOrder | null>(null);
  const [filterByScore, setFilterByScore] = useState<ChildrenFilterType | null>(
    null
  );

  const [limitValue, setLimitValue] = useState<number>(5);

  const updateLimitValue = (value: number | number[]) => {
    if (typeof value === "number") {
      setLimitValue(value);
    }
  };

  const toggleSortByNameOnClick = () => {
    if (sortByName === SortOrder.Asc) {
      setSortByName(SortOrder.Desc);
    }

    if (sortByName === SortOrder.Desc) {
      setSortByName(SortOrder.Asc);
    }
  };

  const toggleSortByScoreOnClick = () => {
    if (!sortByScore) {
      setSortByScore(SortOrder.Asc);
    }

    if (sortByScore === SortOrder.Asc) {
      setSortByScore(SortOrder.Desc);
    }

    if (sortByScore === SortOrder.Desc) {
      setSortByScore(null);
    }
  };

  const toggleFilterOnClick = () => {
    if (!filterByScore) {
      setFilterByScore(ChildrenFilterType.Scored);
    }

    if (filterByScore === ChildrenFilterType.Scored) {
      setFilterByScore(ChildrenFilterType.NotScored);
    }

    if (filterByScore === ChildrenFilterType.NotScored) {
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
          options.sort_type = ChildrenSortType.Name;
          options.sort_order = sortByName;
        }

        if (sortByScore) {
          options.sort_type = ChildrenSortType.Score;
          options.sort_order = sortByScore;
        }

        if (filterByScore) {
          options.filter_type = filterByScore;
        }

        options.limit = limitValue;

        return options;
      })()
    );
  }, [sortByName, sortByScore, filterByScore, limitValue]);

  useEffect(() => {
    if (sortByName) {
      setSortByScore(null);
    }
  }, [sortByName]);

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
        <ElfDashboardFilterWrapper>
          <ElfDashboardFilter>Set limit of records</ElfDashboardFilter>
          <Slider
            color="secondary"
            defaultValue={5}
            step={1}
            min={1}
            max={50}
            valueLabelDisplay="auto"
            onChangeCommitted={(_, value) => updateLimitValue(value)}
          />
        </ElfDashboardFilterWrapper>
      </ElfDashboardSortingPannel>
      <ElfDashboardContent>
        <ChildrenListingTable children={children} />
        <PaginationWrapper>
          <Pagination
            boundaryCount={3}
            count={total_pages}
            defaultPage={1}
            onChange={(_, page) => setPage(page)}
            color="primary"
          />
        </PaginationWrapper>
      </ElfDashboardContent>
    </StyledElfDashboard>
  );
};
