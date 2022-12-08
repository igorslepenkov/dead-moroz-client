import { useEffect, useState } from "react";
import { deadMorozApi } from "../services";
import { getUser, useAppSelector } from "../store";

interface IChildProfileTranslation {
  country: string;
  city: string;
  hobbies: string;
  pastYearDescription: string;
  goodDeeds: string;
}

export const useChildProfileApiTranslation = (childProifleId: number) => {
  const [profileTranslation, setProfileTranslation] =
    useState<IChildProfileTranslation | null>(null);

  const user = useAppSelector(getUser);

  useEffect(() => {
    const fetchProfielTranslation = async () => {
      if (user) {
        const { country, city, hobbies, past_year_description, good_deeds } =
          await deadMorozApi.translateChildProfileFields(
            user.token,
            childProifleId
          );
        setProfileTranslation({
          country,
          city,
          hobbies,
          pastYearDescription: past_year_description,
          goodDeeds: good_deeds,
        });
      }
    };

    fetchProfielTranslation();
  }, [childProifleId, user]);

  return profileTranslation;
};
