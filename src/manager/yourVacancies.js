import profile from './assets/profile.png'
import { faBuilding, faHouse, faBriefcase, faUserTie, faRightFromBracket, faBars, faXmark, faMagnifyingGlass, faPen, faClipboard, faRemove, faDeleteLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import './company.css'
import './sidebar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const CompanyVacancies = () => {
    const [menu, setMenu] = useState(false);
    const [vacancyData, setVacancyData] = useState([]);

    // const [moreInfo, setMoreInfo] = useState(false);

    const numbers = [
        {id : 1},
        {id : 2},
        {id : 3},
        {id : 4},
        {id : 5},
        {id : 6},
        {id : 7},
    ]


    const managerId = localStorage.getItem('managerId');
    console.log(managerId);
    const url = "http://127.0.0.1:8000/manager/companyroles-list/"
    useEffect(()=>{
        document.title = "Vacancies"
        try{
            axios.get(url+managerId)
            .then((response)=>{
                console.log(response.data);
                setVacancyData(response.data)
            })
        }
        catch(error){
            console.log(error)
        }
    },[managerId])
    return(
        <main className="managerCompanyBody">
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
                                <Link to ="/manager/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                                <Link to ="/manager/vacancyboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Your Vacancies</div></Link>
                                <div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div>
                                <Link to ="/manager/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div></Link>
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
                        <Link to ="/manager/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/manager/vacancyboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>YourVacancies</div></Link>
                        <div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div>
                        <Link to ="/manager/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div></Link>
                        <Link to ="/portal"><div><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div></Link>
                    </div>
                </article>
                <article className="mainCompanyBody">
                    <div className='companySearch'>
                        <div>
                            <p style={{ fontSize: '1.2rem', marginBottom: '0.4rem', fontFamily: 'Poppins'}}>Your Vacancies</p>
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>Monitor, edit and view your vacancies.</p>
                        </div>
                        <form>
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '1.2rem', padding: "10px 10px 10px 14px", color: '#4C4C4C' }}/></span><input type='search' name='searchCompany' placeholder='Search Company'/>
                        </form>
                    </div>
                    <div className='table'>
                    <table className="companydeets">
                    <thead>
                    <tr>
                        <th style={{paddingLeft: '1rem'}}>Role Name</th>
                        <th>Interns Needed</th>
                        <th>Slots remaining</th>
                        <th>Deadline</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    {vacancyData.map((data)=>{
                        const {id, role, numberOfInterns, deadline, moreInfo} = data;

                        return(
                            <Vac1 key={id} role={role} numberOfInterns={numberOfInterns} deadline={deadline} moreInfo={moreInfo}/>
                        )
                    })}
                    <tbody>
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
                            <h3 style={{color: "#4C4C4C", fontSize: '1.1rem', marginBottom: '0.4rem', fontFamily: 'Montserrat'}}>Your Vacancies</h3>
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>Monitor, edit and view your vacancies.</p>
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
                        <th style={{paddingLeft: '1rem'}}>Role Name</th>
                        <th>Interns Needed</th>
                        <th>Slots remaining</th>
                        <th>Deadline</th>
                        <th></th>
                        <th style={{paddingRight: "4rem"}}></th>
                    </tr>
                    </thead>
                    {vacancyData.map((data)=>{
                        const {id, role, numberOfInterns, deadline, moreInfo} = data;

                        return(
                            <Vac1 key={id} role={role} numberOfInterns={numberOfInterns} deadline={deadline} moreInfo={moreInfo}/>
                        )
                    })}
                    <tbody>
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


const Vac1 = ({role, numberOfInterns, deadline, moreInfo}) => {
    const [showInfo, setShowInfo] = useState(false);
    const [edit, setEdit] = useState(false)
    const [vacancy1Data, setVacancy1Data] = useState({
        'role' :role,
        'numberOfInterns' :numberOfInterns,
        'deadline': deadline,
        'moreInfo': moreInfo,
    })

    const handleChange = (event)=>{
        setVacancy1Data({
            ...vacancy1Data,
            [event.target.name]:event.target.value
        })
    }

    const onEdit = () =>{
        setShowInfo(true)
        setEdit(true)
    }
    const onCancel = () =>{
        setShowInfo(false)
        setEdit(false)
    }
    const onSave = () =>{

    }
    const onDelete = () =>{
        
    }
    return(
        <tbody>
        <tr style={{cursor: 'pointer'}}>
            <td style={{paddingLeft: '1rem'}} onClick={()=>setShowInfo(!showInfo)}>{edit ? <input style={{padding: "1px 5px 1px 5px", width: '175px'}} value={vacancy1Data.role} onChange={handleChange} name='role'/>:role}</td>
            <td onClick={()=>setShowInfo(!showInfo)}>{edit ? <input style={{padding: "1px 5px 1px 5px", width: '50px', textAlign: 'center'}} value={vacancy1Data.numberOfInterns} onChange={handleChange} name='numberOfInterns'/>:numberOfInterns}</td>
            <td onClick={()=>setShowInfo(!showInfo)}></td>
            <td onClick={()=>setShowInfo(!showInfo)}>{edit ? <input style={{padding: "1px 5px 1px 5px", width: '115px'}} value={vacancy1Data.deadline} onChange={handleChange} name='deadline' type='date'/>:deadline}</td>
            <td>
                <span style={{marginRight: '0.5rem', cursor: 'pointer'}}>
                    {edit ? <button style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat'}}>Save</button> : <button style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat'}} onClick={()=>onEdit()}>Edit</button>}
                </span>
            </td>     
            <td>   
                <span style={{marginLeft: '1rem', marginRight: '-1rem', cursor: 'pointer'}}>
                    {edit ? <button style={{fontSize: '13px', backgroundColor: "#ff3333", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', marginLeft: '-1rem',}} onClick={()=>onCancel()}>Cancel</button> : <FontAwesomeIcon icon={faTrash} style={{fontSize: '1.2rem', color: "#ff3333"}}/>}
                </span>
            </td>
        </tr>
        <tr style={{borderTop: '0', }} className={showInfo ? 'showInfo1' : 'showInfo'}>
            <td colSpan='4' style={{paddingLeft: '1rem', borderTop: '0', }}><span style={{fontWeight: 'bold', fontFamily: 'Montserrat', color: '#4C4C4C'}}>Short info on the role: </span>{edit ? <input style={{padding: "1px 5px 1px 5px", width: '100%',}} value={vacancy1Data.moreInfo} onChange={handleChange} name='moreInfo'/>:moreInfo}</td>
        </tr>
        </tbody>
    )
}
export default CompanyVacancies;