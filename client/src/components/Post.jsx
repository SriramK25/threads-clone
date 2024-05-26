// UI LIBRARY
import {
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";

// UTILITY LIBRARY
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

// LOCAL FILES
import UserActions from "./UserActions";
import PostInfo from "./PostInfo";
import { userAtom } from "../atoms/userAtom";

// REACT HOOKS
import { useEffect, useRef, useState } from "react";
import postTime from "../helpers/postTime";
import axiosInstance from "../axios/axiosInstance";

function Post({
  postImage,
  postContent,
  likes = [],
  replies = 0,

  postedBy,
  postId,
  createdAt,
}) {
  // UTILITY VARIABLES
  const { colorMode } = useColorMode();
  const { userId } = useParams();
  const postRef = useRef(null);

  const user = useRecoilValue(userAtom);

  // REACT HOOK VARIABLES
  const [like, setLike] = useState({
    isLiked: likes.includes(user?._id),
    count: likes.length,
  });
  const [postUser, setPostUser] = useState(null);

  // HANDLERS

  function handleEditPost() {}
  async function handleDeletePost() {
    try {
      const response = await axiosInstance.delete(`/posts/delete/${postId}`);

      console.log(response);

      if (response.status === 200) {
        postRef.current.style.display = "none";
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axiosInstance.get(`/users/profile/${postedBy}`);

        if (response.status === 200) {
          setPostUser(response.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [postedBy]);

  return (
    <Flex gap={5} mb={20} ref={postRef}>
      {/* PROFILE PIC OF POSTED USER  */}
      <Flex flexDirection={"column"} alignItems={"center"} gap={1.5}>
        <Avatar name={postUser?.username} src={postUser?.profilePic || null} />
        <Box w={"1px"} h={"full"} bg={"gray.light"} borderRadius={"full"}></Box>
        {/* PROFILE PIC OF REPLIED USERS */}
        <Box position={"relative"} mt={3}>
          <Avatar
            name="M"
            size={"xs"}
            top={"-10px"}
            left={"0px"}
            src="/modi.jpeg"
            position={"absolute"}
          />
          <Avatar
            name="M"
            size={"xs"}
            top={"15px"}
            left={"-12px"}
            src="/zuck-avatar.png"
            position={"absolute"}
          />
          <Avatar
            name="M"
            size={"xs"}
            top={"-10px"}
            right={"0px"}
            src="/post3.png"
            position={"absolute"}
          />
        </Box>
      </Flex>

      {/* USERNAME, POST DESC, TIME POSED AND MORE BUTTON */}
      <Flex flex={1} flexDirection={"column"} gap={2}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Heading size={"sm"}>{postUser?.username}</Heading>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={13} color={"gray.light"}>
              {postTime(createdAt)}
            </Text>
            <Menu>
              <MenuButton>
                <FiMoreHorizontal cursor={"pointer"} />
              </MenuButton>
              {userId === user?._id ? (
                <Portal>
                  <MenuList
                    bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                  >
                    <MenuItem
                      bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                      onClick={handleEditPost}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                      onClick={handleDeletePost}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Portal>
              ) : (
                <Portal>
                  <MenuList
                    bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                  >
                    <MenuItem
                      bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                    >
                      Hide
                    </MenuItem>
                    <MenuItem
                      bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                    >
                      Report
                    </MenuItem>
                  </MenuList>
                </Portal>
              )}{" "}
            </Menu>
          </Flex>
        </Flex>
        <Link
          to={`/post/${postId}?name=${postUser?.username}&profilePic=${postUser?.profilePic}`}
        >
          <Flex flexDirection={"column"} gap={2}>
            <Box>
              <Text noOfLines={2}>{postContent}</Text>
            </Box>
            {postImage && (
              <Box
                borderRadius={6}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"gray.light"}
              >
                <Image src={postImage} w={"full"} />
              </Box>
            )}
          </Flex>
        </Link>

        {/* ACTIONS - LIKE, COMMENT, REPOST, SEND */}
        <UserActions setLike={setLike} like={like} postId={postId} />

        {/* NUM OF LIKES AND NUM OF REPLIES */}
        <PostInfo likes={like.count} replies={replies} />
      </Flex>
    </Flex>
  );
}

export default Post;
