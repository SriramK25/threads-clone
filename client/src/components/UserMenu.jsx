import {
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  useColorMode,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import useToaster from "../hooks/useToaster";
import axiosInstance from "../axios/axiosInstance";

function UserMenu() {
  const { colorMode } = useColorMode();
  const [user, setUser] = useRecoilState(userAtom);

  const showToast = useToaster();

  async function handleLogout() {
    try {
      const response = await axiosInstance.post("/users/logout");

      console.log(response);

      if (response.status === 200) {
        localStorage.removeItem("user-thread");
        showToast(undefined, "Logout successful", "info");
        setUser(null);
      }
    } catch (error) {
      // console.log(error);
      showToast(undefined, error.message, "error");
    }
  }

  return (
    <Box
      position={"absolute"}
      top={"10px"}
      right={"15px"}
      ring={"1px"}
      p={2}
      paddingLeft={3}
      rounded={"full"}
    >
      <Menu>
        {/* MENU BUTTON */}
        <MenuButton>
          <Flex alignItems={"center"} gap={1}>
            <Text textTransform={"capitalize"}>{user?.name}</Text>{" "}
            <FaCaretDown />
          </Flex>
        </MenuButton>
        <Portal>
          <MenuList bg={colorMode === "dark" ? "gray.dark" : "gray.300"}>
            {/* COPY LINK TO CLIPBOARD */}
            <Link to={`/profile/${user?._id}`}>
              <MenuItem bg={colorMode === "dark" ? "gray.dark" : "gray.300"}>
                Profile
              </MenuItem>
            </Link>

            <MenuItem
              bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
              onClick={handleLogout}
            >
              <Flex alignItems={"center"} gap={1}>
                Logout
                <TbLogout fontSize={"20px"} />
              </Flex>
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </Box>
  );
}

export default UserMenu;
