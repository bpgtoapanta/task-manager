import React from 'react';
// import FilterBar from '../components/FilterBar';
import { Container, Heading } from '@chakra-ui/react';
import TaskManager from '../components/TaskManager';

const HomePage = () => {
  return (
    <Container maxW="container.md" py={4}>
      <Heading mb={4}>Gestor de Tareas</Heading>
      <TaskManager />
    </Container>
  );
};

export default HomePage;
