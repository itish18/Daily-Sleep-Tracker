import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../features/auth/authSlice";

const Login = () => {
  const toast = useToast();

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
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (!email || !password) {
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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
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
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          onSubmit={handleSubmit}
          noValidate
          as="form"
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link to="" color={"blue.400"}>
                  Forgot password?
                </Link>
              </Stack>
              <Button
                bg={"black"}
                color={"white"}
                _hover={{
                  bg: "black",
                }}
                type={"submit"}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don't have an account?{" "}
                <Link color={"blue.400"} to="/signup">
                  Signup
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
