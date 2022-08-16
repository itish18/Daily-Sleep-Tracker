import { Box, useColorModeValue, useDisclosure } from "@chakra-ui/react";

import SleepData from "../components/SleepData";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { getSleepEntries } from "../features/sleep/sleepSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { sleepData, daysBack, isLoading } = useSelector(
    (state) => state.sleep
  );
  const { onOpen, isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const color = useColorModeValue("gray.50", "gray.800");

  useEffect(() => {
    dispatch(getSleepEntries());
  }, [dispatch, daysBack]);

  if (!user) {
    return <Navigate replace to="/" />;
  }

  if (isLoading) {
    return (
      <Box>
        <Header />
        <LoadingSpinner onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
      </Box>
    );
  }

  return (
    <Box
      h={"100vh"}
      bg={color}
      sx={{
        "@media screen and (max-width:950px) ": {
          h: "1200px",
        },
        "@media screen and (min-width:350px) and (max-width:800px)": {
          w: "fit-content",
          h: "fit-content",
        },
      }}
    >
      <Header />

      <SleepData sleepdata={sleepData} />
    </Box>
  );
};

export default Dashboard;
