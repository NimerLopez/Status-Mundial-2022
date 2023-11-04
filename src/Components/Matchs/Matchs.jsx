import { Route, Routes,useNavigate } from 'react-router';
import React, {useState, useEffect} from "react";
import Header from '../Header/header';
import Mat from '../Matchs/matchmos';
import axios from "axios";


function Matchs(){
   let navigate=useNavigate();
   let [loggedUser, setval] = useState(JSON.parse(sessionStorage.getItem('TokenUser')))
   let [mat, setMat] = useState({});

   useEffect(() => {
      axios.get('https://cors-anywhere.herokuapp.com/http://api.cup2022.ir/api/v1/match',{
         headers: {
         'Authorization': 'Bearer '+loggedUser,
         'Content-Type':'application/json'
          }
     }).then(function (response) {
         console.log(response);
         setMat(response.data.data);

       }).catch(err=>{//valida errores
         console.log("error: "+err);
       });
       

   }, []);
   const LlenarMat = (
        mat.length ? <Mat mat={mat} /> : <p>Loading...</p>
    )
   

 return(
 <div id='Hola'>
   {<Header/>}
   {LlenarMat}
 </div>);   
}
export default Matchs;