import { Image, Box, Text, useColorModeValue } from "@chakra-ui/react";

import { useSelector } from "react-redux";

import Header from "../components/Header";

const UserDetails = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"80vh"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"1rem"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"lg"}
          flexDirection={"column"}
          p={7}
        >
          <Image
            src={user.profileImg}
            alt="profileImg"
            boxSize={"8rem"}
            borderRadius="full"
            mb="3rem"
          />
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection="row"
          >
            <Box mr={"3rem"}>
              <Text mb={"1.5rem"}>Name</Text>
              <Text>Email</Text>
            </Box>
            <Box>
              <Text mb={"1.5rem"}>Itish Verma</Text>
              <Text>itish.v007@gmail.com</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserDetails;
