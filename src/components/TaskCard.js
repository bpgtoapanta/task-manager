import React, { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import { HStack, Text, Button, Checkbox, VStack } from '@chakra-ui/react';

const TaskCard = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);

  return (
    <HStack spacing={4} p={4} shadow="md" borderWidth="1px" borderRadius="md">
      <Checkbox
        isChecked={task.completed}
        onChange={() => updateTask(task._id, { completed: !task.completed })}
      />
      <VStack align="start" flex="1">
        <Text fontWeight="bold">{task.title}</Text>
        <Text fontSize="sm" color="gray.500">
          {new Date(task.createdAt).toLocaleDateString()}
        </Text>
      </VStack>
      <Button colorScheme="yellow" onClick={() => updateTask(task._id, { title: 'Actualizado' })}>
        Editar
      </Button>
      <Button colorScheme="red" onClick={() => deleteTask(task._id)}>
        Eliminar
      </Button>
    </HStack>
  );
};

export default TaskCard;
