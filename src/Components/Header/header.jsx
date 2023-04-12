import './header.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import axios from "axios";

function Header() {
    const navigate = useNavigate();
    let [loggedUser, setval] = useState(JSON.parse(sessionStorage.getItem('Usuario')))
    const [loading, setLoading] = useState(true);
    let [userDate, setUser] = useState({});
    useEffect(() => {
        if (loggedUser) {
            //request my new by token id
            axios.get('http://localhost:3001/api/userdata', {
                headers: {
                    'Authorization': 'Bearer ' + loggedUser,
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response.data);
                setUser(response.data);
                setLoading(false);

            }).catch(err => {//valida errores
                console.log("error: " + err);
                setLoading(false);
            });
        } else {
            setLoading(true);
        }
    }, []);
    const handleOptionChangeMenu1 = (event) => {
        const selectedOption = event.target.value;
        if (selectedOption) {
            navigate(selectedOption);
        }
    }
    const handleOptionChange = (event) => {
        const selectedOption = event.target.value;
        if (selectedOption != "Logout" && selectedOption !="ActualizarData") {
            navigate(selectedOption);
        }
        if (selectedOption === "Logout") {
            navigate("/");
            sessionStorage.removeItem('Usuario');
            sessionStorage.removeItem('User_id');
        }
        if(selectedOption === "ActualizarData"){
            alert("entro");
            axios.post('http://localhost:3001/api/new', {
                headers: {
                    'Authorization': 'Bearer ' + loggedUser,
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                alert("Actualizacion Exitosa: Favor Recargue la pagina")
            }).catch(err => {//valida errores
                console.log("error: " + err);               
            });
        }
    }
    return (
        <>
            <div className="header">
                <h3>Trodo</h3>
                <div className="dropdown-content">
                    {loading ?
                        (
                            <select onChange={handleOptionChangeMenu1}>
                                <option value="UserName">Menu</option>
                                <option value="/">Login</option>
                                <option value="/register">Register</option>
                            </select>                                                      
                        ) :
                        (

                            <select onChange={handleOptionChange}>
                                <option value="UserName">{userDate.firstname}</option>
                                <option value="Logout">Logout</option>
                                <option value="/home">Home</option>
                                <option value="/newSource">Agregar Recurso</option>
                                <option value="/newSourcetable">Tabla Recurso</option>
                                {userDate.role === "admin" ?
                                    (<>
                                        <option value="/categorytable">Tabla de Categorias</option>
                                        <option value="/categoryadd">Agregar Categoria</option>
                                    </>):(null)
                                }
                                 <option value="ActualizarData">Inyectar Recurso</option>
                            </select>
                        )
                    }

                </div>
            </div>

        </>
    );
}

export default Header;