import {
  Container,
  Heading,
  VStack,
  Button,
  Box,
  Input,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { courseRequest } from '../../redux/actions/other';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name, email, course));
  };

  const { loading, error, message } = useSelector(state => state.other);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ typr: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (
    <Container h="92vh">
      <VStack h="full" justifyContent={'center'}>
        <Heading children="Request New Course" />

        <from onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box my="4">
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="abc"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>

          <Box my="4">
            <FormLabel htmlFor="email" children="Eamil Address" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={'email'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my="4">
            <FormLabel htmlFor="course" children="Course" />
            <Textarea
              required
              id="course"
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Explain the Course..."
              focusBorderColor="yellow.500"
            />
          </Box>
          <Button
            isLoading={loading}
            my="4"
            colorScheme={'yellow'}
            type="submit"
          >
            Send Mail
          </Button>
        </from>
      </VStack>
    </Container>
  );
};

export default Request;
