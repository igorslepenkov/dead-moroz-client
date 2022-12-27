import { IElf, IElfApi } from "../../types";

export const morozInfoElvesMapper = (elf: IElfApi): IElf => {
  const {
    id,
    name,
    email,
    updated_at,
    created_at,
    invitation_sent_at,
    reviews_count,
  } = elf;

  return {
    id,
    name,
    email,
    updatedAt: updated_at,
    createdAt: created_at,
    invitationSentAt: invitation_sent_at,
    reviewsCount: reviews_count,
  };
};
