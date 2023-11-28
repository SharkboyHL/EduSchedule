import { createBrowserRouter } from "react-router-dom";

//Importação dos arquivos das páginas
import Login from "./Pages/Login/index";
import Cadastro from "./Pages/Cadastro/index";
import { Teste } from "./Pages/Teste/index";
import { NotFound } from "./Pages/NotFound/index";

//Importação dos Componentes funcionais
import { Layout } from "./Components/Layout";
import { Private } from "./Routes/private";
//Cria o router que será utilizado para navegar entre as rotas
const router = createBrowserRouter([
    {
        path: "/teste",
        element: <Private><Teste/></Private>
    },
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
            path: "*",
            element: <NotFound />
        }
    ]
    }
])

export { router };