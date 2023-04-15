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

    const [searchNew, setSearchQuery] = useState('');///guarda el dato a buscar

    const [loading, setLoading] = useState(true);

    //Effects
    //1 Main effect to validate user logged and consume product and carts from APIs URL via axios

    const newList = (
        newob.length && categoriob.length ? <New new={newob} cate={categoriob} /> : <p>Loading...</p>
    )
    useEffect(() => {
        if (loggedUser) {
            const query = `
            query Query($dataNewByUserIdId: String) {
                dataNewByUserID(
                    id: $dataNewByUserIdId
                ) {
                    _id
                    title
                    short_description
                    permalink
                    date
                    new_source_id
                    src
                    user_id
                    category_id
                    }
                Categorias {
                        _id
                        name
                      }   
                }`;
            const variables = {
                dataNewByUserIdId: JSON.parse(sessionStorage.getItem('User_id')),
            };

            axios.post('http://localhost:4001/', { query, variables }).then(function (response) {
                console.log(response.data.data);
                setGuard(response.data.data.dataNewByUserID);//respaldo de la noticias
                setNew(response.data.data.dataNewByUserID);
                setCategory(response.data.data.Categorias);
                setLoading(false);
            }).catch(err => {
                console.console.log(err);
            });
            // Hacer algo con los datos


        } else {
            //***Redirect to login***
            navigate("/")
        }

    }, []);

    
    //funcion para guardar el id de categoria
    const filtCategoria = (id) => {
        if (id) {
            //get NOTICIAS CATEGORIA
            const query = `
            query Query($idCategoria: String, $userId: String) {
                MyNewsByFilCate(id_Categoria: $idCategoria, user_id: $userId) {
                    _id
                    title
                    short_description
                    permalink
                    date
                    new_source_id
                    user_id
                    category_id
                    src
                  }
                }`;
            const variables = {
                idCategoria: id,
                userId: JSON.parse(sessionStorage.getItem('User_id'))
            };

            axios.post('http://localhost:4001/', { query, variables }).then(function (response) {
                console.log(response.data.data);
                setNew(response.data.data.MyNewsByFilCate);
            }).catch(err => {
                console.console.log(err);
            });
        } else {
            setNew(guardnew);
        }
    }
    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            if (searchNew) {//valida que la variable a buscar este llena
                //get NOTICIAS CATEGORIA
                const query = `
                query Query($valor: String, $userId: String) {
                    MyNewsSearch(valor: $valor, user_id: $userId) {
                        _id
                        title
                        short_description
                        permalink
                        date
                        user_id
                        category_id
                        src
                        new_source_id
                      }
                    }`;
                const variables = {
                    valor: searchNew,
                    userId: JSON.parse(sessionStorage.getItem('User_id'))
                };
    
                axios.post('http://localhost:4001/', { query, variables }).then(function (response) {
                    console.log(response.data.data);
                    setNew(response.data.data.MyNewsSearch);
                }).catch(err => {
                    console.console.log(err);
                });
            } else {
                setNew(guardnew);
            }
        }
      };

    console.log(categoryid)
    return (
        <div className="dashboard">
            <Header></Header>
            {loading ?
                (<p>Cargando...</p>) : (
                    <>
                        <h1>Your unique News Cover</h1>
                        <input
                            type="text"
                            placeholder="Buscar noticias"
                            value={searchNew}
                            onChange={e => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                        /> 
                        <div className="filters">
                            <nav>
                                <ul>
                                    <li><a href="#" onClick={() => filtCategoria()} >Todo</a></li>
                                    {categoriob.map((categoria) => (
                                        <li><a href="#" onClick={() => filtCategoria(categoria._id)} >{categoria.name}</a></li>
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