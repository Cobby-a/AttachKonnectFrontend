import welcome from './assets/welcome.png'
import comp from './assets/comp.svg'
import stats from './assets/stat.svg'
import { faHouse, faBriefcase, faUserTie, faRightFromBracket, faBars, faXmark, faBell,} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import './dashboard.css'
import './sidebar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import defaultProf from './assets/defaultProf.jpg'


const url = "http://127.0.0.1:8000/manager/"
const managerId = localStorage.getItem('managerId');

const ManagerDashboard = () => {

    const [managerData, setManagerData] = useState([])
    const [managerNotificationData, setManagerNotificationData] = useState([])

    const onLogout = () =>{
        localStorage.removeItem('managerLoginStatus')
        window.location.href='/portal'
    }

    useEffect (()=>{
        document.title = "Manager Dashboard"
        try{
            axios.get(url+managerId)
            .then((response)=>{
                setManagerData(response.data)
            })
        }
        catch(error){
            alert(error)
        }
        try{
            axios.get(url+"company-student-notification-list/"+managerId)
            .then((response)=>{
                setManagerNotificationData(response.data)
            })
        }
        catch(error){
            alert(error)
        }
    },[])

    let company_pic = managerData.companyLogo

    if(managerData.companyLogo === null){
        company_pic = defaultProf
    }

    const [menu, setMenu] = useState(false);


    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    let month = months[d.getMonth()];
    let day = d.getDate();
    let year = d.getFullYear();

    let managerNotificationStat = true
    if(managerNotificationData.length < 1){
        managerNotificationStat = false;
    }

    const [showNotification, setShowNotification] = useState(false)

    return(
        <main className="managerBody">
            <header>
                <div className='profile'>
                    <img src={company_pic} alt={managerData.companyName} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>{managerData.companyName}</h2>
                        <div className='hamMenu'>
                            <span><FontAwesomeIcon icon={faBell} style={{fontSize: '1.6rem', cursor: 'pointer', paddingRight: '0.8rem'}}/>
                                <span className='dot1' style={{fontSize: '5rem', color: '#ff3333', position: 'absolute', top: '-38px', right: '58px'}}>.</span>
                                <span className='dot2' style={{fontSize: '5rem', color: '#ff3333', position: 'absolute', top: '-56px', right: '50px'}}>.</span>
                            </span>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{fontSize: '1.6rem',paddingRight: '0.2rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'Sidebar' : 'NonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p>
                            <div className='SidebarIcons'>
                                <Link to ="/manager/dashboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                                <Link to ="/manager/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Your Vacancies</div></Link>
                                <div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div>
                                <Link to ="/manager/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div></Link>
                                <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                            </div>
                            </article>
                        </div>
                    </div>
                </div>
                <div className='welcome'>
                    <div>
                        <p style={{marginTop: '8px'}}>{month} {day}, {year}</p>
                        <h3 style={{marginTop: '-2px'}}>Welcome back, {managerData.companyName}!</h3>
                        <p style={{paddingTop: '10px'}}>Always stay updated in your system’s portal</p>
                    </div>
                    <img src={welcome} alt="welcome" />
                </div>
                <div className='notBell' style={{alignSelf: 'center'}}>
                    <FontAwesomeIcon icon={faBell} style={{fontSize: '1.75rem',paddingLeft: '1rem',cursor: 'pointer',}} onClick={()=>setShowNotification(!showNotification)}/>
                    {managerNotificationStat &&
                        <span style={{fontSize: '5rem', color: '#ff3333', position: 'absolute', top: '25px', right: '45px', cursor: 'pointer'}} onClick={()=>setShowNotification(!showNotification)}>.</span>
                    }
                    {showNotification &&
                        <div style={{width: '400px', boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", padding: '0.2rem', position: 'absolute', right: '60px', zIndex: '1', backgroundColor: '#fff', borderRadius: '2px'}}>
                            {managerNotificationStat && managerNotificationData.map((data)=>{
                                const {id, notText} = data
                                return(
                                    <ManagerNotify id={id} notText={notText} setManagerNotificationData={setManagerNotificationData}/>
                                )
                            })}
                            {!managerNotificationStat && 
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
                        <h3>Welcome back, {managerData.companyName}!</h3>
                        <p>Always stay updated in your system’s portal</p>
                    </div>
                    <img src={welcome} alt="welcome" />
                </div>
            </header>
            <section className='mainContainer'>
                <article className='sidebar'>
                    <p style={{fontFamily: 'Segoe UI', marginTop: '-3rem', marginBottom: '3rem', marginLeft: '-1rem', fontWeight:'600',}}>Welcome to dashboard</p>
                    <div className='sidebarIcons'>
                        <Link to ="/manager/dashboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/manager/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Your Vacancies</div></Link>
                        <div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div>
                        <Link to ="/manager/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div></Link>
                        <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                    </div>
                </article>
                <article className='mainContainer1'>
                    <div className='mainContainer2'>
                        <div className='mainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins'}}>New vacancy? <br/>Create new one</p>
                                <Link to="/manager/create-vacancy"><div style={{backgroundColor: '#925FE2', color: "#ffffff",  width:"86px", padding: "4px 4px", borderRadius: "16px", fontFamily: 'Poppins',  textAlign: 'center'}}>Create</div></Link>
                            </div>
                            <img src={comp} alt="Computer" />
                        </div>
                        <div className='mainContainer3' id='mainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins', paddingRight: '0.5rem'}}>View your vacancies</p>
                                <Link to ="/manager/vacancyboard"><div style={{backgroundColor: '#925FE2', color: "#ffffff", width:"72px", padding: "4px 16px", borderRadius: "16px", textAlign: 'center', fontFamily: 'Poppins'}}>View</div></Link>
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
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins'}}>New vacancy? <br/>Create new one</p>
                                <Link to ="/manager/create-vacancy"><div style={{backgroundColor: '#925FE2', color: "#ffffff",  width:"86px", padding: "4px 4px", borderRadius: "16px", fontFamily: 'Poppins',  textAlign: 'center'}}>Create</div></Link>
                            </div>
                            <img src={comp} alt="Computer" />
                        </div>
                        <div className='MainContainer3' id='MainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins', paddingRight: '0.6rem'}}>View your vacancies</p>
                                <Link to="/manager/vacancyboard"><div style={{backgroundColor: '#925FE2', color: "#ffffff", width:"72px", padding: "4px 16px", borderRadius: "16px", textAlign: 'center', fontFamily: 'Poppins'}}>View</div></Link>
                            </div>
                            <img src={stats} alt="Statistics" />
                        </div>
                    </div>
                </article>
            </section>
        </main>
    )
}


const ManagerNotify = ({id, notText, setManagerNotificationData}) =>{
    const onClear = () => {
        try{
            axios.delete(url+'company-student-notification/'+id+'/')
            .then((response)=>{
                console.log(response)
                try{
                    axios.get(url+"company-student-notification-list/"+managerId)
                    .then((response)=>{
                        setManagerNotificationData(response.data)
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
            {notText}<br/>
            <span style={{cursor: 'pointer', textDecoration: 'underline', fontFamily: 'Montserrat', fontWeight: '600', fontSize: '12px', color: "#002D5D"}} onClick={onClear}>Clear</span>
        </div>
    )
}
export default ManagerDashboard;