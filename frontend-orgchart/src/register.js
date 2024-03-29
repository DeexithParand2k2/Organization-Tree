import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register() {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedTypeRole, setSelectedTypeRole] = useState("")
  const [reportto, setreportto] = useState(""); 
  const [formData, setFormData] = useState({ name: '', email: '', password: '', domain:'', role: '', department: '', reportsTo: '' });
  const [type, setType] = useState('');
  const [roleType, setroleType] = useState('');
  const [departmentType, setDepartmentType] = useState('');
  const [selectedDept, setselectedDept] = useState("");

  const [roledrop, setroleDrop] = useState([]);
  const [departmentdrop, setdepartmentDrop] = useState([]);
  const [reporttodrop, setreporttoDrop] = useState([]);

  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });

  };

  useEffect(()=>{
    // to handle unwanted login
    if(localStorage.getItem('email')===null){
      navigate('/')
    }
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSelectedRole("");
        setselectedDept("");
        setreportto("");

        const response = await axios.get(`http://localhost:4000/api/getroles?DOMAIN=${type}`);
        console.log(response.data.data);
        setroleDrop(response.data.data);
        console.log('Post request successful:', response.data);

      } catch (error) {
        console.error('Error in post request:', error);

      }
    };


    if (type.trim() !== '') {
      fetchData();
    }
  }, [type]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setselectedDept("");
        setreportto("");
        const response = await axios.get(`http://localhost:4000/api/getdept?DOMAIN=${type}`);

        console.log('response for department',response.data.data)


        setdepartmentDrop(response.data.data);
        console.log('Post request successful:', response.data.data);

      } catch (error) {
        console.error('Error in post request:', error);

      }
    };


    if (roleType.trim() !== '') {
      fetchData();
    }
  }, [roleType]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setreportto("");
        const response = await axios.get(`http://localhost:4000/api/listseniornames?ROLE=${roleType}&DEPARTMENT=${departmentType}`);
        console.log('got response of senior emails',response.data.data);
        setreporttoDrop(response.data.data);
        console.log('Post request successful:', response.data.data);

      } catch (error) {
        console.error('Error in post request:', error);

      }
    };

    if (departmentType.trim() !== '') {
      fetchData();
    }
  }, [departmentType]);

  const submitFormBackend = async (formData) =>{
    try{
      const response = await axios.post("http://localhost:4000/api/adduser",formData)

      console.log('data for submission ',response.data)
      setFormData({ name: '', email: '', password: '', domain:'', role: '', department: '', reportsTo: '' })
      setType('')
    } catch(error){
      console.log('Error server',error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Data:', formData);

    submitFormBackend(formData)
  };

  const handleLogout = () =>{
    localStorage.clear()
    navigate('/')
  }

  return (
    <section className="vh-100">
      <div className="mask d-flex align-items-center">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Add new user</h2>
                  <button type="button" className="btn btn-outline-dark" style={{ right: "7%" }} onClick={handleLogout}>Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></button>

                  <form>

                    <div className="form-outline mb-4">
                      <input type="text" name="name" placeholder="Name" autoComplete="off"
                        value={formData.name} id="form3Example1cg" className="form-control form-control-lg" onChange={handleInputChange} />
                    </div>

                    <div className="form-outline mb-4">
                      <input type="email" name="email" placeholder="Email" autoComplete="off"
                        value={formData.email} id="form3Example3cg" className="form-control form-control-lg" onChange={handleInputChange} />
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" name="password" placeholder="Password" autoComplete="false"
                        value={formData.password} id="form3Example4cg" className="form-control form-control-lg" onChange={handleInputChange} />
                    </div>

                    <div className="form-outline mb-4">
                      <div className="card flex justify-content-center">
                        <Dropdown
                          value={selectedTypeRole} name='role'
                          onChange={(e) => {
                            setSelectedTypeRole(e.value);
                            setType(e.value);

                            setFormData({
                              ...formData,
                              ['domain']: e.value
                            });                        
                            
                          }}
                          options={["PR", "TECH"]}

                          placeholder="Select Domain"
                          className="w-full md:w-14rem"
                        />
                      </div>
                    </div>


                    <div className="form-outline mb-4">
                      <div className="card flex justify-content-center">
                        <Dropdown
                          value={selectedRole} name='role'
                          onChange={(e) => {
                            console.log(e.value);
                            setSelectedRole(e.value);
                            setroleType(e.value);

                            setFormData({
                              ...formData,
                              ['role']: e.value
                            });  
                          }}
                          options={roledrop}

                          placeholder="Select Designation"
                          className="w-full md:w-14rem"
                        />
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <div className="card flex justify-content-center">
                        <Dropdown
                          value={selectedDept} name='role'
                          onChange={(e) => {
                            setselectedDept(e.value);
                            setDepartmentType(e.value);

                            setFormData({
                              ...formData,
                              ['department']: e.value
                            });  
                          }}
                          options={departmentdrop}

                          placeholder="Select Department"
                          className="w-full md:w-14rem"
                        />
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <div className="card flex justify-content-center">
                        <Dropdown
                          value={reportto} name='reportingto'
                          onChange={(e) => {
                            setreportto(e.value);

                            setFormData({
                              ...formData,
                              ['reportsTo']: e.value
                            }); 

                          }}

                          options={reporttodrop}

                          placeholder="Reports To"
                          className="w-full md:w-14rem"
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={handleSubmit}>Add user</button>
                    </div>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}