type CreateDinamicUrlStringParams = {
  [key: string]: string | number;
};

export const createDinamicUrlString = (
  urlWithDinamicSegment: string,
  params: CreateDinamicUrlStringParams
) => {
  const paramsEntries = Object.entries(params);
  return paramsEntries.reduce((acc, [key, value]) => {
    const regexp = new RegExp(`:${key}`);
    return acc.replace(regexp, value.toString());
  }, urlWithDinamicSegment);
};
