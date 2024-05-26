// UI LIBRARY
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Flex,
} from "@chakra-ui/react";
import { LuConstruction } from "react-icons/lu";

// UTILITY LIBRARY

// LOCAL FILES
import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";

function UserActivity({ posts, name, profilePic, username, isPostLoading }) {
  // {createdAt, likes, replies, postContent, postImage, postedBy, updatedAt}

  return (
    <Tabs isFitted mt={4} colorScheme="gray.light">
      <TabList>
        <Tab>Threads</Tab>
        <Tab>Replies</Tab>
      </TabList>

      <TabPanels>
        {/* VISIBLE IF THREADS TAB IS ACTIVE  */}
        {isPostLoading ? (
          <TabPanel>
            <PostSkeleton />
          </TabPanel>
        ) : (
          <TabPanel>
            {posts?.length ? (
              posts.map((post, index) => (
                <Post
                  likes={post.likes}
                  postContent={post.postContent}
                  postImage={post.postImage}
                  name={name}
                  profilePic={profilePic}
                  key={post[index]?.createdAt}
                  postedBy={post.postedBy}
                  postId={post._id}
                  createdAt={post.createdAt}
                  replies={post.replies.length}
                />
              ))
            ) : (
              <Flex
                w={"full"}
                minH={"30vh"}
                alignItems={"center"}
                justifyContent={"center"}
                color={"gray.light"}
              >
                It looks like&nbsp;{" "}
                <Text fontWeight={"semibold"}> @{username} </Text>{" "}
                &nbsp;hasn&apos;t shared any posts yet...
              </Flex>
            )}
          </TabPanel>
        )}
        {/* VISIBLE IF REPLIES TAB IS ACTIVE  */}
        <TabPanel>
          <Flex
            flexDirection={"column"}
            w={"full"}
            minH={"30vh"}
            alignItems={"center"}
            justifyContent={"center"}
            color={"gray.light"}
          >
            <Text fontSize={"30px"}>
              <LuConstruction />
            </Text>
            Development in progress
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default UserActivity;
