import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const [users, setusers] = useState([]);
  const [singeluser, setsingeluser] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth, token, role, username } = useSelector((state) => state);
  const getusers = () => {
    axios.get("http://localhost:8080/user").then((res) => {
      setusers(res.data);
    });
  };

  const handleedit = (id) => {
    onOpen();
    axios.get(`http://localhost:8080/user/${id}`).then((res) => {
      console.log(res);
      setsingeluser(res.data.user);
    });
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setsingeluser({ ...singeluser, [name]: value });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(singeluser);
   
    axios(`http://localhost:8080/user/update/${singeluser._id}`, {
      method: "patch",
      data: singeluser,
      headers: {
        role: role,
      },
    }).then((res) =>{
       alert(res.data.message)
      getusers()
    })
  };


 const handledelete = (id) => {
  axios(`http://localhost:8080/user/delete/${id}`,{
    method:"delete",
    headers:{
        role:role
    }
}).then((res) => {
 
   alert(res.data.message)
   getusers()
})

 }

  return (
    <Box mt={"120px"}>
      <Button onClick={getusers}>Get users</Button>
      <Box>
        <Image
          display={users.length <= 0 ? "block" : "none"}
          m={"auto"}
          w={"30%"}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCTnWYnSrQSCEuKwhvSH42QIuXA13Y4tJbx8PXhQhghNhU7UvYPj8azqsrNsFMOzUVYac&usqp=CAU"
          alt="adminpanel"
        />
        <TableContainer display={users.length > 0 ? "block" : "none"}>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Location</Th>
                <Th>DOB</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users &&
                users.map((el) => (
                  <Tr key={el._id}>
                    <Td>{el.username}</Td>
                    <Td>{el.email}</Td>
                    <Td>{el.location}</Td>
                    <Td>{el.dob}</Td>
                    <Td onClick={() => handleedit(el._id)}>Edit</Td>
                    <Td onClick={() => handledelete(el._id)}>Delete</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit User</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={handlesubmit}>
                  <FormControl id="username">
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      name="username"
                      value={singeluser.username}
                      onChange={handlechange}
                    />
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={singeluser.email}
                      onChange={handlechange}
                    />
                  </FormControl>
                  <FormControl id="Dob">
                    <FormLabel>DOB</FormLabel>
                    <Input
                      type="text"
                      name="dob"
                      value={singeluser.dob}
                      onChange={handlechange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <select
                      width="100%"
                      name="role"
                      value={singeluser.role}
                      onChange={handlechange}
                    >
                      <option value={""}>Select Role</option>
                      <option value={"admin"}>Admin</option>
                      <option value={"user"}>User</option>
                    </select>
                  </FormControl>

                  <FormControl id="location">
                    <FormLabel>Location</FormLabel>
                    <Input
                      type="text"
                      name="location"
                      value={singeluser.location}
                      onChange={handlechange}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="text"
                      name="password"
                      value={singeluser.password}
                      onChange={handlechange}
                    />
                  </FormControl>

                  <Stack spacing={10}>
                    <Button
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Update
                    </Button>
                  </Stack>
                </form>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPage;
