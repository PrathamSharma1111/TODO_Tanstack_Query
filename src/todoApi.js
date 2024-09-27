import { useMutation } from '@tanstack/react-query';

export const fetchTodos = async () => {
    const response = await fetch('http://localhost:3001/todos');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  
  export const addNewTodo = async (newTodo) => {
    const response = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  export const updateExistingTodo = async (updatedTodo) => {
    const response = await fetch(`http://localhost:3001/todos/${updatedTodo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  
  export const deleteExistingTodo = async (id) => {
    const response = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  