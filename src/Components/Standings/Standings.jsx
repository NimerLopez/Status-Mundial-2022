//import { createRef } from 'react';
import { Route, Routes,useNavigate } from 'react-router';
import React, {useState, useEffect} from "react";
import Header from '../Header/header';
import StandingsMost from './StandingsMos';
import axios from "axios";

function Standings(){
   let navigate=useNavigate();
   let [loggedUser, setval] = useState(JSON.parse(sessionStorage.getItem('TokenUser')))
   let [stadi, setSta] = useState({});

   useEffect(() => {
      axios.get('https://cors-anywhere.herokuapp.com/http://api.cup2022.ir/api/v1/standings',{
         headers: {
         'Authorization': 'Bearer '+loggedUser,
         'Content-Type':'application/json'
          }
     }).then(function (response) {
         console.log(response);
         setSta(response.data.data);

       }).catch(err=>{//valida errores
         console.log("error: "+err);
       });
       

   }, []);
   const LlenarEstad = (
        stadi.length ? <StandingsMost stadi={stadi} loggedUser={loggedUser} /> : <p>Loading...</p>
    )
   

 return(
 <div id='header'>
   {<Header/>}
   {LlenarEstad}
 </div>);   
}
export default Standings;