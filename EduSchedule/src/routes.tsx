import { createBrowserRouter } from "react-router-dom";

//Importação dos arquivos das páginas
import { Login } from "./Pages/Login/index";
import Cadastro from "./Pages/Cadastro/index"
import { NotFound } from "./Pages/NotFound/index";

import { Layout } from "./Components/Layout";

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
            path: "*",
            element: <NotFound />
        }
    ]
    }
])

export { router };