import cheerio from "cheerio";
import fetch from "node-fetch";

export type OGP = Record<string, string>;

export const parse = async (url: string): Promise<OGP> => {
  const resp = await fetch(url, { headers: { "User-Agent": "bot" } });
  if (!resp.ok) {
    throw new Error(`failed to fetch. unexpeted response ${resp.statusText}`);
  }

  const html = await resp.text();
  const $ = cheerio.load(html);

  const ogp: OGP = {};
  $("head meta").each((i, el) => {
    const property = $(el).attr("property");
    const content = $(el).attr("content");
    if (property && content) {
      ogp[property] = content;
    }
  });

  return ogp;
};
