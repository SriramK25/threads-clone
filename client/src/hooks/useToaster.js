// UI LIBRARY
import { useToast } from "@chakra-ui/react";

function useToaster() {
  // UI VARUABLES
  const toast = useToast();

  function showToast(title = "", description, status = "success") {
    return toast({
      title,
      description,
      duration: 4000,
      status,
      isClosable: true,
    });
  }

  return showToast;
}

export default useToaster;
