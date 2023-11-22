import { Link } from "react-router-dom";
import './header.css'

export function Header(){
    return(
        <header>
            <h2>EduSchedule</h2>
            <div>
                <Link to="/">Login</Link>
                <Link to="/cadastro">Cadastro</Link>
                <Link to="/contato">Contato</Link>
            </div>
        </header>
    )
}