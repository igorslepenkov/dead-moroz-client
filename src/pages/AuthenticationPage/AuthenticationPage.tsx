import { useState } from "react";
import { Navigate } from "react-router-dom";

import { Page, SignInForm, SignUpForm } from "../../components";

import { getUserIsLoggedIn, useAppSelector } from "../../store";

import { ROUTES_URL } from "../../router";

import { AuthFormWrapper, FormTab, AuthFormInnerWrapper } from "./style";

export const AuthenticationPage = () => {
  enum FormTabType {
    SignUp = "signUp",
    SignIn = "signIn",
  }
  const [activeTab, setActiveTab] = useState<FormTabType>(FormTabType.SignIn);

  const userIsLoggedIn = useAppSelector(getUserIsLoggedIn);

  if (userIsLoggedIn) {
    return <Navigate to={ROUTES_URL.HOME} />;
  }

  return (
    <Page>
      <AuthFormWrapper>
        <FormTab
          active={activeTab === FormTabType.SignIn}
          onClick={() => setActiveTab(FormTabType.SignIn)}
        >
          Sign In
        </FormTab>
        <FormTab
          active={activeTab === FormTabType.SignUp}
          onClick={() => setActiveTab(FormTabType.SignUp)}
        >
          Sign Up
        </FormTab>
        <AuthFormInnerWrapper>
          {activeTab === FormTabType.SignUp ? <SignUpForm /> : <SignInForm />}
        </AuthFormInnerWrapper>
      </AuthFormWrapper>
    </Page>
  );
};
