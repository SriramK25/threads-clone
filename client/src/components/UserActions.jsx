// UI LIBRARY
// COMPONENTS
import { Flex, useColorMode } from "@chakra-ui/react";

// ICONS
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import useToaster from "../hooks/useToaster";
import { useNavigate } from "react-router-dom";
import handleLike from "../utils/handlers/handleLike";

function UserActions({ like, setLike, onComment, postId }) {
  // UI LIBRARY VARIABLE
  const { colorMode } = useColorMode();
  const showToast = useToaster();
  const navigate = useNavigate();

  return (
    <Flex
      gap={3}
      alignItems={"center"}
      fontSize={20}
      mt={1}
      color={colorMode === "dark" ? "gray.100" : "gray.dark"}
    >
      {/* LIKE */}
      {like?.isLiked ? (
        <FaHeart
          cursor={"pointer"}
          onClick={() => handleLike(postId, setLike, navigate, showToast)}
          color="red"
          fill="red"
        />
      ) : (
        <FaRegHeart
          cursor={"pointer"}
          onClick={() => handleLike(postId, setLike, navigate, showToast)}
        />
      )}

      {/* COMMENT */}
      <FaRegComment cursor={"pointer"} onClick={onComment} />

      {/* REPOST/RETWEET */}
      <FaRetweet cursor={"pointer"} />

      {/* SHARE/SEND */}
      <LuSend cursor={"pointer"} />
    </Flex>
  );
}

export default UserActions;
