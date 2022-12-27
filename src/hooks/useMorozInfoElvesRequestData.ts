import { useEffect, useState } from "react";
import {
  fetchMorozInfoElves,
  getMorozInfoElvesRequestParams,
  setMorozInfoElvesRequestParams,
  useAppDispatch,
  useAppSelector,
  ElvesSortType,
  SortOrder,
  ElvesFilterType,
} from "../store";

enum SortOrderHook {
  ASC = "asc",
  DESC = "desc",
}

export const useMorozInfoElvesRequestData = () => {
  const requestData = useAppSelector(getMorozInfoElvesRequestParams);

  const [currentSorting, setCurrentSorting] = useState<ElvesSortType>();
  const [nameSortOrder, setNameSortOrder] = useState<SortOrderHook>(
    SortOrderHook.ASC
  );
  const [reviewsSortOrder, setReviewsSortOrder] = useState<SortOrderHook>(
    SortOrderHook.ASC
  );
  const [filter, setFilter] = useState<ElvesFilterType | null>(null);

  const handleSortNameClick = () => {
    const order =
      nameSortOrder === SortOrderHook.ASC
        ? SortOrderHook.DESC
        : SortOrderHook.ASC;

    setNameSortOrder(order);
    setCurrentSorting(ElvesSortType.Name);
  };

  const handleSortReviewsClick = () => {
    const order =
      reviewsSortOrder === SortOrderHook.ASC
        ? SortOrderHook.DESC
        : SortOrderHook.ASC;

    setReviewsSortOrder(order);
    setCurrentSorting(ElvesSortType.ReviewsCount);
  };

  const handleFilterCheck = (type: ElvesFilterType | "none") => {
    if (type === "none") {
      setFilter(null);
      return;
    }

    setFilter(type);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentSorting === ElvesSortType.Name) {
      dispatch(
        setMorozInfoElvesRequestParams({
          sort_type: ElvesSortType.Name,
          sort_order:
            nameSortOrder === SortOrderHook.ASC
              ? SortOrder.Asc
              : SortOrder.Desc,
          filter_type: filter ? filter : null,
        })
      );
      return;
    }

    if (currentSorting === ElvesSortType.ReviewsCount) {
      dispatch(
        setMorozInfoElvesRequestParams({
          sort_type: ElvesSortType.ReviewsCount,
          sort_order:
            reviewsSortOrder === SortOrderHook.ASC
              ? SortOrder.Asc
              : SortOrder.Desc,
          filter_type: filter ? filter : null,
        })
      );
      return;
    }

    dispatch(setMorozInfoElvesRequestParams({ filter_type: filter }));
  }, [currentSorting, nameSortOrder, reviewsSortOrder, filter]);

  useEffect(() => {
    const refetch = async () => {
      dispatch(fetchMorozInfoElves());
    };

    refetch();
  }, [requestData]);

  return {
    sorting: currentSorting,
    filter,
    nameSortOrder,
    reviewsSortOrder,
    handleNameClick: handleSortNameClick,
    handleReviewsClick: handleSortReviewsClick,
    setFilter: handleFilterCheck,
  };
};
