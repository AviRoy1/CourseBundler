import { Box, Container, Heading, VStack, Text, Button } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { buySubscription } from '../../redux/actions/userAction';
import { server } from '../../redux/store';
import logo from '../../assets/Images/logo.png';


const Subscribe = ({user}) => {

  const dispatch = useDispatch();
  const [key,setKey] = useState("");

  const {loading,error,subscriptionId} = useSelector(state=>state.subscription)

  const subscribeHandler = async() => {
    const {data} = await axios.get(`${server}/razorpaykey`);
    setKey(data.key);
    dispatch(buySubscription())
  };

  useEffect(()=>{
    if(error) {
      toast.error(error);
      dispatch({typr: "clearError"});
    }
    if(subscriptionId) {
      const openPopUp = () => {
        const options = {

          key, 
          name: "CourseBundler",
          description: "Get access to all premium content",
          image: logo,
          subscription_Id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: "",
          },
          theme: {
            color: "#FFC800",
          }
        };

        const razor = new window.Razorpay(options);
        razor.open();
      }
      openPopUp();
    }
  },[dispatch,error,user.name,user.email,key,subscriptionId]);

  return (
    <Container h="90vh" p="16">
      <Heading children="Welcome" my="8" textAlign={'center'} />
      <VStack boxShadow={"lg"} alignItems="stretch" borderRadius={'lg'} spacing="0">

      <Box bg="yellow.400" p={"4"} css={{borderRadius: "8px 8px 0 0"}}>
        <Text color={"black"} children={`Pro Pack - ₹499.00`} />
      </Box>
      <Box p="4">
         <VStack textAlign={"center"} px="8" mt={"4"} spacing="8">
          <Text children={'Join Pro Pack and Get Access to all content'} />
          <Heading size="md" children={"₹499 only"} />
         </VStack>
         <Button my="8" w="full" colorScheme={"yellow"} isLoading={loading} onClick={subscribeHandler}>Buy Now</Button>
      </Box>
      <Box bg="blackAlpha.600" p="4" css={{borderRadius:"0 0 8px 8px"}}>
      <Heading 
      color={"white"} 
      textTransform={"uppercase"} 
      size="sm"   
      children={"100% refund at cancellation"} 
      />
      <Text fontSize={"xs"} color="white" children={"*Terms & Condition Apply"} />
      </Box>
      </VStack>
    </Container>
  )
}

export default Subscribe
