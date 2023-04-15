import './register.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import axios from "axios";

function Register() {
    const navigate = useNavigate();

    const userUrl = "http://localhost:3001/api/user";
    const register = () => {
        const newEmptyFields = { ...emptyFields };//se agrega a la lista el estado
        if (!firname) {//se llenan los campos que no esta llenos
            newEmptyFields.firname = true;
        }
        if (!lastname) {
            newEmptyFields.lastname = true;
        }
        if (!adress) {
            newEmptyFields.adress = true;
        }
        if (!email) {
            newEmptyFields.email = true;
        }
        if (!contra) {
            newEmptyFields.contra = true;
        }
        setEmptyFields(newEmptyFields);
        if (isNaN(phonen)) {//valida que el numero de telefono sea numerico
            alert("Digite un numero de telefono valido");            
            return;
          }
          
        if (!firname || !lastname || !adress || !email || !contra) {
            alert("Por favor, complete todos los campos obligatorios");
            return;
        } else {
            axios.post(userUrl, {
                email: email,
                firstname: firname,
                lastname: lastname,
                role: "user",
                password: contra,
                address: adress,
                addressDos: adressdos,
                country:country,
                city: city,
                zip: zip,
                phoneNumber:phonen,
                correoConfirmado:false,
                codVeri:0,
                passlest:"NULL"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response);
                alert("Favor Confirme el Email");
                navigate("/")
                

            }).catch(err => {//valida errores
                console.log("error: " + err);
                alert("El email ya existe ");               
            });
        }
    }
    const [emptyFields, setEmptyFields] = useState({//lista de estados para validar los campos obligatorios
        firname: false,
        lastname: false,
        adress: false,
        email: false,
        contra: false,
    });

    let [firname, setFirname] = useState('');
    let [lastname, setLastname] = useState('');
    let [adress, setAdress] = useState('');
    let [adressdos, setAdressdos] = useState('');
    let [country, setCountry] = useState('');
    let [city, setCity] = useState('');
    let [zip, setZip] = useState('');
    let [phonen, setPhonen] = useState('');
    let [email, setEmail] = useState('');
    let [contra, setContra] = useState('');
    return (
        <div className="sign-in-box">
            <div className="sign-in-title">
                <h1>
                    User Registration
                </h1>
            </div>
            <div className="sign-in-inputs">
                <input type="text" className={emptyFields.firname ? "empty" : ""} name="A" onChange={ev => setFirname(ev.target.value)} placeholder="First Name *"></input>
                <input type="text" className={emptyFields.lastname ? "empty" : ""} name="B" onChange={ev => setLastname(ev.target.value)} placeholder="Last Name *"></input>
                <input type="mail" className={emptyFields.email ? "empty" : ""} name="C" onChange={ev => setEmail(ev.target.value)} placeholder="Email Address *"></input>
                <input type="password" className={emptyFields.contra ? "empty" : ""} name="G" onChange={ev => setContra(ev.target.value)} placeholder="Password *"></input>
                <input type="text" className={emptyFields.adress ? "empty" : ""} name="D" onChange={ev => setAdress(ev.target.value)} placeholder="Address *"></input>
                <input type="text" name="D" onChange={ev => setAdressdos(ev.target.value)} placeholder="Address 2"></input>
                <input type="text" name="E" onChange={ev => setCountry(ev.target.value)} placeholder="Country"></input>
                <input type="text" name="E" onChange={ev => setCity(ev.target.value)} placeholder="City"></input>
                <input type="text" name="F" onChange={ev => setZip(ev.target.value)} placeholder="Zip/Postal Code"></input>
                <input type="text" name="F" onChange={ev => setPhonen(ev.target.value)} placeholder="Phone Number"></input>
            </div>
            <div className="sign-in-buttons">
                <input onClick={() => register()} type="submit" name="H" value="Sign up"></input>
            </div>

        </div>
    )
}

export default Register
