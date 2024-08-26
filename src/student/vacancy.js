import { faBuilding, faHouse, faBriefcase, faRightFromBracket, faBars, faXmark, faMagnifyingGlass, faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import './vacancy.css'
import './sidebar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import defaultProf from './assets/defaultProf.jpg'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Swal from 'sweetalert2'

const url = 'https://attachmentkonnect.pythonanywhere.com/'
const studentId = localStorage.getItem('studentId');


const modStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    p: 4,
};

const StudentVacancy = () => {
    const [menu, setMenu] = useState(false);
    const [studentData, setStudentData] = useState([])
    const [vacancyData, setVacancyData] = useState([]);
    const [nextUrl, setNextUrl] = useState()
    const [previousUrl, setPreviousUrl] = useState()

    const [modalOpen, setModalOpen] = useState(false)


    const [query, setQuery] = useState('');
    const results = filterItems(vacancyData, query)

    const onLogout = () =>{
        localStorage.removeItem('studentLoginStatus')
        window.location.href='/portal'
    }

    useEffect (()=>{
        document.title = "Vacancies"
        try{
            axios.get(url+"student/"+studentId)
            .then((response)=>{
                setStudentData(response.data)
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
        try{
            axios.get(url+'manager/rolesView/')
            .then((response)=>{
                setVacancyData(response.data.results)
                setNextUrl(response.data.next)
                setPreviousUrl(response.data.previous)
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
            console.log(error)
        }
    },[])

    function handleSearchChange(e) {
        setQuery(e.target.value);
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

    let profile_pic = studentData.profile_pic

    if(studentData.profile_pic === null){
        profile_pic = defaultProf
    }

    return(
        <main className="studentVacancyBody">
            <header>
                <div className='profile'>
                    <img src={profile_pic} alt={studentData.last_name} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>{studentData.last_name}</h2>
                        <div className='hamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'Sidebar' : 'NonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                {/* <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p> */}
                            <div className='SidebarIcons'>
                                <Link to ="/student/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                                <Link to ="/student/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                                <Link to ="/student/vacancyboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                                <Link to ="/student/profile"><div><FontAwesomeIcon icon={faUser} style={{paddingRight: '1rem', width: '10%'}}/>Profile</div></Link>
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
                        <Link to ="/student/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/student/companyboard"><div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div></Link>
                        <Link to ="/student/vacancyboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div></Link>
                        <Link to ="/student/profile"><div><FontAwesomeIcon icon={faUser} style={{paddingRight: '1rem', width: '10%'}}/>Profile</div></Link>
                        <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                    </div>
                </article>
                <article className="mainVacancyBody">
                    <div className='vacancySearch'>
                        <div>
                            <p style={{ fontSize: '1.2rem', marginBottom: '0.4rem', fontFamily: 'Poppins'}}>Vacancies</p>
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>Monitor interns, their contracts and reports.</p>
                        </div>
                        <form action="javascript:void(0);">
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '1.2rem', padding: "10px 10px 10px 14px", color: '#4C4C4C' }}/></span><input type='search' name='searchVacancy' placeholder='Search Vacancy'  value={query} onChange={handleSearchChange}/>
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
                        <th>Company</th>
                        <th style={{paddingRight: "2rem"}}></th>
                    </tr>
                    </thead>
                    {results.map((data)=>{
                        const {id, role, numberOfInterns, deadline, moreInfo, company, total_accepted_students} = data;

                        return(
                            <Vacancy1 key={id} roleId={id} role={role} numberOfInterns={numberOfInterns} deadline={deadline} moreInfo={moreInfo} company={company} total_accepted_students={total_accepted_students} setModalOpen={setModalOpen} modalOpen={modalOpen}/>
                        )
                    })}
                    <tbody>
                    <tr >
                        <td colSpan='7' style={{backgroundColor: "#F2F2F2", fontSize: '12px', padding: '18px'}}>
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
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>Monitor interns, their contracts and reports.</p>
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
                        <th>Company</th>
                        <th style={{paddingRight: "2rem"}}></th>
                    </tr>
                    </thead>
                    {results.map((data)=>{
                        const {id, role, numberOfInterns, deadline, moreInfo, company, total_accepted_students} = data;

                        return(
                            <Vacancy1 key={id} roleId={id} role={role} numberOfInterns={numberOfInterns} deadline={deadline} moreInfo={moreInfo} company={company} total_accepted_students={total_accepted_students} setModalOpen={setModalOpen} modalOpen={modalOpen}/>
                        )
                    })}
                    <tbody>
                    <tr >
                        <td colSpan='7' style={{backgroundColor: "#F2F2F2", fontSize: '12px', padding: '18px'}}>
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

const Vacancy1 = ({role, numberOfInterns, deadline, moreInfo, company, total_accepted_students, roleId, modalOpen, setModalOpen}) => {
    const [showInfo, setShowInfo] = useState(false);

    let slot_remaining = numberOfInterns - total_accepted_students
    if(total_accepted_students >= numberOfInterns){
        slot_remaining = "Quota reached"
    }
    const [studentApplyData, setStudentApplyData] = useState({
        'applicationFile' :'',
    })

    // const [onfile, setOnFile] = useState(false);
    const [appliedStatus, setAppliedStatus] = useState(false)
    const [applyInfo, setApplyInfo] = useState(false)
    const [onFirstApply, setOnFirstApply] = useState(true)


    let numberReached = false

    if (total_accepted_students >= numberOfInterns){
        numberReached = true
    }

    const handleFileChange=(event)=>{
        setStudentApplyData({
            ...studentApplyData,
            [event.target.name]:event.target.files[0]
        })
    }

    const [applicationError, setApplicationError] = useState('')

    const onClosed = () => {
        setModalOpen(false);
        window.location.href='/student/your-applied-internships';
    }

    const onSubmitApplication = (roleId, companyId, setModalOpen) => {
        if(studentApplyData.applicationFile === ""){
            setApplicationError("Please provide the necessary file to proceed")
            return;
        }
        else{
            setApplicationError("")
        }
        if(studentApplyData.applicationFile !== ""){
            const studentApplicationData = new FormData();
            studentApplicationData.append("student", studentId)
            studentApplicationData.append("role", roleId)
            studentApplicationData.append("company", companyId)
            studentApplicationData.append("applicationFile", studentApplyData.applicationFile, studentApplyData.applicationFile.name)

            try{
                axios.post(url+'student/student-roles-applied/', studentApplicationData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                .then((response)=>{
                    setModalOpen(true);
                })
                .catch((error)=>{
                    if (error.response) {
                        Swal.fire({
                            title: 'Error',
                            text: `There was a ${error.response.status} bad request adding or updating the data`,
                            icon: 'error',
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonText: 'Try Again',
                            cancelButtonColor: '#ff3333'
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
        }
    }
    const onApply = ()=>{
        setShowInfo(true)
        setApplyInfo(true)
        setOnFirstApply(false)
    }
    useEffect(()=>{
        try{
            axios.get(url+'student/fetch-applied-status/'+studentId+'/'+roleId)
            .then((response)=>{
                if(response.data.bool === true){
                    setAppliedStatus(true)
                }
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
    },[roleId])

    const onCancel = () => {
        setApplyInfo(false)
        setShowInfo(false)
        setApplicationError("")
        setOnFirstApply(true)
        setStudentApplyData({
            'applicationFile': "",
        })
    }

    return(
        <tbody>
        <tr style={{cursor: 'pointer'}}>
            <td style={{paddingLeft: '1rem'}} onClick={()=>setShowInfo(!showInfo)}>{role}</td>
            <td onClick={()=>setShowInfo(!showInfo)}>{numberOfInterns}</td>
            <td onClick={()=>setShowInfo(!showInfo)}>{slot_remaining}</td>
            <td onClick={()=>setShowInfo(!showInfo)}>{deadline}</td>
            <td onClick={()=>setShowInfo(!showInfo)}>{company.companyName}</td>
            <td style={{paddingRight: '2rem'}}>
                {!appliedStatus ? 
                    (numberReached ? 
                        <span style={{opacity: '0.4', padding: "4px 10px", backgroundColor: "#1A7AE0", borderRadius: "12px", color: "#ffffff", cursor: 'not-allowed'}}>Apply</span>
                            : 
                        (onFirstApply &&
                            <span style={{cursor: 'pointer', padding: "4px 10px", backgroundColor: "#1A7AE0", borderRadius: "12px", color: "#ffffff"}} onClick={()=>onApply()}>Apply</span>
                        )
                    )
                    :
                    <span style={{fontSize: '12px', color: '#ff3333', fontFamily: "Montserrat", }}>Already applied for this role</span>    
                }
            </td>
        </tr>
        <tr style={{borderTop: '0', }} className={showInfo ? 'showInfo1' : 'showInfo'}>
            <td colSpan='2' style={{paddingLeft: '1rem', borderTop: '0',paddingRight: "1.5rem" }}><span style={{fontWeight: 'bold', fontFamily: 'Montserrat', color: '#4C4C4C'}}>Short info on the role: </span>{moreInfo}</td>
            {applyInfo &&
                <>
                <td style={{borderTop: 'none'}} colSpan='4'>
                {applicationError && <p style={{ marginLeft: '8px', fontSize: '12.5px', color: "#ff3333", marginBottom: '0', marginTop: '-10px'}}>{applicationError}</p>}
                    <span style={{marginLeft: '8px', fontWeight: 'bold', fontFamily: 'Montserrat', color: '#4C4C4C'}}>Submit file for application: </span><input type='file' accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf" required name='applicationFile' onChange={handleFileChange}/>
                    <button style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', marginLeft: "10px"}} onClick={()=>onSubmitApplication(roleId, company.id, setModalOpen)}>Apply</button>
                    <button style={{fontSize: '13px', backgroundColor: "#ff3333", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', marginRight: '0.5rem', marginLeft: "10px"}} onClick={()=>onCancel()}>Cancel</button>
                </td>
                </>
            }
        </tr>
        <Modal
            open={modalOpen}
            onClose={()=>onClosed()}
            aria-labelledby="title"
            aria-describedby="description"                    
        >
            <Box sx={modStyle} style={{maxWidth: '500px', width: '90%'}}>
            <span style={{display: 'flex', justifyContent: 'flex-end'}}><FontAwesomeIcon onClick={()=>onClosed()} icon={faXmark} style={{fontSize: "32px", color: "#8F8F8F", cursor:'pointer',marginTop: "-1rem",}}/></span>   
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{fontFamily: 'Montserrat', padding: "1rem 1rem 1rem 1rem"}}>
                You have applied for the internship vacancy, {role} at {company.companyName}
            </Typography>
            </Box>
        </Modal>
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

export default StudentVacancy;