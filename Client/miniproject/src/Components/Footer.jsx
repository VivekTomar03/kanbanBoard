import { Box, Center, Image, Text } from '@chakra-ui/react';
import React from 'react';
import membership from "../images/membership.webp"
import MainFooter from './mainFooter';

const Footer = () => {
  return (
    <div className='Footer'  style={{marginTop:"30px"}}>
         <Text fontWeight={"bold"} fontSize="4xl">MEMBERSHIP</Text>
      
        <Box ml={"5%"} style={{width:"98%", margin:"auot" , marginTop:"20px"}}>
            <Image src={membership} alt="membership"/>
        </Box>

         <Box className='indian brand' style={{ height:"80px" , margin:"auto" , marginTop:"50px" , backgroundColor:"#e71318"}}>
            <Center><Text  marginTop={15} fontSize={{base:"xl" , md:"2xl" , lg:"3xl"}} letterSpacing={5} color="white">HOMEGROWN INDIAN BRAND</Text></Center>
         </Box>

           <Text fontWeight={"semibold"} fontSize="4xl" marginTop={10}>Over 5.5 Million Happy Customers</Text>

           <Box className='main foooter' marginTop={20}>
               <MainFooter/>
           </Box>
    </div>
  );
}

export default Footer;
