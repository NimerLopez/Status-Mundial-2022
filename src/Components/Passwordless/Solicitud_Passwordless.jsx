import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router"
import Header from '../Header/header';

function Login() {
    const navigate = useNavigate();
    const userUrl = "http://localhost:3001/api/passwordless/sendEmail";
    let [email, setEmail] = useState('');
    let [estado, setEstado] = useState('');
    let [respu, setRespuesta] = useState('');
    const Logival = () => {
        let Dateuser = "";
        if (!email) {
            if (!email) {
                alert("Favor introducir un Email");
            }
        } else {
            axios.post(userUrl, {
                email: email,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response.data)
                if (response.data.message !== "Datos Incorrectos") {
                    setEstado(true);
                    setRespuesta(response);
                    alert(response);
                } else {
                    alert("Datos Incorrectos")
                }
            }).catch(err => {//valida errores
                console.log("error: " + err);
                alert("Datos incorrectos");
            });

        };
    };
    return (
        <>
            <Header></Header>

            <div className="logbox">
                <div className="login-title">
                    <h1>
                        User Login Passwordless
                    </h1>
                </div>
                <div className="login-inputs">
                    <input type="text" name="A1" onChange={ev => setEmail(ev.target.value)} placeholder="Email Address"></input>
                </div>
                {estado ? (
                    <div className="login-buttons">
                    <input onClick={() => null} type="submit" name="A3" value="Ya valide sesion"></input>
                    </div>
                ) :
                    (
                        <div className="login-buttons">
                            <input onClick={() => Logival()} type="submit" name="A3" value="Login"></input>
                        </div>
                    )}

                <p>If you don´t have an acount. <a href="/register">Signup Here</a></p>
            </div>
        </>
    );
}

export default Login;