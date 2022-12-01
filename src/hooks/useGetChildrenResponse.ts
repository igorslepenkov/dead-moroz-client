import { useEffect, useState } from "react";
import { deadMorozApi } from "../services";
import { getUser, useAppSelector } from "../store";
import {
  GetChildrenOptions,
  IDeadMorozApiGetChildProfilesReponse,
} from "../types";

export const useGetChildrenResponse = () => {
  const user = useAppSelector(getUser);

  const [page, setPage] = useState<number>(1);

  const [childrenQueryOptions, setChildrenQueryOptions] =
    useState<GetChildrenOptions>({
      sort_type: null,
      filter_type: null,
      sort_order: null,
      limit: null,
    });
  const [response, setResponse] =
    useState<IDeadMorozApiGetChildProfilesReponse | null>(null);

  const incrementPage = () => {
    setPage((state) => {
      if (response && state === response.total_pages) {
        return state;
      }

      return (state += 1);
    });
  };

  const decrementPage = () => {
    setPage((state) => {
      if (state === 1) {
        return state;
      }

      return (state -= 1);
    });
  };

  const setPageValue = (page: number) => {
    setPage(page);
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
          await deadMorozApi.getChildren(user.token, page, childrenQueryOptions)
        );
      };

      fetchChildren();
    }
  }, [user, page, childrenQueryOptions]);

  return {
    children: response ? response.children : [],
    total_pages: response ? response.total_pages : 0,
    total_records: response ? response.total_records : 0,
    limit: response ? response.limit : 0,
    page,
    incrementPage,
    decrementPage,
    setPage: setPageValue,
    queryParams: childrenQueryOptions,
    setQueryParams: setChildrenQueryOptionsValue,
  };
};
