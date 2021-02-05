import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactNode {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
