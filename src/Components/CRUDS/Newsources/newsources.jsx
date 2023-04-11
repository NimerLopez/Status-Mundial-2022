import './newsources.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import axios from "axios";
import Header from '../../Header/header';

function Newsources() {
    const navigate = useNavigate();
    const userUrl = "http://localhost:3001/api/newSource";
    let [loggedUser, setval] = useState(JSON.parse(sessionStorage.getItem('Usuario')))
    let [url, setUrl] = useState({});
    let [name, setName] = useState({});
    let [category_id, setCategoryId] = useState({});
    let [categoriob, setCategory] = useState({});
    const [loading, setLoading] = useState(true);
    let [dataEdit, setEdit] = useState(JSON.parse(sessionStorage.getItem('DataSource')))

    const AgregarFuente = () => {
        if (dataEdit) {//update source if dataEdit is full
            axios.patch("http://localhost:3001/api/newSource/" + dataEdit._id, {
                url: url,
                name: name,
                category_id: category_id,
                user_id: dataEdit.user_id
            }, {
                headers: {
                    'Authorization': 'Bearer ' + loggedUser,
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response);
                sessionStorage.removeItem('DataSource');
                alert("Modificacion exitosa");
                navigate("/newSourcetable")
            }).catch(err => {//valida errores
                console.log("error: " + err);
            });


        } else {//if not full add newsource


            axios.post(userUrl, {
                url: url,
                name: name,
                category_id: category_id,
                user_id: "1ss"
            }, {
                headers: {
                    'Authorization': 'Bearer ' + loggedUser,
                    'Content-Type': 'application/json'

                }
            }).then(function (response) {
                console.log(response);
                alert("Registro exitoso");
                navigate("/newSourcetable")
            }).catch(err => {//valida errores
                console.log("error: " + err);
                alert("Datos Incorrectos");
            });
        }
    }
    useEffect(() => {
        if (loggedUser) {

        } else {
            //***Redirect to login***
            navigate("/")
        }

    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/api/categories/public', {
            headers: {
                'Authorization': 'Bearer ' + loggedUser,
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            console.log(response.data);
            setCategory(response.data);
            setLoading(false);
        }).catch(err => {//valida errores
            setLoading(false);
            console.log("error: " + err);
        });
    }, []);
    const CambiarIdCategoria = (event) => {
        const id = event.target.value;
        setCategoryId(id);
    }

    return (
        <div className="sources-boxx">
            <Header></Header>
            {loading ?
                (<p>Cargando....</p>) : (
                    <>
                        <h2>News Sources</h2>
                        <div className="inputs-source">
                            {dataEdit ?
                                (<>
                                    <input type="text" onChange={ev => setName(ev.target.value)} name="A1" placeholder={dataEdit.name}></input>
                                    <input type="text" onChange={ev => setUrl(ev.target.value)} name="A1" placeholder={dataEdit.url}></input>
                                    <select onChange={CambiarIdCategoria}>
                                        <option value="Category">Categoria</option>
                                        {categoriob.map((categoria) => (
                                            <option key={categoria._id} value={categoria._id}>{categoria.name}</option>
                                        ))}
                                    </select>
                                </>) :
                                (
                                    <>
                                        <input type="text" onChange={ev => setName(ev.target.value)} name="A1" placeholder="Name"></input>
                                        <input type="text" onChange={ev => setUrl(ev.target.value)} name="A1" placeholder="RSS URL"></input>
                                        <select onChange={CambiarIdCategoria}>
                                            <option value="Category">Categoria</option>
                                            {categoriob.map((categoria) => (
                                                <option key={categoria._id} value={categoria._id}>{categoria.name}</option>
                                            ))}
                                        </select>
                                    </>
                                )
                            }

                        </div>

                        <input type="submit" onClick={() => AgregarFuente()} name="A3" value="Save" className="add-button-crudlink"></input>

                    </>
                )};

        </div>
    );
}

export default Newsources;