// UI LIBRARY
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
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
import { useSetRecoilState, useRecoilValue } from "recoil";

// LOCAL FILES
import { authScreen } from "../atoms/authScreenAtom";
import axiosInstance from "../axios/axiosInstance";
import { userAtom } from "../atoms/userAtom";

// REACT HOOKS
import { useState } from "react";

function Login() {
  // UTILITY LIBRARY VARIABLES
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // LOCAL FILES VARIABLE
  const setAuthType = useSetRecoilState(authScreen);
  const setUser = useSetRecoilState(userAtom);
  const user = useRecoilValue(userAtom);

  console.log(user);

  // REACT HOOK VARIABLES
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // HANDLERS
  async function submit(data) {
    try {
      setIsLoading(true);
      console.log(data);
      const response = await axiosInstance.post("/users/login", {
        ...data,
      });

      console.log(response);

      if (response.status === 200) {
        setUser(response.data);
        localStorage.setItem("user-thread", JSON.stringify(response.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={0} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
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
              {/* EMAIL */}
              <FormControl
                id="email"
                isInvalid={
                  errors.email || user?.error?.message === "User not found"
                }
              >
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
                  {errors?.email?.message || user?.error?.message}
                </FormErrorMessage>
              </FormControl>

              {/* PASSWORD */}
              <FormControl
                id="password"
                isInvalid={
                  errors.password ||
                  user?.error?.message === "Incorrect password"
                }
              >
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
                  {errors?.password?.message || user?.error?.message}
                </FormErrorMessage>
              </FormControl>

              {/* SUBMIT BUTTON */}
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Logging in"
                  size="lg"
                  bg={"gray.dark"}
                  color={"white"}
                  _hover={{
                    bg: "gray.900",
                  }}
                  type="submit"
                  isDisabled={isLoading}
                  isLoading={isLoading}
                >
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Don&apos;t have an account?{" "}
                  <Link
                    color={"blue.400"}
                    onClick={() => setAuthType("signup")}
                  >
                    Sign up
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
export default Login;
