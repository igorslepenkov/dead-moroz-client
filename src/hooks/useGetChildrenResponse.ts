import { useEffect, useState } from "react";
import { deadMorozApi } from "../services";
import { getUser, useAppSelector } from "../store";
import {
  GetChildrenOptions,
  IDeadMorozApiGetChildProfilesReponse,
} from "../types";

export const useGetChildrenResponse = () => {
  const user = useAppSelector(getUser);

  const [childrenQueryOptions, setChildrenQueryOptions] =
    useState<GetChildrenOptions>({
      page: 1,
      sort_type: null,
      filter_type: null,
      sort_order: null,
      limit: null,
    });
  const [response, setResponse] =
    useState<IDeadMorozApiGetChildProfilesReponse | null>(null);

  const setPageValue = (page: number) => {
    setChildrenQueryOptions((state) => {
      return {
        ...state,
        page,
      };
    });
  };

  const setChildrenQueryOptionsValue = (
    options: Partial<GetChildrenOptions>
  ) => {
    setChildrenQueryOptions((state) => {
      return {
        ...state,
        ...options,
      };
    });
  };

  useEffect(() => {
    if (user) {
      const fetchChildren = async () => {
        setResponse(
          await deadMorozApi.getChildren(user.token, childrenQueryOptions)
        );
      };

      fetchChildren();
    }
  }, [user, childrenQueryOptions]);

  return {
    children: response ? response.children : [],
    total_pages: response ? response.total_pages : 0,
    total_records: response ? response.total_records : 0,
    limit: response ? response.limit : 0,
    page: response ? response.page : 1,
    setPage: setPageValue,
    queryParams: childrenQueryOptions,
    setQueryParams: setChildrenQueryOptionsValue,
  };
};
