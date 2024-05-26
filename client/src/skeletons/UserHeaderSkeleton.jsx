import { Skeleton, SkeletonText, Flex, Box, Avatar } from "@chakra-ui/react";

function UserHeaderSkeleton({ isLoaded }) {
  return (
    <Flex flexDirection={"column"} gap={7} py={4}>
      <Flex justifyContent={"space-between"}>
        <Flex w={"full"} flexDirection={"column"} gap={3}>
          <Skeleton isLoaded={isLoaded} height={"30px"} width={"80px"} />
          <SkeletonText isLoaded={isLoaded} noOfLines={1} width={"200px"} />
        </Flex>
        <Skeleton isLoaded={isLoaded} rounded={"full"}>
          <Avatar size={"xl"} />
        </Skeleton>
      </Flex>

      <SkeletonText isLoaded={isLoaded} noOfLines={2} />

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Skeleton isLoaded={isLoaded} w={"80px"} h={"10px"} />
          <Box bg={"gray.light"} w={1} h={1} borderRadius={"full"}></Box>
          <Skeleton isLoaded={isLoaded} w={"80px"} h={"10px"} />
        </Flex>
        <Flex gap={3}>
          <Skeleton isLoaded={isLoaded} w={7} h={7} />
          <Skeleton isLoaded={isLoaded} w={7} h={7} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default UserHeaderSkeleton;
