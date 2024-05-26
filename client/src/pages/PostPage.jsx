// UI LIBRARY
import {
  Avatar,
  Flex,
  Text,
  Image,
  Button,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";

// UTILITY LIBRARY
import { useRecoilValue } from "recoil";
import { Link, useParams, useSearchParams } from "react-router-dom";

// LOCAL FILES
import { userAtom } from "../atoms/userAtom";
import postTime from "../helpers/postTime";
import Comment from "../components/Comment";
import PostInfo from "../components/PostInfo";
import UserActions from "../components/UserActions";
import BackButton from "../components/BackButton";
import PostPageSkeleton from "../skeletons/PostPageSkeleton";

// REACT HOOKS
import { useState, useRef, useEffect } from "react";

// CUSTOM HOOKS
import useGetDataByURL from "../hooks/useGetDataByURL";
import handleReply from "../utils/handlers/handleReply";

function PostPage() {
  // UI VARIABLE
  const { colorMode } = useColorMode();

  // UTILITY VARIABLE
  const user = useRecoilValue(userAtom);
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const profilePic = searchParams.get("profilePic");

  // CUSTOM HOOK VARIABLE
  const { data: postData, isLoading: isPostDataLoading } = useGetDataByURL(
    `posts/username/${postId}`
  );

  // REACT HOOKS
  const [isLoading, setIsLoading] = useState(false);
  const [replies, setReplies] = useState([]);
  const [like, setLike] = useState({
    isLiked: false,
    count: 0,
  });
  const replyInputRef = useRef(null);

  // SIDE EFFECT
  useEffect(() => {
    setLike((like) => ({
      ...like,
      isLiked: postData?.post?.likes.includes(user?._id),
      count: postData?.post?.likes.length,
    }));

    setReplies(postData?.post?.replies);
  }, [user?._id, postData?.post?.likes, postData?.post?.replies]);

  return (
    <>
      <BackButton />
      {isPostDataLoading ? (
        <PostPageSkeleton />
      ) : (
        <>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            {
              <Link to={`/profile/${postData?.post?.postedBy}`}>
                <Flex gap={3} alignItems={"center"}>
                  {/* POST UPLOADER PROFILE PICTURE */}
                  <Avatar name={name || "Thread User"} src={profilePic} />

                  {/* POST UPLOADER NAME */}
                  <Text fontWeight={"semibold"}>{name || "Thread User"}</Text>
                  <Image
                    src="/verified.png"
                    w={4}
                    ml={-2}
                    title="Verified User"
                  />
                </Flex>
              </Link>
            }
            <Flex alignItems={"center"} gap={3}>
              <Text color={"gray.light"} fontSize={"sm"}>
                {postTime(postData.post.createdAt)}
              </Text>
              <FiMoreHorizontal />
            </Flex>
          </Flex>
          <Flex flexDirection={"column"} gap={3} px={7} py={5}>
            {/* POST DESCRIPTION/CONTENT */}
            <Text>{postData?.post?.postContent}</Text>

            {/* POST IMAGE */}
            <Image
              src={postData?.post?.postImage}
              borderRadius={"lg"}
              border={"1px solid"}
              borderColor={"gray.600"}
            />
            <UserActions
              like={like}
              setLike={setLike}
              onComment={() => replyInputRef.current.focus()}
              postId={postId}
            />
            <PostInfo
              likes={like.count}
              replies={postData?.post?.replies.length}
            />
          </Flex>
          {user ? (
            <form
              onSubmit={(e) =>
                handleReply(e, setIsLoading, postId, setReplies, replyInputRef)
              }
            >
              <Flex
                mx={5}
                my={2}
                mb={3}
                border={"1px solid"}
                borderColor={"gray.700"}
                py={2}
                paddingRight={2}
                rounded={"lg"}
                _focusWithin={{
                  ring: "1px",
                  ringColor: colorMode === "dark" ? "blue.400" : "gray.700",
                }}
              >
                <Input
                  isRequired
                  border={"none"}
                  ref={replyInputRef}
                  _focus={{
                    ring: "none",
                  }}
                  placeholder="Reply to this thread"
                />
                <Button
                  loadingText="Sending"
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  Send
                </Button>
              </Flex>
            </form>
          ) : (
            <Flex justifyContent={"space-between"} alignItems={"center"} my={4}>
              <Text>Login to like, reply and share post</Text>
              <Link to={"/auth"}>
                <Button>Login</Button>
              </Link>
            </Flex>
          )}

          {/* COMMNETS/REPLIES */}
          {replies?.length > 0 &&
            replies.map((reply) => (
              <Comment
                user={reply.name}
                userPic={reply.profilePic}
                comment={reply.replyText}
                key={reply._id}
                createdAt={reply.createdAt}
              />
            ))}
        </>
      )}
    </>
  );
}

export default PostPage;
