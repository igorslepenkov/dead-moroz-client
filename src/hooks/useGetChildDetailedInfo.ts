import { useEffect, useState } from "react";
import { deadMorozApi } from "../services";
import { getUser, useAppSelector } from "../store";
import { IFullChildInfo, IFullChildInfoApi } from "../types";

export const useGetChildDetailedInfo = (id: string): IFullChildInfo => {
  const user = useAppSelector(getUser);
  const [childInfo, setChildInfo] = useState<IFullChildInfoApi | null>(null);

  useEffect(() => {
    if (user) {
      const fetchChildFullInfo = async () => {
        setChildInfo(await deadMorozApi.getFullChildInfoById(user.token, id));
      };
      fetchChildFullInfo();
    }
  }, [id, user]);

  if (childInfo) {
    const {
      id,
      email,
      name,
      child_profile: {
        country,
        city,
        birthdate,
        hobbies,
        good_deeds,
        past_year_description,
        avatar,
        child_reviews,
      },
      child_presents,
    } = childInfo;

    return {
      child: {
        id,
        email,
        name,
        country,
        city,
        birthdate,
        hobbies,
        goodDeeds: good_deeds,
        pastYearDescription: past_year_description,
        avatar,
      },
      presents: child_presents,
      reviews: child_reviews,
    };
  }

  return {
    child: null,
    presents: [],
    reviews: [],
  };
};
