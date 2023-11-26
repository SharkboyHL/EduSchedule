// src/App.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Todo from '../TodoList';

const Container = styled.div`
  text-align: center;
`;

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState([
    { text: 'Aprender React', complete: false },
    { text: 'Construir um app', complete: false },
    { text: 'Dominar TypeScript', complete: false },
  ]);

  const [newTodo, setNewTodo] = useState('');

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, complete: false }]);
      setNewTodo('');
    }
  };

  const editTodo = (index: number) => {
    const updatedTodo = prompt('Editar tarefa:', todos[index].text);
    if (updatedTodo !== null) {
      const newTodos = [...todos];
      newTodos[index].text = updatedTodo;
      setTodos(newTodos);
    }
  };

  const deleteTodo = (index: number) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta tarefa?');
    if (confirmDelete) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
  };

  return (
    <Container>
      <h1>Lista de Tarefas</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button onClick={addTodo}>Adicionar Tarefa</button>
      </div>
      {todos.map((todo, index) => (
        <div key={index}>
          <Todo
            text={todo.text}
            complete={todo.complete}
            toggleTodo={() => toggleTodo(index)}
          />
          <button onClick={() => editTodo(index)}>Editar</button>
          <button onClick={() => deleteTodo(index)}>Excluir</button>
        </div>
      ))}
    </Container>
  );
};

export default TodoList;
