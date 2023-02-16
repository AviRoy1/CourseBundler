import React from 'react';
import {Heading, Stack, VStack,Text, Button,Image, Box, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './home.css';
import vg from '../../assets/Images/bg.png';
import {CgGoogle,CgYoutube} from 'react-icons/cg';
import  {SiCoursera,SiUdemy} from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import introVideo from '../../assets/Videos/intro.mp4';

const Home = () => {
  return (
    <section className='Home'>
      <div className="container">
        <Stack
          direction={['column','row']}
          height = "100%"
          justifyContent={['center','space-between']}
          alignItems='center'
          spacing={['16','56']}
        > 
        <VStack width={"full"} alignItems={["center","flex-end"]}>
        <Heading children="LEARN FROM THE EXPERTS" size={'2xl'} />
        <Text children="Find Valueable Content At Reasonable price" />
        <Link to="/getallcourse"> 
          <Button size={"lg"} colorScheme="yellow">
            Explore Now
          </Button>
        </Link>
        </VStack>
        
        <Image className='vector-graphics' boxSize='340px' src={vg} objectFit="contain" />

        </Stack>  
        
      </div>

      <Box padding={'8'} bg="blackAlpha.800">
        <Heading textAlign={"center"} fontFamily="body" color={'yellow.400'} children="OUR BRANDS" />
        <HStack className='brandsbanner' justifyContent={'space-evenly'} marginTop='4'>
          <CgGoogle />
          <CgYoutube />
          <SiUdemy />
          <SiCoursera />
          <DiAws />
        </HStack>
      </Box>


      <div className="container2">

        <video 
        controls 
        controlsList="nodownload nofullscreen noremoteplayback"  
        disablePictureInPicture
        src={introVideo}>

        </video>

      </div>


    </section>
  );
}

export default Home
