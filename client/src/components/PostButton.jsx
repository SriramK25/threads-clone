import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";
import CreatePost from "./CreatePost";
import { FaPlus } from "react-icons/fa6";

function PostButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box position={"fixed"} bottom={"40px"} left={"45%"}>
      <Button onClick={onOpen}>
        <FaPlus />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Thread</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreatePost />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default PostButton;
