import {
  Flex,
  Box,
  Text,
  useColorModeValue,
  Button,
  Input,
  Textarea,
  Image,
  Stack,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaImage, FaPlus } from "react-icons/fa6";
import useImagePreview from "../hooks/useImagePreview";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";
import axiosInstance from "../axios/axiosInstance";

function CreatePost() {
  const imageInputRef = useRef(null);
  const postcontentRef = useRef(null);
  const closeModalRef = useRef(null);
  const { handleFileChange, imageURL, setImageURL } = useImagePreview();
  const user = useRecoilValue(userAtom);
  const [isLoading, setIsloading] = useState(false);

  async function handleSubmitPost(e) {
    e.preventDefault();
    console.log(e);
    try {
      setIsloading(true);
      const newPost = {
        postedBy: user._id,
        postImage: imageURL,
        postContent: e.target[3].value,
      };

      const response = await axiosInstance.post("/posts/create", {
        ...newPost,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
      setImageURL("");
      postcontentRef.current.value = "";
      closeModalRef.current.click();
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      position={"fixed"}
      bottom={"40px"}
      left={"50%"}
      transform={"auto"}
      translateX={"-50%"}
      zIndex={10}
      ring={1}
      rounded={"full"}
      variant={"outline"}
      overflow={"hidden"}
      bg={"gray.dark"}
    >
      <Button onClick={onOpen}>
        <FaPlus />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmitPost}>
          <ModalContent bg={useColorModeValue("white", "gray.800")}>
            <ModalHeader>Create Thread</ModalHeader>

            <ModalCloseButton />
            <ModalBody>
              <Flex
                p={5}
                w="full"
                justifyContent={"center"}
                alignItems="center"
              >
                <Box
                  bg={useColorModeValue("white", "gray.800")}
                  maxW={500}
                  w={"full"}
                  borderWidth="1px"
                  rounded="lg"
                  shadow="lg"
                  position="relative"
                  overflow={"hidden"}
                >
                  <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    w={"full"}
                    minH={"200px"}
                    position={"relative"}
                  >
                    {imageURL ? (
                      <Button
                        bg="red.500"
                        _hover={{
                          bg: "red.600",
                        }}
                        position="absolute"
                        bottom={"2"}
                        right={2}
                        rounded={"full"}
                        onClick={() => {
                          setImageURL("");
                        }}
                      >
                        Clear image
                      </Button>
                    ) : (
                      <Button
                        rounded={"full"}
                        position="absolute"
                        bottom={"2"}
                        right={2}
                        onClick={() => imageInputRef.current.click()}
                      >
                        Upload image
                      </Button>
                    )}
                    <Input
                      type="file"
                      hidden
                      ref={imageInputRef}
                      onChange={handleFileChange}
                    />
                    {imageURL ? (
                      <Image src={imageURL} maxH={"400px"} w={"full"} />
                    ) : (
                      <Flex
                        userSelect={"none"}
                        alignItems={"center"}
                        flexDirection={"column"}
                        opacity={0.3}
                      >
                        <FaImage fontSize={40} />
                        <Text>No Image selected</Text>
                      </Flex>
                    )}
                  </Flex>

                  <Divider />
                  <Box>
                    <Textarea
                      isRequired
                      placeholder="Type something..."
                      resize={"none"}
                      ring={"none"}
                      ref={postcontentRef}
                      border={"none"}
                      _focus={{
                        ring: "none",
                      }}
                    />
                  </Box>
                </Box>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Stack p={4} direction={"row"} spacing={5} w={"full"}>
                <Button
                  colorScheme="blue"
                  onClick={onClose}
                  ref={closeModalRef}
                  rounded={"full"}
                  flex={1}
                >
                  Close
                </Button>
                <Button
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
                  type="submit"
                  boxShadow={
                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  }
                  _hover={{
                    bg: "blue.500",
                  }}
                  _focus={{
                    bg: "blue.500",
                  }}
                >
                  Post
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
}

export default CreatePost;
