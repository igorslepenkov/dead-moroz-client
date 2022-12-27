import { Navigate, useSearchParams } from "react-router-dom";
import { AcceptElfInvitationForm, Page } from "../../components";
import { ROUTES_URL } from "../../router";
import { FormWrapper } from "./style";

export const AcceptElfInviitationPage = () => {
  const [params] = useSearchParams();

  const token = params.get("invitation_token");

  if (token) {
    return (
      <Page>
        <FormWrapper>
          <AcceptElfInvitationForm token={token} />
        </FormWrapper>
      </Page>
    );
  }

  return <Navigate to={ROUTES_URL.HOME} />;
};
