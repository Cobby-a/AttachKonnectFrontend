import logo from '../assets/logo.svg'
import logo1 from '../assets/logoname.svg'

import { Checkbox,  } from '@mui/material'
// import FormGroup from '@mui/material'
// import FormControlLabel from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ManagerSignIn = () => {
    const [forAdmin, setForAdmin] = useState(true);
    const [forSupervisor, setForSupervisor] = useState(false);
    const [forStudent, setForStudent] = useState(false);
    const [forManager, setForManager] = useState(false);
    const [forPassword, setForPassword] = useState(false);

    let url = "/admin/dashboard"
    const Admin = () =>{
        setForAdmin(true);
        setForManager(false);
        setForStudent(false);
        setForSupervisor(false);
    }
    const Supervisor = () =>{
        setForAdmin(false);
        setForManager(false);
        setForStudent(false);
        setForSupervisor(true);
    }
    const Student = () =>{
        setForAdmin(false);
        setForManager(false);
        setForStudent(true);
        setForSupervisor(false);
    }
    const Manager = () =>{
        setForAdmin(false);
        setForManager(true);
        setForStudent(false);
        setForSupervisor(false);
    }
    let accountType = "Admin"
    let passwordType = "password"
    if(forPassword === true){
        passwordType = "text"
    }
    if(forStudent === true){
        accountType = "Student"
        url = "/student/dashboard"
    }
    else if(forManager === true){
        accountType = "Manager"
        url = "/manager/dashboard"
    }
    else if(forSupervisor === true){
        accountType = "Supervisor"
        url = "/supervisor/dashboard"
    }
    return(
        <article className='authContainer'>
            <section className="logo">
                <img src={logo} alt="logo" />
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
                    <form>
                        <fieldset>
                            <input id="username" name="username" type="text" required placeholder='Username'/>
                            <input id="password" name="password" type={passwordType} required placeholder='Enter Your Password'/>
                            <FormControlLabel
                            value="showpassword"
                            control={<Checkbox />}
                            label={<span style={{fontSize: '0.8rem', color: "#8C91AA", marginLeft: '-0.5rem', fontFamily: 'Poppins' }}>Show Password</span>}
                            labelPlacement="end"
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 17 },marginTop: '-1rem'}}
                            onChange={()=>setForPassword(!forPassword)}
                            checked={forPassword}
                            />
                            
                            <Link to={url}><button type='submit'>Login</button></Link>
                        </fieldset>
                    </form>
                </div>
            </section>
        </article>
    )
}

export default ManagerSignIn;