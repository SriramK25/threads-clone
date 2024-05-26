// UI LIBRARY
import { Box, Flex, Text } from "@chakra-ui/react";

// LOCAL FILES
import numberConverter from "../helpers/numberConverter";

function PostInfo({ likes, replies }) {
  return (
    <Flex
      alignItems={"center"}
      gap={2}
      fontSize={12}
      mt={2}
      userSelect={"none"}
    >
      <Text>
        {likes > 0 ? `${numberConverter(likes)}` : "No"} Like
        {likes === 1 ? "" : "s"}
      </Text>
      <Box w={"2px"} h={"2px"} borderRadius={"full"} bg={"gray.light"}></Box>
      <Text>
        {replies > 0 ? `${numberConverter(replies)}` : "No"} repl
        {replies === 1 ? "y" : "ies"}{" "}
      </Text>
    </Flex>
  );
}

export default PostInfo;
