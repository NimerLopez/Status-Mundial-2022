import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router"
import axios from "axios";
function ConfEmail() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const correo = searchParams.get('correo');
    const Verificar=()=>{
        console.log(correo);
        axios.post("http://localhost:3001/api/user/confirmar", {
            correo: correo
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            navigate('/');
            console.log(response);
        }).catch(err => {//valida errores
            console.log("error: " + err);
            alert("Error");               
        });
    }
    return(
        
        <div>
            <h1>Bienvenido</h1>
            <button onClick={()=>Verificar()}>Verificar</button>
        </div>
    )
    ;
}
export default ConfEmail;
