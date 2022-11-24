import { createDinamicUrlString } from "./createDinamicUrlString";

export const generateRandomIdenticonAvatar = (userEmail: string): string => {
  return createDinamicUrlString(
    "https://avatars.dicebear.com/api/identicon/:seed.svg",
    { seed: userEmail }
  );
};
