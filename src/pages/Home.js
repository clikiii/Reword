import React from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  Grid,
  Button
} from '@chakra-ui/react';
import { MdAdd, MdFormatListBulleted, MdTimelapse } from 'react-icons/md';

import { ColorModeSwitcher } from '../components/ColorModeSwitcher';


const Home = () => {
  const navigate = useNavigate();
  const handleList = () => navigate('/list');
  
  return (
    <>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>

        <Button leftIcon={<MdAdd />} colorScheme='teal' size='lg'>
          Add New Word
        </Button>
        <Button leftIcon={<MdFormatListBulleted />} colorScheme='teal' size='lg'
          onClick={handleList}
        >
          My Word List
        </Button>
        <Button leftIcon={<MdTimelapse />} colorScheme='teal' size='lg'>
          Review Words
        </Button>

        </VStack>
      </Grid>
    </Box>
    </>
  );
};

export default Home;
