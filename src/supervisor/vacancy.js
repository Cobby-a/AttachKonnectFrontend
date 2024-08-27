import { faBuilding, faHouse, faBriefcase, faUserTie, faRightFromBracket, faBars, faXmark, faMagnifyingGlass, faSquarePollVertical} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import './vacancy.css'
import './sidebar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import defaultProf from './assets/defaultProf.jpg'
import Swal from 'sweetalert2'


const staffId = localStorage.getItem('staffId');

const url = "https://attachmentkonnect.pythonanywhere.com/"

const SupervisorVacancy = () => {
    const [menu, setMenu] = useState(false);
    const [vacancyData, setVacancyData] = useState([]);
    const [nextUrl, setNextUrl] = useState()
    const [previousUrl, setPreviousUrl] = useState()
    const [supervisorData, setSupervisorData] = useState([])

    const [query, setQuery] = useState('');
    const results = filterItems(vacancyData, query)

    const onLogout = () =>{
        localStorage.removeItem('supervisorLoginStatus')
        window.location.href='/portal'
    }

    useEffect(()=>{
        document.title = "Vacancies"
        try{
            axios.get(url+'manager/'+'rolesView/')
            .then((response)=>{
                setVacancyData(response.data.results)
                setNextUrl(response.data.next)
                setPreviousUrl(response.data.previous)
            })
            .catch((error)=>{
                if (error.response) {
                    Swal.fire({
                        title: 'Error',
                        text: `There was a ${error.response.status} bad request requesting for the data`,
                        icon: 'error',
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonText: 'Try Again',
                        cancelButtonColor: '#ff3333'
                      }).then((result)=>{
                        result.dismiss && window.location.reload()
                      })
                  } else if (error.request) {
                    Swal.fire({
                        title: 'Error',
                        text: `No response was received from the server.`,
                        icon: 'error',
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonText: 'Try Again',
                        cancelButtonColor: '#ff3333'
                      }).then((result)=>{
                        result.dismiss && window.location.reload()
                      })
                  } else {
                    Swal.fire({
                        title: 'Error',
                        text: `Error!`,
                        icon: 'error',
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonText: 'Try Again',
                        cancelButtonColor: '#ff3333'
                      }).then((result)=>{
                        result.dismiss && window.location.reload()
                      })
                  }
            })
        }
        catch(error){
            console.log(error)
        }
        try{
            axios.get(url+'supervisor/'+staffId)
            .then((response)=>{
                setSupervisorData(response.data)
            })
            .catch((error)=>{
                if (error.response) {
                    Swal.fire({
                        title: 'Error',
                        text: `There was a ${error.response.status} bad request requesting for data`,
                        icon: 'error',
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonText: 'Try Again',
                        cancelButtonColor: '#ff3333'
                      }).then((result)=>{
                        result.dismiss && window.location.reload()
                      })
                  } else if (error.request) {
                    Swal.fire({
                        title: 'Error',
                        text: `No response was received from the server.`,
                        icon: 'error',
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonText: 'Try Again',
                        cancelButtonColor: '#ff3333'
                      }).then((result)=>{
                        result.dismiss && window.location.reload()
                      })
                  } else {
                    Swal.fire({
                        title: 'Error',
                        text: `Error!`,
                        icon: 'error',
                        showCancelButton: true,
                        showConfirmButton: false,
                        cancelButtonText: 'Try Again',
                        cancelButtonColor: '#ff3333'
                      }).then((result)=>{
                        result.dismiss && window.location.reload()
                      })
                  }
            })
        }
        catch(error){
            alert(error)
        }
    },[])

    function handleSearchChange(e) {
        setQuery(e.target.value);
    }

    let profile_pic = supervisorData.profile_pic

    if(supervisorData.profile_pic === null){
        profile_pic = defaultProf
    }

    const paginationHandler = (url) => {
        try{
            axios.get(url)
            .then((response)=>{
                setNextUrl(response.data.next)
                setPreviousUrl(response.data.previous)
                setVacancyData(response.data.results)
            })
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <main className="supervisorVacancyBody">
            <header>
                <div className='profile'>
                    <img src={profile_pic} alt={supervisorData.last_name} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>{supervisorData.last_name}</h2>
                        <div className='hamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'Sidebar' : 'NonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                {/* <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p> */}
                            <div className='SidebarIcons'>
                                <Link to ="/supervisor/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                                <Link to ="/supervisor/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                                <Link to ="/supervisor/vacancyboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                                <Link to="/supervisor/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Students</div></Link>
                                <Link to="/supervisor/intern-assessment"><div><FontAwesomeIcon icon={faSquarePollVertical} style={{paddingRight: '1rem', width: '10%'}}/>Intern Assessment</div></Link>
                                <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
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
                        <Link to ="/supervisor/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/supervisor/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                        <Link to ="/supervisor/vacancyboard"><div  style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                        <Link to="/supervisor/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Students</div></Link>
                        <Link to="/supervisor/intern-assessment"><div><FontAwesomeIcon icon={faSquarePollVertical} style={{paddingRight: '1rem', width: '10%'}}/>Intern Assessment</div></Link>
                        <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                    </div>
                </article>
                <article className="mainVacancyBody">
                    <div className='vacancySearch'>
                        <div>
                            <p style={{ fontSize: '1.2rem', marginBottom: '0.4rem', fontFamily: 'Poppins'}}>Vacancies</p>
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>Monitor vacancies of the companies on the system.</p>
                        </div>
                        <form action="javascript:void(0);">
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '1.2rem', padding: "10px 10px 10px 14px", color: '#4C4C4C' }}/></span><input type='search' name='searchVacancy' placeholder='Search Vacancy' value={query} onChange={handleSearchChange}/>
                        </form>
                    </div>
                    <div className='table'>
                    <table className="vacancydeets">
                    <thead>
                    <tr>
                        <th style={{paddingLeft: '1rem'}}>Role Name</th>
                        <th>Interns Needed</th>
                        <th>Slots remaining</th>
                        <th>Deadline</th>
                        <th style={{paddingRight: "2rem"}}>Company</th>
                    </tr>
                    </thead>
                    {results.map((data)=>{
                        const {id, role, numberOfInterns, deadline, moreInfo, company, total_accepted_students} = data;

                        return(
                            <Vacancy1 key={id} role={role} numberOfInterns={numberOfInterns} deadline={deadline} moreInfo={moreInfo} company={company} total_accepted_students={total_accepted_students}/>
                        )
                    })}
                    <tbody>
                    <tr >
                        <td colSpan='5' style={{backgroundColor: "#F2F2F2", fontSize: '12px', padding: '18px'}}>
                            {previousUrl &&
                                <div className={previousUrl && "page"} style={{color: "#4C4C4C", marginRight: '1rem', display: 'inline-block', cursor: 'pointer'}} onClick={()=>paginationHandler(previousUrl)}>Previous Page</div>
                            }
                            {nextUrl &&
                                <div className={nextUrl && "page"} style={{color: "#4C4C4C", display: 'inline-block', cursor: 'pointer'}} onClick={()=>paginationHandler(nextUrl)}>Next Page</div>
                            }
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
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>Monitor vacancies of the companies on the system.</p>
                        </div>
                        <form action="javascript:void(0);">
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '1.2rem', padding: "10px 10px 10px 14px", color: '#4C4C4C' }}/></span><input type='search' name='searchVacancy' placeholder='Search Vacancy' value={query} onChange={handleSearchChange}/>
                        </form>
                    </div>
                    
                </article>
                <div className='table'>
                    <table className="vacancydeets">
                    <thead>
                    <tr>
                        <th style={{paddingLeft: '1rem'}}>Role Name</th>
                        <th>Interns Needed</th>
                        <th>Slots remaining</th>
                        <th>Deadline</th>
                        <th style={{paddingRight: "2rem"}}>Company</th>
                    </tr>
                    </thead>
                    {results.map((data)=>{
                        const {id, role, numberOfInterns, deadline, moreInfo, company, total_accepted_students} = data;

                        return(
                            <Vacancy1 key={id} role={role} numberOfInterns={numberOfInterns} deadline={deadline} moreInfo={moreInfo} company={company} total_accepted_students={total_accepted_students}/>
                        )
                    })}
                    <tbody>
                    <tr >
                        <td colSpan='5' style={{backgroundColor: "#F2F2F2", fontSize: '12px', padding: '18px'}}>
                            {previousUrl &&
                                <div className={previousUrl && "page"} style={{color: "#4C4C4C", marginRight: '1rem', display: 'inline-block', cursor: 'pointer'}} onClick={()=>paginationHandler(previousUrl)}>Previous Page</div>
                            }
                            {nextUrl &&
                                <div className={nextUrl && "page"} style={{color: "#4C4C4C", display: 'inline-block', cursor: 'pointer'}} onClick={()=>paginationHandler(nextUrl)}>Next Page</div>
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </section>
        </main>
    )
}


const Vacancy1 = ({role, numberOfInterns, deadline, moreInfo, company, total_accepted_students}) => {
    const [showInfo, setShowInfo] = useState(false);

    let slot_remaining = numberOfInterns - total_accepted_students
    if(total_accepted_students >= numberOfInterns){
        slot_remaining = "Quota reached"
    }

    return(
        <tbody>
        <tr style={{cursor: 'pointer'}}>
            <td style={{paddingLeft: '1rem'}} onClick={()=>setShowInfo(!showInfo)}>{role}</td>
            <td onClick={()=>setShowInfo(!showInfo)}>{numberOfInterns}</td>
            <td onClick={()=>setShowInfo(!showInfo)}>{slot_remaining}</td>
            <td onClick={()=>setShowInfo(!showInfo)}>{deadline}</td>
            <td onClick={()=>setShowInfo(!showInfo)} style={{paddingRight: '2rem'}}>{company.companyName}</td>
        </tr>
        <tr style={{borderTop: '0', }} className={showInfo ? 'showInfo1' : 'showInfo'}>
            <td colSpan='4' style={{paddingLeft: '1rem', borderTop: '0',paddingRight: "1.5rem", fontSize: '12px' }}><span style={{fontWeight: 'bold', fontFamily: 'Montserrat', color: '#4C4C4C', fontSize: '12px'}}>Short info on the role: </span>{moreInfo}</td>
        </tr>
        </tbody>
    )
}

function filterItems(items, query) {
    query = query.toLowerCase();
    return items.filter(item =>
      item.role.split(' ').some(word =>
        // word.toLowerCase().match(query)
        word.toLowerCase().startsWith(query)
      )
    );
}

export default SupervisorVacancy;