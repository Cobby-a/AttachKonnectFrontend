import './dashboard.css'
import profile from './assets/profile.png'
import welcome from './assets/welcome.png'
import comp from './assets/comp.svg'
import stats from './assets/stat.svg'
import logoProfile from '../assets/profileLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faHouse, faBriefcase, faUserTie, faRightFromBracket, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'


// const adminId = localStorage.getItem('managerId');
const adminUserName = localStorage.getItem('adminUserName');

const AdminDashboard = () => {

    const onLogout = () =>{
        localStorage.removeItem('adminLoginStatus')
        window.location.href='/portal'
    }

    useEffect (()=>{
        document.title = "Admin Dashboard"
    })

    const [menu, setMenu] = useState(false);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    let month = months[d.getMonth()];
    let day = d.getDate();
    let year = d.getFullYear();
    return (
        <main className="adminBody">
            <header>
                <div className='profile'>
                    <img src={logoProfile} alt="profile" />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>{adminUserName}</h2>
                        <div className='hamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'Sidebar' : 'NonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p>
                            <div className='SidebarIcons'>
                                <Link to ="/admin/dashboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                                <Link to ="/admin/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                                <Link to ="/admin/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                                <Link to="/admin/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Students</div></Link>
                                {/* <Link to="/admin/manage-users"><div><FontAwesomeIcon icon={faUserGear} style={{paddingRight: '1rem', width: '10%'}}/>Manage Users</div></Link> */}
                                <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                            </div>
                            </article>
                        </div>
                    </div>
                </div>
                <div className='welcome'>
                    <div>
                        <p>{month} {day}, {year}</p>
                        <h3>Welcome back, {adminUserName}!</h3>
                        <p>Always stay updated in your system’s portal</p>
                    </div>
                    <img src={welcome} alt="welcome" />
                </div>
                <div className='welcome1'>
                    <div>
                        <p>{month} {day}, {year}</p>
                        <h3>Welcome back, {adminUserName}!</h3>
                        <p>Always stay updated in your system’s portal</p>
                    </div>
                    <img src={welcome} alt="welcome" />
                </div>
            </header>
            <section className='mainContainer'>
                <article className='sidebar'>
                    <p style={{fontFamily: 'Segoe UI', marginTop: '-3rem', marginBottom: '3rem', marginLeft: '-1rem', fontWeight:'600',}}>Welcome to dashboard</p>
                    <div className='sidebarIcons'>
                        <Link to ="/admin/dashboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/admin/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                        <Link to ="/admin/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                        <Link to="/admin/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Students</div></Link>
                        {/* <Link to="/admin/manage-users"><div><FontAwesomeIcon icon={faUserGear} style={{paddingRight: '1rem', width: '10%'}}/>Manage Users</div></Link> */}
                        <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                    </div>
                </article>
                <article className='mainContainer1'>
                    <div className='mainContainer2'>
                        <div className='mainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins'}}>Students on <br/>system</p>
                                <Link to="/admin/applicantsboard"><div style={{backgroundColor: '#925FE2', color: "#ffffff",  width:"72px", padding: "4px 16px", borderRadius: "16px", fontFamily: 'Poppins',  textAlign: 'center'}}>View</div></Link>
                            </div>
                            <img src={comp} alt="Computer" />
                        </div>
                        <div className='mainContainer3' id='mainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins', paddingRight: '0.5rem'}}>Companies on system</p>
                                <Link to ="/admin/companyboard"><div style={{backgroundColor: '#925FE2', color: "#ffffff", width:"72px", padding: "4px 16px", borderRadius: "16px", textAlign: 'center', fontFamily: 'Poppins'}}>View</div></Link>
                            </div>
                            <img src={stats} alt="Statistics" />
                        </div>
                    </div>
                    
                    <div className='supervisors'>
                        <h3 style={{textAlign: 'center', fontWeight: 600, paddingBottom: '3rem', marginTop: '-3rem' }}>Supervisors</h3>
                        <div>
                        <img src={profile} alt="profile" />
                        <img src={profile} alt="profile" />
                        <img src={profile} alt="profile" />
                        </div>
                        <h3 style={{textAlign: 'center', fontWeight: 600, marginTop: '0.7rem', cursor: 'pointer', color: '#925FE2', paddingLeft: '13.9rem', fontSize: '1.2rem' }}>See all</h3>

                    </div>
                </article>
            </section>

            <section className='MainContainer'>
                <article className='MainContainer1'>
                    <div className='MainContainer2'>
                        <div className='MainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins'}}>Students on <br/>system</p>
                                <Link to ="/admin/applicantsboard"><div style={{backgroundColor: '#925FE2', color: "#ffffff",  width:"72px", padding: "4px 16px", borderRadius: "16px", fontFamily: 'Poppins',  textAlign: 'center'}}>View</div></Link>
                            </div>
                            <img src={comp} alt="Computer" />
                        </div>
                        <div className='MainContainer3' id='MainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins', paddingRight: '0.6rem'}}>Companies on system</p>
                                <Link to="/admin/companyboard"><div style={{backgroundColor: '#925FE2', color: "#ffffff", width:"72px", padding: "4px 16px", borderRadius: "16px", textAlign: 'center', fontFamily: 'Poppins'}}>View</div></Link>
                            </div>
                            <img src={stats} alt="Statistics" />
                        </div>
                    </div>
                    
                    <div className='Supervisors'>
                        <h3 style={{textAlign: 'center', fontWeight: 600, paddingBottom: '2rem', }}>Supervisors</h3>
                        <div>
                        <img src={profile} alt="profile" />
                        <img src={profile} alt="profile" />
                        <img src={profile} alt="profile" />
                        </div>
                        <p style={{textAlign: 'center', marginTop: '0.5rem', cursor: 'pointer', color: '#925FE2', paddingLeft: '13.9rem', fontSize: '1.1rem' }}>See all</p>

                    </div>
                </article>
            </section>
        </main>
    )
}


export default AdminDashboard;