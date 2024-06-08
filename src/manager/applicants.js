import profile from './assets/profile.png'
import { faBuilding, faHouse, faBriefcase, faUserTie, faRightFromBracket, faBars, faXmark, faSort, faStar, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import './applicants.css'
import './sidebar.css'
import { data2 } from './manageData'


const ManagerApplicants = () => {
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
        <main className="managerApplicantsBody">
            <header>
                <div className='profile'>
                    <img src={profile} alt="profile" />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>Hiring Manager</h2>
                        <div className='hamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'Sidebar' : 'NonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                {/* <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p> */}
                            <div className='SidebarIcons'>
                                <div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div>
                                <div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div>
                                <div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div>
                                <div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div>
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
                        <div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div>
                        <div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div>
                        <div><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                    </div>
                </article>
                <article className="mainApplicantsBody">
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', fontFamily: 'Poppins', textAlign: 'center', margin: 'auto', marginTop: '-2rem'}}>Candidates</p>
                    <div className='table'>
                    <table className="applicantsdeets">
                    <thead>
                    <tr>
                        <th style={{paddingLeft: '1rem', backgroundColor: '#ffffff', border: 'none'}}></th>
                        <th style={{paddingLeft: "1rem", borderTopLeftRadius: "6px", borderBottomLeftRadius: "6px", borderBottom: 'none'}}>Canadidate Name</th>
                        <th style={{cursor: 'pointer', borderBottom: 'none'}}>Rating<FontAwesomeIcon icon={faSort} style={{paddingLeft: '4px', fontSize: '10px'}}/></th>
                        <th style={{cursor: 'pointer', borderBottom: 'none'}}>Stages<FontAwesomeIcon icon={faSort} style={{paddingLeft: '4px', fontSize: '10px'}}/></th>
                        <th style={{borderBottom: 'none'}}>Applied Role</th>
                        <th style={{cursor: 'pointer', borderBottom: 'none'}}>Application Date<FontAwesomeIcon icon={faSort} style={{paddingLeft: '4px', fontSize: '10px'}}/></th>
                        <th style={{borderTopRightRadius: "6px", borderBottomRightRadius: "6px", borderBottom: 'none'}}>Attachments</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data2.map((data)=>{
                        const {id, profile, name, rating, stage, appliedRole, appliedDate, attachments} = data;
                        return(
                            <tr key={id}>
                                <td style={{paddingLeft: '1rem', border: 'none'}}><img src={profile} alt={name} style={{width: "25px", height: "25px", objectFit: 'cover',}}></img></td>
                                <td>{name}</td>
                                <td><FontAwesomeIcon icon={faStar} style={{paddingRight: '8px', color: "#0E2FD0"}}/>{rating}</td>
                                <td>{stage}</td>
                                <td>{appliedRole}</td>
                                <td>{appliedDate}</td>
                                <td style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faPaperclip} style={{paddingRight: '8px'}}/>{attachments} files</td>
                            </tr>
                        )
                    })}
                    <tr >
                        <td style={{border: 'none'}}></td>
                        <td colSpan='7' style={{border: 'none', fontSize: '12px', padding: '18px', margin: 'auto', paddingTop: '2rem', textAlign: 'center'}}>
                            <div style={{color: "#9F9F9F", paddingRight: '1rem', display: 'inline-block', cursor: 'pointer',}}>Previous Page</div>
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
                </article>
            </section>
            <section className='MainContainer'>
                <article className="mainApplicantsBody">
                <p style={{ fontSize: '1.1rem', fontFamily: 'Poppins', textAlign: 'center', margin: '0.5rem auto 2rem',}}>Candidates</p>
                    
                </article>
                <div className='table'>
                    <table className="applicantsdeets">
                    <thead>
                    <tr>
                        <th style={{paddingLeft: '1rem', backgroundColor: '#ffffff', border: 'none'}}></th>
                        <th style={{paddingLeft: "1rem", borderTopLeftRadius: "6px", borderBottomLeftRadius: "6px", borderBottom: 'none' }}>Canadidate Name</th>
                        <th style={{cursor: 'pointer', borderBottom: 'none'}}>Rating<FontAwesomeIcon icon={faSort} style={{paddingLeft: '4px', fontSize: '10px', borderBottom: 'none'}}/></th>
                        <th style={{cursor: 'pointer', borderBottom: 'none'}}>Stages<FontAwesomeIcon icon={faSort} style={{paddingLeft: '4px', fontSize: '10px', borderBottom: 'none'}}/></th>
                        <th style={{borderBottom: 'none'}}>Applied Role</th>
                        <th style={{cursor: 'pointer', borderBottom: 'none'}}>Application Date<FontAwesomeIcon icon={faSort} style={{paddingLeft: '4px', fontSize: '10px', borderBottom: 'none'}}/></th>
                        <th style={{borderTopRightRadius: "6px", borderBottomRightRadius: "6px", borderBottom: 'none'}}>Attachments</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data2.map((data)=>{
                        const {id, profile, name, rating, stage, appliedRole, appliedDate, attachments} = data;
                        return(
                            <tr key={id}>
                                <td style={{paddingLeft: '1rem', border: 'none'}}><img src={profile} alt={name} style={{width: "25px", height: "25px", objectFit: 'cover'}}></img></td>
                                <td style={{}}>{name}</td>
                                <td><FontAwesomeIcon icon={faStar} style={{paddingRight: '8px', color: "#0E2FD0"}}/>{rating}</td>
                                <td>{stage}</td>
                                <td>{appliedRole}</td>
                                <td>{appliedDate}</td>
                                <td style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faPaperclip} style={{paddingRight: '8px'}}/>{attachments} files</td>
                            </tr>
                        )
                    })}
                    <tr >
                        <td style={{border: 'none'}}></td>
                        <td colSpan='7' style={{border: 'none', fontSize: '12px', padding: '18px', margin: 'auto', paddingTop: '2rem',paddingBottom:'2rem', textAlign: 'center'}}>
                            <div style={{color: "#9F9F9F", paddingRight: '1rem', display: 'inline-block', cursor: 'pointer',}}>Previous Page</div>
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

export default ManagerApplicants;