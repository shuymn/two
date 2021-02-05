export const convert = (origin: string, value: string): string => {
  const url = new URL(value);
  if (url.hostname !== "twitter.com") {
    throw new Error("host name is not 'twitter.com'");
  }
  return origin + url.pathname + url.search;
};
