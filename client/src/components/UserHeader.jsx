// UI LIBRARY
import {
  Box,
  Flex,
  Heading,
  Avatar,
  Text,
  Tag,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  Button,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";

// UTILITY LIBRARY
import { useParams, Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

// LOCAL FILES
import useToaster from "../hooks/useToaster";
import { userAtom } from "../atoms/userAtom";

// REACT HOOKS
import { useState } from "react";
import copyLinkToClipboard from "../helpers/copyLinkToClipBoard";
import axiosInstance from "../axios/axiosInstance";

function UserHeader({
  name,
  username,
  profilePic,
  followers,
  following,
  posts,
  bio,
  createdAt,
  _id,
}) {
  // UI VARIABLES
  const { colorMode } = useColorMode();

  // UTILITY VARIABLES
  const { userId } = useParams();

  // LOGGED IN USER
  const user = useRecoilValue(userAtom);

  // LOCAL VARIABLES
  const showToast = useToaster();
  const navigate = useNavigate();

  // REACT HOOK VARIABLES
  const [descriptionLines, setDescriptionLines] = useState(1);
  const [followCount, setFollowCount] = useState(followers?.length || 0);
  const [isFollowing, setIsFollowing] = useState(
    followers?.includes(user?._id)
  );

  async function handleFollowAndUnfollow() {
    try {
      const response = await axiosInstance.post(`/users/follow/${userId}`);

      console.log(response);

      if (isFollowing) {
        setIsFollowing(false);
      } else {
        setIsFollowing(true);
      }

      if (response.data.message === "followed") {
        setFollowCount((currentFollowCount) => currentFollowCount + 1);
      } else {
        setFollowCount((currentFollowCount) => currentFollowCount - 1);
      }
    } catch (error) {
      showToast(undefined, error.response.data.message, "error");
      navigate("/auth");
    }
  }

  return (
    <>
      <>
        <Flex justifyContent={"space-between"}>
          <Box mt={2}>
            {/* NAME */}
            <Heading size={"lg"}>{name}</Heading>
            <Flex gap={2}>
              {/* USERNAME */}
              <Text fontWeight={"semibold"}>@{username}</Text>
              <Tag
                variant={"outline"}
                borderRadius={"xl"}
                cursor={"default"}
                colorScheme={colorMode === "dark" ? "gray" : "green"}
              >
                {posts ? posts + " " : "No "} threads
              </Tag>
            </Flex>

            {_id !== user?._id && (
              <Stack mt={4} direction={"row"} spacing={4}>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={isFollowing ? "red.400" : "blue.400"}
                  color={"white"}
                  type="submit"
                  boxShadow={
                    isFollowing
                      ? ""
                      : "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 7px 7px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                    bg: "blue.500",
                  }}
                  _focus={{
                    bg: "blue.500",
                  }}
                  onClick={handleFollowAndUnfollow}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  _focus={{
                    bg: "gray.200",
                  }}
                >
                  Message
                </Button>
              </Stack>
            )}
          </Box>
          {/* USER PROFILE PICTURE */}
          <Box>
            <Avatar name={name} src={profilePic} size={"xl"} />
          </Box>
        </Flex>

        {/* USER BIOGRAPHY */}
        <Text
          noOfLines={descriptionLines}
          my={6}
          cursor={"pointer"}
          onClick={() =>
            descriptionLines === 1
              ? setDescriptionLines(10)
              : setDescriptionLines(1)
          }
        >
          {bio !== "" ? bio : "Hey there! I'm using Threads. "}
        </Text>

        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          fontSize={14}
        >
          <Flex gap={2} alignItems={"center"} color={"gray.light"}>
            {/* FOLLOWERS COUNT */}
            <Text cursor={"default"}>
              {followCount ? followCount + " " : "No "}
              {(followCount === 0 && "followers") ||
                (followCount > 1 ? "followers" : "follower")}
            </Text>
            <Box bg={"gray.light"} w={1} h={1} borderRadius={"full"}></Box>
            {/* FOLLOWERS COUNT */}
            <Text cursor={"default"}>
              {following.length ? following.length + " " + " " : "No "}
              following
            </Text>
            {/* <ChakraLink>instagram.com</ChakraLink> */}
          </Flex>
          <Flex gap={3} fontSize={"24px"}>
            <Box
              p={1}
              transition={"ease-in .15s"}
              _hover={{ bg: "red" }}
              borderRadius={"full"}
            >
              <FaInstagram cursor={"pointer"} />
            </Box>

            <Menu>
              {/* MORE BUTTON */}
              <MenuButton>
                <CgMoreO cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={colorMode === "dark" ? "gray.dark" : "gray.300"}>
                  {/* COPY LINK TO CLIPBOARD */}
                  <MenuItem
                    bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                    onClick={() => copyLinkToClipboard(showToast)}
                  >
                    Copy Link
                  </MenuItem>
                  {_id === user?._id && (
                    <Link to="update">
                      <MenuItem
                        bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                      >
                        Edit Profile
                      </MenuItem>
                    </Link>
                  )}
                </MenuList>
              </Portal>
            </Menu>
          </Flex>
        </Flex>
      </>
    </>
  );
}

export default UserHeader;
