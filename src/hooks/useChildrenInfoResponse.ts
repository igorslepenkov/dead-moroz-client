import { useEffect, useState } from "react";
import {
  fetchChildrenInfo,
  getChildrenInfoRequestData,
  setChildrenRequestData,
  useAppDispatch,
  useAppSelector,
} from "../store";
import { ChildrenFilterType, ChildrenSortType, SortOrder } from "../types";

enum SortOrderHook {
  ASC = "asc",
  DESC = "desc",
}

export const useChildrenInfoResponse = () => {
  const requestData = useAppSelector(getChildrenInfoRequestData);

  const [currentSorting, setCurrentSorting] = useState<ChildrenSortType | null>(
    null
  );
  const [nameSortOrder, setNameSortOrder] = useState<SortOrderHook>(
    SortOrderHook.ASC
  );
  const [scoreSortOrder, setScoreSortOrder] = useState<SortOrderHook>(
    SortOrderHook.ASC
  );
  const [filter, setFilter] = useState<ChildrenFilterType | null>(null);

  const handleSortNameClick = () => {
    const order =
      nameSortOrder === SortOrderHook.ASC
        ? SortOrderHook.DESC
        : SortOrderHook.ASC;

    setNameSortOrder(order);
    setCurrentSorting(ChildrenSortType.Name);
  };

  const handleSortScoreClick = () => {
    const order =
      scoreSortOrder === SortOrderHook.ASC
        ? SortOrderHook.DESC
        : SortOrderHook.ASC;

    setScoreSortOrder(order);
    setCurrentSorting(ChildrenSortType.Score);
  };

  const handleFilterCheck = (type: ChildrenFilterType | "none") => {
    if (type === "none") {
      setFilter(null);
      return;
    }

    setFilter(type);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentSorting === ChildrenSortType.Name) {
      dispatch(
        setChildrenRequestData({
          sort_type: ChildrenSortType.Name,
          sort_order:
            nameSortOrder === SortOrderHook.ASC
              ? SortOrder.Asc
              : SortOrder.Desc,
          filter_type: filter ? filter : null,
        })
      );
      return;
    }

    if (currentSorting === ChildrenSortType.Score) {
      dispatch(
        setChildrenRequestData({
          sort_type: ChildrenSortType.Score,
          sort_order:
            scoreSortOrder === SortOrderHook.ASC
              ? SortOrder.Asc
              : SortOrder.Desc,
          filter_type: filter ? filter : null,
        })
      );
      return;
    }

    dispatch(setChildrenRequestData({ filter_type: filter }));
  }, [currentSorting, nameSortOrder, scoreSortOrder, filter, dispatch]);

  useEffect(() => {
    const refetch = async () => {
      dispatch(fetchChildrenInfo());
    };

    refetch();
  }, [requestData, dispatch]);

  return {
    sorting: currentSorting,
    filter,
    nameSortOrder,
    scoreSortOrder,
    handleNameClick: handleSortNameClick,
    handleScoreClick: handleSortScoreClick,
    setFilter: handleFilterCheck,
  };
};
