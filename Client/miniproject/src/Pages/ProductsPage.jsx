import {
  Box,
  Button,
  Card,
  Grid,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
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
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const initstate = {
  title: "",
  image: "",
  category: "",
  price: "",
  desc: "",
};

const ProductsPage = () => {
  const [data, setdata] = useState([]);
  const [formstate, setformstate] = useState(initstate);
  const [singleProd , setsingleProd] = useState({})
  const { auth, token, role, username } = useSelector((state) => state);
  const { isOpen, onOpen, onClose } = useDisclosure();
 const [openadd , setopenadd] = useState(false)
 const [page , setpage] = useState(1)
 const[pageCount , setpageCount] = useState(0)
  useEffect(() => {
    getProducts();
  }, [page]);

  const getProducts = () => {
    axios
      .get(`http://localhost:8080/product?limit=4&page=${page}`)
      .then((res) => {
        setpageCount(res.data.TotalPage)
        setdata(res.data.data)
      })
      .catch((err) => console.log(err));
  };

  const handledelete = (id) => {
    axios(`http://localhost:8080/product/delete/${id}`, {
      method: "delete",
      headers: { role },
    })
      .then((res) => {
        alert(res.data.message);
        getProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlechange = (e)=>{
    const {type, value , name} = e.target
    const val = type=="number" ? Number(value):value
    setformstate({...formstate, [name]:val})
  }
  const handlesubmit = (e) => {
       e.preventDefault()
      axios.post("http://localhost:8080/product/add", formstate)
      .then((res) => {
        // console.log(res)
        alert(res.data.message)
        getProducts()
      })
      setformstate(initstate)
  }


  const handleedit = (id) => {
    onOpen()
    axios.get(`http://localhost:8080/product/${id}`).then((res) => {
        console.log(res);
        setsingleProd(res.data.prod);
      });
  }

const handlechange1 = (e) => {
    const {type, value , name} = e.target
    const val = type=="number" ? Number(value):value
    setsingleProd({...singleProd, [name]:val})
}

const handlesubmit1 = (e)=> {
    e.preventDefault()
  
   axios(`http://localhost:8080/product/update/${singleProd._id}`, {
    method: "patch",
    data: singleProd,
    headers: {
      role: role,
    },
  }).then((res) =>{
    console.log(res);
     alert(res.data.message)
   getProducts()
   onClose()
  })
}
  return (
    <Box mt={"120px"}>
      <Button
        onClick={()=> {
            setopenadd(!openadd)
        }}
        display={role == "admin"  ? "block" : "none"}
        m={"auto"}
        mb={50}
      >
        Add Products
      </Button>
      <Box display={openadd==true? "block":"none"} className="add products">
        
        <form  onSubmit={handlesubmit}>
        
          <FormControl id="title">
            <FormLabel>title</FormLabel>
            <Input
              type="text"
              name="title"
                value={formstate.title}
                onChange={handlechange}
            />
          </FormControl>
          <FormControl id="category">
            <FormLabel>Category</FormLabel>
            <Input
              type="text"
              name="category"
              value={formstate.category}
              onChange={handlechange}
            />
          </FormControl>
          <FormControl id="price">
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              value={formstate.price}
              onChange={handlechange}
            />
          </FormControl>
         
          <FormControl id="desc">
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              name="desc"
              value={formstate.desc}
              onChange={handlechange}
            />
          </FormControl>
          <FormControl id="iamnge">
            <FormLabel>Image URL</FormLabel>
            <Input
              type="text"
              name="image"
              value={formstate.image}
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
              Add Product
            </Button>
          </Stack>
        </form>
      
</Box>
      <Grid
      
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(4,1fr)",
        }}
        justifyContent={"center"}
        alignItems={"center"}
       
        gap="30px"
      >
        {data &&
          data.map((el) => (
            <Card key={el.id} padding="15px" alignItems={"center"}>
              <Image
                src={el.image}
                marginLeft={{ base: "60px" }}
                alt={el.title}
                w="70%"
              />
              <Text fontWeight={"bold"}>{el.title}</Text>
              <Text>{el.category}</Text>
              <Text fontWeight={"bold"}> ₹ {el.price}</Text>
              {role == "admin" ? (
                <>
                  <Button
                  onClick={()=>handleedit(el._id)}
                    _hover={{ bg: "#FF0000" }}
                    bg={"#FF0000"}
                    color="white"
                    m={2}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handledelete(el._id)}
                    _hover={{ bg: "#FF0000" }}
                    bg={"#FF0000"}
                    color="white"
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <Button _hover={{ bg: "#FF0000" }} bg={"#FF0000"} color="white">
                  Add To Cart
                </Button>
              )}
            </Card>
          ))}
      </Grid>

     

      <Box className="edit products">
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handlesubmit1}>
              <FormControl id="id">
            <FormLabel>Product ID</FormLabel>
            <Input
              type="text"
              name="_id"
              value={singleProd._id}
              onChange={handlechange}
            />
          </FormControl>
                <FormControl id="title">
                  <FormLabel>title</FormLabel>
                  <Input
                    type="text"
                    name="title"
                      value={singleProd.title}
                      onChange={handlechange1}
                  />
                </FormControl>
                <FormControl id="category">
                  <FormLabel>Category</FormLabel>
                  <Input
                    type="text"
                    name="category"
                    value={singleProd.category}
                    onChange={handlechange1}
                  />
                </FormControl>
                <FormControl id="price">
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    name="price"
                    value={singleProd.price}
                    onChange={handlechange1}
                  />
                </FormControl>
               
                <FormControl id="desc">
                  <FormLabel>Description</FormLabel>
                  <Input
                    type="text"
                    name="desc"
                    value={singleProd.desc}
                    onChange={handlechange1}
                  />
                </FormControl>
                <FormControl id="iamnge">
                  <FormLabel>Image URL</FormLabel>
                  <Input
                    type="text"
                    name="image"
                    value={singleProd.image}
                    onChange={handlechange1}
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
                    Edit Product
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

      <Box className="pagination">
            <Button  isDisabled={page===1} onClick={() => setpage(page-1)}>Previous</Button>
            <Button isDisabled>{page}</Button>
            <Button isDisabled={page===pageCount} onClick={() => setpage(page+1)}>Next</Button>
      
      </Box>
    </Box>
  );
};

export default ProductsPage;
