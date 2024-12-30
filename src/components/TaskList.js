import React, { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import { Button, Checkbox, Box, Stack, Text, HStack } from '@chakra-ui/react';

const TaskList = () => {
  const { tasks, deleteTask, selectTask, clearSelectedTask, updateTask, setFilter } = useContext(TaskContext);

  return (
    <Box>
      <Button onClick={clearSelectedTask} colorScheme="blue" mb={4}>
        Nuevo
      </Button>

      <HStack spacing={4} mb={4}>
        <Button onClick={() => setFilter('all')}>Todas</Button>
        <Button onClick={() => setFilter('completed')}>Completadas</Button>
        <Button onClick={() => setFilter('pending')}>Pendientes</Button>
      </HStack>

      <Stack spacing={4}>
        {tasks.map((task) => (
          <Box key={task._id} p={4} bg="white" boxShadow="md" borderRadius="md">
            <Text fontWeight="bold">{task.title}</Text>
            <Text color="gray.600">{task.description || 'Sin descripción'}</Text>
            <Text color="gray.500" fontSize="sm">
              Creado el: {new Date(task.createdAt).toLocaleDateString()}
            </Text>
            <Checkbox
              isChecked={task.completed}
              onChange={() => updateTask(task._id, { completed: !task.completed })}
            >
              {task.completed ? 'Completada' : 'Pendiente'}
            </Checkbox>
            <Button onClick={() => selectTask(task)} colorScheme="yellow" ml={2}>
              Editar
            </Button>
            <Button onClick={() => deleteTask(task._id)} colorScheme="red" ml={2}>
              Eliminar
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default TaskList;
