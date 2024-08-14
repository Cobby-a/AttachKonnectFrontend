import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './appliedInternship.css'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

import axios from 'axios';

    const url = 'http://127.0.0.1:8000/'
    const studentId = localStorage.getItem('studentId');

    // const modStyle = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     // width: '100%',
    //     bgcolor: 'background.paper',
    //     // border: '2px solid #000',
    //     boxShadow: 24,
    //     borderRadius: 1,
    //     p: 4,
    // };


const AppliedInternships = () => {
    // companyName.split(` `).join(`-`).toLowerCase()
    
    const [studentApplicationsData, setstudentApplicationsData] = useState([])
    const [studentInternshipData, setStudentInternshipData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)


    useEffect (()=>{
        document.title = ("Your Applied Internships")
        try{
            axios.get(url+'student/studentapplication-list/'+studentId)
            .then((response)=>{
                setstudentApplicationsData(response.data)
            });
        }
        catch(error){
            console.log(error)
        }
        try{
            axios.get(url+'student/studentinternship-list/'+studentId)
            .then((response)=>{
                setStudentInternshipData(response.data)
            });
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
        <article className='yourAppliedInternshipsBody'  style={{display: modalOpen ? "none" : "",}}>
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
                <p>Your Attachment File: <a href={applicationFile} target="_blank" rel="noreferrer" style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", cursor: 'pointer'}}><FontAwesomeIcon icon={faPaperclip} style={{paddingRight: '4px', paddingLeft :'6px'}}/>{applicationFile.substr(28)}</a></p>
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
                    let notMessage = student_lastname+" has rejected the offer to intern with you"
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
                    <p>Attachment File on your accepted role (if any): <a href={optionalFile} target="_blank" rel="noreferrer" style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", cursor: 'pointer'}}>{optionalFile !== null && <FontAwesomeIcon icon={faPaperclip} style={{paddingRight: '4px', paddingLeft :'6px'}}/>}{optionalFile !== null && optionalFile.substr(28)}</a></p>
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