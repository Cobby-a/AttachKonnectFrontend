import {faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import './manageUsers.css'
import './sidebar.css'
import axios from 'axios'
import Swal from 'sweetalert2'

const url = "https://attachmentkonnect.pythonanywhere.com/student/"


const AdminManageUsers = () => {
    const [showPassword, setShowPassword] = useState(false);

    let passwordType = "password"
    if(showPassword === true){
        passwordType = "text";
    }

        const [studentData, setStudentData] = useState({
            'student_id' :'',
            'password': '',
            'last_name': '',
            'other_names': '',
            'level': '',
            'programme': '',
        })
        const handleChange=(event)=>{
            setStudentData({
                ...studentData,
                [event.target.name]:event.target.value
            })
        }
        useEffect (()=>{
            document.title = "Admin Register-Student"
        })

        const onSaveStudent = () => {
                const newStudentData = new FormData();
                newStudentData.append("student_id", studentData.student_id)
                newStudentData.append("password", studentData.password)
                newStudentData.append("last_name", studentData.last_name)
                newStudentData.append("other_names", studentData.other_names)
                newStudentData.append("level", studentData.level)
                newStudentData.append("programme", studentData.programme)
    
                try{
                    axios.post(url, newStudentData)
                    .then((response)=>{
                        // setModalOpen(true);
                        setStudentData({
                            'student_id' :'',
                            'password' :'',
                            'last_name': '',
                            'other_names': '',
                            'level': '',
                            'programme': '',
                        });
                        window.location.href='/admin/applicantsboard'
                    })
                    .catch((error)=>{
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            Swal.fire({
                                title: 'Error',
                                text: `There was a ${error.response.status} bad request adding or updating the data`,
                                icon: 'error',
                                showCancelButton: true,
                                showConfirmButton: false,
                                cancelButtonText: 'Try Again',
                                cancelButtonColor: '#ff3333'
                              }).then((result)=>{
                                result.dismiss && window.location.reload()
                              })
                          } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
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
                            // Something happened in setting up the request that triggered an Error
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
                }catch(error){
                      console.log(error);
                }
            }
    
    return(
        <main className="adminManageUsersBody">
            <section className='mainContainer'>
                <article className='manageUserContainer'>
                    <h3 style={{fontSize: '1.2rem', fontFamily: 'Montserrat', marginTop: '-2.5rem', textTransform: 'uppercase', textAlign: 'center'}}>Add User Information</h3>
                    <div className='form'>
                        <div style={{display: 'flex', flexFlow: 'row wrap', columnGap:"5rem", }}>
                            <div style={{flex: 1}}>
                                <label>Student Id</label>
                                <div className='input'><input type='number' required name='student_id' onChange={handleChange}/></div>
                            </div>
                            <div style={{flex: 1}}>
                                <label>Password</label>
                                <div className='input' style={{display: 'flex', border: '1px solid #E6E6E6', borderRadius: "4px", alignItems: 'center', paddingRight: "8px"}}><input name='password' onChange={handleChange} type={passwordType} required style={{border: 'none'}}/><span><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{fontSize: '1rem', justifySelf: 'center', cursor: 'pointer' }} onClick={()=>setShowPassword(!showPassword)}/></span></div>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexFlow: 'row wrap', columnGap:"5rem", marginTop: "5rem"}}>
                            <div style={{flex: 1}}>
                                <label>Last Name</label>
                                <div className='input'><input type='text' required onChange={handleChange} name='last_name'/></div>
                            </div>
                            <div style={{flex: 1}}>
                                <label>Other Name(s)</label>
                                <div className='input'><input type='text' required onChange={handleChange} name='other_names'/></div>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexFlow: 'row wrap', columnGap:"5rem", marginTop: "5rem"}}>
                            <div style={{flex: 1}}>
                                <label>Level</label>
                                <div className='input'>
                                    <select name="level" id="level" onChange={handleChange} style={{cursor: 'pointer'}}>
                                        <option></option>
                                        <option value="1">Level 100</option>
                                        <option value="2">Level 200</option>
                                        <option value="3">Level 300</option>
                                        <option value="4">Level 400</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{flex: 1}}>
                                <label>Programme of study</label>
                                <div className='input'>
                                    <select name="programme" id="programme" onChange={handleChange} style={{cursor: 'pointer'}}>
                                        <option></option>
                                        <option value="1">BSc. Information Technology</option>
                                        <option value="2">BSc. Computer Science</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button type='submit' onClick={onSaveStudent}>Add User</button>
                    </div>
                </article>
            </section>
            <section className='MainContainer'>
            <article className='manageUserContainer'>
                    <h3 style={{fontSize: '1.2rem', fontFamily: 'Montserrat', marginTop: '2.5rem', textTransform: 'uppercase', textAlign: 'center'}}>Add User Information</h3>
                    <div className='form'>
                        <div className="formContainer">
                            <div style={{margin: 'auto'}}>
                                <label>Student Id</label>
                                <div className='input'><input type='number' required name='student_id' onChange={handleChange}/></div>
                            </div>
                            <div style={{margin: 'auto'}}>
                                <label>Password</label>
                                <div className='input' style={{display: 'flex', border: '1px solid #E6E6E6', borderRadius: "4px", alignItems: 'center', paddingRight: "8px"}}><input type={passwordType} required style={{border: 'none'}} name='password' onChange={handleChange}/><span><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{fontSize: '1rem', justifySelf: 'center', cursor: 'pointer' }} onClick={()=>setShowPassword(!showPassword)}/></span></div>
                            </div>
                        </div>
                        <div className="formContainer1">
                            <div style={{margin: 'auto', }}>
                                <label>Last Name</label>
                                <div className='input'><input type='text' required name='last_name' onChange={handleChange}/></div>
                            </div>
                            <div style={{margin: 'auto'}}>
                                <label>Other Name(s)</label>
                                <div className='input'><input type='text' required name='other_names' onChange={handleChange}/></div>
                            </div>
                        </div>
                        <div className="formContainer1">
                            <div style={{margin: 'auto', }}>
                                <label>Level</label>
                                <div className='input'>
                                    <select name="level" id="level" onChange={handleChange} style={{cursor: 'pointer'}}>
                                        <option></option>
                                        <option value="1">Level 100</option>
                                        <option value="2">Level 200</option>
                                        <option value="3">Level 300</option>
                                        <option value="4">Level 400</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{margin: 'auto'}}>
                                <label>Programme of study</label>
                                <div className='input'>
                                    <select name="programme" id="programme" onChange={handleChange} style={{cursor: 'pointer'}}>
                                        <option></option>
                                        <option value="1">BSc. Information Technology</option>
                                        <option value="2">BSc. Computer Science</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button type='submit' onClick={onSaveStudent}>Add User</button>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default AdminManageUsers;