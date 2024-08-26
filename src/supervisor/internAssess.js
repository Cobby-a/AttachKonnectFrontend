import { faBuilding, faHouse, faRightFromBracket, faBars, faXmark, faMagnifyingGlass, faBriefcase, faUser, faUserTie, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import './internAssess.css'
import './sidebar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import defaultProf from './assets/defaultProf.jpg'
import Swal from 'sweetalert2'


const baseUrl = 'https://attachmentkonnect.pythonanywhere.com/'
const staffId = localStorage.getItem('staffId');

const SupervisorInternAssessment = () => {
    const [menu, setMenu] = useState(false);

    const [studentAssessmentData, setStudentAssessmentData] = useState([])
    const [supervisorData, setSupervisorData] = useState([])
    const [nextUrl, setNextUrl] = useState()
    const [previousUrl, setPreviousUrl] = useState()
    
    const [query, setQuery] = useState('');
    const results = filterItems(studentAssessmentData, query)
    
    const onLogout = () =>{
        localStorage.removeItem('supervisorLoginStatus')
        window.location.href='/portal'
    }

    useEffect (()=>{
        document.title = "Student Assessment"
        try{
            axios.get(baseUrl+"student/student-assessment-list/")
            .then((response)=>{
                setStudentAssessmentData(response.data.results)
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
            axios.get(baseUrl+"supervisor/"+staffId)
            .then((response)=>{
                setSupervisorData(response.data)
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
            alert(error)
        }
    },[])

    let profile_pic = supervisorData.profile_pic

    if(supervisorData.profile_pic === null){
        profile_pic = defaultProf
    }

    function handleSearchChange(e) {
        setQuery(e.target.value);
    }

    const paginationHandler = (url) => {
        try{
            axios.get(url)
            .then((response)=>{
                setNextUrl(response.data.next)
                setPreviousUrl(response.data.previous)
                setStudentAssessmentData(response.data.results)
            })
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <main className="managerStudentAssessmentBody">
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
                                <Link to ="/supervisor/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                                <Link to="/supervisor/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Students</div></Link>
                                <Link to="/supervisor/intern-assessment"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faSquarePollVertical} style={{paddingRight: '1rem', width: '10%'}}/>Intern Assessment</div></Link>
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
                        <Link to ="/supervisor/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/supervisor/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                        <Link to ="/supervisor/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                        <Link to="/supervisor/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Students</div></Link>
                        <Link to="/supervisor/intern-assessment"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faSquarePollVertical} style={{paddingRight: '1rem', width: '10%'}}/>Intern Assessment</div></Link>
                        <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                    </div>
                </article>
                <article className="mainCompanyBody">
                    <div className='companySearch'>
                        <div>
                            <p style={{ fontSize: '1.2rem', marginBottom: '0.4rem', fontFamily: 'Poppins'}}>Interns assessment list</p>
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>View interns assessment list on the system and have access to them.</p>
                        </div>
                        <form action="javascript:void(0);">
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '1.2rem', padding: "10px 10px 10px 14px", color: '#4C4C4C' }}/></span><input type='search' name='searchStudentId' placeholder='Search Student Id' value={query} onChange={handleSearchChange} />
                        </form>
                    </div>
                    <div className='table'>
                    <table className="companydeets">
                    <thead>
                    <tr>
                        <th style={{paddingLeft: '1rem'}}>Student Id</th>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Company</th>
                        <th style={{paddingRight: "1rem"}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.map((data)=>{
                        const {student, company} = data;

                        return(
                            <StudentAssessmentdeets key={student.student_id} student={student} company={company}/>
                        )
                    })}
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
                <article className="mainCompanyBody">
                    <div className='companySearch'>
                        <div>
                            <h3 style={{color: "#4C4C4C", fontSize: '1.1rem', marginBottom: '0.4rem', fontFamily: 'Montserrat'}}>Interns assessment list</h3>
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>View interns assessment list on the system and have access to them.</p>
                        </div>
                        <form action="javascript:void(0);">
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '1.2rem', padding: "10px 10px 10px 14px", color: '#4C4C4C' }}/></span><input type='search' name='searchStudentId' placeholder='Search Student Id' value={query} onChange={handleSearchChange}/>
                        </form>
                    </div>
                    
                </article>
                <div className='table'>
                    <table className="companydeets">
                    <thead>
                    <tr>
                        <th style={{paddingLeft: '1rem'}}>Student Id</th>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Company</th>
                        <th style={{paddingRight: "1rem"}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.map((data)=>{
                        const {student, company} = data;


                        return(
                            <StudentAssessmentdeets key={student.student_id} student={student} company={company}/>
                        )
                    })}
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

function filterItems(items, query) {
    query = query.toLowerCase();
    return items.filter(item =>
      item.student.student_id.split(' ').some(word =>
        // word.toLowerCase().match(query)
        word.toLowerCase().startsWith(query)
      )
    );
}

const StudentAssessmentdeets = ({student, company}) => {
    let Studentlevel = "";


    if(student.level === 1){
        Studentlevel = "Level 100"
    }
    else if(student.level === 2){
        Studentlevel = "Level 200"
    }
    else if(student.level === 3){
        Studentlevel = "Level 300"
    }
    else if(student.level === 4){
        Studentlevel = "Level 400"
    }
    return (
        <tr style={{cursor: 'pointer'}} onClick={()=>window.open(`/supervisor/intern-assessment/${student.student_id}`)}>
            {/* <Link to = {`/student/company/${id}/${companyName.split(` `).join(`-`).toLowerCase()}`} state={{id: id, companyName: companyName}}></Link> */}
            <td style={{paddingLeft: '1rem'}}>{student.student_id}</td>
            <td>{student.other_names}</td>
            <td>{Studentlevel}</td>
            <td>{company.companyName}</td>
            <td><button onClick={()=>window.open(`/supervisor/intern-assessment/${student.student_id}`)} style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat'}}>View</button></td>
        </tr>
    )
}

export default SupervisorInternAssessment;