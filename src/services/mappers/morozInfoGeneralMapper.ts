import { IMorozInfoGeneral, IMorozInfoGeneralApi } from "../../types";

export const morozInfoGeneralMapper = (
  info: IMorozInfoGeneralApi
): IMorozInfoGeneral | null => {
  if (info.children && info.elves) {
    const {
      elves: { count, invited, accepted_invitation, not_accepted_invitation },
      children: {
        count: children_count,
        with_review_count,
        without_review_count,
      },
    } = info;

    return {
      elves: {
        count,
        invited,
        acceptedInvitation: accepted_invitation,
        notAcceptedInvitation: not_accepted_invitation,
      },
      children: {
        count: children_count,
        withReviewCount: with_review_count,
        withoutReviewCount: without_review_count,
      },
    };
  }

  return null;
};
