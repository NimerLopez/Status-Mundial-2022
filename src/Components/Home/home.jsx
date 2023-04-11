import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import axios from "axios";
import New from './new';
import './dashboard.css'
import Header from '../Header/header';
function Home() {
    const navigate = useNavigate();
    let [loggedUser, setval] = useState(JSON.parse(sessionStorage.getItem('Usuario')))
    let [newob, setNew] = useState({});
    let [categoriob, setCategory] = useState({});
    let [guardnew, setGuard] = useState({});

    //guarda id
    let [categoryid, setCategoryId] = useState({});
    //deberia guardar categorias
    let [newobcategory, setNewCategoryId] = useState({});


    const [loading, setLoading] = useState(true);


    //Effects
    //1 Main effect to validate user logged and consume product and carts from APIs URL via axios

    const newList = (
        newob.length && categoriob.length ? <New new={newob} cate={categoriob} /> : <p>Loading...</p>
    )
    useEffect(() => {
        if (loggedUser) {
            //request my new by token id
            axios.get('http://localhost:3001/api/new/myNew', {
                headers: {
                    'Authorization': 'Bearer ' + loggedUser,
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response.data);
                setNew(response.data);
                setGuard(response.data);

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
                setLoading(false);

            }).catch(err => {//valida errores
                setLoading(false);
                console.log("error: " + err);
            });

        } else {
            //***Redirect to login***
            navigate("/")
        }

    }, []);

    // const ObtenerId=(event)=>{
    //     const id = event.target.value;
    //     setCategoryId(id);
    // }


    //funcion para guardar el id de categoria
    const handleClick = (id) => {
        if (id) {
            //get NOTICIAS CATEGORIA
            axios.get("http://localhost:3001/api/new/myNew/categoryid/"+id,  {
                headers: {
                    'Authorization': 'Bearer ' + loggedUser,
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response.data);               
                setNew(response.data);
                //navigate("/categorytable")
            }).catch(err => {//valida errores
                console.log("error: " + err);
            });



        }else{           
            setNew(guardnew);
        }
    }

        console.log(categoryid)
        return (
            <div className="dashboard">
                <Header></Header>
                {loading ?
                    (<p>Cargando...</p>) : (
                        <>
                            <h1>Your unique News Cover</h1>
                            <div className="filters">
                                <nav>
                                    <ul>
                                        <li><a href="#" onClick={() => handleClick()} >Todo</a></li>
                                        {categoriob.map((categoria) => (
                                            <li><a href="#" onClick={() => handleClick(categoria._id)} >{categoria.name}</a></li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                            <div className="news">
                                <div className="wrap-news">
                                    {newList}
                                </div>
                            </div>
                        </>
                    )}
            </div>
        )

    }
    export default Home;