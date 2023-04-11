import './newsourcescrud.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import axios from "axios";
import Header from '../../Header/header';

function Newsourcescrud() {
    const navigate = useNavigate();
    let [loggedUser, setval] = useState(JSON.parse(sessionStorage.getItem('Usuario')))
    const [loadingCategory, setLoadingCategory] = useState(true);
    let [newob, setNew] = useState({});
    let [categoriob, setCategory] = useState({});
    const [loadingNew, setLoadingNew] = useState(true);


    useEffect(() => {
        if (loggedUser) {
            //request my new by token id
            axios.get('http://localhost:3001/api/myNewSource', {
                headers: {
                    'Authorization': 'Bearer ' + loggedUser,
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response.data);
                setNew(response.data);
                setLoadingNew(false);

            }).catch(err => {//valida errores
                console.log("error: " + err);
            });
            //request category 
            axios.get('http://localhost:3001/api/categories/public', {
                headers: {
                    'Authorization': 'Bearer ' + loggedUser,
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response.data);
                setCategory(response.data);
                setLoadingCategory(false);

            }).catch(err => {//valida errores
                console.log("error: " + err);
            });

        } else {
            //***Redirect to login***
            navigate("/")
        }

    }, []);
    const DeleteResource=(id)=>{
        axios.delete("http://localhost:3001/api/newSource/"+id,  {
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
const UpdateResource=(data)=>{
    sessionStorage.setItem('DataSource',JSON.stringify(data));
    navigate("/newSource")
}
    return (
        <div className="sources-box">
            <Header></Header>
            <h2>News Sources</h2>
            <>
                {loadingCategory && loadingNew ?
                    (<p>Cargando..............</p>) :
                    (
                        <table className="sources-table">
                            <tr className="menu">
                                <th id="strong">Name</th>
                                <th>Category</th>
                                <th id="strong">Actions</th>
                            </tr>
                            {newob.map((newdata) => (
                                <tr>
                                    <td>{newdata.name}</td>
                                    {categoriob.map((category) => (
                                        category._id === newdata.category_id ?
                                            <td>{category.name}</td>:<></>                                           
                                    ))}
                                    <td id="edit"><a href='' onClick={()=>UpdateResource(newdata)}>Edit</a>|<a href=''onClick={()=>DeleteResource(newdata._id)}>Delete</a></td>
                                </tr>
                            ))}

                        </table>

                    )
                }
            </>

            <div className="add-button-crudlink">
                <input type="submit" name="A3" value="Add New"></input>
            </div>
        </div>
    );
}

export default Newsourcescrud;