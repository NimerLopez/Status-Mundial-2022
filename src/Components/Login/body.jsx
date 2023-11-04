import React, {useState, useEffect} from "react";
import{useNavigate} from "react-router"
import axios from "axios";
import "./style.css";


//Validation to log in  
//Vars from HTML inpts   
function logival({users},email,contra,navigate){ 
    //users check
    console.log(users);
    let val="V";
    
    //conditional to verificate if both got info
    if(!email || !contra){       
    }else{
        for (let i = 0; i < users.length; i++) {
            if(email==users[i].email && contra==users[i].password){
                val="V";
                sessionStorage.clear();//if (true) session clear memory to save new user id and name logged to be ussed.
                const au = {//info is being catched from api
                    id:users[i].id,
                    name: users[i].firstName+" "+users[i].lastName
                }
                sessionStorage.setItem('Usuario',JSON.stringify(au));//Here is where object is saved into sessionstoge
                break;               
            }else{
                val="F";
            }
        }//end for
        if(val=="V"){//val var is used to check all the previus conditional, if true it goes to /home by router dom
            navigate("/home");
        }else{
            alert("Datos Incorrectos");
        }
    }

  

}



function Body(props) {
    //Url for user api
    const userUrl = " https://dummyjson.com/users";
    
    //var for navigate statement
    const navigate=useNavigate();

    //state for save users that come from api
	let [users, setUsers] = useState({});
    //state for save mail from mail input
    let [email,setEmail]=useState('');
    //state for save password from psw input
    let [contra,setContra]=useState('');    

    //here data from apis is being downloaded with axios function to save it in user state
    useEffect(() => {
		axios.get(userUrl).then(function (response) {
			setUsers(response.data);
		});
	}, []);

  
	return (
           <>
               <div className="container1">
                    <h1>Login</h1>
                    <form >                        
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
                        <input type="submit" value="login" onClick={()=>logival(users,email,contra,navigate)}/>
                        <div className="nores">You are not registered?<a href="#">Signup</a></div>
                    </form>

               </div>              
           </>      
	);
}

export default Body;