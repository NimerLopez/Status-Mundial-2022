import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router"
import axios from "axios";
function Passwordless() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const datax = searchParams.get('data');
    const Verificar=()=>{
        console.log(datax);
        axios.post("http://localhost:3001/api/passwordless", {
            data: datax
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) { 
            console.log(response.data)
        if (response.data.message !=="Datos Incorrectos") {                              
            sessionStorage.setItem('Usuario',JSON.stringify(response.data.token));
            sessionStorage.setItem('User_id',JSON.stringify(response.data.useDate.id));           
            navigate("/home")
        }else{
            alert("Datos Incorrectos")
        }
        }).catch(err => {//valida errores
            console.log("error: " + err);
            alert("Error");               
        });
    }
    return(
        
        <div>
            <h1>Bienvenido</h1>
            <p>En esta seccion puede iniciar sesion solo con darle click al boton de abajo</p>
            <br />
            <br />
            <button onClick={()=>Verificar()}>Login</button>
        </div>
    )
    ;
}
export default Passwordless;