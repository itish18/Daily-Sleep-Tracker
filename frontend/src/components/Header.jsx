import {
  Box,
  Text,
  Button,
  useColorModeValue,
  Image,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverTrigger,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout, reset } from "../features/auth/authSlice";
// import userProfile from "../assets/images/userProfile.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-around"}
      alignItems={"center"}
      padding={"0.7rem 0px 0.8rem 0px"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"md"}
      width="100%"
      overflow={"hidden"}
    >
      <Link to="/">
        <Text
          fontWeight={"800"}
          fontSize="3xl"
          sx={{
            "@media screen and (max-width:500px)": {
              fontSize: "2xl",
            },
            "@media screen and (max-width:420px)": {
              fontSize: "xl",
            },
          }}
        >
          Daily Sleep Tracker
        </Text>
      </Link>
      <Box display={"flex"} justifyContent={"space-between"}>
        {!user ? (
          <>
            <Button
              background={"none"}
              _hover={{ backgroundColor: "black", color: "white" }}
              fontWeight={"700"}
              fontSize={"1.1rem"}
              color={"black"}
              sx={{
                "@media screen and (max-width:500px)": {
                  fontSize: "0.9rem",
                  ml: 5,
                },
              }}
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              background={"none"}
              _hover={{ backgroundColor: "black", color: "white" }}
              fontWeight={"700"}
              fontSize={"1.1rem"}
              color={"black"}
              sx={{
                "@media screen and (max-width:500px)": {
                  fontSize: "0.9rem",
                },
              }}
            >
              <Link to="/signup">Signup</Link>
            </Button>
          </>
        ) : (
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"space-evenly"}
          >
            <Popover
              returnFocusOnClose={false}
              placement="bottom"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Image
                  borderRadius="full"
                  border="1px solid black"
                  boxSize="40px"
                  src={user.profileImg}
                  alt="user"
                  mr={7}
                  _hover={{ cursor: "pointer" }}
                />
              </PopoverTrigger>
              <PopoverContent
                mt={1}
                width={"auto"}
                height={"auto"}
                padding={"2px 4px 2px 4px"}
              >
                <PopoverArrow />

                <PopoverBody>
                  <Link to="/details">
                    <Text
                      pb={2}
                      borderBottom={"1px solid black"}
                      fontWeight={"600"}
                      fontSize={"1em"}
                      _hover={{ textDecoration: "underline" }}
                    >
                      Update details
                    </Text>
                  </Link>
                  <Link to="">
                    <Text
                      fontWeight={"600"}
                      pt={2}
                      _hover={{ textDecoration: "underline" }}
                      fontSize={"1em"}
                    >
                      Delete account
                    </Text>
                  </Link>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Button
              ml={"10px"}
              _hover={{ color: "white", bg: "gray.400" }}
              fontWeight={"700"}
              fontSize={"1.1rem"}
              bg={"#DFDFDE"}
              padding={"1rem"}
              color={"white"}
              backgroundColor={"black"}
            >
              <Text onClick={onLogout}>Logout</Text>
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
