import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // Filtro: 'all', 'completed', 'pending'
  const [selectedTask, setSelectedTask] = useState(null); // Tarea seleccionada para edición
  const [view, setView] = useState('list'); // Vista activa: 'list' o 'form'
  const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error
  const [error, setError] = useState(null);
  
  /**
   * Función para mostrar mensajes de error 
   * 
   * @param {*} err
  */
  const handleError = (err) => {
    if (err.response) {
      if (err.response.status === 404) {
        setErrorMessage('Accion no encontrada. Por favor, intenta nuevamente.');
      } else if (err.response.status === 500) {
        setErrorMessage('Error interno del servidor. Intenta más tarde.');
      } else {
        setErrorMessage('Algo salió mal. Intenta nuevamente.');
      }
    } else if (err.request) {
      setErrorMessage('No se pudo conectar con el servidor. Intenta más tarde.');
    } else {
      setErrorMessage('Hubo un error desconocido.');
    }
    setError(true); 
  };

  /**
   * Obtener todas las tares
   */
  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
      setErrorMessage(''); 
      setError(false); 
    } catch (error) {
      handleError(error);
      setError(error.message);
    }
  }, []);

  /**
   * Obtener las tareas al cargar
   */
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /**
   * Crear nueva tarea
   * 
   * @param {*} task 
   */
  const addTask = async (task) => {
    try {
      const res = await api.post('/tasks', task); // POST /api/tasks
      setTasks([...tasks, res.data]);
      setView('list');
      setErrorMessage(''); 
      setError(false); 
    } catch (err) {
      handleError(err);
      setError('Error al agregar tarea.');
    }
  };

  /**
   * Actualizar tarea
   * 
   * @param {*} id 
   * @param {*} updates 
   */
  const updateTask = async (id, updates) => {
    try {
      const res = await api.put(`/tasks/${id}`, updates); // PUT /api/tasks/:id
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      setView('list'); 
      setErrorMessage(''); 
      setError(false); 
    } catch (err) {
      handleError(err);
      setError('Error al actualizar tarea.');
    }
  };

  /**
   * eliminar tarea
   */
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`); // DELETE /api/tasks/:id
      setTasks(tasks.filter((task) => task._id !== id));
      setErrorMessage(''); 
      setError(false); 
    } catch (err) {
      handleError(err);
      setError('Error al eliminar tarea.');
    }
  };

  const toggleView = (newView) => {
    setView(newView);
  };

  /**
   * Seleccionar tarea
   * 
   * @param {*} task 
   */
  const selectTask = (task) => {
    setSelectedTask(task);
    setView('form'); 
  };


  /**
   * Limpiar tarea seleccionada
   */
  const clearSelectedTask = () => {
    setSelectedTask(null);
    setView('form'); 
  };

  /**
   * Cancelar formulario
   */
  const cancelForm = () => {
    setSelectedTask(null);
    setView('list');
  };

  /**
   * Filtro de tareas
   */
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        addTask,
        updateTask,
        deleteTask,
        setFilter,
        fetchTasks,
        selectTask,
        clearSelectedTask,
        cancelForm,
        selectedTask,
        view,
        toggleView,
        error,
        errorMessage
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
