import profile from './assets/profile.png'
import { faBuilding, faHouse, faBriefcase, faRightFromBracket, faBars, faXmark, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import './vacancy.css'
import './sidebar.css'
import { data } from './studentData'



const StudentVacancy = () => {
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
    return(
        <main className="studentVacancyBody">
            <header>
                <div className='profile'>
                    <img src={profile} alt="profile" />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>Eva</h2>
                        <div className='hamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'Sidebar' : 'NonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                {/* <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p> */}
                            <div className='SidebarIcons'>
                                <div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div>
                                <div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div>
                                <div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div>
                                <div><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                            </div>
                            </article>
                        </div>
                    </div>
                </div>
            </header>
            <section className='mainContainer'>
                <article className='sidebar'>
                    {/* <p style={{fontFamily: 'Segoe UI', marginTop: '-3rem', marginBottom: '3rem', marginLeft: '-1rem', fontWeight:'600',}}>Welcome to dashboard</p> */}
                    <div className='sidebarIcons'>
                        <div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%'}}/>Dashboard</div>
                        <div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div>
                        <div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div>
                        <div><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                    </div>
                </article>
                <article className="mainVacancyBody">
                    <div className='vacancySearch'>
                        <div>
                            <p style={{ fontSize: '1.2rem', marginBottom: '0.4rem', fontFamily: 'Poppins'}}>Vacancies</p>
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>Monitor interns, their contracts and reports.</p>
                        </div>
                        <form>
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '1.2rem', padding: "10px 10px 10px 14px", color: '#4C4C4C' }}/></span><input type='search' name='searchVacancy' placeholder='Search Vacancy'/>
                        </form>
                    </div>
                    <div className='table'>
                    <table className="vacancydeets">
                    <thead>
                    <tr>
                        <th style={{paddingLeft: '1rem'}}>Logo</th>
                        <th>Contract status</th>
                        <th>Report Status</th>
                        <th>Vacancy</th>
                        <th>Company</th>
                        <th></th>
                        {/* <th></th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((data)=>{
                        const {id, logo, contactStatus, reportStatus, vacancy, company} = data;
                        let classname = "verified";

                        if(contactStatus === 'Pending'){
                            classname = "pending"
                        }

                        if(reportStatus === 'Pending'){
                            classname = "pending"
                        }

                        return(
                            <tr key={id}>
                                <td style={{paddingLeft: '1rem'}}><img src={logo} alt={company} style={{width: "25px", height: "25px", objectFit: 'cover',}}/></td>
                                <td><span className={classname}>{contactStatus}</span></td>
                                <td><span className={classname}>{reportStatus}</span></td>
                                <td>{vacancy}</td>
                                <td>{company}</td>
                                <td><span style={{cursor: 'pointer', padding: "4px 10px", backgroundColor: "#1A7AE0", borderRadius: "12px", color: "#ffffff"}}>Apply</span></td>
                            </tr>
                        )
                    })}
                    <tr >
                        <td colSpan='7' style={{backgroundColor: "#F2F2F2", fontSize: '12px', padding: '18px'}}>
                            <div style={{color: "#9F9F9F", paddingRight: '1rem', display: 'inline-block', cursor: 'pointer'}}>Previous Page</div>
                            {numbers.map((num)=>{
                                return(
                                    <div key={num.id} style={{backgroundColor:"#E6E6E6", color: "#4C4C4C",width: "20px", height: "20px", borderRadius: "50%", textAlign: "center", alignContent: 'center', cursor: 'pointer', marginRight: "0.8rem",display: 'inline-block'}}><span style={{margin: '0'}}>{num.id}</span></div>
                                )
                            })}
                            <div style={{color: "#4C4C4C", display: 'inline-block', cursor: 'pointer',}}>Next Page</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                </article>
            </section>
            <section className='MainContainer'>
                <article className="mainVacancyBody">
                    <div className='vacancySearch'>
                        <div>
                            <h3 style={{color: "#4C4C4C", fontSize: '1.1rem', marginBottom: '0.4rem', fontFamily: 'Montserrat'}}>Vacancies</h3>
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>Monitor interns, their contracts and reports.</p>
                        </div>
                        <form>
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '1.2rem', padding: "10px 10px 10px 14px", color: '#4C4C4C' }}/></span><input type='search' name='searchVacancy' placeholder='Search Vacancy'/>
                        </form>
                    </div>
                    
                </article>
                <div className='table'>
                    <table className="vacancydeets">
                    <thead>
                    <tr>
                        <th style={{paddingLeft: '1rem',}}>Logo</th>
                        <th>Contract status</th>
                        <th>Report Status</th>
                        <th>Vacancy</th>
                        <th>Company</th>
                        <th style={{paddingRight: "4rem"}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((data)=>{
                        const {id, logo, contactStatus, reportStatus, vacancy, company} = data;
                        let classname = "verified";

                        if(contactStatus === 'Pending'){
                            classname = "pending"
                        }

                        if(reportStatus === 'Pending'){
                            classname = "pending"
                        }

                        return(
                            <tr key={id}>
                                <td style={{paddingLeft: '1rem'}}><img src={logo} alt={company} style={{width: "25px", height: "25px", objectFit: 'cover',}}/></td>
                                <td><span className={classname}>{contactStatus}</span></td>
                                <td><span className={classname}>{reportStatus}</span></td>
                                <td>{vacancy}</td>
                                <td>{company}</td>
                                <td><span style={{cursor: 'pointer', padding: "4px 10px", backgroundColor: "#1A7AE0", borderRadius: "12px", color: "#ffffff"}}>Apply</span></td>
                            </tr>
                        )
                    })}
                    <tr >
                        <td colSpan='7' style={{backgroundColor: "#F2F2F2", fontSize: '12px', padding: '18px'}}>
                            <div style={{color: "#9F9F9F", paddingRight: '1rem', display: 'inline-block', cursor: 'pointer'}}>Previous Page</div>
                            {numbers.map((num)=>{
                                return(
                                    <div key={num.id} style={{backgroundColor:"#E6E6E6", color: "#4C4C4C",width: "20px", height: "20px", borderRadius: "50%", textAlign: "center", alignContent: 'center', cursor: 'pointer', marginRight: "0.8rem",display: 'inline-block'}}><span style={{margin: '0'}}>{num.id}</span></div>
                                )
                            })}
                            <div style={{color: "#4C4C4C", display: 'inline-block', cursor: 'pointer'}}>Next Page</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </section>
        </main>
    )
}

export default StudentVacancy;