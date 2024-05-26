// UI LIBRARY
import { Button } from "@chakra-ui/react";
import { TbLogout } from "react-icons/tb";

// UTILITY LIBRARY
import { useSetRecoilState } from "recoil";

// LOCAL FILES
import axiosInstance from "../axios/axiosInstance";
import useToaster from "../hooks/useToaster";
import { userAtom } from "../atoms/userAtom";

function Logout() {
  // LOCAL VARIABLES

  return (
    <Button
      variant={"ghost"}
      // onClick={handleLogout}
      position={"absolute"}
      top={"15px"}
      right={"15px"}
    >
      <TbLogout fontSize={"20px"} />
    </Button>
  );
}

export default Logout;
