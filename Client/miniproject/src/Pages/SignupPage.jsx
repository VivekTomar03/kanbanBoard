import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userregister } from '../Redux/action';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const initstate = {
  
username:"",
email:"",
dob:"",
role:"",
location:"",
password:"",
}
const SignupPage = () => {
  const [formstate , setformstate] = useState(initstate)
const dispatch = useDispatch()
const store = useSelector((state) => state)
const navigate = useNavigate()
const handlechange = (e)=> {
const {name , value } = e.target
setformstate({...formstate, [name]:value})
}
// console.log(store.message);
const handlesubmit = (e)=> {
  e.preventDefault();

dispatch(userregister(formstate))
.then(() => {
  alert(`${store.message}`)
  navigate("/login")
})

  
}

  return (
    <Box mt={"100px"}>
     <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <form onSubmit={handlesubmit}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input  type="text" 
               name='username'
               value={formstate.username}
               onChange={handlechange}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" 
                 name='email'
                 value={formstate.email}
                 onChange={handlechange}
               
              />
            </FormControl>
            <FormControl id="Dob">
              <FormLabel>DOB</FormLabel>
              <Input type="date" 
                name='dob'
                value={formstate.dob}
                onChange={handlechange}
               
              />
            </FormControl>
            <FormControl>
            <FormLabel>Role</FormLabel>
            <select  width="100%"  
              name='role'
              value={formstate.role}
              onChange={handlechange}
            >
          
            <option value={""}>Select Role</option>
            <option value={"admin"}>Admin</option>
            <option value={"user"}>User</option>
        </select>
        </FormControl>

        <FormControl id="location">
              <FormLabel>Location</FormLabel>
              <Input type="text" 
                name='location'
                value={formstate.location}
                onChange={handlechange}
               
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" 
                name='password'
                value={formstate.password}
                onChange={handlechange}
               
              />
            </FormControl>
                
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
               type='submit'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            </form>
        
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </Box>
  )
}

export default SignupPage
