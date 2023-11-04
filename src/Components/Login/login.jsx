import React, {useState, useEffect} from "react";
import{useNavigate,useParams} from "react-router"
import axios from "axios";
//import Form from 'react-bootstrap/Form';
import "./style.css";
import catar from "../img/catar.png";

function Logival(email,contra,navigate){ 
    //console.log(users);
    let Dateuser ="";
    if(!email || !contra){ 
        if(!email && contra){
            alert("Favor introducir un Email");           
        }if(!contra && email){
            alert("Favor introducir una contraseña"); 
        }if(!email && !contra){
            alert("Favor Llenar los campos"); 
        }      
    }else{
        //https://cors-anywhere.herokuapp.com fixed error cors in localhost
        axios.post('https://cors-anywhere.herokuapp.com/http://api.cup2022.ir/api/v1/user/login',{  
            email: email,
            password: contra       
        },{
            headers: {
            'Content-Type': 'application/json'
             }  
        }).then(function (response) {
            console.log(response);
            if(response){
               
               Dateuser=response.data.data.token;
               console.log("Nimer",Dateuser);
               sessionStorage.setItem('TokenUser',JSON.stringify(Dateuser));//se guarda en la sesion   
               navigate("/home");         
            };
          }).catch(err=>{//valida errores
            console.log("error: "+err);
            alert("Datos incorrectos");
          });
          
    };
    
}
 //http://api.cup2022.ir/api/v1/team

function Login(props) {
    const userUrl = "http://api.cup2022.ir/api/v1/team";
    const navigate=useNavigate();
	
    // useEffect(() => {
	// 	axios.get(userUrl).then(function (response) {
	// 		setUsers(response.data);
	// 	});
	// }, []);

    let [email,setEmail]=useState('');
    let [contra,setContra]=useState('');    
	return (
           <>
               <div className="container1">
                    <h1>Login</h1>
                    <img src={catar} className="catar"></img>
                    <div id="contain" >                        
                        <div className="tex_field">
                            <input className="email" type="text"  onChange={ev=>setEmail(ev.target.value)} required/>
                            <span></span>
                            <label>Email</label>
                        </div>
                        <div className="tex_field">
                            <input className="contra" type="password" onChange={ev=>setContra(ev.target.value)} required/>
                            <span></span>
                            <label>Password</label>
                        </div>
                        <div className="pass"><p>Forgot Password?</p></div>
                        <input type="submit" value="login" onClick={()=>Logival(email,contra,navigate)}/>
                        <div className="nores">You are not registered?<a href="/Register">Signup</a></div>
                    </div>

               </div>              
           </>      
	);
}

export default Login;