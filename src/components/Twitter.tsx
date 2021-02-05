import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { OGP, parse } from "~/lib/ogp-parser";

type Props = {
  props: {
    url: string;
    ogp: OGP | undefined;
  };
};

export const Twitter: NextPage<Props> = ({ props: { url, ogp } }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    router.push(url);
  }

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="robots" content="follow, index" />
      <link href="/favicon.ico" rel="shortcut icon" />
      {ogp &&
        Object.keys(ogp).map((key) => (
          <meta key={key} property={key} content={ogp[key]} />
        ))}
    </Head>
  );
};

Twitter.getInitialProps = async ({ asPath }: NextPageContext) => {
  const url = `https://twitter.com${asPath}`;
  const ogp = await parse(url).catch((e) => console.error(e) as undefined);
  return { props: { url, ogp } };
};
