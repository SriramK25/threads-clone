// UI LIBRARY
import { Flex, Avatar, Divider, Text } from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";

// LOCAL FILES
import UserActions from "./UserActions";
import PostInfo from "./PostInfo";
import postTime from "../helpers/postTime";

function Comment({
  likes = 0,
  replies = 0,
  user,
  comment,
  userPic,
  createdAt,
}) {
  return (
    <>
      <Divider />
      <Flex alignItems={"start"} gap={3} py={3}>
        <Avatar name="" src={userPic} size={"sm"} />
        <Flex flexDirection={"column"} gap={2} mt={-1}>
          <Text fontWeight={"semibold"}>{user}</Text>
          <Text>{comment}</Text>
          {/* <UserActions /> */}
          {/* <PostInfo likes={likes} replies={replies} /> */}
        </Flex>
        <Flex alignItems={"center"} gap={2} ml={"auto"}>
          <Text fontSize={"xs"}>{postTime(createdAt)}</Text>
          <FiMoreHorizontal />
        </Flex>
      </Flex>
    </>
  );
}

export default Comment;
