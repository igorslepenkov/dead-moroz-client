import { ChildPresentsTable, Page } from "../../components";
import { getUser, useAppSelector } from "../../store";
import { PageContent } from "./style";

export const ChildWishlistPage = () => {
  const user = useAppSelector(getUser);
  return (
    <Page>
      <PageContent>
        {user && <ChildPresentsTable presents={user.childPresents} />}
      </PageContent>
    </Page>
  );
};
