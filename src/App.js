import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { TaskProvider } from './context/TaskContext';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ChakraProvider>
      <TaskProvider>
        <HomePage />
      </TaskProvider>
    </ChakraProvider>
  );
}

export default App;
