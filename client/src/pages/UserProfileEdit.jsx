// UI LIBRARY
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Textarea,
  Box,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

// UTILITY LIBRARY
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

// LOCAL FILES
import useImagePreview from "../hooks/useImagePreview";

// REACT HOOKS
import { useRef, useState } from "react";
import useToaster from "../hooks/useToaster";
import handleProfileUpdate from "../utils/handlers/handleProfileUpdate";

export default function UserProfileEdit() {
  // UTILITY VARIABLES
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userId } = useParams();
  const navigate = useNavigate();

  // LOCAL VARIABLES
  const MAX_BIO_LENGTH = 999;
  const { handleFileChange, imageURL, setImageURL } = useImagePreview();

  // REACT HOOKS VARIABLES
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bioLength, setBioLength] = useState(0);

  // CUSTOM HOOK VARIABLE
  const showToast = useToaster();

  // HANDLERS
  const submit = (data) =>
    handleProfileUpdate(
      data,
      setIsLoading,
      imageURL,
      showToast,
      navigate,
      userId
    );

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        mb={12}
      >
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl" }}
          alignSelf={"center"}
        >
          Edit Profile
        </Heading>
        <form onSubmit={handleSubmit(submit)}>
          <FormControl id="userName">
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                {/* PROFILE PICTURE */}
                <Avatar
                  size="xl"
                  src={imageURL}
                  bg={useColorModeValue("gray.300", "gray.800")}
                >
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    onClick={() => setImageURL("")}
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
                <Input
                  type="file"
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                  ref={inputRef}
                  hidden
                />
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => inputRef.current.click()}>
                  Change Icon
                </Button>
              </Center>
            </Stack>
          </FormControl>
          <Stack spacing={5} mt={3}>
            <Box>
              {/* NAME */}
              <FormControl id="name" isInvalid={errors.name}>
                <FormLabel>Name </FormLabel>
                <Input
                  placeholder="Enter new name"
                  type="text"
                  {...register("name")}
                />
                <FormErrorMessage
                  fontSize={"12px"}
                  position={"absolute"}
                  bottom={"-18px"}
                >
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            {/* USERNAME */}
            <Box>
              <FormControl id="username" isInvalid={errors.username}>
                <FormLabel>Username </FormLabel>
                <Input
                  type="text"
                  placeholder="Enter new username"
                  {...register("username", {
                    pattern: {
                      value: /^[a-z0-9]+$/,
                      message: "a-z and 0-9 only",
                    },
                  })}
                />
                <FormErrorMessage
                  fontSize={"12px"}
                  position={"absolute"}
                  bottom={"-18px"}
                >
                  {errors?.username?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            {/* BIO */}
            <FormControl id="bio" isInvalid={errors.bio}>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <FormLabel>Bio</FormLabel>
                <Text fontSize={"12px"}>
                  {bioLength}/{MAX_BIO_LENGTH}
                </Text>
              </Flex>
              <Textarea
                resize={"none"}
                type="text"
                placeholder="Enter bio"
                {...register("bio", {
                  maxLength: {
                    value: MAX_BIO_LENGTH,
                    message: "Must be less than 999 characters",
                  },
                  onChange: (e) => {
                    setBioLength(e.target.value.length);
                  },
                })}
              />
              <FormErrorMessage
                fontSize={"12px"}
                position={"absolute"}
                bottom={"-18px"}
              >
                {errors.bio && errors?.bio?.message}
              </FormErrorMessage>
            </FormControl>

            <Stack spacing={6} direction={["column", "row"]} mt={3}>
              <Button
                variant={"outline"}
                color={"gray"}
                w="full"
                _hover={{
                  bg: "gray.300",
                }}
              >
                Cancel
              </Button>
              <Button
                loadingText="Submitting"
                isLoading={isLoading}
                isDisabled={isLoading}
                bg={"gray.800"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "gray.900",
                }}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
