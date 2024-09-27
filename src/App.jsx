import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { fetchTodos, addNewTodo, updateExistingTodo, deleteExistingTodo } from './todoApi';
import './index.css';



function App() {
  const [input, setInput] = useState("");
  const [currentTodo, setCurrentTodo] = useState(null);
  const queryClient = useQueryClient();

  const { data: todos, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos
  });

  const addTodoMutation = useMutation({
    mutationFn: addNewTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateExistingTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteExistingTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const handleAddTodo = () => {
    if (input.trim() !== "") {
       addTodoMutation.mutate({ text: input });
      setInput("");
    }
  };

  const handleUpdateTodo = () => {
    if (currentTodo && input.trim() !== "") {
       updateTodoMutation.mutate({ id: currentTodo.id, text: input });
      setInput("");
      setCurrentTodo(null);
    }
  };

  const handleEditTodo = (todo) => {
    setInput(todo.text);
    setCurrentTodo(todo);
  };

  const handleDeleteTodo = (id) => {
     deleteTodoMutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos</p>;

  return (
    <div className='bg-black h-[100vh] flex items-center justify-center'>
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full min-w-[700px]">
          <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
          <div className="flex mb-4">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Add a new task"
            />
            {currentTodo ? (
              <button
                onClick={handleUpdateTodo}
                className="bg-black text-white p-2 ml-2 rounded"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleAddTodo}
                className="bg-black text-white p-2 ml-2 rounded"
              >
                Add
              </button>
            )}
          </div>
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className='flex justify-between items-center p-2 mb-2 border rounded'
              >
                <span className="flex-1">{todo.text}</span>
                <button
                  onClick={() => handleEditTodo(todo)}
                  className="bg-red-500 text-white p-2 rounded ml-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="bg-red-500 text-white p-2 rounded ml-2"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default App
