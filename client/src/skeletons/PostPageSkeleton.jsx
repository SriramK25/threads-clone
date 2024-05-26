import { Skeleton, SkeletonText, Flex, Box, Avatar } from "@chakra-ui/react";

function PostPageSkeleton() {
  return (
    <Flex w={"full"} py={4} gap={4}>
      <Flex alignItems={"center"} flexDirection={"column"} gap={3}>
        <Skeleton rounded={"full"} mt={-3}>
          <Avatar />
        </Skeleton>
        {/* <Skeleton w={"1px"} h={"full"}></Skeleton> */}
        {/* <Box position={"relative"} mt={3}>
          <Skeleton rounded={"full"}>
            <Avatar size={"sm"} />
          </Skeleton> 
        </Box>*/}
      </Flex>
      <Flex flex={1} flexDirection={"column"} gap={5} mb={"30px"}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Skeleton h={"15px"} w={"100px"} />
          <Skeleton h={"15px"} w={"75px"} />
        </Flex>
        <Flex flexDirection={"column"} gap={4}>
          <SkeletonText noOfLines={2} />
          <Skeleton w={"full"} h={"350px"} rounded={"lg"} />
        </Flex>
        <Skeleton w={"full"} h={"2px"} />
        <Skeleton w={"150px"} h={"30px"} rounded={"full"} />
        <Flex gap={2} alignItems={"center"}>
          <Skeleton w={"50px"} h={"10px"} />
          <Skeleton w={"2px"} h={"2px"} borderRadius={"full"}></Skeleton>
          <Skeleton w={"50px"} h={"10px"} />
        </Flex>
        <Skeleton w={"full"} h={"40px"} />
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
      </Flex>
    </Flex>
  );
}

function CommentSkeleton() {
  return (
    <>
      <Skeleton w={"full"} h={"2px"} />

      <Flex flexDirection={"column"} gap={3}>
        <Flex w={"full"} gap={3}>
          <Skeleton rounded={"full"} mt={-2}>
            <Avatar />
          </Skeleton>
          <Skeleton w={"100px"} h={"20px"} />
          <Skeleton w={"70px"} h={"20px"} ml={"auto"} />
        </Flex>

        <SkeletonText noOfLines={2} w={"90%"} alignSelf={"flex-end"} />
      </Flex>
    </>
  );
}

export default PostPageSkeleton;
