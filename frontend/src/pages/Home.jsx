import React from "react";
import { useSelector } from "react-redux";

import { Box, useColorModeValue, Text, Button, Image } from "@chakra-ui/react";

import Header from "../components/Header";

import SleepAnalysis from "../assets/images/sleep_analysis.svg";
import { ReactComponent as RescheduleDate } from "../assets/icons/reschedule-date.svg";
import { ReactComponent as WakeUp } from "../assets/icons/wake-up.svg";
import { ReactComponent as Eyelook } from "../assets/icons/eye-look.svg";
import {} from "../features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const color = useColorModeValue("gray.50", "gray.800");

  if (user) {
    return <Navigate replace to="/dashboard" />;
  }

  const startHandler = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box minHeight={"100vh"} bg={color}>
      <Header />

      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        sx={{
          "@media screen and (max-width:900px)": {
            h: "auto",
            flexDirection: "column",
          },
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={8}
        >
          <Box
            width={"24rem"}
            sx={{
              "@media screen and (max-width:400px)": {
                ml: 5,
              },
            }}
          >
            <Text
              fontWeight={"600"}
              fontSize="3xl"
              sx={{
                "@media screen and (max-width:500px)": {
                  fontSize: "2xl",
                },
                "@media screen and (max-width:400px)": {
                  fontSize: "xl",
                },
              }}
            >
              Track your sleep for a better lifestyle
            </Text>
            <Text mt={2}>
              Understand your sleep cycles to fall asleep better.
            </Text>
          </Box>

          <Button
            mt={4}
            fontSize={"1.1rem"}
            fontWeight={"600"}
            color={"white"}
            bg={"black"}
            transition={"transform 250ms"}
            _hover={{ bg: "black", transform: "translateY(-5px)" }}
            borderRadius={"10px"}
            padding={"1.3rem 1rem 1.3rem 1rem"}
            onClick={startHandler}
            sx={{
              "@media screen and (max-width:500px)": {
                fontSize: "0.9em",
              },
              "@media screen and (max-width:400px)": {
                fontSize: "0.7em",
              },
            }}
          >
            Get Started
          </Button>
        </Box>

        <Box mt={10}>
          <Image
            boxSize={"500px"}
            objectFit={"fit"}
            src={SleepAnalysis}
            sx={{
              "@media screen and (max-width:500px)": {
                boxSize: "350px",
              },
              "@media screen and (max-width:400px)": {
                boxSize: "300px",
              },
            }}
          />
        </Box>
      </Box>

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        mt={20}
        w="100vw"
        flexDirection={"row"}
        sx={{
          "@media screen and (max-width:750px)": {
            mt: 5,
            h: "auto",
            flexDirection: "column",
          },
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <RescheduleDate />

          <Text fontWeight={"500"} fontSize={"md"} mt={2}>
            Keep Track
          </Text>
        </Box>

        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            "@media screen and (max-width:800px)": {
              mt: 12,
            },
          }}
        >
          <WakeUp />
          <Text fontWeight={"500"} fontSize={"md"} mt={2}>
            Optimize your routine
          </Text>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            "@media screen and (max-width:800px)": {
              mt: 12,
            },
          }}
        >
          <Eyelook />
          <Text fontWeight={"500"} fontSize={"md"} mt={2}>
            Identify sleep issues
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
