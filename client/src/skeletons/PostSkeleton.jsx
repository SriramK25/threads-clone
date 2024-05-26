import { Skeleton, SkeletonText, Flex, Box, Avatar } from "@chakra-ui/react";

function PostSkeleton() {
  return (
    <Flex w={"full"} py={4} gap={4}>
      <Flex alignItems={"center"} flexDirection={"column"} gap={3}>
        <Skeleton rounded={"full"} mt={-3}>
          <Avatar />
        </Skeleton>
        <Skeleton w={"1px"} h={"full"}></Skeleton>
        <Box position={"relative"} mt={3}>
          <Skeleton rounded={"full"}>
            <Avatar size={"sm"} />
          </Skeleton>
        </Box>
      </Flex>
      <Flex flex={1} flexDirection={"column"} gap={5} mb={"30px"}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Skeleton h={"15px"} w={"100px"} />
          <Skeleton h={"15px"} w={"75px"} />
        </Flex>
        <Flex flexDirection={"column"} gap={4}>
          <SkeletonText noOfLines={2} />
          <Skeleton w={"full"} h={"200px"} rounded={"lg"} />
        </Flex>
        <Skeleton w={"150px"} h={"30px"} rounded={"full"} />
        <Flex gap={2} alignItems={"center"}>
          <Skeleton w={"50px"} h={"10px"} />
          <Skeleton w={"2px"} h={"2px"} borderRadius={"full"}></Skeleton>
          <Skeleton w={"50px"} h={"10px"} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PostSkeleton;
