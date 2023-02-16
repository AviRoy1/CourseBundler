import React, { useEffect, useState } from 'react'
import { Container, Heading, HStack, Input, Button, Text, Stack, VStack, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import { toast } from 'react-hot-toast';
import {loadUser} from '../../redux/actions/userAction';
import {addToPlaylist} from '../../redux/actions/profile';

const Course = ({ 
  views, 
  title, 
  imagesrc, 
  id, 
  addToPlaylistHandler, 
  creator, 
  disc, 
  lectureCount, 
  loading }) => {
  return (
    <VStack className='course' alignItems={["center", "flex-start"]}>
      <Image src={imagesrc} boxSize="60" objectFit={"contain"} />
      <Heading textAlign={["center", "left"]} maxW="200px" size="sm" fontFamily={"san-serif"} noOfLines={3} children={title} />
      <Text children={disc} noOfLines={2} />

      <HStack>
        <Text children='Creator' fontWeight={"bold"} textTransform="uppercase" />
        <Text children={creator} fontFamily={'body'} textTransform="uppercase" />
      </HStack>
      <Heading textAlign={"center"} size="xs" children={`Lectures - ${lectureCount}`} />
      <Heading size="xs" children={`Views - ${views}`} />
      <Stack direction={["column", "row"]} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={"yellow"}>Watch Now</Button>
        </Link>
        <Button 
        isLoading={loading}
        variant={"ghost"} 
        colorScheme={"yellow"} 
        onClick={() => addToPlaylistHandler()} >
          Add to playlist
        </Button>
      </Stack>
    </VStack>
  )
}

function Courses() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const addToPlaylistHandler = async (courseId) => {
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser());
  }

  const categories = [
    "Web Development",
    "Android Development",
    "DSA",
    "Data Science",
    "Artificial Intellegence",
    "Game Development"
  ]

  const { loading, courses, error, message } = useSelector(state => state.course)

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [category, keyword, dispatch, error, message])

  return (
    <Container minH={'95vh'} maxW='container.lg' paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course..."
        type={'test'}
        focusBorderColor="yellow.500"
      />

      <HStack overflowX={"auto"} paddingY="7" >
        {categories.map((item, index) => (
          <Button isLoading={loading} key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center']}
      >

        {
          courses && courses.map((item) => (
            <Course
              key={item._id}
              title={item.title}
              disc={item.description}
              views={item.views}
              creator={item.createdBy}
              imagesrc={item.poster.url}
              id={item._id}
              lectureCount={item.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
              loading={loading}
            />
          ))
        }

      </Stack>

    </Container>
  )
}

export default Courses
