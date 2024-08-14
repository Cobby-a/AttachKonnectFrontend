import welcome from './assets/welcome.png'
import comp from './assets/comp.svg'
import stats from './assets/stat.svg'
import { faHouse, faBriefcase, faBuilding, faRightFromBracket, faBars, faXmark, faUser,} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import './dashboard.css'
import './sidebar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import defaultProf from './assets/defaultProf.jpg'

const url = "http://127.0.0.1:8000/student/"
const studentId = localStorage.getItem('studentId');


const StudentDashboard = () => {
    const [studentData, setStudentData] = useState([])

    const onLogout = () =>{
        localStorage.removeItem('studentLoginStatus')
        window.location.href='/portal'
    }

    useEffect (()=>{
        document.title = "Student Dashboard"
        try{
            axios.get(url+studentId)
            .then((response)=>{
                setStudentData(response.data)
            })
        }
        catch(error){
            alert(error)
        }
    },[])

    const [menu, setMenu] = useState(false);


    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    let month = months[d.getMonth()];
    let day = d.getDate();
    let year = d.getFullYear();

    let profile_pic = studentData.profile_pic

    if(studentData.profile_pic === null){
        profile_pic = defaultProf
    }
    return(
        <main className="studentBody">
            <header>
                <div className='profile'>
                    <img src={profile_pic} alt={studentData.last_name} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>{studentData.last_name}</h2>
                        <div className='hamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'Sidebar' : 'NonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p>
                            <div className='SidebarIcons'>
                                <Link to ="/student/dashboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                                <Link to ="/student/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                                <Link to ="/student/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                                <Link to ="/student/profile"><div><FontAwesomeIcon icon={faUser} style={{paddingRight: '1rem', width: '10%'}}/>Profile</div></Link>
                                <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                            </div>
                            </article>
                        </div>
                    </div>
                </div>
                <div className='welcome'>
                    <div>
                        <p>{month} {day}, {year}</p>
                        <h3>Welcome back, {studentData.last_name}!</h3>
                        <p>Always stay updated in your system’s portal</p>
                    </div>
                    <img src={welcome} alt="welcome" />
                </div>
                <div className='welcome1'>
                    <div>
                        <p>{month} {day}, {year}</p>
                        <h3>Welcome back, {studentData.last_name}!</h3>
                        <p>Always stay updated in your system’s portal</p>
                    </div>
                    <img src={welcome} alt="welcome" />
                </div>
            </header>
            <section className='mainContainer'>
                <article className='sidebar'>
                    <p style={{fontFamily: 'Segoe UI', marginTop: '-3rem', marginBottom: '3rem', marginLeft: '-1rem', fontWeight:'600',}}>Welcome to dashboard</p>
                    <div className='sidebarIcons'>
                        <Link to ="/student/dashboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/student/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                        <Link to ="/student/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                        <Link to ="/student/profile"><div><FontAwesomeIcon icon={faUser} style={{paddingRight: '1rem', width: '10%'}}/>Profile</div></Link>
                        <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                    </div>
                </article>
                <article className='mainContainer1'>
                    <div className='mainContainer2'>
                        <div className='mainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins'}}>View your Applied Internships</p>
                                <Link to="/student/your-applied-internships" target="_blank"><div style={{backgroundColor: '#925FE2', color: "#ffffff",  width:"72px", padding: "4px 16px", borderRadius: "16px", fontFamily: 'Poppins',  textAlign: 'center'}}>View</div></Link>
                            </div>
                            <img src={comp} alt="Computer" />
                        </div>
                        <div className='mainContainer3' id='mainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins', paddingRight: '0.5rem'}}>View your Internships</p>
                                <Link to ="/student/your-internships"><div style={{backgroundColor: '#925FE2', color: "#ffffff", width:"72px", padding: "4px 16px", borderRadius: "16px", textAlign: 'center', fontFamily: 'Poppins'}}>View</div></Link>
                            </div>
                            <img src={stats} alt="Statistics" />
                        </div>
                    </div>
                </article>
            </section>

            <section className='MainContainer'>
                <article className='MainContainer1'>
                    <div className='MainContainer2'>
                        <div className='MainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins'}}>View your Applied Internships</p>
                                <Link to ="/student/your-applied-internships"><div style={{backgroundColor: '#925FE2', color: "#ffffff",  width:"72px", padding: "4px 16px", borderRadius: "16px", fontFamily: 'Poppins',  textAlign: 'center'}}>View</div></Link>
                            </div>
                            <img src={comp} alt="Computer" />
                        </div>
                        <div className='MainContainer3' id='MainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins', paddingRight: '0.6rem'}}>View your Internships</p>
                                <Link to="/student/your-internships"><div style={{backgroundColor: '#925FE2', color: "#ffffff", width:"72px", padding: "4px 16px", borderRadius: "16px", textAlign: 'center', fontFamily: 'Poppins'}}>View</div></Link>
                            </div>
                            <img src={stats} alt="Statistics" />
                        </div>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default StudentDashboard;