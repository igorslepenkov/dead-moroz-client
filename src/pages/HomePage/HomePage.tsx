import {
  HomepageBody,
  SignInButton,
  HomepageTitle,
  HomepageBodyText,
} from "./style";
import { Page } from "../../components/Page";

import { homepageBackgroundImage } from "../../assets";

export const HomePage = () => {
  return (
    <Page backgroundImage={homepageBackgroundImage}>
      <HomepageBody>
        <HomepageTitle>Welcome to Dead Moroz App!</HomepageTitle>
        <HomepageBodyText>Please sign in to continue</HomepageBodyText>
        <SignInButton>Sign In !</SignInButton>
      </HomepageBody>
    </Page>
  );
};
