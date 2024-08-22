import { faHouse, faBriefcase, faRightFromBracket, faBars, faXmark, faUser, faUserTie, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import './profile.css'
import './sidebar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import defaultProf from './assets/defaultProf.jpg'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const url = 'http://127.0.0.1:8000/manager/'
const managerId = localStorage.getItem('managerId');


const modStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '100%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 1,
    p: 4,
};

const ManagerProfile = () => {
    const [menu, setMenu] = useState(false);
    const [managerInfo, setManagerInfo] = useState([])
    const [modalOpen, setModalOpen] = useState(false)


    const onLogout = () =>{
        localStorage.removeItem('managerLoginStatus')
        window.location.href='/portal'
    }
    const onClosed = () => {
        setModalOpen(false);
        window.location.href='/manager/dashboard';
    }

    useEffect (()=>{
        document.title = "Profile"
        try{
            axios.get(url+managerId)
            .then((response)=>{
                setManagerInfo(response.data)
            })
        }
        catch(error){
            alert(error)
        }
    },[])

    let profile_pic1 = managerInfo.companyLogo

    if(managerInfo.companyLogo === null){
        profile_pic1 = defaultProf
    }

    return(
        <main className= {modalOpen ? "managerSignUp" : "managerSignUp1"} >
        <main className="managerProfileBody" style={{display: modalOpen ? "none" : "block",}}>
            <header>
                <div className='profile'>
                    <img src={profile_pic1} alt={managerInfo.companyName} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>{managerInfo.companyName}</h2>
                        <div className='hamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'Sidebar' : 'NonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                {/* <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p> */}
                            <div className='SidebarIcons'>
                                <Link to ="/manager/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                                <Link to ="/manager/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Your Vacancies</div></Link>
                                <Link to ="/manager/applicants-offer-status"><div><FontAwesomeIcon icon={faEnvelopeOpen} style={{paddingRight: '1rem', width: '10%'}}/>Applicants Status</div></Link>
                                <Link to ="/manager/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div></Link>
                                <Link to ="/manager/profile"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faUser} style={{paddingRight: '1rem', width: '10%'}}/>Profile</div></Link>
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
                        <Link to ="/manager/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/manager/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Your Vacancies</div></Link>
                        <Link to ="/manager/applicants-offer-status"><div><FontAwesomeIcon icon={faEnvelopeOpen} style={{paddingRight: '1rem', width: '10%'}}/>Applicants Status</div></Link>
                        <Link to ="/manager/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div></Link>
                        <Link to ="/manager/profile"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faUser} style={{paddingRight: '1rem', width: '10%'}}/>Profile</div></Link>
                        <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                    </div>
                </article>
                <article className='mainContainer1'>
                    <ManagerDeets setModalOpen={setModalOpen}/>
                </article>
            </section>
            <section className='MainContainer'>
                <article className='mainContainer1'>
                    <ManagerDeets setModalOpen={setModalOpen}/>
                </article>
            </section>
                <Modal
                    open={modalOpen}
                    onClose={()=>onClosed()}
                    aria-labelledby="title"
                    aria-describedby="description"                    
                >
                    <Box sx={modStyle} style={{maxWidth: '500px', width: '90%'}}>
                    <span style={{display: 'flex', justifyContent: 'flex-end'}}><FontAwesomeIcon onClick={()=>onClosed()} icon={faXmark} style={{fontSize: "32px", color: "#8F8F8F", cursor:'pointer',marginTop: "-1rem",}}/></span>   
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{fontFamily: 'Montserrat', padding: "1rem 1rem 1rem 1rem"}}>
                        Your updated Information on pending review. Changes will be made on the system after review.
                    </Typography>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}
                    </Box>
                </Modal>
        </main>
        </main>
    )
}

export default ManagerProfile;

const ManagerDeets = ({setModalOpen}) => {

    const [managerData, setManagerData] = useState({
        'companyName':"",
        'email':"",
        'ceo':"",
        'location':"",
        'durationOfExistence':"",
        'briefInfo':"",
        'companyLogo':"",
        'company_logo':"",
    })

    useEffect (()=>{
        try{
            axios.get(url+managerId)
            .then((response)=>{
                // setStudentInfo(response.data)
                setManagerData({
                    'companyName' : response.data.companyName,
                    'email' : response.data.email,
                    'ceo' : response.data.ceo,
                    'location' : response.data.location,
                    'durationOfExistence': response.data.durationOfExistence,
                    'briefInfo':response.data.briefInfo,
                    'companyLogo': response.data.companyLogo,
                    'company_logo' : '',
                })
            });
        }
        catch(error){
            console.log(error)
        }
    },[])

    const profileChange = ()=>{
        const managerD = new FormData();
        // studentD.append("student_id", studentId)
        managerD.append("companyName", managerData.companyName)
        managerD.append("email", managerData.email)
        managerD.append("ceo", managerData.ceo)
        managerD.append("location", managerData.location)
        managerD.append("durationOfExistence", managerData.durationOfExistence)
        managerD.append("briefInfo", managerData.briefInfo)
        if(managerData.company_logo !==''){
            managerD.append('companyLogo', managerData.company_logo, managerData.company_logo.name)
        }
        // studentD.append("level", studentData.level)
        // studentD.append("programme", studentData.programme)

        setButtonEnabled(false)
        setModalOpen(true);

        try{
            axios.post(url+'manager-change-profile/', managerD, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response)=>{
            })
        }catch(error){
            console.log(error)
        }
    }

    const handleChange = (event)=>{
        setManagerData({
            ...managerData,
            [event.target.name]:event.target.value
        })
    }

    const handleFileChange=(event)=>{
        setManagerData({
            ...managerData,
            [event.target.name]:event.target.files[0]
        })
    }

    let profile = managerData.companyLogo
    if (managerData.companyLogo === null){
        profile = defaultProf
    }
    const[onEdit, setOnEdit] = useState(false)
    const [buttonEnabled, setButtonEnabled] = useState(true)
    return(
        <div className='managerDeets1'>
            <div style={{width: "140px", height: "14px", borderRadius: "20px", backgroundColor: "#ffffff", margin: "0 auto 1rem auto"}}></div>
            <div style={{borderRadius: "20px", backgroundColor: "#ffffff", margin: "0 auto 1rem auto", padding: "5px", width: "150px"}}>
                <img src={profile} alt="profile" style={{width: "100%",borderRadius: "20px", height: "120px", objectFit: "cover", margin: "auto", textAlign: "center", display: "grid"}}/>
            </div>
            <div style={{marginTop: "1.6rem"}}>
                <p className='pTitle'>Company Name</p>
                {onEdit ? <div style={{ marginTop: '-1rem'}}><input style={{padding: "4px 5px 4px 5px", width: '250px',}} value={managerData.companyName} onChange={handleChange} name='companyName'/></div>:<p className='pBody'>{managerData.companyName}</p>}
            </div>
            <div>
                <p className='pTitle'>Email</p>
                {onEdit ? <div style={{ marginTop: '-1rem'}}><input style={{padding: "4px 5px 4px 5px", width: '250px',}} value={managerData.email} onChange={handleChange} name='email'/></div>:<p className='pBody'>{managerData.email}</p>}
            </div>
            <div>
                <p className='pTitle'>CEO</p>
                {onEdit ? <div style={{ marginTop: '-1rem'}}><input style={{padding: "4px 5px 4px 5px", width: '250px',}} value={managerData.ceo} onChange={handleChange} name='ceo'/></div>:<p className='pBody'>{managerData.ceo}</p>}
            </div>
            <div>
                <p className='pTitle'>Location</p>
                {onEdit ? <div style={{ marginTop: '-1rem'}}><input style={{padding: "4px 5px 4px 5px", width: '250px',}} value={managerData.location} onChange={handleChange} name='location'/></div>:<p className='pBody'>{managerData.location}</p>}
            </div>
            <div>
                <p className='pTitle'>Duration of Existence</p>
                {onEdit ? <div style={{ marginTop: '-1rem'}}><input style={{padding: "4px 5px 4px 5px", width: '250px',}} value={managerData.durationOfExistence} onChange={handleChange} name='durationOfExistence'/></div>:<p className='pBody'>{managerData.durationOfExistence}</p>}
            </div>
            <div>
                <p className='pTitle'>Brief Info about the company</p>
                {onEdit ? <div style={{ marginTop: '-1rem'}}><input style={{padding: "4px 5px 4px 5px", width: '250px',}} value={managerData.briefInfo} onChange={handleChange} name='briefInfo'/></div>:<p className='pBody'>{managerData.briefInfo}</p>}
            </div>
            {onEdit && <div>
                <p className='pTitle'>Change company logo?</p>
                <div style={{ marginTop: '-1rem'}}><input style={{ width: '250px',}} type='file' accept=".png, .jpg, .jpeg" name='company_logo' onChange={handleFileChange}/></div>
            </div>
            }
            {/* {studentData.profile_pic && <img src={studentData.profile_pic} alt="profile" style={{width: "140px", borderRadius: "20px", height: "120px", objectFit: "cover",}}/>} */}
            <div>
                {
                    onEdit?
                        <>
                        {buttonEnabled &&
                        <>
                            <button style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', marginRight: '8px'}} onClick={profileChange}>Save Changes</button>
                            <button style={{fontSize: '13px', backgroundColor: "#ff3333", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat'}} onClick={()=>setOnEdit(false)}>Cancel</button>
                        </>   
                        }
                        {!buttonEnabled &&
                        <>
                            <button style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', marginRight: '8px'}} disabled>Save Changes</button>
                            <button style={{fontSize: '13px', backgroundColor: "#ff3333", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat'}} disabled>Cancel</button>
                        </>   
                        }
                        </>
                        :
                        <button style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat'}} onClick={()=>setOnEdit(true)}>Edit Profile</button>
                }
            </div>
            <Link to="/manager/change-password" target="_blank"><button style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', marginTop: '8px'}}>Change Password?</button></Link>
        </div>
    )
}