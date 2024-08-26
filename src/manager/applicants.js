import { faHouse, faBriefcase, faUserTie, faRightFromBracket, faBars, faXmark, faSort, faPaperclip, faEnvelopeOpen, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import './applicants.css'
import './sidebar1.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import defaultProf from './assets/defaultProf.jpg'

import Swal from 'sweetalert2'


const url = 'http://127.0.0.1:8000/'

const managerId = localStorage.getItem('managerId');

const ManagerApplicants = () => {
    const [menu, setMenu] = useState(false);
    const [applicantsData, setApplicantsData] = useState([])
    const [managerData, setManagerData] = useState([])

    const [nextUrl, setNextUrl] = useState()
    const [previousUrl, setPreviousUrl] = useState()


    useEffect (()=>{
        document.title = "Applicants"
        try{
            // axios.get(url+'student/student-roles-applied1/')
            axios.get(url+'student/managerstudentapplications-list/'+managerId+'/')
            .then((response)=>{
                setApplicantsData(response.data.results)
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
        try{
            axios.get(url+"manager/"+managerId)
            .then((response)=>{
                setManagerData(response.data)
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
    
    let company_pic = managerData.companyLogo

    if(managerData.companyLogo === null){
        company_pic = defaultProf
    }

    const paginationHandler = (url) => {
        try{
            axios.get(url)
            .then((response)=>{
                setNextUrl(response.data.next)
                setPreviousUrl(response.data.previous)
                setApplicantsData(response.data.results)
            })
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <main className="managerApplicantsBody">
            <header>
                <div className='profile'>
                    <img src={company_pic} alt={managerData.companyName} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>{managerData.companyName}</h2>
                        <div className='applicantshamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'applicantsSidebar' : 'applicantsNonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                {/* <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p> */}
                            <div className='applicantsSidebarIcons'>
                                <Link to ="/manager/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                                <Link to ="/manager/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Your Vacancies</div></Link>
                                <Link to ="/manager/applicants-offer-status"><div><FontAwesomeIcon icon={faEnvelopeOpen} style={{paddingRight: '1rem', width: '10%'}}/>Applicants Status</div></Link>
                                <Link to ="/manager/applicantsboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div></Link>
                                <Link to ="/manager/profile"><div><FontAwesomeIcon icon={faUser} style={{paddingRight: '1rem', width: '10%'}}/>Profile</div></Link>
                                <Link to ="/portal"><div><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div></Link>
                            </div>
                            </article>
                        </div>
                    </div>
                </div>
            </header>
            <section className='mainContainer'>
                <article className='applicantssidebar'>
                    {/* <p style={{fontFamily: 'Segoe UI', marginTop: '-3rem', marginBottom: '3rem', marginLeft: '-1rem', fontWeight:'600',}}>Welcome to dashboard</p> */}
                    <div className='applicantssidebarIcons'>
                        <Link to ="/manager/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/manager/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Your Vacancies</div></Link>
                        <Link to ="/manager/applicants-offer-status"><div><FontAwesomeIcon icon={faEnvelopeOpen} style={{paddingRight: '1rem', width: '10%'}}/>Applicants Status</div></Link>
                        <Link to ="/manager/applicantsboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div></Link>
                        <Link to ="/manager/profile"><div><FontAwesomeIcon icon={faUser} style={{paddingRight: '1rem', width: '10%'}}/>Profile</div></Link>
                        <Link to ="/portal"><div><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div></Link>
                    </div>
                </article>
                <article className="mainApplicantsBody">
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', fontFamily: 'Poppins', textAlign: 'center', margin: 'auto', marginTop: '-2rem'}}>Candidates</p>
                    <div className='table'>
                    <table className="applicantsdeets">
                    <thead>
                    <tr style={{border: 'none'}}>
                        <th style={{paddingLeft: '1rem', backgroundColor: '#ffffff', border: 'none'}}></th>
                        <th style={{paddingLeft: "1rem", borderTopLeftRadius: "6px", borderBottomLeftRadius: "6px", border: 'none'}}>Canadidate Name</th>
                        <th style={{border: 'none'}}>Applied Role</th>
                        <th style={{cursor: 'pointer', border: 'none'}}>Application Date<FontAwesomeIcon icon={faSort} style={{paddingLeft: '4px', fontSize: '10px'}}/></th>
                        <th style={{border: 'none'}}>Attachments</th>
                        <th style={{borderTopRightRadius: "6px", borderBottomRightRadius: "6px", border: 'none', paddingRight: '1rem'}}>Approval</th>
                    </tr>
                    </thead>
                    {applicantsData.map((data)=>{
                        const {id, student, role, applicationDate, applicationFile} = data;
                        // if(role.company.id == managerId){
                            return(
                                <Applicants key={id} id={id} role={role} student={student} applicationDate={applicationDate} applicationFile={applicationFile}/>
                            )
                        // }
                        // return(
                        //     null
                        // )
                    })}
                    <tbody>
                    <tr >
                        <td style={{border: 'none'}}></td>
                        <td colSpan='7' style={{border: 'none', fontSize: '12px', padding: '18px', margin: 'auto', paddingTop: '2rem', textAlign: 'center'}}>
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
                <article className="mainApplicantsBody">
                <p style={{ fontSize: '1.1rem', fontFamily: 'Poppins', textAlign: 'center', margin: '0.5rem auto 2rem',}}>Candidates</p>
                    
                </article>
                <div className='table'>
                    <table className="applicantsdeets">
                    <thead>
                    <tr>
                        <th style={{paddingLeft: '1rem', backgroundColor: '#ffffff', border: 'none'}}></th>
                        <th style={{paddingLeft: "1rem", borderTopLeftRadius: "6px", borderBottomLeftRadius: "6px", border: 'none' }}>Canadidate Name</th>
                        <th style={{border: 'none'}}>Applied Role</th>
                        <th style={{cursor: 'pointer', border: 'none'}}>Application Date<FontAwesomeIcon icon={faSort} style={{paddingLeft: '4px', fontSize: '10px', borderBottom: 'none'}}/></th>
                        <th style={{border: 'none'}}>Attachments</th>
                        <th style={{borderTopRightRadius: "6px", borderBottomRightRadius: "6px", border: 'none', paddingRight: '1rem'}}>Approval</th>
                    </tr>
                    </thead>
                    {applicantsData.map((data)=>{
                        const {id, student, role, applicationDate, applicationFile} = data;
                        // if(role.company.id == managerId && approval === ""){
                            // if(role.company.id == managerId){
                                return(
                                    <Applicants key={id} id={id} role={role} student={student} applicationDate={applicationDate} applicationFile={applicationFile}/>
                            )
                        // }
                        // return(
                        //     null
                        // )
                    })}
                    <tbody>
                    <tr >
                        <td style={{border: 'none'}}></td>
                        <td colSpan='7' style={{border: 'none', fontSize: '12px', padding: '18px', margin: 'auto', paddingTop: '2rem',paddingBottom:'2rem', textAlign: 'center'}}>
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

const Applicants = ({id, student, role, applicationDate, applicationFile}) => {

    const [acceptData, setAcceptData] = useState({
        'smallInfo' :"",
        'optionalFile': "",
    })

    const [acceptError, setAcceptError] = useState('')
    const [acceptInfo, setAcceptInfo] = useState(false)

    const handleChange = (event)=>{
        setAcceptData({
            ...acceptData,
            [event.target.name]:event.target.value
        })
    }

    const handleFileChange=(event)=>{
        setAcceptData({
            ...acceptData,
            [event.target.name]:event.target.files[0]
        })
    }
    
    let showAcceptBtn1 = ""
    if (acceptInfo === true){
        showAcceptBtn1 = "none";
    }

    let profile = student.profile_pic
    if (student.profile_pic === null){
        profile = defaultProf
    }
    const handleReject = (id, name, role, student_id, role_id, company) => {
        Swal.fire({
            title: 'Confirm',
            text: `Are you sure you want to reject ${name}'s internship application for the ${role} role?`,
            icon: 'info',
            confirmButtonText: 'Yes, Reject',
            showCancelButton: true
          })
          .then((result)=>{
            if(result.isConfirmed){
                const studentInternshipData = new FormData();
                studentInternshipData.append("student", student_id)
                studentInternshipData.append("role", role_id)
                studentInternshipData.append("approval", "Rejected")

                try{
                    axios.post(url+'/student/student-applied-internships/', studentInternshipData)
                    .then((response)=>{
                        try{
                            axios.delete(url+'/student/student-roles-applied/'+id)
                            .then((response)=>{
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
                                      })
                                  }
                            })
                            window.location.href='/manager/applicantsboard'
                        }
                        catch(error){
                            console.log(error)
                        }
                    })
                }catch(error){
                    console.log(error)
                }
                const studentNotification = new FormData();
                    studentNotification.append("student", student_id)
                    let notMessage = "Your application to intern as a " + role + " at " + company + " has been rejected"
                    studentNotification.append("notText", notMessage)

                    try{
                        axios.post(url+'/student/student-company-notification/', studentNotification)
                        .then((response)=>{
                        })
                    }catch(error){
                        console.log(error)
                    }
            }
          })
    }

    const handleAccept = (id, name, role, student_id, role_id, company) => {
        if(acceptData.optionalFile === "" && acceptData.smallInfo.length < 3){
            setAcceptError("Please provide any necessary information for your yet to be accepted intern")
            return;
        }
        else{
            setAcceptError("")
        }
        if(acceptData.optionalFile !== "" || acceptData.smallInfo.length > 2){
            Swal.fire({
                title: 'Confirm',
                text: `Are you sure you want to accept ${name}'s internship application for the ${role} role?`,
                icon: 'info',
                confirmButtonText: 'Yes, Accept',
                showCancelButton: true
            })
            .then((result)=>{
                if(result.isConfirmed){
                    const studentInternshipData = new FormData();
                    studentInternshipData.append("student", student_id)
                    studentInternshipData.append("role", role_id)
                    studentInternshipData.append("approval", "Accepted")
                    studentInternshipData.append("optionalFile", acceptData.optionalFile)
                    studentInternshipData.append("smallInfo", acceptData.smallInfo)

                    try{
                        axios.post(url+'/student/student-applied-internships/', studentInternshipData, {
                            headers: {
                                'content-type': 'multipart/form-data'
                            }
                        })
                        .then((response)=>{
                            try{
                                axios.delete(url+'/student/student-roles-applied/'+id)
                                .then((response)=>{
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
                                          })
                                      }
                                })
                                window.location.href='/manager/applicantsboard'
                            }
                            catch(error){
                                console.log(error)
                            }
                        })
                    }catch(error){
                        console.log(error)
                    }
                    const studentNotification = new FormData();
                    studentNotification.append("student", student_id)
                    let notMessage = "Your application to intern as a " + role + " at " + company + " has been accepted"
                    studentNotification.append("notText", notMessage)

                    try{
                        axios.post(url+'/student/student-company-notification/', studentNotification)
                        .then((response)=>{
                        })
                    }catch(error){
                        console.log(error)
                    }
                }
            })
        }
    }

    const onCancel = () => {
        setAcceptInfo(false)
        setAcceptError("")
        setAcceptData({
            'smallInfo' :"",
            'optionalFile': "",
        })
    }
    return(
        <tbody>
        <tr>
            <td style={{paddingLeft: '1rem', borderTop: 'none'}}><img src={profile} alt={student.last_name} style={{width: "30px", height: "30px", objectFit: 'cover', borderRadius: '50%'}}></img></td>
            <td style={{}}>{student.other_names}</td>
            <td>{role.role}</td>
            <td>{applicationDate}</td>
            <td style={{cursor: 'pointer'}}><a href={applicationFile} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faPaperclip} style={{paddingRight: '8px'}}/>{applicationFile.substr(28)}</a></td>
            <td style={{cursor: 'pointer'}}>
                <button style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', marginRight: '0.5rem', display: showAcceptBtn1}} onClick={()=>setAcceptInfo(true)}>Accept</button>
                <button style={{fontSize: '13px', backgroundColor: "#ff3333", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat'}} onClick={()=>handleReject(id, student.other_names, role.role, student.student_id, role.id, role.company.companyName)}>Reject</button>
            </td>
        </tr>
        {acceptInfo && <tr>
            <td style={{paddingLeft: '1rem', border: 'none'}}></td>
            <td style={{borderTop: 'none'}} colSpan='6'>
            {acceptError && <p style={{ fontSize: '12.5px', color: "#ff3333", marginBottom: '0', marginTop: '-10px'}}>{acceptError}</p>}
                <span style={{fontWeight: 'bold', fontFamily: 'Montserrat', color: '#4C4C4C'}}>Provide Short Info on the role for the user: </span><input style={{padding: "1px 5px 1px 5px", width: '200px',}} value={acceptData.smallInfo} onChange={handleChange} name='smallInfo'/>
                <span style={{marginLeft: '8px', fontWeight: 'bold', fontFamily: 'Montserrat', color: '#4C4C4C'}}>Or submit a doc file for the user: </span><input type='file' accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf" required name='optionalFile' onChange={handleFileChange}/>
                <button style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', marginLeft: "10px"}} onClick={()=>handleAccept(id, student.other_names, role.role, student.student_id, role.id, role.company.companyName)}>Accept</button>
                <button style={{fontSize: '13px', backgroundColor: "#ff3333", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', marginRight: '0.5rem', marginLeft: "10px"}} onClick={()=>onCancel()}>Cancel</button>
            </td>
            </tr>
        }
        </tbody>
    )
}

export default ManagerApplicants;