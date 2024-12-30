import React, { useContext, useState, useEffect } from 'react';
import TaskContext from '../context/TaskContext';
import { Button, Input, Textarea, Box } from '@chakra-ui/react';

const TaskForm = () => {
  const { addTask, updateTask, selectedTask, cancelForm } = useContext(TaskContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTask) {
      updateTask(selectedTask._id, { title, description });
    } else {
      addTask({ title, description });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderRadius="md" boxShadow="md">
      <Input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        mb={3}
      />
      <Textarea
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        mb={3}
      />
      <Button type="submit" colorScheme="blue" mr={3}>
        {selectedTask ? 'Actualizar' : 'Crear'}
      </Button>
      <Button onClick={cancelForm} colorScheme="gray">
        Cancelar
      </Button>
    </Box>
  );
};

export default TaskForm;
