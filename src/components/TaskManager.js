import React, { useContext, useEffect } from 'react';
import TaskContext from '../context/TaskContext';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { useToast } from '@chakra-ui/react'; // Chakra UI Toast

const TaskManager = () => {
  const { view, error, errorMessage } = useContext(TaskContext);
  const toast = useToast();

  // Mostrar el error usando un toast
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, errorMessage, toast]);

  const renderView = () => {
    switch (view) {
      case 'list':
        return <TaskList />;
      case 'form':
        return <TaskForm />;
      default:
        return <TaskList />;
    }
  };

  return (
    <div>
      {renderView()}
    </div>
  );
};

export default TaskManager;
