import { useNavigate } from "react-router-dom";

import { ROUTES_URL } from "../../router";

import { getUser, useAppSelector } from "../../store";

import { USER_ROLES } from "../../types";

import { HomepageBodyText, HomepageTitle, SignInButton } from "./style";

export const HomePageContent = () => {
  const user = useAppSelector(getUser);

  const navigate = useNavigate();

  const navigateToAuthPge = () => {
    navigate(ROUTES_URL.AUTHENTICATION);
  };

  const navigateToChildProfilePage = () => {
    navigate(ROUTES_URL.CHILD_PROFILE);
  };

  const navigateToWishList = () => {
    navigate(ROUTES_URL.CHILD_WISHLIST);
  };

  const navigateToElfDashboard = () => {
    navigate(ROUTES_URL.ElfDashboard);
  };

  if (user && user.role === USER_ROLES.Child) {
    return (
      <>
        <HomepageTitle>Congratulations! You are logged in!</HomepageTitle>
        <HomepageBodyText>
          Next, please fill in info about yourself to send it to Dead Moroz
        </HomepageBodyText>
        <SignInButton onClick={navigateToChildProfilePage}>
          Fill in Profile Info
        </SignInButton>
        or
        <SignInButton onClick={navigateToWishList}>
          Fill in WishList
        </SignInButton>
      </>
    );
  }

  if (user && user.role === USER_ROLES.Elf) {
    return (
      <>
        <HomepageTitle>Welcome, {user.name}</HomepageTitle>
        <HomepageBodyText>
          Go to your dashboard and get to work!
        </HomepageBodyText>
        <SignInButton onClick={navigateToElfDashboard}>Dashboard</SignInButton>
      </>
    );
  }

  return (
    <>
      <HomepageTitle>Welcome to Dead Moroz App!</HomepageTitle>
      <HomepageBodyText>Please sign in to continue</HomepageBodyText>
      <SignInButton onClick={navigateToAuthPge}>Sign In !</SignInButton>
    </>
  );
};
