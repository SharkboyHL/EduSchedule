import { Link } from "react-router-dom";
import './header.css'

export function Header() {
    return (
        <div className="loginCadastro">
            <header>
                <h2 className="pagetittle">EduSchedule</h2>
                <div className="links">
                    <Link to="/">Login </Link>
                    <Link to="/cadastro">Cadastro</Link>
                </div>
            </header>
        </div>
    )
}