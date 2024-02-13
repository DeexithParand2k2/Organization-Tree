import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [employeeName, setEmployeeName] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState(''); 
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
  
    const handleSubmit = async () => {

      try {
       
        const response = await axios.post('http://localhost:4000/api/login', {
          NAME : employeeName,
          EMAIL : email,
          ROLE : userType,
          PASSWORD : password,
        });

        const {name, email : resEmail, role, reportsTo, accessRole} = response.data

        console.log("object obtained",{name, resEmail, role, reportsTo, accessRole})

        if(response.status === 200 && accessRole==='ADMIN'){

          console.log("response accessRole : ",accessRole)

          localStorage.clear();
          localStorage.setItem("email",resEmail);
          localStorage.setItem("reportsTo",reportsTo);
          
          navigate('/register')

        } else if(response.status === 200 && accessRole==='USER'){
          
          console.log("response accessRole : ",accessRole)

          localStorage.clear();
          localStorage.setItem("email",resEmail);
          localStorage.setItem("reportsTo",reportsTo);

          navigate('/chart')

        }
        else {
          throw new Error("some internal error")
        }
  
        console.log('login respoinse', response);
        console.log('API call successful', response.data);
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };


  return (
    
    <section className="h-100 gradient-form" >
    <div className="container-fluid  h-100">
      <div className="row d-flex justify-content-center align-items-center h-100" >
        <div className="col-xl-12 " >
          <div className="card rounded-3 text-black h-100">
            <div className="row g-0 "  >
            <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 className="mb-4">We are more than just a company</h4>
                  <p className="small mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card-body p-md-5 mx-md-4">
                  

                  <form>
                   

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form2Example11"
                        className="form-control"
                        placeholder="Employee Name"
                        onChange={(event) => {
                            setEmployeeName(event.target.value);
                          }}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form2Example11"
                        className="form-control"
                        placeholder="email address"
                        onChange={(event) => {
                            setEmail(event.target.value);
                          }}
                      />
                    </div>
                    <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="radioUser"
                        name="optradio"
                        value="user"
                        checked={userType === 'user'}
                        onChange={(e)=>{ setUserType(e.target.value)}}
                    />
                    <label className="form-check-label" htmlFor="radioUser">
                        User
                    </label>
                    </div>
                    
                    <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="radioAdmin"
                        name="optradio"
                        value="admin"
                        checked={userType === 'admin'}
                        onChange={(e)=>{ setUserType(e.target.value)}}
                    />
                    <label className="form-check-label" htmlFor="radioAdmin">
                        Admin
                    </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form2Example22"
                        className="form-control"
                        placeholder="password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                      />
                    </div>

                    <div className="text-center pt-1 mb-5 pb-1">
                      <button
                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Log in
                      </button>
                      
                    </div>

                   
                  </form>
                </div>
              </div>
         
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  )
}

export default Login;