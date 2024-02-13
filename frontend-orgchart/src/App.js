import logo from './logo.svg';
import './App.css';
import Login from './Login';
import { BrowserRouter, Route, Router,Routes,Switch } from 'react-router-dom';
import Register from './register';
import axios from 'axios';
import OrganizationStructure from './Chart';
import { useEffect, useState } from 'react';

function App() {

  const [allUsers, setAllUsers] = useState([])

  const getAllUsers = async () =>{

    try{

      const response = await axios.get("http://localhost:4000/api/getallusers")
      console.log(response.data.data)
      setAllUsers(response.data.data)

    } catch(error){

      console.log('error from response',error.response)
      
    }

  }


  useEffect(()=>{

    getAllUsers()

  },[])
  
  return (
    <div className="App container-fluid" >
  <BrowserRouter>
 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chart" element={<OrganizationStructure chartdata={allUsers}/>} />
         <Route path='/register' element={<Register/>}/>
      </Routes>
   
    </BrowserRouter>
    </div>
  );
}

export default App;
