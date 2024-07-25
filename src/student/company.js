import profile from './assets/profile.png'
import { faBuilding, faHouse, faRightFromBracket, faBars, faXmark, faMagnifyingGlass, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import './company.css'
import './sidebar.css'
import { data } from './studentData'
import { Link } from 'react-router-dom'
import axios from 'axios'



const baseUrl = 'http://127.0.0.1:8000/manager'


const StudentCompany = () => {
    const [menu, setMenu] = useState(false);

    const [companyData, setCompanyData] = useState([])

    useEffect (()=>{
        document.title = "Companies"
        try{
            axios.get(baseUrl)
            .then((response)=>{
                setCompanyData(response.data)
            });
        }
        catch(error){
            console.log(error)
        }
    },[])

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
        <main className="studentCompanyBody">
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
                                <Link to ="/student/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                                <Link to ="/student/companyboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
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
                    {/* <p style={{fontFamily: 'Segoe UI',  marginBottom: '3rem', marginLeft: '-1rem', fontWeight:'600',}}>Welcome to dashboard</p> */}
                    <div className='sidebarIcons'>
                        <Link to ="/student/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/student/companyboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                        <Link to ="/student/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                        <Link to ="/portal"><div><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div></Link>
                    </div>
                </article>
                <article className="mainCompanyBody">
                    <div className='companySearch'>
                        <div>
                            <p style={{ fontSize: '1.2rem', marginBottom: '0.4rem', fontFamily: 'Poppins'}}>Companies on the system</p>
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>View companies on the system and have access to their vacancies.</p>
                        </div>
                        <form>
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '1.2rem', padding: "10px 10px 10px 14px", color: '#4C4C4C' }}/></span><input type='search' name='searchCompany' placeholder='Search Company'/>
                        </form>
                    </div>
                    <div className='table'>
                    <table className="companydeets">
                    <thead>
                    <tr>
                        <th style={{paddingLeft: '1rem'}}>Logo</th>
                        <th>Contract status</th>
                        <th>Report Status</th>
                        <th>Company</th>
                        <th style={{paddingRight: "1rem"}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {companyData.map((data)=>{
                        const {id, companyLogo, contractStatus, reportStatus, companyName} = data;

                        return(
                            <Companydeets key={id} id={id} companyLogo={companyLogo} companyName={companyName} contractStatus={contractStatus} reportStatus={reportStatus}/>
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
                </article>
            </section>
            <section className='MainContainer'>
                <article className="mainCompanyBody">
                    <div className='companySearch'>
                        <div>
                            <h3 style={{color: "#4C4C4C", fontSize: '1.1rem', marginBottom: '0.4rem', fontFamily: 'Montserrat'}}>Companies on the system</h3>
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>View companies on the system and have access to their vacancies.</p>
                        </div>
                        <form>
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '1.2rem', padding: "10px 10px 10px 14px", color: '#4C4C4C' }}/></span><input type='search' name='searchCompany' placeholder='Search Company'/>
                        </form>
                    </div>
                    
                </article>
                <div className='table'>
                    <table className="companydeets">
                    <thead>
                    <tr>
                        <th style={{paddingLeft: '1rem',}}>Logo</th>
                        <th>Contract status</th>
                        <th>Report Status</th>
                        <th>Company</th>
                        <th style={{paddingRight: "1rem"}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {companyData.map((data)=>{
                        const {id, companyLogo, contractStatus, reportStatus, companyName} = data;

                        return(
                            <Companydeets key={id} id={id} companyLogo={companyLogo} companyName={companyName} contractStatus={contractStatus} reportStatus={reportStatus}/>
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

const Companydeets = ({id, companyLogo, contractStatus, companyName, reportStatus}) => {
    let classname = "verified";
    let classname1 = "verified";


    if(contractStatus === 'Pending'){
        classname = "pending"
    }

    if(reportStatus === 'Pending'){
        classname1 = "pending"
    }
    return (
        <tr key={id} style={{cursor: 'pointer'}} onClick={()=>window.open(`/student/company/${id}/${companyName.split(` `).join(`-`).toLowerCase()}`)}>
            {/* <Link to = {`/student/company/${id}/${companyName.split(` `).join(`-`).toLowerCase()}`} state={{id: id, companyName: companyName}}></Link> */}
            <td style={{paddingLeft: '1rem'}}><img src={companyLogo} alt={companyName} style={{width: "30px", height: "30px", objectFit: 'cover', borderRadius: '50%'}}/></td>
            <td><span className={classname}>{contractStatus}</span></td>
            <td><span className={classname1}>{reportStatus}</span></td>
            <td>{companyName}</td>
            <td><Link to = {`/student/company/${id}/${companyName.split(` `).join(`-`).toLowerCase()}`} state={{id: id, companyName: companyName}}><button style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat'}}>View</button></Link></td>
        </tr>
    )
}

export default StudentCompany;