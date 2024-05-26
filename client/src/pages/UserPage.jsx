// UTILITY LIBRARY
import { useParams } from "react-router-dom";

// LOCAL FILES
import UserHeader from "../components/UserHeader";
import UserActivity from "../components/UserActivity";
import BackButton from "../components/BackButton";
import UserHeaderSkeleton from "../skeletons/UserHeaderSkeleton";

// CUSTOM HOOKS
import useGetDataByURL from "../hooks/useGetDataByURL";
import { Flex } from "@chakra-ui/react";

function UserPage() {
  const { userId: urlUserId } = useParams();

  const {
    data: userData,
    isError: isUserError,
    isLoading: isUserLoading,
    error: userError,
  } = useGetDataByURL(`users/profile/${urlUserId}`);

  const {
    data: postData,
    isError: isPostError,
    isLoading: isPostLoading,
    error: postError,
  } = useGetDataByURL(`/posts/${urlUserId}`);

  return (
    <>
      <>
        <BackButton />
        {isUserError ? (
          <Flex
            w={"full"}
            h={"30vh"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            Something went Wrong
          </Flex>
        ) : isUserLoading ? (
          <UserHeaderSkeleton isLoaded={!isUserLoading} />
        ) : (
          <UserHeader
            name={userData?.user?.name}
            username={userData?.user?.username}
            profilePic={userData?.user?.profilePic}
            bio={userData?.user?.bio}
            followers={userData?.user?.followers}
            following={userData?.user?.following}
            posts={postData?.posts?.length}
            createdAt={userData?.user?.createdAt}
            _id={userData?.user?._id}
          />
        )}

        <UserActivity
          posts={postData?.posts}
          profilePic={userData?.user?.profilePic}
          name={userData?.user?.name}
          username={userData?.user?.username}
          isPostLoading={isPostLoading}
        />
      </>
    </>
  );
}

export default UserPage;
