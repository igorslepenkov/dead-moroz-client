import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Avatar } from "@mui/material";

import { ChildPresentsTable, ChildReviewList, Page } from "../../components";

import { generateRandomIdenticonAvatar } from "../../utils";

import {
  AvatarDetailWrapper,
  ChildDetailedInfo,
  ChildProfileDetail,
  ChildProfileDetails,
  DetailKey,
  DetailValue,
  Title,
  PresentsTableWrapper,
  ProfileTitle,
} from "./style";
import {
  getChildInfo,
  useAppDispatch,
  useAppSelector,
  fetchChildInfo,
} from "../../store";
import ReactSelect, { SingleValue } from "react-select";
import { useChildProfileApiTranslation } from "../../hooks";

type ChildDetailsParams = {
  id: string;
};

export enum ChildDetailsKey {
  Id = "id",
  ProfileId = "profileId",
  Email = "email",
  Name = "name",
  Country = "country",
  City = "city",
  Birthdate = "birthdate",
  Hobbies = "hobbies",
  GoodDeeds = "goodDeeds",
  PastYearDescription = "pastYearDescription",
  Avatar = "avatar",
}

export enum Language {
  En = "en",
  Fi = "fi",
}

interface ISelectOption {
  label: keyof typeof Language;
  value: Language;
}

export const ChildDetailedInfoPage = () => {
  const selectOptions: ISelectOption[] = [
    { label: "En", value: Language.En },
    { label: "Fi", value: Language.Fi },
  ];

  const [profileLanguageOption, setProfileLanguageOption] =
    useState<ISelectOption>(selectOptions[0]);

  const currentLanguage = profileLanguageOption.value;

  const selectProfileLanguage = (option: SingleValue<ISelectOption>) => {
    if (option) {
      setProfileLanguageOption(option);
    }
  };

  const { id } = useParams<keyof ChildDetailsParams>() as ChildDetailsParams;

  const dispatch = useAppDispatch();

  const childInfo = useAppSelector(getChildInfo);

  const profileTranslation = useChildProfileApiTranslation(
    Number(childInfo?.child.profileId)
  );

  useEffect(() => {
    if (id) {
      const fetchChildInfoEffect = async () => {
        dispatch(fetchChildInfo(Number(id)));
      };

      fetchChildInfoEffect();
    }
  }, [id, dispatch]);

  if (childInfo && profileTranslation) {
    const { child, presents, reviews } = childInfo;
    const {
      country: countryFi,
      city: cityFi,
      hobbies: hobbiesFi,
      pastYearDescription: descriptionFi,
      goodDeeds: deedsFi,
    } = profileTranslation;

    return (
      <Page>
        <ChildDetailedInfo>
          <ChildProfileDetails>
            <ProfileTitle>Profile</ProfileTitle>
            <ReactSelect
              styles={{
                container: (baseStyles) => ({
                  ...baseStyles,
                  gridArea: "translate",
                  maxWidth: "80px",
                }),
              }}
              value={profileLanguageOption}
              onChange={selectProfileLanguage}
              options={selectOptions}
            />
            <AvatarDetailWrapper
              key={ChildDetailsKey.Avatar}
              gridArea={ChildDetailsKey.Avatar}
            >
              <Avatar
                alt={child.name}
                src={
                  child.avatar.url || generateRandomIdenticonAvatar(child.email)
                }
              />
            </AvatarDetailWrapper>

            <ChildProfileDetail
              key={ChildDetailsKey.Id}
              gridArea={ChildDetailsKey.Id}
            >
              <DetailKey>ID</DetailKey>
              <DetailValue>{child.id}</DetailValue>
            </ChildProfileDetail>

            <ChildProfileDetail
              key={ChildDetailsKey.ProfileId}
              gridArea={ChildDetailsKey.ProfileId}
            >
              <DetailKey>
                {currentLanguage === Language.Fi ? "Profiili ID" : "Profile ID"}
              </DetailKey>
              <DetailValue>{child.profileId}</DetailValue>
            </ChildProfileDetail>

            <ChildProfileDetail
              key={ChildDetailsKey.Name}
              gridArea={ChildDetailsKey.Name}
            >
              <DetailKey>
                {currentLanguage === Language.Fi ? "Nimi" : "Name"}
              </DetailKey>
              <DetailValue>{child.name}</DetailValue>
            </ChildProfileDetail>

            <ChildProfileDetail
              key={ChildDetailsKey.Email}
              gridArea={ChildDetailsKey.Email}
            >
              <DetailKey>
                {currentLanguage === Language.Fi ? "Sähköposti" : "Email"}
              </DetailKey>
              <DetailValue>{child.email}</DetailValue>
            </ChildProfileDetail>

            <ChildProfileDetail
              key={ChildDetailsKey.Country}
              gridArea={ChildDetailsKey.Country}
            >
              <DetailKey>
                {currentLanguage === Language.Fi ? "Maa" : "Country"}
              </DetailKey>
              <DetailValue>
                {currentLanguage === Language.Fi ? countryFi : child.country}
              </DetailValue>
            </ChildProfileDetail>

            <ChildProfileDetail
              key={ChildDetailsKey.City}
              gridArea={ChildDetailsKey.City}
            >
              <DetailKey>
                {currentLanguage === Language.Fi ? "Kaupunki" : "City"}
              </DetailKey>
              <DetailValue>
                {currentLanguage === Language.Fi ? cityFi : child.city}
              </DetailValue>
            </ChildProfileDetail>

            <ChildProfileDetail
              key={ChildDetailsKey.Birthdate}
              gridArea={ChildDetailsKey.Birthdate}
            >
              <DetailKey>
                {currentLanguage === Language.Fi ? "Syntymäpäivä" : "Birthdate"}
              </DetailKey>
              <DetailValue>
                {currentLanguage === Language.Fi
                  ? new Date(child.birthdate).toLocaleDateString("fi-FI", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : new Date(child.birthdate).toDateString()}
              </DetailValue>
            </ChildProfileDetail>

            <ChildProfileDetail
              key={ChildDetailsKey.Hobbies}
              gridArea={ChildDetailsKey.Hobbies}
            >
              <DetailKey>
                {currentLanguage === Language.Fi ? "Harrastukset" : "Hobbies"}
              </DetailKey>
              <DetailValue>
                {currentLanguage === Language.Fi ? hobbiesFi : child.hobbies}
              </DetailValue>
            </ChildProfileDetail>

            <ChildProfileDetail
              key={ChildDetailsKey.PastYearDescription}
              gridArea={ChildDetailsKey.PastYearDescription}
            >
              <DetailKey>
                {currentLanguage === Language.Fi
                  ? "Kuluneen vuoden kuvaus"
                  : "Past Year Description"}
              </DetailKey>
              <DetailValue>
                {currentLanguage === Language.Fi
                  ? descriptionFi
                  : child.pastYearDescription}
              </DetailValue>
            </ChildProfileDetail>

            <ChildProfileDetail
              key={ChildDetailsKey.GoodDeeds}
              gridArea={ChildDetailsKey.GoodDeeds}
            >
              <DetailKey>
                {currentLanguage === Language.Fi
                  ? "Hyviä tekoja"
                  : "Good Deeds"}
              </DetailKey>
              <DetailValue>
                {currentLanguage === Language.Fi ? deedsFi : child.goodDeeds}
              </DetailValue>
            </ChildProfileDetail>
          </ChildProfileDetails>
          <PresentsTableWrapper>
            <Title>Wishlist</Title>
            <ChildPresentsTable presents={presents} />
          </PresentsTableWrapper>
          <ChildReviewList childReviews={reviews} />
        </ChildDetailedInfo>
      </Page>
    );
  }

  return null;
};
