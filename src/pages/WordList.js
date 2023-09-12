import React from 'react';
import { useState, useEffect } from 'react';
import {
  ListItem,
  OrderedList,
  Stack,
  StackDivider,
  Box,
  Text,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react'

import wordfile from '../data/list.tsv'


const WordList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [words, setWords] = useState([])
  const [addWord, SetAddWord] = useState([])
  const [addType, setAddType] = useState({
    'noun': false,
    'vt': false,
    'vi': false,
    'verb': false,
    'adj': false,
    'adv': false,
  })
  const [addMeaning, setAddMeaning] = useState([])

  const readFile = () => {
    fetch(wordfile)
      .then(row => row.text())
      .then(text => {
        const delim = '\t';
        const headers = text.slice(0, text.indexOf('\n')).split(delim);
        const rows = text.slice(text.indexOf('\n') + 1).split('\n');

        const words = rows.map(row => {
          const values = row.split(delim);
          const eachObject = headers.reduce((obj, header, i) => {
            obj[header] = values[i];
            return obj;
          }, {})
          return eachObject;
        })

        setWords(words)
      })
  }

  useEffect(() => {
    readFile()
  }, [])

  const handlemulsel = (key) => {
    addType[key] = !addType[key]
    console.log('add', addType);
    setAddType(addType)
  }

  const handleAddWord = () => {
    let types = ''
    console.log("addt", addType);
    for (const key of Object.keys(addType)){
      if (addType[key]){
        types += key + '/'
      }
    }
    let content = `${addWord}\t${types}\t${addMeaning}\tyes\n`;
    // fs.appendFile("./data/list.tsv", content, (err) => {
    //     return console.log(err);
    // });
  }

  const handleSave = () => {
    handleAddWord();
    onClose();
  }

  console.log('file', words, typeof (words));
  return (
    <>
      <Box textAlign="center" fontSize="xl" padding={8}>
        <OrderedList>
          <Stack divider={<StackDivider />} spacing='2'>
            {words.map((word, idx) => (
              <ListItem key={idx}>
                <Menu isLazy placement='auto'>
                  <MenuButton>
                    <Grid templateColumns='repeat(5, 1fr)'>
                      <GridItem>
                        <Text pt='2' fontSize='lg'>{word.word}</Text>
                      </GridItem>
                      <GridItem colStart={2} colEnd={4}>
                        <Text pt='2' fontSize='lg'>{word.type}</Text>
                      </GridItem>
                      <GridItem colStart={4} colEnd={8}>
                        <Text pt='2' fontSize='lg'>{word.ch}</Text>
                      </GridItem>
                    </Grid>
                  </MenuButton>
                  <MenuList>
                    {/* MenuItems are not rendered unless Menu is open */}
                    <MenuItem>Don't review</MenuItem>
                    <MenuItem onClick={onOpen}>Add new word</MenuItem>
                    <MenuItem>Delete</MenuItem>
                  </MenuList>
                </Menu>
              </ListItem>
            ))}
          </Stack>
        </OrderedList>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a new word</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Word</FormLabel>
                <Input onChange={(e) => SetAddWord(e.target.value)} placeholder='Word' />
              </FormControl>

              <FormControl mt={4}>
              <FormLabel>Property</FormLabel>
              <CheckboxGroup colorScheme='green'>
                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                  <Checkbox onChange={(e) => handlemulsel(e.target.value)} value='noun'>n.</Checkbox>
                  <Checkbox onChange={(e) => handlemulsel(e.target.value)} value='vt'>vt.</Checkbox>
                  <Checkbox onChange={(e) => handlemulsel(e.target.value)} value='vi'>vi.</Checkbox>
                  <Checkbox onChange={(e) => handlemulsel(e.target.value)} value='verb'>v.</Checkbox>
                  <Checkbox onChange={(e) => handlemulsel(e.target.value)} value='adj'>adj.</Checkbox>
                  <Checkbox onChange={(e) => handlemulsel(e.target.value)} value='adv'>adv.</Checkbox>
                </Stack>
              </CheckboxGroup>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Meaning</FormLabel>
                <Input onChange={(e) => setAddMeaning(e.target.value)} placeholder='Meaning' />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='teal' mr={3}>
                Add More
              </Button>
              <Button onClick={handleSave} colorScheme='teal' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

    </>
  )
};

export default WordList;
