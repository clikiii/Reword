import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import Home from './pages/Home';
import WordList from './pages/WordList';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/list" element={ <WordList /> } />
      </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
