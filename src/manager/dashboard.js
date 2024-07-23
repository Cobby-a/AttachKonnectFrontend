import profile from './assets/profile.png'
import welcome from './assets/welcome.png'
import comp from './assets/comp.svg'
import stats from './assets/stat.svg'
import { faBuilding, faHouse, faBriefcase, faUserTie, faRightFromBracket, faBars, faXmark, faMagnifyingGlass, faPen, faClipboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import './dashboard.css'
import './sidebar.css'
import { data1 } from './manageData'
import { Link } from 'react-router-dom'


const ManagerDashboard = () => {

    const onLogout = () =>{
        localStorage.removeItem('managerLoginStatus')
        window.location.href='/portal'
    }

    useEffect (()=>{
        document.title = "Manager Dashboard"
    },[])

    const [menu, setMenu] = useState(false);

    const numbers = [
        {id : 1},
        {id : 2},
        {id : 3},
        {id : 4},
        {id : 5},
        {id : 6},
        {id : 7},
    ]

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    let month = months[d.getMonth()];
    let day = d.getDate();
    let year = d.getFullYear();

    return(
        <main className="managerBody">
            <header>
                <div className='profile'>
                    <img src={profile} alt="profile" />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>Solomon</h2>
                        <div className='hamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
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
                        <p>{month} {day}, {year}</p>
                        <h3>Welcome back, Solomon!</h3>
                        <p>Always stay updated in your system’s portal</p>
                    </div>
                    <img src={welcome} alt="welcome" />
                </div>
                <div className='welcome1'>
                    <div>
                        <p>{month} {day}, {year}</p>
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
                    
                    {/* <div className='supervisors'>
                        <h3 style={{textAlign: 'center', fontWeight: 600, paddingBottom: '3rem', marginTop: '-3rem' }}>Supervisors</h3>
                        <div>
                        <img src={profile} alt="profile" />
                        <img src={profile} alt="profile" />
                        <img src={profile} alt="profile" />
                        </div>
                        <h3 style={{textAlign: 'center', fontWeight: 600, marginTop: '0.7rem', cursor: 'pointer', color: '#925FE2', paddingLeft: '13.9rem', fontSize: '1.2rem' }}>See all</h3>

                    </div> */}
                </article>
            </section>

            <section className='MainContainer'>
                <article className='MainContainer1'>
                    <div className='MainContainer2'>
                        <div className='MainContainer3'>
                            <div>
                                <p style={{color: "#925EF2", fontWeight: 'bold', fontFamily: 'Poppins'}}>New vacancy? <br/>Create new one</p>
                                <Link to ="/manager/create-vacancy"><div style={{backgroundColor: '#925FE2', color: "#ffffff",  width:"72px",  borderRadius: "16px", fontFamily: 'Poppins',  textAlign: 'center'}}>Create</div></Link>
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
                    
                    {/* <div className='Supervisors'>
                        <h3 style={{textAlign: 'center', fontWeight: 600, paddingBottom: '2rem', }}>Supervisors</h3>
                        <div>
                        <img src={profile} alt="profile" />
                        <img src={profile} alt="profile" />
                        <img src={profile} alt="profile" />
                        </div>
                        <p style={{textAlign: 'center', marginTop: '0.5rem', cursor: 'pointer', color: '#925FE2', paddingLeft: '13.9rem', fontSize: '1.1rem' }}>See all</p>

                    </div> */}
                </article>
            </section>
        </main>
        // <main className="managerDashboardBody">
        //     <header>
        //         <div className='profile'>
        //             <img src={profile} alt="profile" />
        //             <div style={{display: 'flex', justifyContent: 'space-between'}}>
        //                 <h2 style={{alignSelf: 'center'}}>Hiring Manager</h2>
        //                 <div className='hamMenu'>
        //                     <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
        //                     <article className={menu ? 'Sidebar' : 'NonSidebar'}>
        //                         <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
        //                         <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p>
        //                     <div className='SidebarIcons'>
        //                         <Link to ="/manager/dashboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
        //                         <Link to ="/manager/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
        //                         <div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div>
        //                         <Link to ="/manager/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div></Link>
        //                         <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
        //                     </div>
        //                     </article>
        //                 </div>
        //             </div>
        //         </div>
        //     </header>
        //     <section className='mainContainer'>
        //         <article className='sidebar'>
        //             <p style={{fontFamily: 'Segoe UI', marginTop: '-3rem', marginBottom: '3rem', marginLeft: '-1rem', fontWeight:'600',}}>Welcome to dashboard</p>
        //             <div className='sidebarIcons'>
        //                 <Link to ="/manager/dashboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
        //                 <Link to ="/manager/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
        //                 <div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div>
        //                 <Link to ="/manager/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div></Link>
        //                 <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
        //             </div>
        //         </article>
        //         <article className="mainDashboardBody">
        //             <div className='dashboardSearch'>
        //                 <div>
        //                     <p style={{ fontSize: '1.2rem', marginBottom: '0.4rem', fontFamily: 'Poppins'}}>All Interns</p>
        //                     <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>Monitor interns, their contracts and reports.</p>
        //                 </div>
        //                 <form>
        //                     <span><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '1.2rem', padding: "10px 10px 10px 14px", color: '#4C4C4C' }}/></span><input type='search' name='searchApplicants' placeholder='Search Intern'/>
        //                 </form>
        //             </div>
        //             <div className='table'>
        //             <table className="dashboarddeets">
        //             <thead>
        //             <tr>
        //                 <th style={{paddingLeft: '1rem'}}>Intern</th>
        //                 <th>Contract status</th>
        //                 <th>Report Status</th>
        //                 <th>Vacancy</th>
        //                 <th>Company</th>
        //                 <th></th>
        //                 <th></th>
        //             </tr>
        //             </thead>
        //             <tbody>
        //             {data1.map((data)=>{
        //                 const {id, intern, contactStatus, reportStatus, vacancy, company} = data;
        //                 let classname = "verified";

        //                 if(contactStatus === 'Pending'){
        //                     classname = "pending"
        //                 }

        //                 if(reportStatus === 'Pending'){
        //                     classname = "pending"
        //                 }

        //                 return(
        //                     <tr key={id}>
        //                         <td style={{paddingLeft: '1rem'}}>{intern}</td>
        //                         <td><span className={classname}>{contactStatus}</span></td>
        //                         <td><span className={classname}>{reportStatus}</span></td>
        //                         <td>{vacancy}</td>
        //                         <td>{company}</td>
        //                         <td>
        //                             <span style={{ cursor: 'pointer'}}>
        //                                 <FontAwesomeIcon icon={faPen} style={{fontSize: '1.2rem', color: "#1A7AE0"}}/>
        //                             </span>
        //                         </td>
        //                         <td>    
        //                             <span style={{ cursor: 'pointer'}}>
        //                                 <FontAwesomeIcon icon={faClipboard} style={{fontSize: '1.2rem', color: "#1A7AE0"}}/>
        //                             </span>
        //                         </td>
        //                     </tr>
        //                 )
        //             })}
        //             <tr >
        //                 <td colSpan='7' style={{backgroundColor: "#F2F2F2", fontSize: '12px', padding: '18px'}}>
        //                     <div style={{color: "#9F9F9F", paddingRight: '1rem', display: 'inline-block', cursor: 'pointer'}}>Previous Page</div>
        //                     {numbers.map((num)=>{
        //                         return(
        //                             <div key={num.id} style={{backgroundColor:"#E6E6E6", color: "#4C4C4C",width: "20px", height: "20px", borderRadius: "50%", textAlign: "center", alignContent: 'center', cursor: 'pointer', marginRight: "0.8rem",display: 'inline-block'}}><span style={{margin: '0'}}>{num.id}</span></div>
        //                         )
        //                     })}
        //                     <div style={{color: "#4C4C4C", display: 'inline-block', cursor: 'pointer'}}>Next Page</div>
        //                 </td>
        //             </tr>
        //             </tbody>
        //         </table>
        //         </div>
        //         </article>
        //     </section>
        //     <section className='MainContainer'>
        //         <article className="mainDashboardBody">
        //             <div className='dashboardSearch'>
        //                 <div>
        //                     <h3 style={{color: "#4C4C4C", fontSize: '1.1rem', marginBottom: '0.4rem', fontFamily: 'Montserrat'}}>All Interns</h3>
        //                     <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>Monitor interns, their contracts and reports.</p>
        //                 </div>
        //                 <form>
        //                     <span><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '1.2rem', padding: "10px 10px 10px 14px", color: '#4C4C4C' }}/></span><input type='search' name='searchApplicants' placeholder='Search Intern'/>
        //                 </form>
        //             </div>
                    
        //         </article>
        //         <div className='table'>
        //             <table className="dashboarddeets">
        //             <thead>
        //             <tr>
        //                 <th style={{paddingLeft: '1rem',}}>Logo</th>
        //                 <th>Internship</th>
        //                 <th>Report Status</th>
        //                 <th>Vacancy</th>
        //                 <th>Company</th>
        //                 <th></th>
        //                 <th style={{paddingRight: "4rem"}}></th>
        //             </tr>
        //             </thead>
        //             <tbody>
        //             {data1.map((data)=>{
        //                 const {id, intern, contactStatus, reportStatus, vacancy, company} = data;
        //                 let classname = "verified";

        //                 if(contactStatus === 'Pending'){
        //                     classname = "pending"
        //                 }

        //                 if(reportStatus === 'Pending'){
        //                     classname = "pending"
        //                 }

        //                 return(
        //                     <tr key={id}>
        //                         <td style={{paddingLeft: '1rem'}}>{intern}</td>
        //                         <td><span className={classname}>{contactStatus}</span></td>
        //                         <td><span className={classname}>{reportStatus}</span></td>
        //                         <td>{vacancy}</td>
        //                         <td>{company}</td>
        //                         <td>
        //                             <span style={{marginRight: '1rem', cursor: 'pointer'}}>
        //                                 <FontAwesomeIcon icon={faPen} style={{fontSize: '1.2rem', color: "#1A7AE0"}}/>
        //                             </span>
        //                         </td>     
        //                         <td>   
        //                             <span style={{marginLeft: '1rem', marginRight: '-1rem', cursor: 'pointer'}}>
        //                                 <FontAwesomeIcon icon={faClipboard} style={{fontSize: '1.2rem', color: "#1A7AE0"}}/>
        //                             </span>
        //                         </td>
        //                     </tr>
        //                 )
        //             })}
        //             <tr >
        //                 <td colSpan='7' style={{backgroundColor: "#F2F2F2", fontSize: '12px', padding: '18px'}}>
        //                     <div style={{color: "#9F9F9F", paddingRight: '1rem', display: 'inline-block', cursor: 'pointer'}}>Previous Page</div>
        //                     {numbers.map((num)=>{
        //                         return(
        //                             <div key={num.id} style={{backgroundColor:"#E6E6E6", color: "#4C4C4C",width: "20px", height: "20px", borderRadius: "50%", textAlign: "center", alignContent: 'center', cursor: 'pointer', marginRight: "0.8rem",display: 'inline-block'}}><span style={{margin: '0'}}>{num.id}</span></div>
        //                         )
        //                     })}
        //                     <div style={{color: "#4C4C4C", display: 'inline-block', cursor: 'pointer'}}>Next Page</div>
        //                 </td>
        //             </tr>
        //             </tbody>
        //         </table>
        //         </div>
        //     </section>
        // </main>
    )
}

export default ManagerDashboard;