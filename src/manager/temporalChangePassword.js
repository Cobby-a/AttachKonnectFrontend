import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import './temporalChangePassword.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';

const url = 'http://127.0.0.1:8000/manager/'
const managerId = localStorage.getItem('managerId');


const ManagerTemporalPasswordChange = () => {
    const [managerData, setManagerData] = useState([])
    const [managerPasswordData, setManagerPasswordData] = useState({
        'password' :'',
        'newPassword' :'',
        'confirmPassword': '',
    })
    const [passwordError, setPasswordError] = useState('')
    const [passwordNewError, setPasswordNewError] = useState('')
    const [passwordConfirmError, setPasswordConfirmError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [buttonEnabled, setButtonEnabled] = useState(true)

    const handleChange=(event)=>{
        setManagerPasswordData({
            ...managerPasswordData,
            [event.target.name]:event.target.value
        })
    }
    useEffect (()=>{
        document.title = "Manager Temporal Change Password"
        try{
            axios.get(url+managerId)
            .then((response)=>{
                setManagerData(response.data)
            })
            .catch((error)=>{
                if (error.response) {
                    Swal.fire({
                        title: 'Error',
                        text: `There was a ${error.response.status} bad request requesting for data`,
                        icon: 'error',
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonText: 'Try Again',
                        cancelButtonColor: '#ff3333'
                      }).then((result)=>{
                        result.dismiss && window.location.reload()
                      })
                  } else if (error.request) {
                    Swal.fire({
                        title: 'Error',
                        text: `No response was received from the server.`,
                        icon: 'error',
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonText: 'Try Again',
                        cancelButtonColor: '#ff3333'
                      }).then((result)=>{
                        result.dismiss && window.location.reload()
                      })
                  } else {
                    Swal.fire({
                        title: 'Error',
                        text: `Error!`,
                        icon: 'error',
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonText: 'Try Again',
                        cancelButtonColor: '#ff3333'
                      }).then((result)=>{
                        result.dismiss && window.location.reload()
                      })
                  }
            })
        }
        catch(error){
            console.log(error)
        }
    },[])

    let passwordType = "password"
    let passwordNewType = "password"
    let passwordConfirmType = "password"

    if(showPassword === true){
        passwordType = "text";
    }
    if(showNewPassword === true){
        passwordNewType = "text";
    }
    if(showConfirmPassword === true){
        passwordConfirmType = "text";
    }

    const onChangePassword = () => {
        const managerTemporalPasswordData = new FormData();
        managerTemporalPasswordData.append("password", managerPasswordData.newPassword)

        if(managerPasswordData.password !== managerData.password){
            setPasswordError("Invalid Password")
            return;
        }
        else if(managerPasswordData.password === managerData.password){
            setPasswordError("")
        }
        if(managerPasswordData.newPassword === managerData.password){
            setPasswordNewError("New Password cannot be the same as the old password")
            return;
        }
        else if(managerPasswordData.newPassword !== managerData.password){
            setPasswordNewError("")
        }
        if(managerPasswordData.newPassword.length < 8){
            setPasswordNewError("Password should be more than 8 characters")
            return;
        }
        else if(managerPasswordData.newPassword.length >= 8){
            setPasswordNewError("")
        }
        if(managerPasswordData.confirmPassword !== managerPasswordData.newPassword){
            setPasswordConfirmError("Password should be the same as the new password")
            return;
        }
        else if(managerPasswordData.confirmPassword === managerPasswordData.newPassword){
            setPasswordConfirmError("")
        }
        if(managerPasswordData.password === managerData.password && managerPasswordData.newPassword !== managerData.password && managerPasswordData.newPassword.length >= 8 && managerPasswordData.confirmPassword === managerPasswordData.newPassword){

            setButtonEnabled(false)

            try{
                axios.patch(url+managerId, managerTemporalPasswordData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                .then((response)=>{
                    console.log(response)
                    window.location.href='/portal'
                })
                .catch((error)=>{
                    if (error.response) {
                        Swal.fire({
                            title: 'Error',
                            text: `There was a ${error.response.status} bad request adding or updating the data`,
                            icon: 'error',
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonText: 'Try Again',
                            cancelButtonColor: '#ff3333'
                          })
                      } else if (error.request) {
                        Swal.fire({
                            title: 'Error',
                            text: `No response was received from the server.`,
                            icon: 'error',
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonText: 'Try Again',
                            cancelButtonColor: '#ff3333'
                          })
                      } else {
                        Swal.fire({
                            title: 'Error',
                            text: `Error!`,
                            icon: 'error',
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonText: 'Try Again',
                            cancelButtonColor: '#ff3333'
                          })
                      }
                })
            }
            catch(error){
                console.log(error)
            }
    }
    }
    return(
        <main>
        <article className='managerTemporalPasswordChangeBody' >
            <section className='manageUserContainer'>
                <div style={{display: 'flex', justifyContent:'space-between',}}>
                    <p style={{fontFamily: 'Montserrat', fontWeight: "600", textTransform:'uppercase', fontSize: "1.2rem", alignContent: 'center', alignSelf: 'center'}}>Change Temporal Password</p>
                    <Link to="/portal"><FontAwesomeIcon icon={faXmark} style={{fontSize: "32px", color: "#8F8F8F", cursor:'pointer',marginTop: "-0.5rem"}}/></Link>
                </div>
                <div className='form'>
                    <div className="formContainer1">
                        <div style={{flex: 1}}>
                            <label>Password</label>
                            <div className='input' style={{display: 'flex', border: '1px solid #E6E6E6', borderRadius: "4px", alignItems: 'center', paddingRight: "8px"}}><input type={passwordType} required name='password' value={managerPasswordData.password} onChange={handleChange} style={{border: 'none'}}/><span><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{fontSize: '1rem', justifySelf: 'center', cursor: 'pointer' }} onClick={()=>setShowPassword(!showPassword)}/></span></div>
                            {passwordError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{passwordError}</p>}
                        </div>
                    </div>
                    <div className="formContainer1">
                        <div style={{flex: 1}}>
                            <label>New Password</label>
                            <div className='input' style={{display: 'flex', border: '1px solid #E6E6E6', borderRadius: "4px", alignItems: 'center', paddingRight: "8px"}}><input type={passwordNewType} required name='newPassword' value={managerPasswordData.newPassword} onChange={handleChange} style={{border: 'none'}}/><span><FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} style={{fontSize: '1rem', justifySelf: 'center', cursor: 'pointer' }} onClick={()=>setShowNewPassword(!showNewPassword)}/></span></div>
                            {passwordNewError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{passwordNewError}</p>}
                        </div>
                    </div>
                    <div className="formContainer1">
                        <div style={{flex: 1}}>
                            <label>Confirm Password</label>
                            <div className='input' style={{display: 'flex', border: '1px solid #E6E6E6', borderRadius: "4px", alignItems: 'center', paddingRight: "8px"}}><input type={passwordConfirmType} required name='confirmPassword' value={managerPasswordData.confirmPassword} onChange={handleChange} style={{border: 'none'}}/><span><FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} style={{fontSize: '1rem', justifySelf: 'center', cursor: 'pointer' }} onClick={()=>setShowConfirmPassword(!showConfirmPassword)}/></span></div>
                            {passwordConfirmError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{passwordConfirmError}</p>}
                        </div>
                    </div>
                    {buttonEnabled &&
                    <button type='submit' onClick={onChangePassword}>Modify Password</button>
                    }
                    {!buttonEnabled &&
                    <button type='submit' disabled>Modify Password</button>
                    }
                </div>
            </section>
        </article>
        </main>
    )
}

export default ManagerTemporalPasswordChange;