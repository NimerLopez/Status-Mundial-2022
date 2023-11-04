import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router"
import axios from "axios";
import catar from "../img/catar.png";


function Register(props) {
    
    let [users, setUsers] = useState({});

    let navigate=useNavigate();
    const Registrar = async (us, em, cont, cofcontra) => {   
        let date=[];
        if(!us || !em || !cont || !cofcontra){//se validan los campos llenos
            alert("Favor llenar todos los campos");
        }else{
            axios.post('https://cors-anywhere.herokuapp.com/http://api.cup2022.ir/api/v1/user',{
            name: us,
            email:em,
            password: cont,
            passwordConfirm: cofcontra
            },{
                headers: {
                'Content-Type': 'application/json'
                }  
         }).then(function (response) {
                 console.log(response);
                 if(response){
                    navigate("/");
                 }
               }).catch(err=>{//valida errores
                console.log("error: "+err);
                alert("Datos incorrectos");
              });
              
        };

    };


    
    let [user, setUserse] = useState('');
    let [email, setEmail] = useState('');
    let [contra, setContra] = useState('');
    let [confcontra, setconfContra] = useState('');
    return (
        <>
            <div className="container1">
                <h1>Register</h1>
               <img src={catar} className="catar" /> 
                <div id="contain">
                    <div className="tex_field">
                        <input className="email" type="text" onChange={ev => setUserse(ev.target.value)} required />
                        <span></span>
                        <label>Name</label>
                    </div>
                    <div className="tex_field">
                        <input className="email" type="text" onChange={ev => setEmail(ev.target.value)} required />
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div className="tex_field">
                        <input className="contra" type="password" onChange={ev => setContra(ev.target.value)} required />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <div className="tex_field">
                        <input className="contra" type="password" onChange={ev => setconfContra(ev.target.value)} required />
                        <span></span>
                        <label>Password Confirm</label>
                    </div>

                    <input type="submit" value="Register" onClick={() => Registrar(user, email, contra, confcontra)} />
                    <div className="nores">you are registered? <a href="/">login</a></div>
                </div>

            </div>
        </>
    );
}

export default Register;