import logo from './logo.svg';
import './App.css';
import Login from './components/Login/login';
import Register from './components/Register/Register';
import Header from './components/Header/header';
import Home from './components/Home/home';
import Matcht from './components/Matchs/Matchs';
import Standings from './components/Standings/Standings';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">      
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home'  element={<Home/>}/> 
        <Route path='/matcht' element={<Matcht/>}/>
        <Route path='/standing' element={<Standings/>}/>
             
      </Routes>



                 
    </div>
  );
}

export default App;
