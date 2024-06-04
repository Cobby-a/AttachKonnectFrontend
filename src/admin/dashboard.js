import './dashboard.css'
import profile from './assets/profile.png'
import welcome from './assets/welcome.png'
import comp from './assets/comp.svg'
import stats from './assets/stat.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faHouse, faBriefcase, faUserTie, faUserGear, faRightFromBracket, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const AdminDashboard = () => {
    const [menu, setMenu] = useState(false);
    return (
        <main className="adminBody">
            <header>
                <div className='profile'>
                    <img src={profile} alt="profile" />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>Solomon</h2>
                        <div className='hamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'Sidebar' : 'NonSidebar'}>
                            {/* <div style={{display: 'flex', justifyContent: 'space-between', justifyItems: 'center'}}> */}
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p>
                            {/* </div> */}
                            <div className='SidebarIcons'>
                                <div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%'}}/>Dashboard</div>
                                <div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div>
                                <div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div>
                                <div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div>
                                <div><FontAwesomeIcon icon={faUserGear} style={{paddingRight: '1rem', width: '10%'}}/>Manage Users</div>
                                <div><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                            </div>
                        </article>
                        </div>
                    </div>
                </div>
                <div className='welcome'>
                    <div>
                        <p>March 4, 2024</p>
                        <h3>Welcome back, Solomon!</h3>
                        <p>Always stay updated in your system’s portal</p>
                    </div>
                    <img src={welcome} alt="welcome" />
                </div>
                <div className='welcome1'>
                    <div>
                        <p>March 4, 2024</p>
                        <h3>Welcome back, Solomon!</h3>
                        <p>Always stay updated in your system’s portal</p>
                    </div>
                    <img src={welcome} alt="welcome" />
                </div>
            </header>
            <section className='mainContainer'>
                <article className='sidebar'>
                    <p style={{fontFamily: 'Segoe UI', marginTop: '-3rem', marginBottom: '3rem', marginLeft: '-1rem', fontWeight:'600',}}>Welcome to dashboard</p>
                    <div className='sidebarIcons'>
                        <div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%'}}/>Dashboard</div>
                        <div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div>
                        <div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div>
                        <div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div>
                        <div><FontAwesomeIcon icon={faUserGear} style={{paddingRight: '1rem', width: '10%'}}/>Manage Users</div>
                        <div><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                    </div>
                </article>
                <article className='mainContainer1'>
                    <div className='mainContainer2'>
                        <div className='mainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins'}}>Students on <br/>system</p>
                                <div style={{backgroundColor: '#925FE2', color: "#ffffff",  width:"72px", padding: "4px 16px", borderRadius: "16px", fontFamily: 'Poppins',  textAlign: 'center'}}>View</div>
                            </div>
                            <img src={comp} alt="Computer" />
                        </div>
                        <div className='mainContainer3' id='mainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins', paddingRight: '0.5rem'}}>Companies on system</p>
                                <div style={{backgroundColor: '#925FE2', color: "#ffffff", width:"72px", padding: "4px 16px", borderRadius: "16px", textAlign: 'center', fontFamily: 'Poppins'}}>View</div>
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
                                <div style={{backgroundColor: '#925FE2', color: "#ffffff",  width:"72px", padding: "4px 16px", borderRadius: "16px", fontFamily: 'Poppins',  textAlign: 'center'}}>View</div>
                            </div>
                            <img src={comp} alt="Computer" />
                        </div>
                        <div className='MainContainer3' id='MainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins', paddingRight: '0.6rem'}}>Companies on system</p>
                                <div style={{backgroundColor: '#925FE2', color: "#ffffff", width:"72px", padding: "4px 16px", borderRadius: "16px", textAlign: 'center', fontFamily: 'Poppins'}}>View</div>
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