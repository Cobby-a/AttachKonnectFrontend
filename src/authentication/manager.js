import logo from '../assets/logo.svg'
import compssalogo from '../assets/compssaLogo.png'
import logo1 from '../assets/logoname.svg'

import { Checkbox,  } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const ManagerSignIn = () => {

    useEffect (()=>{
        document.title = "AttachmentKonnect - Portal"
    })
    
    const [forAdmin, setForAdmin] = useState(true);
    const [forSupervisor, setForSupervisor] = useState(false);
    const [forStudent, setForStudent] = useState(false);
    const [forManager, setForManager] = useState(false);
    const [forPassword, setForPassword] = useState(false);
    const [managerSignUp, setManagerSignUp] = useState("button2")
    const [placeholder, setPlaceHolder] = useState("Username")

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event)=>{
        setLoginData({
            ...loginData,
            [event.target.name]:event.target.value
        })
    }

    const [errorMessage, setErrorMessage] = useState('');

    const submitForm =() =>{
        const loginFormData = new FormData();
        loginFormData.append('username', loginData.username)
        loginFormData.append('password', loginData.password)
        if(forAdmin === true){
            try{
                axios.post("http://127.0.0.1:8000/admin-page/admin-login/", loginFormData)
                .then((response)=>{
                    if(response.data.bool === true){
                        localStorage.setItem('adminLoginStatus', true)
                        localStorage.setItem('admin_id', response.data.admin_id)
                        localStorage.setItem('adminUserName', response.data.adminUsername)
                        window.location.href='/admin/dashboard';
                    }
                    else{
                        setErrorMessage("Invalid admin username or password! Try again.")
                    }
                });
            }catch(error){
                console.log(error)
            }
        }
        if(forManager === true){
            try{
                axios.post("http://127.0.0.1:8000/manager/manager-login/", loginFormData)
                .then((response)=>{
                    if(response.data.bool === true){
                        localStorage.setItem('managerLoginStatus', true)
                        localStorage.setItem('managerId', response.data.manager_id)
                        localStorage.setItem('companyName', response.data.company_name)
                        window.location.href='/manager/dashboard';
                    }
                    else{
                        setErrorMessage("Invalid Email or Password! Try again.")
                    }
                });
            }catch(error){
                console.log(error)
            }
        }
        if(forStudent === true){
            try{
                axios.post("http://127.0.0.1:8000/student/student-login/", loginFormData)
                .then((response)=>{
                    if(response.data.bool === true){
                        localStorage.setItem('studentLoginStatus', true)
                        localStorage.setItem('studentId', response.data.student_id)
                        localStorage.setItem('studentName', response.data.student_name)
                        window.location.href='/student/dashboard';
                    }
                    else{
                        setErrorMessage("Invalid Student Id or Password! Try again.")
                    }
                });
            }catch(error){
                console.log(error)
            }
        }
    }

    // const managerLoginStatus = localStorage.getItem('managerLoginStatus')
    // if(managerLoginStatus === 'true'){
    //     window.location.href='/manager/dashboard';
    // }
    const Admin = () =>{
        setForAdmin(true);
        setForManager(false);
        setForStudent(false);
        setForSupervisor(false);
        setManagerSignUp("button2");
        setErrorMessage('');
        setPlaceHolder('Username')
    }
    const Supervisor = () =>{
        setForAdmin(false);
        setForManager(false);
        setForStudent(false);
        setForSupervisor(true);
        setManagerSignUp("button2");
        setErrorMessage('');
        setPlaceHolder('Staff Id');
    }
    const Student = () =>{
        setForAdmin(false);
        setForManager(false);
        setForStudent(true);
        setForSupervisor(false);
        setManagerSignUp("button2");
        setErrorMessage('');
        setPlaceHolder('Student Id')
    }
    const Manager = () =>{
        setForAdmin(false);
        setForManager(true);
        setForStudent(false);
        setForSupervisor(false);
        setManagerSignUp("button1");
        setErrorMessage('');
        setPlaceHolder('Email')
    }
    let accountType = "Admin"
    let passwordType = "password"
    if(forPassword === true){
        passwordType = "text"
    }
    // if(forAdmin === true){
    //     url = "/admin/dashboard"
    // }
    // else if(forStudent === true){
    //     accountType = "Student"
    //     url = "/student/dashboard"
    // }
    // else if(forManager === true){
    //     accountType = "Manager"
    //     url = "http://127.0.0.1:8000/manager/manager-login"
    // }
    // else if(forSupervisor === true){
    //     accountType = "Supervisor"
    //     url = "/manager/dashboard"
    // }
    return(
        <article className='authContainer'>
            <section>
                <section className="logo">
                    <img src={logo} alt="logo" />
                </section>
                <section className="logo1">
                    <img src={compssalogo} alt="logo" />
                </section>
            </section>
            <section className='maincontainer'>
                <div className='container1'>
                    <img src={logo1} alt='Attachment Konnect'></img>
                </div>
                <div className='container2'>
                    <h2>HELLO {accountType}!</h2>
                    <div id='welcome'>
                        <div className='underline'></div>
                        <p>Welcome back.</p>
                        <div className='underline'></div>
                    </div>
                    <div className='userTypes'>
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                        value="admin"
                        control={<Checkbox />}
                        label={<span style={{fontSize: '0.8rem', color: "#8C91AA", fontFamily: 'Poppins'}}>Admin</span>}
                        labelPlacement="bottom"
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 24 }, }}
                        onChange={Admin}
                        checked={forAdmin}
                        />
                        <FormControlLabel
                        value="supervisor"
                        control={<Checkbox />}
                        label={<span style={{fontSize: '0.8rem', color: "#8C91AA", fontFamily: 'Poppins'}}>Supervisor</span>}
                        labelPlacement="bottom"
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 24 }, marginLeft: '-0.3rem'}}
                        onChange={Supervisor}
                        checked={forSupervisor}
                        />
                        <FormControlLabel
                        value="student"
                        control={<Checkbox />}
                        label={<span style={{fontSize: '0.8rem', color: "#8C91AA", fontFamily: 'Poppins'}}>Student</span>}
                        labelPlacement="bottom"
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 24 }, marginLeft: '-0.3rem' }}
                        onChange={Student}
                        checked={forStudent}
                        />
                        <FormControlLabel
                        value="manager"
                        control={<Checkbox />}
                        label={<span style={{fontSize: '0.8rem', color: "#8C91AA", paddingTop: '4rem', fontFamily: 'Poppins'}}>Manager</span>}
                        labelPlacement="bottom"
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 24 }, marginLeft: '-0.3rem', marginRight: '-0.3rem' }}
                        onChange={Manager}
                        checked={forManager}
                        />
                    </FormGroup>
                    </div>
                    {errorMessage && <p style={{textAlign: 'center', marginTop: '1rem', marginBottom: '-1.2rem', fontSize: '1rem', color: "#ff3333", }}>{errorMessage}</p>}
                    <div className='form'>
                        <fieldset>
                            <input id="email" name="username" type="text" required placeholder={placeholder} value={loginData.username} onChange={handleChange}/>
                            <input id="password" name="password" type={passwordType} required placeholder='Enter Your Password' value={loginData.password} onChange={handleChange}/>
                            <FormControlLabel
                            value="showpassword"
                            control={<Checkbox />}
                            label={<span style={{fontSize: '0.8rem', color: "#8C91AA", marginLeft: '-0.5rem', fontFamily: 'Poppins' }}>Show Password</span>}
                            labelPlacement="end"
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 17 },marginTop: '-1rem'}}
                            onChange={()=>setForPassword(!forPassword)}
                            checked={forPassword}
                            />
                            
                            <button type='submit' onClick={submitForm}>Login</button>
                            <Link to="/manager-apply"><button type='submit' className={managerSignUp}>Want to join our service? Apply!</button></Link>
                        </fieldset>
                    </div>
                </div>
            </section>
        </article>
    )
}

export default ManagerSignIn;