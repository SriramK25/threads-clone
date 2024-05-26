// UI LIBRARY
import { Flex } from "@chakra-ui/react";

// UTILITY LIBRARY
import { useRecoilValue } from "recoil";

// LOCAL FILES
import { userAtom } from "../atoms/userAtom";
import useGetDataByURL from "../hooks/useGetDataByURL";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import PostSkeleton from "../skeletons/PostSkeleton";
import shufflePost from "../helpers/shufflePosts";
import FollowRecommendation from "../components/FollowRecommendation";

function HomePage() {
  // LOCAL VARIABLES
  const { data, isLoading } = useGetDataByURL(`/posts/feed`);
  const user = useRecoilValue(userAtom);
  const feedPost = shufflePost(data?.feedPost);

  return (
    <>
      {user && <CreatePost />}

      {isLoading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        <Flex flexDirection={"column"}>
          {feedPost?.length > 0 ? (
            feedPost.map((post) => (
              <Post
                postContent={post?.postContent}
                postId={post?._id}
                postImage={post?.postImage}
                postedBy={post?.postedBy}
                key={post?._id}
                createdAt={post?.createdAt}
                replies={post?.replies.length}
                likes={post?.likes}
              />
            ))
          ) : (
            <Flex
              color={"gray.light"}
              minH={"20vh"}
              alignItems={"center"}
              justifyContent={"center"}
              textAlign={"center"}
            >
              No Threads to show, follow <br /> some threaders to get some
              threads
            </Flex>
          )}
        </Flex>
      )}

      <Flex overflowX={"auto"} px={5}>
        <FollowRecommendation />
        <FollowRecommendation />
        <FollowRecommendation />
        <FollowRecommendation />
        <FollowRecommendation />
      </Flex>
    </>
  );
}

export default HomePage;
