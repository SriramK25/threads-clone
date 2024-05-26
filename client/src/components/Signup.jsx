// UI LIBRARY
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

// UTILITY LIBRARY
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

// LOCAL FILES
import { authScreen } from "../atoms/authScreenAtom";
import { userAtom } from "../atoms/userAtom";

// REACT HOOKS
import { useState } from "react";
import useToaster from "../hooks/useToaster";
import handleSubmitSignupForm from "../utils/handlers/handleSubmitSignupForm";

function Signup() {
  // UI VARIABLES
  const showToast = useToaster();
  const navigate = useNavigate();

  // UTILITY VARIABLES
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // LOCAL FILES VARIABLES
  const setAuthType = useSetRecoilState(authScreen);

  // REACT HOOK VARIABLES
  const setUser = useSetRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // HANDLERS
  const submit = (data) =>
    handleSubmitSignupForm(data, setIsLoading, setUser, navigate, showToast);

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={4} mx={"auto"} maxW={"lg"} py={0} px={6}>
        {/* HEADING */}
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit(submit)}>
            <Stack spacing={5}>
              <HStack>
                <Box>
                  {/* NAME */}
                  <FormControl id="name" isInvalid={errors.name}>
                    <FormLabel>
                      Name{" "}
                      <Text display={"inline"} color={"red"}>
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      type="text"
                      {...register("name", { required: "Name is required" })}
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
                    <FormLabel>
                      Username{" "}
                      <Text display={"inline"} color={"red"}>
                        *
                      </Text>
                    </FormLabel>
                    <Input
                      type="text"
                      {...register("username", {
                        required: "Username is required",
                        pattern: {
                          value: /^[a-z0-9]+$/,
                          message: "a-z and 0-9 only",
                        },
                      })}
                      isInvalid={errors.username}
                    />
                    <FormErrorMessage
                      fontSize={"12px"}
                      position={"absolute"}
                      bottom={"-18px"}
                    >
                      {errors.username && errors.username.message}
                      {errors?.username?.type === "pattern" && (
                        <Text display={"none"}>
                          {showToast(
                            "Invalid Username",

                            "Username must contains lowercase[a-z] and numbers[0-9]",
                            "info"
                          )}
                        </Text>
                      )}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </HStack>

              {/* EMAIL */}
              <FormControl id="email" isInvalid={errors.email}>
                <FormLabel>
                  Email{" "}
                  <Text display={"inline"} color={"red"}>
                    *
                  </Text>
                </FormLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email is required",

                    pattern: {
                      value:
                        /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                <FormErrorMessage
                  fontSize={"12px"}
                  position={"absolute"}
                  bottom={"-18px"}
                >
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              {/* PASSWORD */}
              <FormControl id="password" isInvalid={errors.password}>
                <FormLabel>
                  Password{" "}
                  <Text display={"inline"} color={"red"}>
                    *
                  </Text>
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is Required",
                      minLength: {
                        value: 6,
                        message: "Must be atleast 6 characters long",
                      },
                    })}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage
                  fontSize={"12px"}
                  position={"absolute"}
                  bottom={"-18px"}
                >
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              {/* SUBMIT BUTTON */}
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isLoading}
                  loadingText="Sign up"
                  size="lg"
                  bg={"gray.dark"}
                  color={"white"}
                  _hover={{
                    bg: "gray.900",
                  }}
                  type="submit"
                  isDisabled={isLoading}
                >
                  Sign up
                </Button>
              </Stack>

              {/* LINK TO LOGIN PAGE */}
              <Stack pt={0}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link color={"blue.400"} onClick={() => setAuthType("login")}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
export default Signup;
