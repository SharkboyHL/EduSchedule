import { Outlet } from "react-router-dom";
import { Header } from "../Header";

export function Layout(){
    return(
        <>
            <Header/>
            <Outlet/>
            <br />
            <footer>
                <span>Rodapé da Página</span>
            </footer>
        </>
    )
}