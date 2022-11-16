import { useState } from "react";
import { Page, SignUpForm } from "../../components";
import { AuthFormWrapper, FormTab, AuthFormInnerWrapper } from "./style";

export const AuthenticationPage = () => {
  enum FormTabType {
    SignUp = "signUp",
    SignIn = "signIn",
  }
  const [activeTab, setActiveTab] = useState<FormTabType>(FormTabType.SignIn);

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
          <SignUpForm />
        </AuthFormInnerWrapper>
      </AuthFormWrapper>
    </Page>
  );
};
