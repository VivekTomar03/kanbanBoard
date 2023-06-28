import React from 'react'
import { Box, Heading, Image, Wrap, WrapItem } from "@chakra-ui/react";
// import "./style.css"
import about1 from "../images/about1.png"
import about2 from "../images/about2.png"
import about3 from "../images/about3.png"
const AboutPage = () => {
  return <Box mt="120px">

  <Heading size={"2xl"}>About page</Heading>
  <Image m="auto" mt="50" src={about1} ></Image>
  <Image m="auto"  src={about2} ></Image>
  <Image m="auto"  src={about2} ></Image>
  
  
      </Box>
}

export default AboutPage
