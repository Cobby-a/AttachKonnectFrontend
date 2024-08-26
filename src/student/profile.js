import { faBuilding, faHouse, faBriefcase, faRightFromBracket, faBars, faXmark, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import './profile.css'
import './sidebar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import defaultProf from './assets/defaultProf.jpg'
import Swal from 'sweetalert2'

const url = 'http://127.0.0.1:8000/student/'
const studentId = localStorage.getItem('studentId');


const StudentProfile = () => {
    const [menu, setMenu] = useState(false);
    const [studentInfo, setStudentInfo] = useState([])

    const onLogout = () =>{
        localStorage.removeItem('studentLoginStatus')
        window.location.href='/portal'
    }

    useEffect (()=>{
        document.title = "Profile"
        try{
            axios.get(url+studentId)
            .then((response)=>{
                setStudentInfo(response.data)
            })
            .catch((error)=>{
                if (error.response) {
                    Swal.fire({
                        title: 'Error',
                        text: `There was a ${error.response.status} bad request requesting for the data`,
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
            alert(error)
        }
    },[])

    let profile_pic1 = studentInfo.profile_pic

    if(studentInfo.profile_pic === null){
        profile_pic1 = defaultProf
    }

    return(
        <main className="studentProfileBody">
            <header>
                <div className='profile'>
                    <img src={profile_pic1} alt={studentInfo.last_name} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>{studentInfo.last_name}</h2>
                        <div className='hamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'Sidebar' : 'NonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                {/* <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p> */}
                            <div className='SidebarIcons'>
                                <Link to ="/student/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                                <Link to ="/student/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                                <Link to ="/student/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                                <Link to ="/student/profile"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faUser} style={{paddingRight: '1rem', width: '10%'}}/>Profile</div></Link>
                                <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                            </div>
                            </article>
                        </div>
                    </div>
                </div>
            </header>
            <section className='mainContainer'>
                <article className='sidebar'>
                    {/* <p style={{fontFamily: 'Segoe UI', marginTop: '-1rem', marginBottom: '3rem', marginLeft: '-1rem', fontWeight:'600',}}>Welcome to dashboard</p> */}
                    <div className='sidebarIcons'>
                        <Link to ="/student/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/student/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                        <Link to ="/student/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                        <Link to ="/student/profile"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faUser} style={{paddingRight: '1rem', width: '10%'}}/>Profile</div></Link>
                        <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                    </div>
                </article>
                <article className='mainContainer1'>
                    <StudentDeets/>
                </article>
            </section>
            <section className='MainContainer'>
                <article className='mainContainer1'>
                    <StudentDeets/>
                </article>
            </section>
        </main>
    )
}

export default StudentProfile;

const StudentDeets = () => {

    const [studentData, setStudentData] = useState({
        'last_name' : '',
        'other_names' : '',
        'email' : '',
        'phone_number' : '',
        'prev_profile_pic': '',
        'profile_pic' : '',
        'level':'',
        'programme':'',
    })

    useEffect (()=>{
        try{
            axios.get(url+studentId)
            .then((response)=>{
                // setStudentInfo(response.data)
                setStudentData({
                    'last_name' : response.data.last_name,
                    'other_names' : response.data.other_names,
                    'email' : response.data.email,
                    'phone_number' : response.data.phone_number,
                    'prev_profile_pic': response.data.profile_pic,
                    'profile_pic' : '',
                    'level':response.data.level,
                    'programme':response.data.programme
                })
            })
            .catch((error)=>{
                if (error.response) {
                    Swal.fire({
                        title: 'Error',
                        text: `There was a ${error.response.status} bad request requesting for the data`,
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

    const profileChange = ()=>{
        const studentD = new FormData();
        // studentD.append("student_id", studentId)
        studentD.append("last_name", studentData.last_name)
        studentD.append("other_names", studentData.other_names)
        studentD.append("email", studentData.email)
        studentD.append("phone_number", studentData.phone_number)
        if(studentData.profile_pic !==''){
            studentD.append('profile_pic', studentData.profile_pic, studentData.profile_pic.name)
        }
        // studentD.append("level", studentData.level)
        // studentD.append("programme", studentData.programme)

        try{
            axios.patch(url+studentId, studentD, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response)=>{
                window.location.reload()
            })
            .catch((error)=>{
                if (error.response) {
                    Swal.fire({
                        title: 'Error',
                        text: `There was a ${error.response.status} bad request updating the data`,
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
        }catch(error){
            console.log(error)
        }
    }

    const handleChange = (event)=>{
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.value
        })
    }

    const handleFileChange=(event)=>{
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.files[0]
        })
    }

    let profile = studentData.prev_profile_pic
    if (studentData.prev_profile_pic === null){
        profile = defaultProf
    }
    const[onEdit, setOnEdit] = useState(false)
    return(
        <div className='studentDeets1'>
            <div style={{width: "140px", height: "14px", borderRadius: "20px", backgroundColor: "#ffffff", margin: "0 auto 1rem auto"}}></div>
            <div style={{borderRadius: "20px", backgroundColor: "#ffffff", margin: "0 auto 1rem auto", padding: "5px", width: "150px"}}>
                <img src={profile} alt="profile" style={{width: "100%",borderRadius: "20px", height: "120px", objectFit: "cover", margin: "auto", textAlign: "center", display: "grid"}}/>
            </div>
            <div style={{marginTop: "1.6rem"}}>
                <p className='pTitle'>Last Name</p>
                {onEdit ? <div style={{ marginTop: '-1rem'}}><input style={{padding: "4px 5px 4px 5px", width: '250px',}} value={studentData.last_name} onChange={handleChange} name='last_name'/></div>:<p className='pBody'>{studentData.last_name}</p>}
            </div>
            <div>
                <p className='pTitle'>Other Name(s)</p>
                {onEdit ? <div style={{ marginTop: '-1rem'}}><input style={{padding: "4px 5px 4px 5px", width: '250px',}} value={studentData.other_names} onChange={handleChange} name='other_names'/></div>:<p className='pBody'>{studentData.other_names}</p>}
            </div>
            <div>
                <p className='pTitle'>Contact</p>
                {onEdit ? <div style={{ marginTop: '-1rem'}}><input style={{padding: "4px 5px 4px 5px", width: '250px',}} value={studentData.phone_number} onChange={handleChange} name='phone_number'/></div>:<p className='pBody'>{studentData.phone_number}</p>}
            </div>
            <div>
                <p className='pTitle'>Email</p>
                {onEdit ? <div style={{ marginTop: '-1rem'}}><input style={{padding: "4px 5px 4px 5px", width: '250px',}} value={studentData.email} onChange={handleChange} name='email'/></div>:<p className='pBody'>{studentData.email}</p>}
            </div>
            {onEdit && <div>
                <p className='pTitle'>Change profile pic?</p>
                <div style={{ marginTop: '-1rem'}}><input style={{ width: '250px',}} type='file' accept=".png, .jpg, .jpeg" name='profile_pic' onChange={handleFileChange}/></div>
            </div>
            }
            {/* {studentData.profile_pic && <img src={studentData.profile_pic} alt="profile" style={{width: "140px", borderRadius: "20px", height: "120px", objectFit: "cover",}}/>} */}
            <div>
                {
                    onEdit?
                        <>
                            <button style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', marginRight: '8px'}} onClick={profileChange}>Save Changes</button>
                            <button style={{fontSize: '13px', backgroundColor: "#ff3333", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat'}} onClick={()=>setOnEdit(false)}>Cancel</button>
                        </>
                        :
                        <button style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat'}} onClick={()=>setOnEdit(true)}>Edit Profile</button>
                }
            </div>
        </div>
    )
}