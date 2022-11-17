import { AxiosResponseHeaders } from "axios";

export const getTokenFromHeaders = (
  headers: AxiosResponseHeaders | Partial<Record<string, string>>
): string | null => {
  const tokenWithBearer = headers.authorization;
  if (tokenWithBearer) {
    const tokenWithoutBearer = tokenWithBearer.replace(/Bearer/, "");
    return tokenWithoutBearer.trim();
  }

  return null;
};
