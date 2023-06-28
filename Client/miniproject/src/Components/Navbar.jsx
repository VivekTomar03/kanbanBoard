import { ReactNode } from "react";

import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Wrap,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logoutuser } from "../Redux/action";


export default function Navbar() {
  const { auth, token, role, username } = useSelector((state) => state);
  const dispatch = useDispatch();
  
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = ()=> {
    dispatch({type:"LOGOUT"})
  }
  return (
    <>
      <Box position={"fixed"} top={0} w={"100%"} zIndex={"9999"} color={"white"} bg={"red"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <NavLink to={"/"}>HomePage</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/product"}>Products</NavLink>
          <Wrap display={role=="admin"?"block":"none"}>
              <NavLink  to="/admin">Admin</NavLink>
              </Wrap>
              
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
            
                <NavLink to={"/login"}>{!auth && "Login"}</NavLink>
                 <NavLink to={"/singnup"}>{!auth &&"Signup"}</NavLink>
              
              <Button
              bg={"yellow"}
              color={"red"}
                display={auth ? "block" : "none"}
                onClick={handleLogout}
              >
               { `${username}`}
              </Button>
              
              
             

              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}