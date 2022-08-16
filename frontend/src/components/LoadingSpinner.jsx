import { Spinner, Modal, ModalOverlay, Box } from "@chakra-ui/react";

const LoadingSpinner = ({ isOpen, onOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"80vh"}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="black.500"
          size="xl"
        />
      </Box>
    </Modal>
  );
};

export default LoadingSpinner;
