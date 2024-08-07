import { faBuilding, faHouse, faBriefcase, faUserTie, faRightFromBracket, faBars, faXmark, faMagnifyingGlass,} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import './company.css'
import './sidebar.css'

import logoProfile from '../assets/profileLogo.png'

import { Link } from 'react-router-dom'
import axios from 'axios'


const adminUserName = localStorage.getItem('adminUserName');

const AdminCompany = () => {
    
    const onLogout = () =>{
        localStorage.removeItem('adminLoginStatus')
        window.location.href='/portal'
    }

    const [companyData, setCompanyData] = useState([])
    const [menu, setMenu] = useState(false);

    const baseUrl = 'http://127.0.0.1:8000/manager'

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
        <main className="adminCompanyBody">
            <header>
                <div className='profile'>
                    <img src={logoProfile} alt="profile" />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>{adminUserName}</h2>
                        <div className='hamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'Sidebar' : 'NonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                {/* <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p> */}
                            <div className='SidebarIcons'>
                                <Link to ="/admin/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                                <Link to ="/admin/companyboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                                <Link to ="/admin/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                                <Link to="/admin/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Students</div></Link>
                                <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
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
                        <Link to ="/admin/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/admin/companyboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                        <Link to ="/admin/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                        <Link to="/admin/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Students</div></Link>
                        <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                    </div>
                </article>
                <article className="mainCompanyBody">
                    <div className='companySearch'>
                        <div>
                            <p style={{ fontSize: '1.2rem', marginBottom: '0.4rem', fontFamily: 'Poppins'}}>Companies</p>
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>Monitor companies on the system.</p>
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
                        {/* <th>Vacancy</th> */}
                        <th>Company</th>
                        {/* <th></th>
                        <th></th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {companyData.map((data)=>{
                        const {id, companyLogo, contractStatus, reportStatus, companyName} = data;
                        let classname = "verified";
                        let classname1 = "verified";


                        if(contractStatus === 'Pending'){
                            classname = "pending"
                        }

                        if(reportStatus === 'Pending'){
                            classname1 = "pending"
                        }

                        return(
                            <tr key={id}>
                                <td style={{paddingLeft: '1rem'}}><img src={companyLogo} alt={companyName} style={{width: "30px", height: "30px", objectFit: 'cover', borderRadius: '50%'}}/></td>
                                <td><span className={classname}>{contractStatus}</span></td>
                                <td><span className={classname1}>{reportStatus}</span></td>
                                {/* <td>{vacancy}</td> */}
                                <td>{companyName}</td>
                                {/* <td>
                                    <span style={{ cursor: 'pointer'}}>
                                        <FontAwesomeIcon icon={faPen} style={{fontSize: '1.2rem', color: "#1A7AE0"}}/>
                                    </span>
                                </td>
                                <td>    
                                    <span style={{ cursor: 'pointer'}}>
                                        <FontAwesomeIcon icon={faClipboard} style={{fontSize: '1.2rem', color: "#1A7AE0"}}/>
                                    </span>
                                </td> */}
                            </tr>
                        )
                    })}
                    <tr >
                        <td colSpan='6' style={{backgroundColor: "#F2F2F2", fontSize: '12px', padding: '18px'}}>
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
                            <h3 style={{color: "#4C4C4C", fontSize: '1.1rem', marginBottom: '0.4rem', fontFamily: 'Montserrat'}}>Companies</h3>
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>Monitor companies on the system.</p>
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
                        {/* <th>Vacancy</th> */}
                        <th style={{paddingRight: "4rem"}}>Company</th>
                        {/* <th></th>
                        <th style={{paddingRight: "4rem"}}></th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {companyData.map((data)=>{
                        const {id, companyLogo, contractStatus, reportStatus, companyName} = data;
                        let classname = "verified";
                        let classname1 = "verified";


                        if(contractStatus === 'Pending'){
                            classname = "pending"
                        }

                        if(reportStatus === 'Pending'){
                            classname1 = "pending"
                        }

                        return(
                            <tr key={id}>
                                <td style={{paddingLeft: '1rem'}}><img src={companyLogo} alt={companyName} style={{width: "30px", height: "30px", objectFit: 'cover', borderRadius: '50%'}}/></td>
                                <td><span className={classname}>{contractStatus}</span></td>
                                <td><span className={classname1}>{reportStatus}</span></td>
                                {/* <td>{vacancy}</td> */}
                                <td>{companyName}</td>
                                {/* <td>
                                    <span style={{marginRight: '1rem', cursor: 'pointer'}}>
                                        <FontAwesomeIcon icon={faPen} style={{fontSize: '1.2rem', color: "#1A7AE0"}}/>
                                    </span>
                                </td>     
                                <td>   
                                    <span style={{marginLeft: '1rem', marginRight: '-1rem', cursor: 'pointer'}}>
                                        <FontAwesomeIcon icon={faClipboard} style={{fontSize: '1.2rem', color: "#1A7AE0"}}/>
                                    </span>
                                </td> */}
                            </tr>
                        )
                    })}
                    <tr >
                        <td colSpan='6' style={{backgroundColor: "#F2F2F2", fontSize: '12px', padding: '18px'}}>
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

export default AdminCompany;