import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import catar from "../img/qatar.png";
import "./style.css";




function Header(props) {
    const navigate = useNavigate();
    let [loggedUser, setval] = useState(JSON.parse(sessionStorage.getItem('TokenUser')));

    useEffect(() => {
        if (loggedUser) {
            console.log("xd");

        } else {
            //***Redirect to login***
            navigate("/")
        }

    }, []);
    const Cerrar = () => {
        sessionStorage.clear();
        setval(loggedUser.filter());

    }

    return (
        <header className="Herder">
            <nav className="nav">             
                <img src={catar} className="catar"></img>
                <a className="logo nav-link" href="#">Trodo</a>
                <button className="nav-toggle">
                    <i className="fa-solid fa-bars-progress"></i>
                </button>
                <ul className="nav-menu nav-menu_visible">
                    <li className="nav-menu-item"><NavLink className="nav-menu-link nav-link" to="/home">Home</NavLink></li>
                    <li className="nav-menu-item"><NavLink className="nav-menu-link nav-link" to="/standing">Standings</NavLink></li>
                    <li className="nav-menu-item"><NavLink className="nav-menu-link nav-link" to="/matcht">Matchs</NavLink></li>
                    <li className="nav-menu-item"><NavLink onClick={() => Cerrar()} className="nav-menu-link nav-link" >Cerrar Sesion</NavLink></li>
                </ul>

            </nav>
        </header>
    );
}

export default Header;
