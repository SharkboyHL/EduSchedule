import { createBrowserRouter } from "react-router-dom";

//Importação dos arquivos das páginas
import Login from "./Pages/Login/index";
import Cadastro from "./Pages/Cadastro/index";
import { Teste } from "./Pages/Teste/index";
import { NotFound } from "./Pages/NotFound/index";

//Importação dos Componentes funcionais
import { Layout } from "./Components/Layout";
import { Private } from "./Routes/private";
import React, { useState } from 'react';
import styled from 'styled-components';
import Todo from './Components/TodoList/index';
//Cria o router que será utilizado para navegar entre as rotas
const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [{
            path: "/",
            element: <Login />
        },
        {
            path: "/cadastro",
            element: <Cadastro/>
        },
        {
            path: "/teste",
            element: <Private><Teste/></Private>
        },
        {
            path: "*",
            element: <NotFound />
        }
    ]
    }
])

const Container = styled.div`
  text-align: center;
`;

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState([
    { text: 'Aprender React', complete: false },
    { text: 'Construir um app', complete: false },
    { text: 'Dominar TypeScript', complete: false },
  ]);

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  return (
    <Container>
      <h1>Lista de Tarefas</h1>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          text={todo.text}
          complete={todo.complete}
          toggleTodo={() => toggleTodo(index)}
        />
      ))}
    </Container>
  );
};

export default TodoList;
export { router };