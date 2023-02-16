import React from 'react'
import { Box,Heading,Stack, VStack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box padding={"4"} bg="blackAlpha.900" minH={'10vh'}>
      <Stack direction={["column","row"]}>
        <VStack alignItems={["center","flex-start"]} width="full">
          <Heading children="All Right Reserved" color={"white"} />
          <Heading fontFamily={"body"} size="sm" children="@Avijit Roy" color={"yellow.400"} />
        </VStack>

      </Stack>
        
    </Box>
  )
}

export default Footer
