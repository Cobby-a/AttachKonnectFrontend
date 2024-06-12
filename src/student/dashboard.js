import profile from './assets/profile.png'
import profile1 from './assets/profile1.png'
import { faBuilding, faHouse, faBriefcase, faRightFromBracket, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import './dashboard.css'
import './sidebar.css'
import { Link } from 'react-router-dom'


const StudentDashboard = () => {
    const [menu, setMenu] = useState(false);
    return(
        <main className="studentDashboardBody">
            <header>
                <div className='profile'>
                    <img src={profile} alt="profile" />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>Eva</h2>
                        <div className='hamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'Sidebar' : 'NonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p>
                            <div className='SidebarIcons'>
                                <Link to ="/student/dashboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                                <Link to ="/student/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                                <Link to ="/student/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                                <Link to ="/portal"><div><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div></Link>
                            </div>
                            </article>
                        </div>
                    </div>
                </div>
            </header>
            <section className='mainContainer'>
                <article className='sidebar'>
                    <p style={{fontFamily: 'Segoe UI', marginTop: '-1rem', marginBottom: '3rem', marginLeft: '-1rem', fontWeight:'600',}}>Welcome to dashboard</p>
                    <div className='sidebarIcons'>
                        <Link to ="/student/dashboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/student/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                        <Link to ="/student/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                        <Link to ="/portal"><div><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div></Link>
                    </div>
                </article>
                <article className='mainContainer1'>
                    <div className='studentDeets1'>
                        <div style={{width: "140px", height: "14px", borderRadius: "20px", backgroundColor: "#ffffff", margin: "0 auto 1rem auto"}}></div>
                        <div style={{borderRadius: "20px", backgroundColor: "#ffffff", margin: "0 auto 1rem auto", padding: "10px", width: "150px"}}>
                            <img src={profile1} alt="profile" style={{width: "100px", height: "100px", objectFit: "cover", margin: "auto", textAlign: "center", display: "grid"}}/>
                        </div>
                        <div style={{marginTop: "1.6rem"}}>
                            <p className='pTitle'>First Name</p>
                            <p className='pBody'>Sefah</p>
                        </div>
                        <div>
                            <p className='pTitle'>Last Name</p>
                            <p className='pBody'>Ofori</p>
                        </div>
                        <div>
                            <p className='pTitle'>Contact</p>
                            <p className='pBody'>000000003109</p>
                        </div>
                        <div>
                            <p className='pTitle'>Company</p>
                            <p className='pBody'>Company Z</p>
                        </div>
                    </div>
                    <div className='studentDeets2'>
                        <div>
                            <p className='pTitle'>Contract Status</p>
                            <div style={{padding: "6px 0px", backgroundColor: "#DEEDE5", borderRadius: "4px", color: "#427A5B", width: "90px", textAlign: "center", marginTop : "-1rem", marginBottom: "3rem"}}>Verified</div>
                        </div>
                        <div>
                            <p className='pTitle'>E-mail</p>
                            <p className='pBody'>sefah@gmail.com</p>
                        </div>
                        <div>
                            <p className='pTitle' style={{marginTop: "2rem"}}>Skills</p>
                            <p className='pBody'>Full Stack web developer</p>
                            <p className='pBody'>Desired knowledge in programming</p>
                            <p className='pBody'>languages:</p>
                            <p className='pBody'>React</p>
                            <p className='pBody'>Node.Js</p>
                            <p className='pBody'>MySQL</p>
                        </div>
                    </div>
                    <div className='studentDeets3'>
                        <div>
                            <p className='pTitle'>Report Status</p>
                            <div style={{padding: "6px 0px", backgroundColor: "#FDF8CE", borderRadius: "4px", color: "#938406", width: "90px", textAlign: "center", marginTop : "-1rem", marginBottom: "3rem"}}>Pending</div>
                        </div>
                        <div>
                            <p className='pTitle'>Phone</p>
                            <p className='pBody'>81 99999-9999</p>
                        </div>
                        <div>
                            <p className='pTitle' style={{marginTop: "2rem"}}>Internship Activities</p>
                            <p className='pBody'>Develop full flow web applications</p>
                            <p className='pBody'>support bugs</p>
                            <p className='pBody'>support design</p>
                        </div>
                    </div>
                </article>
            </section>
            <section className='MainContainer'>
            <article className='mainContainer1'>
                    <div className='studentDeets1'>
                        <div style={{width: "140px", height: "14px", borderRadius: "20px", backgroundColor: "#ffffff", margin: "0 auto 1rem auto"}}></div>
                        <div style={{borderRadius: "20px", backgroundColor: "#ffffff", margin: "0 auto 1rem auto", padding: "10px", width: "150px"}}>
                            <img src={profile1} alt="profile" style={{width: "100px", height: "100px", objectFit: "cover", margin: "auto", textAlign: "center", display: "grid"}}/>
                        </div>
                        <div style={{marginTop: "1.6rem"}}>
                            <p className='pTitle'>First Name</p>
                            <p className='pBody'>Sefah</p>
                        </div>
                        <div>
                            <p className='pTitle'>Last Name</p>
                            <p className='pBody'>Ofori</p>
                        </div>
                        <div>
                            <p className='pTitle'>Contact</p>
                            <p className='pBody'>000000003109</p>
                        </div>
                        <div>
                            <p className='pTitle'>Company</p>
                            <p className='pBody'>Company Z</p>
                        </div>
                    </div>
                    <div className='studentDeets2'>
                        <div>
                            <p className='pTitle'>Contract Status</p>
                            <div style={{padding: "6px 0px", backgroundColor: "#DEEDE5", borderRadius: "4px", color: "#427A5B", width: "90px", textAlign: "center", marginTop : "-1rem", marginBottom: "1.5rem"}}>Verified</div>
                        </div>
                        <div>
                            <p className='pTitle'>E-mail</p>
                            <p className='pBody'>sefah@gmail.com</p>
                        </div>
                        <div>
                            <p className='pTitle' style={{marginTop: "1rem"}}>Skills</p>
                            <p className='pBody'>Full Stack web developer</p>
                            <p className='pBody'>Desired knowledge in programming</p>
                            <p className='pBody'>languages:</p>
                            <p className='pBody'>React</p>
                            <p className='pBody'>Node.Js</p>
                            <p className='pBody'>MySQL</p>
                        </div>
                    </div>
                    <div className='studentDeets3'>
                        <div>
                            <p className='pTitle'>Report Status</p>
                            <div style={{padding: "6px 0px", backgroundColor: "#FDF8CE", borderRadius: "4px", color: "#938406", width: "90px", textAlign: "center", marginTop : "-1rem", marginBottom: "2rem"}}>Pending</div>
                        </div>
                        <div>
                            <p className='pTitle'>Phone</p>
                            <p className='pBody'>81 99999-9999</p>
                        </div>
                        <div>
                            <p className='pTitle' style={{marginTop: "2rem"}}>Internship Activities</p>
                            <p className='pBody'>Develop full flow web applications</p>
                            <p className='pBody'>support bugs</p>
                            <p className='pBody'>support design</p>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default StudentDashboard;