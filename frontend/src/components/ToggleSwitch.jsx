import { Box, Button } from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";

import { setDaysBack } from "../features/sleep/sleepSlice";

const ToggleSwitch = () => {
  const dispatch = useDispatch();
  const { daysBack } = useSelector((state) => state.sleep);

  const onClick = (days) => {
    dispatch(setDaysBack(days));
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={19}
    >
      <Button
        onClick={() => onClick(7)}
        border={"1px solid black"}
        borderRadius={"5px 0px 0px 5px"}
        bg={daysBack === 7 ? "black" : "none"}
        color={daysBack === 7 ? "white" : "black"}
        _hover={{ color: "white", bg: "gray.400" }}
      >
        7 Days
      </Button>
      <Button
        onClick={() => onClick(30)}
        border={"1px solid black"}
        borderRadius={"0px 5px 5px 0px"}
        bg={daysBack === 30 ? "black" : "none"}
        color={daysBack === 30 ? "white" : "black"}
        _hover={{ color: "white", bg: "gray.400" }}
      >
        30 Days
      </Button>
    </Box>
  );
};

export default ToggleSwitch;
