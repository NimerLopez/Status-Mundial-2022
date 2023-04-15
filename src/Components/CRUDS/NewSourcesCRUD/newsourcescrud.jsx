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
    sessionStorage.removeItem('DataSource');

    useEffect(() => {
        if (loggedUser) {
            const query = `
            query Query($myNewsSourceId: String) {
                MyNewsSource(id: $myNewsSourceId) {
                    _id
                    name
                    url
                    category_id
                    user_id
                  }
                Categorias {
                        _id
                        name
                      }   
                }`;
            const variables = {
                myNewsSourceId: JSON.parse(sessionStorage.getItem('User_id')),
            };

            axios.post('http://localhost:4001/', { query, variables }).then(function (response) {
                console.log(response.data.data);
                setLoadingNew(false);
                setNew(response.data.data.MyNewsSource);
                setCategory(response.data.data.Categorias);
                setLoadingCategory(false);
            }).catch(err => {
                console.console.log(err);
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