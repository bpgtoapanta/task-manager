import React, { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import { HStack, Button } from '@chakra-ui/react';

const FilterBar = () => {
  const { setFilter } = useContext(TaskContext);

  return (
    <HStack spacing={4} mb={4}>
      <Button onClick={() => setFilter('all')}>Todas</Button>
      <Button onClick={() => setFilter('completed')}>Completadas</Button>
      <Button onClick={() => setFilter('pending')}>Pendientes</Button>
    </HStack>
  );
};

export default FilterBar;
