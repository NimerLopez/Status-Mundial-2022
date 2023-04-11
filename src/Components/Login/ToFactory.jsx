import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import axios from "axios";
function ToFactory(props){
    const navigate = useNavigate();
    let [codigo, setCodigo] = useState('');
    console.log(props.email);
const VerificarV=()=>{
    axios.post("http://localhost:3001/api/login/verifi", {
        email: props.email,
        cod: parseInt(codigo)
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        console.log(response.data)
        if (response.data.message !=="Datos Incorrectos") {                              
            sessionStorage.setItem('Usuario',JSON.stringify(props.token));
            console.log("luisraton", props.token);
            navigate("/home")
        }else{
            alert("Datos Incorrectos")
        }
    }).catch(err => {//valida errores
        console.log("error: " + err);
        alert("Datos incorrectos");
    });
}
return(
    <div>
            <p>Digite el codigo: </p>
            <input type="text"  name="A" onChange={ev => setCodigo(ev.target.value)} placeholder="Codigo"></input>
            <button onClick={()=>VerificarV()}>Verificar</button>
    </div>
)
}
export default ToFactory;