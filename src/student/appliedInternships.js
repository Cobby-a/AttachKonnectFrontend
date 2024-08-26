import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './appliedInternship.css'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';


import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

import axios from 'axios';

    const url = 'https://attachmentkonnect.pythonanywhere.com/'
    const studentId = localStorage.getItem('studentId');



const AppliedInternships = () => {
    // companyName.split(` `).join(`-`).toLowerCase()
    
    const [studentApplicationsData, setstudentApplicationsData] = useState([])
    const [studentInternshipData, setStudentInternshipData] = useState([])


    useEffect (()=>{
        document.title = ("Your Applied Internships")
        try{
            axios.get(url+'student/studentapplication-list/'+studentId)
            .then((response)=>{
                setstudentApplicationsData(response.data)
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
            axios.get(url+'student/studentinternship-list/'+studentId)
            .then((response)=>{
                setStudentInternshipData(response.data)
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
    },[])
    let show = "none"
    
    if (studentApplicationsData.length < 1 && studentInternshipData.length < 1){
        show = "block"
    }
    return(
        <article className='yourAppliedInternshipsBody'>
            <section className='yourAppliedInternshipContainer' >
                <div style={{}}>
                    <p style={{fontFamily: 'Montserrat', fontWeight: "500", color: "#000", textTransform:'uppercase', fontSize: "1.2rem", textAlign: 'center', marginBottom: '3rem',}}>Your Applied Internships</p>
                </div>
                <div className='form'>
                    {}
                    <p style={{display: show, textAlign: 'center', fontFamily: 'Montserrat', fontSize: '1rem', color: '#002D5D',}}>You have not applied for any Internship on the system.</p>
                    {studentInternshipData.map((data)=>{
                        const {id, role, approval, smallInfo, optionalFile, student} = data;
                        
                        return(
                            <>
                            <StudentInternship key={id} id={id} approval={approval} role={role} optionalFile={optionalFile} smallInfo={smallInfo} student={student}/>
                            </>
                        )
                    })}
                    {studentApplicationsData.map((data)=>{
                        const {id, role, applicationFile, approval} = data;
                        
                        return(
                            <>
                            <CompanyDeet key={id} approval={approval} role={role} applicationFile={applicationFile}/>
                            </>
                        )
                    })}
                </div>
            </section>
        </article>
    )
}
const CompanyDeet = ({role, approval, applicationFile}) => {

    return(
        <div className="formContainer1">
            <div style={{flex: 1, width:"100%", }}>
                <p>Name of Role: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{role.role}</span></p>
            </div>
            <div style={{flex: 1, width:"100%", }}>
                <p>Company: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{role.company.companyName}</span></p>
            </div>
            {/* <div style={{flex: 1, width:"100%", }}>
                <p>Deadline for submission:  <span style={{fontSize: '14px', color: '#000000', fontFamily: "Montserrat", }}>{deadline}</span></p>
            </div> */}
            <div style={{flex: 1, width:"100%",}}>
                <p>Your Attachment File: <a href={applicationFile} target="_blank" rel="noreferrer" style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", cursor: 'pointer'}}><FontAwesomeIcon icon={faPaperclip} style={{paddingRight: '4px', paddingLeft :'6px'}}/>{applicationFile.substr(51)}</a></p>
            </div>
            <div style={{flex: 1, width:"100%",}}>
                <p>Approval: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{approval}</span></p>
            </div>
        </div>
    )
}

const StudentInternship = ({id, role, approval, smallInfo, optionalFile, student}) => {

    let classname = "rejected";


    if(approval === 'Accepted'){
        classname = "accepted"
    }

    const [studentInterData, setStudentInterData] = useState({
        'offer' :'',
    })

    const handleChange=(event)=>{
        setStudentInterData({
            ...studentInterData,
            [event.target.name]:event.target.value
        })
    }
    const handleDecline = (id, role, student_id, role_id, company_id, student_lastname) => {
        Swal.fire({
            title: 'Confirm',
            text: `Are you sure you want to decline your ${role}'s internship offer?`,
            icon: 'info',
            confirmButtonText: 'Yes, Decline',
            showCancelButton: true
          })
          .then((result)=>{
            if(result.isConfirmed){
                const studentInternshipData = new FormData();
                studentInternshipData.append("student", student_id)
                studentInternshipData.append("role", role_id)
                studentInternshipData.append("company", company_id)
                studentInternshipData.append("offer", studentInterData.offer)

                try{
                    axios.post(url+'/student/studentinternships/', studentInternshipData)
                    .then((response)=>{
                        console.log(response)
                        try{
                            axios.delete(url+'/student/student-applied-internships/'+id)
                            .then((response)=>{
                                console.log(response)
                            })
                            window.location.href='/student/your-internships'
                        }
                        catch(error){
                            console.log(error)
                        }
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
                }catch(error){
                    console.log(error)
                }

                const managerNotification = new FormData();
                    managerNotification.append("company", company_id)
                    managerNotification.append("role", role_id)
                    let notMessage = student_lastname+" has rejected the offer to intern with you"
                    managerNotification.append("notText", notMessage)

                    try{
                        axios.post(url+'/manager/company-student-notification/', managerNotification)
                        .then((response)=>{
                            console.log(response)
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
                    }catch(error){
                        console.log(error)
                    }
            }
          })
    }

    const handleAccept = (id, role, student_id, role_id, company_id, student_lastname) => {
        
            Swal.fire({
                title: 'Confirm',
                text: `Accept the ${role}'s internship ?`,
                icon: 'info',
                confirmButtonText: 'Yes, Accept',
                showCancelButton: true
            })
            .then((result)=>{
                if(result.isConfirmed){
                    const studentInternshipData = new FormData();
                    studentInternshipData.append("student", student_id)
                    studentInternshipData.append("role", role_id)
                    studentInternshipData.append("company", company_id)
                    studentInternshipData.append("offer", studentInterData.offer)

                    try{
                        axios.post(url+'/student/studentinternships/', studentInternshipData)
                        .then((response)=>{
                            console.log(response)
                            try{
                                axios.delete(url+'/student/student-applied-internships/'+id)
                                .then((response)=>{
                                    console.log(response)
                                })
                                window.location.href='/student/your-internships'
                            }
                            catch(error){
                                console.log(error)
                            }
                        })
                    }catch(error){
                        console.log(error)
                    }
                    const managerNotification = new FormData();
                    managerNotification.append("company", company_id)
                    managerNotification.append("role", role_id)
                    let notMessage = student_lastname+" has accepted the offer to intern with you"
                    managerNotification.append("notText", notMessage)

                    try{
                        axios.post(url+'/manager/company-student-notification/', managerNotification)
                        .then((response)=>{
                            console.log(response)
                        })
                    }catch(error){
                        console.log(error)
                    }
                }
            })
    }
    return(
        <div className="formContainer1">
            <div style={{flex: 1, width:"100%", }}>
                <p>Name of Role: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{role.role}</span></p>
            </div>
            <div style={{flex: 1, width:"100%", }}>
                <p>Company: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{role.company.companyName}</span></p>
            </div>
            {/* <div style={{flex: 1, width:"100%", }}>
                <p>Deadline for submission:  <span style={{fontSize: '14px', color: '#000000', fontFamily: "Montserrat", }}>{deadline}</span></p>
            </div> */}
            <div style={{flex: 1, width:"100%",}}>
                <p>Approval: <span className={classname} style={{fontSize: '14px', fontFamily: "Montserrat", }}>{approval}</span></p>
            </div>
            {approval === "Accepted" &&
                <>
                <div style={{flex: 1, width:"100%",}}>
                    <p>Attachment File on your accepted role (if any): <a href={optionalFile} target="_blank" rel="noreferrer" style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", cursor: 'pointer'}}>{optionalFile !== null && <FontAwesomeIcon icon={faPaperclip} style={{paddingRight: '4px', paddingLeft :'6px'}}/>}{optionalFile !== null && optionalFile.substr(51)}</a></p>
                </div>
                <div style={{flex: 1, width:"100%",}}>
                    <p>Info about your accepted role (if any): <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{smallInfo}</span></p>
                </div>
                <div>
                    <span style={{fontSize: '13px', color: '#4C4C4C', lineHeight: '16px', fontFamily: 'Poppins'}}>Choose if you want this role or not: </span>
                    <select name="offer" id="offer" onChange={handleChange} style={{marginRight: '0.5rem'}}>
                        <option></option>
                        <option value="Accepted" style={{cursor: 'pointer'}}>Accept</option>
                        <option value="Declined">Decline</option>
                    </select>
                    {studentInterData.offer === 'Accepted' && <button onClick={()=>handleAccept(id, role.role, studentId, role.id, role.company.id, student.last_name)}>Accept</button>}
                    {studentInterData.offer === 'Declined' && <button onClick={()=>handleDecline(id, role.role, studentId, role.id, role.company.id, student.last_name)}>Decline</button>}
                </div>
                </>
            }
        </div>
    )
}

export default AppliedInternships;