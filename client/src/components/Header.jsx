// UI LIBRARY
import { Flex, Image, useColorMode } from "@chakra-ui/react";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      <Image
        w={6}
        mt={3}
        mb={7}
        cursor={"pointer"}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
    </Flex>
  );
}

export default Header;
