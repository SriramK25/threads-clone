// UI LIBRARY
import { Button } from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";

// UTILITY LIBRARY
import { useNavigate } from "react-router-dom";

function BackButton() {
  // UTILITY VARIABLES
  const navigate = useNavigate();

  return (
    <Button
      variant={"outline"}
      onClick={() => navigate(-1)}
      position={"absolute"}
      top={"10px"}
      left={"15px"}
      rounded={"full"}
    >
      <IoMdArrowRoundBack />
    </Button>
  );
}

export default BackButton;
