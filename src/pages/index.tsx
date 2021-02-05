import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  useClipboard,
} from "@chakra-ui/react";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
import { convert } from "~/lib/convert";

export default function Index() {
  const [input, setInput] = useState("");
  const [converted, setConverted] = useState("");
  const { hasCopied, onCopy } = useClipboard(converted);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setInput(value);

    let converted = "";
    try {
      if (value) {
        converted = convert(window.location.origin, value);
      }
      setIsInvalid(false);
    } catch {
      setIsInvalid(true);
    } finally {
      setConverted(converted);
    }
  };

  const handleClick = () => converted && onCopy();

  return (
    <>
      <Head>
        <title>two</title>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta
          content="Generate a Twitter URL to share with OGP"
          name="description"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="two" />
        <meta
          property="og:description"
          content="Generate a Twitter URL to share with OGP"
        />
        <meta property="og:title" content="two" />
        <meta property="og:url" content="https://two.shuymn.me" />
        <meta
          property="og:image"
          content="https://two.shuymn.me/default_og_image.jpg"
        />
        <meta name="twitter:card" content="summary" />
      </Head>
      <Flex bg="gray.100" w="100vw" h="100vh">
        <Center mb={["6rem", "8rem", "10rem", "12rem", "12rem"]} mx="auto">
          <Box
            w={["18rem", "20rem", "30rem", "40rem", "50rem"]}
            bg="white"
            rounded="md"
            p={[3, 4, 4, 4, 4]}
            shadow="lg"
          >
            <Flex>
              <Input
                value={input}
                isInvalid={isInvalid}
                focusBorderColor="gray.200"
                errorBorderColor="red.200"
                onChange={handleChange}
                placeholder="Paste here"
              />
              <Button
                onClick={handleClick}
                ml={2}
                fontSize={["sm", "sm", "md"]}
              >
                {hasCopied ? "Copied" : "Generate"}
              </Button>
            </Flex>
          </Box>
        </Center>
      </Flex>
    </>
  );
}
