import './category.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import axios from "axios";
import Header from '../../Header/header';

function Newsources() {

    const navigate = useNavigate();
    const catUrl = "http://localhost:3001/api/categories";
    let [loggedUser, setval] = useState(JSON.parse(sessionStorage.getItem('Usuario')))
    let [dataEdit, setEdit] = useState(JSON.parse(sessionStorage.getItem('Data')))

    console.log(loggedUser);

    const addcategory = () => {
        const newEmptyFields = { ...emptyFields };//se agrega a la lista el estado
        if (!category) {//se llenan los campos que no esta llenos
            newEmptyFields.firname = true;
        }
        setEmptyFields(newEmptyFields);

        if (!category) {
            alert("Por favor, complete el espacio categoria");
            return;
        } else {
            axios.post(catUrl, {
                name: category,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + loggedUser,
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response);
                navigate("/categorytable")
                alert("Registro exitoso");

            }).catch(err => {//valida errores
                console.log("error: " + err);
            });
        }


    }
    const [emptyFields, setEmptyFields] = useState({//lista de estados para validar los campos obligatorios
        category: false,
    });

    useEffect(() => {
        if (loggedUser) {

        } else {
            //***Redirect to login***
            navigate("/")
        }

    }, []);
    const Editcategory = (nom, id) => {
        const newEmptyFields = { ...emptyFields };//se agrega a la lista el estado
        if (!category) {//se llenan los campos que no esta llenos
            newEmptyFields.firname = true;
        }
        setEmptyFields(newEmptyFields);

        if (!category) {
            alert("Por favor, complete el espacio categoria");
            return;
        } else {
            axios.patch("http://localhost:3001/api/categories/" + id, {
                name: category,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + loggedUser,
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response);
                sessionStorage.removeItem('Data');
                alert("Modificacion exitosa");
                navigate("/categorytable")
            }).catch(err => {//valida errores
                console.log("error: " + err);
            });
        }

    }

    let [category, SetCategory] = useState('');
    return (
        <div className="sources-boxx">
            <Header></Header>

            {dataEdit ?
                (
                    <>
                        <h2 className='titles'>Categories</h2>
                        <div className="inputs-source">
                            <input type="text" className={emptyFields.category ? "empty" : ""} name="A" onChange={ev => SetCategory(ev.target.value)} placeholder={dataEdit.nombre}></input>
                        </div>
                        <input onClick={() => Editcategory(dataEdit.nombre, dataEdit.id)} type="submit" name="A3" value="Edit" className="add-button-crudlink"></input>
                    </>
                )


                : (
                    <>
                        <h2 className='titles'>Categories</h2>
                        <div className="inputs-source">
                            <input type="text" className={emptyFields.category ? "empty" : ""} name="A" onChange={ev => SetCategory(ev.target.value)} placeholder="Name Category*"></input>
                        </div>
                        <input onClick={() => addcategory()} type="submit" name="A3" value="Save" className="add-button-crudlink"></input>
                    </>
                )}
        </div>
    );

}

export default Newsources;