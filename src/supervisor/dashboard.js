import welcome from './assets/welcome.png'
import comp from './assets/comp1.svg'
import stats from './assets/stat.svg'
import { faHouse, faBriefcase, faBuilding, faRightFromBracket, faBars, faXmark, faBell, faUserTie, faSquarePollVertical} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import './dashboard.css'
import './sidebar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import defaultProf from './assets/defaultProf.jpg'
import Swal from 'sweetalert2'

const url = "https://attachmentkonnect.pythonanywhere.com/supervisor/"
const staffId = localStorage.getItem('staffId');


const SupervisorDashboard = () => {
    const [supervisorData, setSupervisorData] = useState([])
    const [supervisorNotificationData, setSupervisorNotificationData] = useState([])


    const onLogout = () =>{
        localStorage.removeItem('supervisorLoginStatus')
        window.location.href='/portal'
    }

    useEffect (()=>{
        document.title = "Supervisor Dashboard"
        try{
            axios.get(url+staffId)
            .then((response)=>{
                setSupervisorData(response.data)
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
            alert(error)
        }
        try{
            axios.get(url+"supervisor-company-notification/")
            .then((response)=>{
                setSupervisorNotificationData(response.data)
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

    const [menu, setMenu] = useState(false);


    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    let month = months[d.getMonth()];
    let day = d.getDate();
    let year = d.getFullYear();

    let profile_pic = supervisorData.profile_pic

    if(supervisorData.profile_pic === null){
        profile_pic = defaultProf
    }

    let supervisorNotificationStat = true
    if(supervisorNotificationData.length < 1){
        supervisorNotificationStat = false;
    }

    const [showNotification, setShowNotification] = useState(false)

    return(
        <main className="supervisorBody">
            <header>
                <div className='profile'>
                    <img src={profile_pic} alt={supervisorData.last_name} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>{supervisorData.last_name}</h2>
                        <div className='hamMenu'>
                        <span><FontAwesomeIcon icon={faBell} style={{fontSize: '1.6rem', cursor: 'pointer', paddingRight: '0.8rem'}} onClick={()=>setShowNotification(!showNotification)}/>
                            {supervisorNotificationStat &&
                                <span className='dot1' style={{fontSize: '5rem', color: '#ff3333', position: 'absolute', top: '-36px', right: '61px', cursor: 'pointer'}} onClick={()=>setShowNotification(!showNotification)}>.</span>
                            }
                            {supervisorNotificationStat &&
                                <span className='dot2' style={{fontSize: '5rem', color: '#ff3333', position: 'absolute', top: '-56px', right: '52px', cursor: 'pointer'}} onClick={()=>setShowNotification(!showNotification)}>.</span>
                            }
                            {showNotification &&
                                <div className='not1' style={{width: '400px', boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", padding: '0.2rem', position: 'absolute', right: '70px', zIndex: '1', backgroundColor: '#fff', borderRadius: '2px'}}>
                                    {supervisorNotificationStat && supervisorNotificationData.map((data)=>{
                                        const {id, notText} = data
                                        return(
                                            <SupervisorNotify id={id} notText={notText} setSupervisorNotificationData={setSupervisorNotificationData}/>
                                        )
                                    })}
                                    {!supervisorNotificationStat && 
                                        <div style={{width: "100%", backgroundColor: "#DFCFF7",  borderRadius: '2px', padding: '0.3rem', fontSize: '13px', fontFamily: 'Montserrat', boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", cursor: 'pointer'}}>
                                            You have no alert
                                    </div>
                                    }
                                </div>
                            }
                            {showNotification &&
                                <div className='not2' style={{width: '80%', boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", padding: '0.2rem', position: 'absolute', right: '55px', zIndex: '1', backgroundColor: '#fff', borderRadius: '2px'}}>
                                    {supervisorNotificationStat && supervisorNotificationData.map((data)=>{
                                        const {id, notText} = data
                                        return(
                                            <SupervisorNotify id={id} notText={notText} setSupervisorNotificationData={setSupervisorNotificationData}/>
                                        )
                                    })}
                                    {!supervisorNotificationStat && 
                                        <div style={{width: "100%", backgroundColor: "#DFCFF7",  borderRadius: '2px', padding: '0.3rem', fontSize: '13px', fontFamily: 'Montserrat', boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", cursor: 'pointer'}}>
                                            You have no alert
                                    </div>
                                    }
                                </div>
                            }
                            </span>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.3rem', fontSize: '1.6rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'Sidebar' : 'NonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p>
                            <div className='SidebarIcons'>
                                <Link to ="/supervisor/dashboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                                <Link to ="/supervisor/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                                <Link to ="/supervisor/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                                <Link to="/supervisor/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Students</div></Link>
                                <Link to="/supervisor/intern-assessment"><div><FontAwesomeIcon icon={faSquarePollVertical} style={{paddingRight: '1rem', width: '10%'}}/>Intern Assessment</div></Link>
                                <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                            </div>
                            </article>
                        </div>
                    </div>
                </div>
                <div className='welcome'>
                    <div>
                        <p>{month} {day}, {year}</p>
                        <h3>Welcome, {supervisorData.last_name}!</h3>
                        <p>Always stay updated in your system’s portal</p>
                    </div>
                    <img src={welcome} alt="welcome" />
                </div>
                <div className='notBell' style={{alignSelf: 'center'}}>
                    <FontAwesomeIcon icon={faBell} style={{fontSize: '1.75rem',paddingLeft: '1rem',cursor: 'pointer',}} onClick={()=>setShowNotification(!showNotification)}/>
                    {supervisorNotificationStat &&
                        <span style={{fontSize: '5rem', color: '#ff3333', position: 'absolute', top: '20px', right: '46px', cursor: 'pointer'}} onClick={()=>setShowNotification(!showNotification)}>.</span>
                    }
                    {showNotification &&
                        <div style={{width: '400px', boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", padding: '0.2rem', position: 'absolute', right: '60px', zIndex: '1', backgroundColor: '#fff', borderRadius: '2px'}}>
                            {supervisorNotificationStat && supervisorNotificationData.map((data)=>{
                                const {id, notText} = data
                                return(
                                    <SupervisorNotify id={id} notText={notText} setSupervisorNotificationData={setSupervisorNotificationData}/>
                                )
                            })}
                            {!supervisorNotificationStat && 
                                <div style={{width: "100%", backgroundColor: "#DFCFF7",  borderRadius: '2px', padding: '0.3rem', fontSize: '13px', fontFamily: 'Montserrat', boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", cursor: 'pointer'}}>
                                    You have no alert
                            </div>
                            }
                        </div>
                    }
                </div>
                <div className='welcome1'>
                    <div>
                        <p>{month} {day}, {year}</p>
                        <h3>Welcome, {supervisorData.last_name}!</h3>
                        <p>Always stay updated in your system’s portal</p>
                    </div>
                    <img src={welcome} alt="welcome" />
                </div>
            </header>
            <section className='mainContainer'>
                <article className='sidebar'>
                    <p style={{fontFamily: 'Segoe UI', marginTop: '-3rem', marginBottom: '3rem', marginLeft: '-1rem', fontWeight:'600',}}>Welcome to dashboard</p>
                    <div className='sidebarIcons'>
                        <Link to ="/supervisor/dashboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/supervisor/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                        <Link to ="/supervisor/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                        <Link to="/supervisor/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Students</div></Link>
                        <Link to="/supervisor/intern-assessment"><div><FontAwesomeIcon icon={faSquarePollVertical} style={{paddingRight: '1rem', width: '10%'}}/>Intern Assessment</div></Link>
                        <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                    </div>
                </article>
                <article className='mainContainer1'>
                    <div className='mainContainer2'>
                        <div className='mainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins'}}>Students on <br/>system</p>
                                <Link to="/supervisor/applicantsboard"><div style={{backgroundColor: '#925FE2', color: "#ffffff",  width:"72px", padding: "4px 16px", borderRadius: "16px", fontFamily: 'Poppins',  textAlign: 'center'}}>View</div></Link>
                            </div>
                            <img src={comp} alt="Computer" />
                        </div>
                        <div className='mainContainer3' id='mainContainer3'>
                            <div>
                            <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins', paddingRight: '0.5rem'}}>Companies on system</p>
                                <Link to ="/supervisor/companyboard"><div style={{backgroundColor: '#925FE2', color: "#ffffff", width:"72px", padding: "4px 16px", borderRadius: "16px", textAlign: 'center', fontFamily: 'Poppins'}}>View</div></Link>
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
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins'}}>Students on <br/>system</p>
                                <Link to ="/supervisor/applicantsboard"><div style={{backgroundColor: '#925FE2', color: "#ffffff",  width:"72px", padding: "4px 16px", borderRadius: "16px", fontFamily: 'Poppins',  textAlign: 'center'}}>View</div></Link>
                            </div>
                            <img src={comp} alt="Computer" />
                        </div>
                        <div className='MainContainer3' id='MainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins', paddingRight: '0.6rem'}}>Companies on system</p>
                                <Link to="/supervisor/companyboard"><div style={{backgroundColor: '#925FE2', color: "#ffffff", width:"72px", padding: "4px 16px", borderRadius: "16px", textAlign: 'center', fontFamily: 'Poppins'}}>View</div></Link>
                            </div>
                            <img src={stats} alt="Statistics" />
                        </div>
                    </div>
                </article>
            </section>
        </main>
    )
}

const SupervisorNotify = ({id, notText, setSupervisorNotificationData}) =>{
    const onClear = () => {
        try{
            axios.delete(url+'supervisor-company-notification/'+id+'/')
            .then((response)=>{
                console.log(response)
                try{
                    axios.get(url+"supervisor-company-notification/")
                    .then((response)=>{
                        setSupervisorNotificationData(response.data)
                    })
                }
                catch(error){
                    console.log(error)
                }
            })
        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <div style={{width: "100%", backgroundColor: "#DFCFF7",  borderRadius: '2px', padding: '0.3rem', fontSize: '13px', fontFamily: 'Montserrat', boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", cursor: 'pointer'}}>
            <span onClick={()=>window.open('/supervisor/intern-assessment')} style={{cursor: 'pointer', fontSize: '13px', fontFamily: 'Montserrat',}}>{notText}</span>
            <br/>
            <span style={{cursor: 'pointer', textDecoration: 'underline', fontFamily: 'Montserrat', fontWeight: '600', fontSize: '12px', color: "#002D5D"}} onClick={onClear}>Clear</span>
        </div>
    )
}

export default SupervisorDashboard;