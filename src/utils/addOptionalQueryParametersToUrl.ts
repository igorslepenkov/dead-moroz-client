import { CreatePresentOptions, GetChildrenOptions } from "../types";

export const addOptionalQueryParametersToUrl = (
  urlString: string,
  options: GetChildrenOptions | CreatePresentOptions
) => {
  const newUrlString = urlString;
  const optionsEntries = Object.entries(options).filter(
    ([_, value]) => value !== null && value !== undefined
  );

  return optionsEntries.reduce((acc, [key, value], idx) => {
    if (idx === 0) {
      return (acc += `?${key}=${value}`);
    }

    return (acc += `&${key}=${value}`);
  }, newUrlString);
};
