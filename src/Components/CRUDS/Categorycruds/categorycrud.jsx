import './categorycrud.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import axios from "axios";
import Header from '../../Header/header';

function CategoryCRUD() {
    const navigate = useNavigate();
    let [loggedUser, setval] = useState(JSON.parse(sessionStorage.getItem('Usuario')))
    const [loading, setLoading] = useState(true);
    let [categoriob, setCategory] = useState({});
    sessionStorage.removeItem('Data');
    useEffect(() => {
        if (loggedUser) {
            const query = `
            query Query {
                Categorias {
                  name
                  _id
                }
              }`;
            axios.post('http://localhost:4001/', {query}).then(function (response) {
                console.log(response.data.data);
                setCategory(response.data.data.Categorias);
                setLoading(false);
            }).catch(err => {
                console.log("xxxxxxx");
                console.log("Error",err);
            });
            // Hacer algo con los datos


        } else {
            //***Redirect to login***
            navigate("/")
        }
    }, []);
    const DeleteCategory = (id) => {//elimina categorias
        axios.delete("http://localhost:3001/api/categories/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loggedUser
            }
        }).then(function (response) {
            console.log(response);
            console.log("Se guardo correctamente");
        }).catch(err => {//valida errores
            console.log("error: " + err);
            alert("Datos incorrectos");
        });
    }
    const UpdateData = (nom, id) => {
        let data = {
            nombre: nom,
            id: id
        };
        sessionStorage.setItem('Data', JSON.stringify(data));
        navigate("/categoryadd")
    }


    return (
        <div className="sources-box">
            <Header></Header>
            {loading ?
                (<p>Cargando...</p>) : (
                    <>
                        <h2 className='titles'>New Sources</h2>
                        <table class="sources-table">
                            <tr className="menu">
                                <th>Category</th>
                                <th id="strong">Actions</th>
                            </tr>
                            {categoriob.map((categoria) => (
                                <tr>
                                    <td>{categoria.name}</td>
                                    <td id="edit"><a href='' onClick={() => UpdateData(categoria.name, categoria._id)}>Edit</a>|<a href='' onClick={() => DeleteCategory(categoria._id)}>Delete</a></td>
                                </tr>
                            ))}

                        </table>

                        <div className="add-button-crudlink">
                            <input type="submit" name="A3" value="Add New"></input>
                        </div>
                    </>
                )}
        </div>

    );
}

export default CategoryCRUD;