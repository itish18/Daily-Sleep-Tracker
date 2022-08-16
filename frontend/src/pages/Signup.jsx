import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../features/auth/authSlice";
// import userProfile from "../assets/images/userProfile.png";

const Signup = () => {
  const toast = useToast();
  const form = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast({
        title: message,
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  }, [isError, message, toast]);

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/dashboard");
    }
  }, [isSuccess, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = new FormData(form.current);

    const fName = userData.get("firstName");
    const lName = userData.get("lastName");
    const email = userData.get("email");
    const password = userData.get("password");

    if (!fName || !email || !password) {
      return toast({
        title: "Please fill all fields",
        position: "top",
        status: "error",
        isClosable: true,
      });
    }

    if (!email.includes("@")) {
      return toast({
        title: "Please enter a valid email",
        position: "top",
        status: "error",
        isClosable: true,
      });
    }

    userData.delete("firstName");
    userData.delete("lastName");
    userData.append("name", fName + " " + lName);
    // const { name } = userData.get("profileImg");

    // if (name === "") {
    //   userData.set("profileImg", userProfile);
    // }

    dispatch(register(userData));
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          as="form"
          onSubmit={handleSubmit}
          ref={form}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" name="firstName" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" name="lastName" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="image">
              <FormLabel>Profile image</FormLabel>
              <Input type="file" name="profileImg" />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"black"}
                color={"white"}
                _hover={{
                  bg: "black",
                }}
                type="submit"
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} to="/login">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
