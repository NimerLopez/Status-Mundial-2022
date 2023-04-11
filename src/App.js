import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/login';
import Home from './Components/Home/home';
import Footer from './Components/Footer/footer';
import Register from './Components/Register/register';
import Header from './Components/Header/header';
import CategoryCRUD from './Components/CRUDS/Categorycruds/categorycrud';

import Categoryadd from './Components/CRUDS/Categoryadd/category';
import Newsources from './Components/CRUDS/Newsources/newsources';
import NewsourcesCrud from './Components/CRUDS/NewSourcesCRUD/newsourcescrud';
import ConfEmial from './Components/ConfEmail/CofEmial';
import Passworles from './Components/Passwordless/Passwordless';
import PassworlesSoli from './Components/Passwordless/Solicitud_Passwordless';
import { Route, Routes } from 'react-router-dom';
//npm install axios
//npm install react-router-dom
function App() {
  return (
    <div className="App">
       
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/> 
        <Route path='/newSource' element={<Newsources/>}/>     
        <Route path='/categoryadd' element={<Categoryadd/>}/>
        <Route path='/categorytable' element={<CategoryCRUD/>}/>
        <Route path='/newSourcetable' element={<NewsourcesCrud/>}/>
        <Route path='/confirmar' element={<ConfEmial/>}/>
        <Route path='/passwordless' element={<Passworles/>}/>
        <Route path='/passworles/solicitud' element={<PassworlesSoli/>}/>

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
