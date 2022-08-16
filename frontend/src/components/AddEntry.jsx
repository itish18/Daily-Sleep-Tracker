import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createSleepEntry, reset } from "../features/sleep/sleepSlice";

const AddEntry = ({ isOpen, onOpen, onClose }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, isSuccess, message } = useSelector((state) => state.sleep);

  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        position: "top",
        status: "error",
        isClosable: true,
      });
      dispatch(reset());
    }

    if (isSuccess) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line
  }, [dispatch, isError, isSuccess, navigate, message]);

  const dateRef = useRef();
  const sleeptimeRef = useRef();
  const wakeuptimeRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const date = dateRef.current.value;
    const sleepTime = sleeptimeRef.current.value;
    const wakeUpTime = wakeuptimeRef.current.value;

    if (!date || !sleepTime || !wakeUpTime) {
      return toast({
        title: "Please fill all details",
        position: "top",
        status: "error",
        isClosable: true,
      });
    }

    // if (wakeuptime >= sleepTime) {
    //   return alert("Please enter valid time");
    // }

    const sleepdata = {
      date,
      sleepTime,
      wakeUpTime,
    };

    dispatch(createSleepEntry(sleepdata));
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent padding={"1em"}>
        <ModalHeader>New Entry</ModalHeader>
        <ModalBody>
          <Box
            as="form"
            display="flex"
            justifyContent={"space-evenly"}
            flexDirection={"column"}
            onSubmit={submitHandler}
          >
            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <Input type="date" ref={dateRef} />
            </FormControl>
            <FormControl mt={5} isRequired>
              <FormLabel>Sleep Time</FormLabel>
              <Input type="time" ref={sleeptimeRef} />
            </FormControl>
            <FormControl mt={5} isRequired>
              <FormLabel>Wakeup Time</FormLabel>
              <Input type="time" ref={wakeuptimeRef} />
            </FormControl>
            <Box display={"flex"}>
              <Button
                color={"white"}
                bg={"black"}
                fontSize={"1em"}
                fontWeight={"600"}
                type={"submit"}
                mt={8}
                _hover={{ color: "white", bg: "black" }}
              >
                Submit
              </Button>
              <Button
                color={"black"}
                bg={"white"}
                fontSize={"1em"}
                fontWeight={"600"}
                mt={8}
                ml={5}
                _hover={{ bg: "none" }}
                onClick={onClose}
              >
                Close
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddEntry;
