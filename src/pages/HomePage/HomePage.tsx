import { useNavigate } from "react-router-dom";
import {
  HomepageBody,
  SignInButton,
  HomepageTitle,
  HomepageBodyText,
} from "./style";
import { Page } from "../../components/Page";

import { homepageBackgroundImage } from "../../assets";
import { ROUTES_URL } from "../../router";

export const HomePage = () => {
  const navigate = useNavigate();
  const onSignInClick = () => {
    navigate(ROUTES_URL.AUTHENTICATION);
  };
  return (
    <Page backgroundImage={homepageBackgroundImage}>
      <HomepageBody>
        <HomepageTitle>Welcome to Dead Moroz App!</HomepageTitle>
        <HomepageBodyText>Please sign in to continue</HomepageBodyText>
        <SignInButton onClick={onSignInClick}>Sign In !</SignInButton>
      </HomepageBody>
    </Page>
  );
};
