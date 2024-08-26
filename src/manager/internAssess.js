import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './internAssess.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'


import axios from 'axios';

const baseUrl = 'https://attachmentkonnect.pythonanywhere.com/'
const managerId = localStorage.getItem('managerId');


const ManagerInternAssessment = () => {
    const [studentAssessData, setStudentAssessData] = useState({
            "student": "",
            "company": "",
            "email": "",
            "durationOfInternship": "",
            "qualityOfWork": "",
            "abilityToWork": "",
            "initiativeAndCreativity": "",
            "characterTraits": "",
            "dependabilty": "",
            "attendanceAndPunctuality": "",
            "organizationalFit": "",
            "responseToSupervision": "",
            "suggestionsForImprovement": "",
            "nameOfSupervisor": "",
            "positionOfSupervisor": "",
            "supervisorEmail": "",
            "supervisorContact": "",
    })
    const [studentData, setStudentData] = useState([])

    const [studentError, setStudentError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [durationError, setDurationError] = useState('')
    const [qualityError, setQualityError] = useState('')
    const [abilityError, setAbilityError] = useState('')
    const [initiativeError, setInitiativeError] = useState('')
    const [characterError, setCharacterError] = useState('')
    const [dependabiltyError, setDependatbilityError] = useState('')
    const [attendanceError, setAttendanceError] = useState('')
    const [orgnizationalError, setOrganizationalError] = useState('')
    const [responseError, setResponseError] = useState('')
    const [supervisorNameError, setSupervisorNameError] = useState('')


    const handleChange=(event)=>{
        setStudentAssessData({
            ...studentAssessData,
            [event.target.name]:event.target.value
        })
    }
    useEffect (()=>{
        document.title = "Manager - Intern Assessment"
        try{
            axios.get(baseUrl+'student/managerstudentinternships-list1/'+managerId)
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
            console.log(error)
        }
    },[])

    const onSubmitApplication = () => {
        if(studentAssessData.student.length < 1){
            setStudentError("Field cannot be left empty")
            return;
        }
        else if(studentAssessData.student.length >= 1){
            setStudentError("")
        }
        if(studentAssessData.email.length < 1){
            setEmailError("Field cannot be left empty")
            return;
        }
        else if(studentAssessData.email.length >= 1){
            setEmailError("")
        }
        if(studentAssessData.durationOfInternship.length < 1){
            setDurationError("Field cannot be left empty")
            return;
        }
        else if(studentAssessData.durationOfInternship.length >= 1){
            setDurationError("")
        }
        if(studentAssessData.qualityOfWork.length < 1){
            setQualityError("Field cannot be left empty")
            return;
        }
        else if(studentAssessData.qualityOfWork.length >= 1){
            setQualityError("")
        }
        if(studentAssessData.abilityToWork.length < 1){
            setAbilityError("Field cannot be left empty")
            return;
        }
        else if(studentAssessData.abilityToWork.length >= 1){
            setAbilityError("")
        }
        if(studentAssessData.initiativeAndCreativity.length < 1){
            setInitiativeError("Field cannot be left empty")
            return;
        }
        else if(studentAssessData.initiativeAndCreativity.length >= 1){
            setInitiativeError("")
        }
        if(studentAssessData.characterTraits.length < 1){
            setCharacterError("Field cannot be left empty")
            return;
        }
        else if(studentAssessData.characterTraits.length >= 1){
            setCharacterError("")
        }
        if(studentAssessData.dependabilty.length < 1){
            setDependatbilityError("Field cannot be left empty")
            return;
        }
        else if(studentAssessData.dependabilty.length >= 1){
            setDependatbilityError("")
        }
        if(studentAssessData.attendanceAndPunctuality.length < 1){
            setAttendanceError("Field cannot be left empty")
            return;
        }
        else if(studentAssessData.attendanceAndPunctuality.length >= 1){
            setAttendanceError("")
        }
        if(studentAssessData.organizationalFit.length < 1){
            setOrganizationalError("Field cannot be left empty")
            return;
        }
        else if(studentAssessData.organizationalFit.length >= 1){
            setOrganizationalError("")
        }
        if(studentAssessData.responseToSupervision.length < 1){
            setResponseError("Field cannot be left empty")
            return;
        }
        else if(studentAssessData.responseToSupervision.length >= 1){
            setResponseError("")
        }
        if(studentAssessData.nameOfSupervisor.length < 1){
            setSupervisorNameError("Field cannot be left empty")
            return;
        }
        else if(studentAssessData.nameOfSupervisor.length >= 1){
            setSupervisorNameError("")
        }
        if(studentAssessData.student.length >= 1 && studentAssessData.email.length >= 1 && studentAssessData.durationOfInternship.length >= 1 && studentAssessData.qualityOfWork.length >= 1 && studentAssessData.abilityToWork.length >= 1 && studentAssessData.initiativeAndCreativity.length >= 1 && studentAssessData.characterTraits.length >= 1 && studentAssessData.dependabilty.length >= 1 && studentAssessData.attendanceAndPunctuality.length >= 1 && studentAssessData.organizationalFit.length >= 1 && studentAssessData.responseToSupervision.length >= 1){
            Swal.fire({
                title: 'Confirm',
                text: `Make an assessment form?`,
                icon: 'info',
                confirmButtonText: 'Yes, Continue',
                showCancelButton: true
            })
            .then((result)=>{
                if(result.isConfirmed){
                    const managerAssessmentData = new FormData();
                    managerAssessmentData.append("student", studentAssessData.student)
                    managerAssessmentData.append("company", managerId)
                    managerAssessmentData.append("email", studentAssessData.email)
                    managerAssessmentData.append("durationOfInternship", studentAssessData.durationOfInternship)
                    managerAssessmentData.append("qualityOfWork", studentAssessData.qualityOfWork)
                    managerAssessmentData.append("abilityToWork", studentAssessData.abilityToWork)
                    managerAssessmentData.append("initiativeAndCreativity", studentAssessData.initiativeAndCreativity)
                    managerAssessmentData.append("characterTraits", studentAssessData.characterTraits)
                    managerAssessmentData.append("dependabilty", studentAssessData.dependabilty)
                    managerAssessmentData.append("attendanceAndPunctuality", studentAssessData.attendanceAndPunctuality)
                    managerAssessmentData.append("organizationalFit", studentAssessData.organizationalFit)
                    managerAssessmentData.append("responseToSupervision", studentAssessData.responseToSupervision)
                    managerAssessmentData.append("suggestionsForImprovement", studentAssessData.suggestionsForImprovement)
                    managerAssessmentData.append("nameOfSupervisor", studentAssessData.nameOfSupervisor)
                    managerAssessmentData.append("positionOfSupervisor", studentAssessData.positionOfSupervisor)
                    managerAssessmentData.append("supervisorEmail", studentAssessData.supervisorEmail)
                    managerAssessmentData.append("supervisorContact", studentAssessData.supervisorContact)

                    try{
                        axios.post(baseUrl+'student/student-assessment/', managerAssessmentData, {
                            headers: {
                                'content-type': 'multipart/form-data'
                            }
                        })
                        .then((response)=>{
                            setStudentAssessData({
                                "student": "",
                                "company": "",
                                "email": "",
                                "durationOfInternship": "",
                                "qualityOfWork": "",
                                "abilityToWork": "",
                                "initiativeAndCreativity": "",
                                "characterTraits": "",
                                "dependabilty": "",
                                "attendanceAndPunctuality": "",
                                "organizationalFit": "",
                                "responseToSupervision": "",
                                "suggestionsForImprovement": "",
                                "nameOfSupervisor": "",
                                "positionOfSupervisor": "",
                                "supervisorEmail": "",
                                "supervisorContact": "",
                            });
                            const studentAssessmentNotification = new FormData();
                            let notMessage = "Your have a new intern assessment form for student, " + studentAssessData.student
                            studentAssessmentNotification.append("notText", notMessage)

                            try{
                                axios.post(baseUrl+'/supervisor/supervisor-company-notification/', studentAssessmentNotification)
                                .then((response)=>{
                                    console.log(response)
                                })
                            }catch(error){
                                console.log(error)
                            }
                            window.location.reload()
                        })
                        .catch((error)=>{
                            console.log(error.response.data.student[0])
                            if (error.response.data.student[0] === 'student assessment with this student already exists.') {
                                Swal.fire({
                                    title: 'Error',
                                    text: `Student assessment with this student already exists.`,
                                    icon: 'error',
                                    showCancelButton: true,
                                    showConfirmButton: false,
                                    cancelButtonText: 'Try Again',
                                    cancelButtonColor: '#ff3333'
                                })
                            }
                            else if (error.response) {
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
            })        
        }
    }
    return(
        <article className='internAssessBody' >
            <section className='manageUserContainer'>
                <div style={{display: 'flex', justifyContent:'space-between',}}>
                    <p style={{fontFamily: 'Montserrat', fontWeight: "600", textTransform:'uppercase', fontSize: "1.2rem", alignContent: 'center', alignSelf: 'center'}}>Intern Assessment</p>
                    <Link to="/portal"><FontAwesomeIcon icon={faXmark} style={{fontSize: "32px", color: "#8F8F8F", cursor:'pointer',marginTop: "-0.5rem"}}/></Link>
                </div>
                <div className='form'>
                    <div className="formContainer1">
                        <div style={{flex: 1}}>
                            <label>Student</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                                    <div className='input'>
                                        <select name="student" id="student" onChange={handleChange} style={{cursor: 'pointer'}}>
                                            <option></option>
                                        {studentData.map((data)=>{
                                            const {student, offer} = data;
                                            if(offer ==="Accepted"){
                                            return(
                                                <option value={student.student_id}>{student.student_id} - {student.last_name} {student.other_names}</option>
                                            )
                                        }
                                        return null
                                        })}
                                        </select>
                                    {studentError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{studentError}</p>}
                                    </div>
                            {/* <div className='input'><input type='text' required name='companyName' value={managerData.companyName} onChange={handleChange} /></div> */}
                        </div>
                        <div style={{flex: 1}}>
                            <label>Email</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                            <div className='input'><input type='email' required name='email' value={studentAssessData.email} onChange={handleChange}/></div>
                            {emailError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{emailError}</p>}
                        </div>
                        <div style={{flex: 1}}>
                            <label>Maximum duration of Internship(weeks)</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                            <div className='input'><input type='text' required name='durationOfInternship' value={studentAssessData.durationOfInternship} onChange={handleChange}/></div>
                            {durationError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{durationError}</p>}
                        </div>
                    </div>
                    <div className="formContainer1">
                        <div style={{flex: 1}}>
                            <label>Quality of work</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                            <div className='input'>
                                <select name="qualityOfWork" id="qualityOfWork" onChange={handleChange} style={{cursor: 'pointer'}}>
                                    <option></option>
                                    <option value="1">1 (Needs Improvement)</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6 (Excellent)</option>
                                </select>
                            </div>
                            {qualityError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{qualityError}</p>}
                        </div>
                        <div style={{flex: 1}}>
                            <label>Ability to Learn</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                                <div className='input'>
                                    <select name="abilityToWork" id="abilityToWork" onChange={handleChange} style={{cursor: 'pointer'}}>
                                        <option></option>
                                        <option value="1">1 (Needs Improvement)</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6 (Excellent)</option>
                                    </select>
                                </div>
                            {abilityError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{abilityError}</p>}
                            </div>
                        <div style={{flex: 1}}>
                            <label>Initiative and Creativity</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                                <div className='input'>
                                    <select name="initiativeAndCreativity" id="initiativeAndCreativity" onChange={handleChange} style={{cursor: 'pointer'}}>
                                        <option></option>
                                        <option value="1">1 (Needs Improvement)</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6 (Excellent)</option>
                                    </select>
                                </div>
                            {initiativeError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{initiativeError}</p>}
                        </div>
                    </div>
                    <div className='formContainer2'>
                        <div style={{flex: 1}}>
                            <label>Character Traits</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                                <div className='input'>
                                    <select name="characterTraits" id="characterTraits" onChange={handleChange} style={{cursor: 'pointer'}}>
                                        <option></option>
                                        <option value="1">1 (Needs Improvement)</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6 (Excellent)</option>
                                    </select>
                                </div>
                            {characterError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{characterError}</p>}
                        </div>
                        <div style={{flex: 1}}>
                            <label>Dependabilty</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                                <div className='input'>
                                    <select name="dependabilty" id="dependabilty" onChange={handleChange} style={{cursor: 'pointer'}}>
                                        <option></option>
                                        <option value="1">1 (Needs Improvement)</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6 (Excellent)</option>
                                    </select>
                                </div>
                            {dependabiltyError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{dependabiltyError}</p>}
                        </div>
                        <div style={{flex: 1}}>
                            <label>Attendance and Punctuality</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                                <div className='input'>
                                    <select name="attendanceAndPunctuality" id="attendanceAndPunctuality" onChange={handleChange} style={{cursor: 'pointer'}}>
                                        <option></option>
                                        <option value="1">1 (Needs Improvement)</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6 (Excellent)</option>
                                    </select>
                                </div>
                            {attendanceError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{attendanceError}</p>}
                        </div>
                    </div>
                    <div className='formContainer2'>
                        <div style={{flex: 1}}>
                            <label>Organizational Fit</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                                <div className='input'>
                                    <select name="organizationalFit" id="organizationalFit" onChange={handleChange} style={{cursor: 'pointer'}}>
                                        <option></option>
                                        <option value="1">1 (Needs Improvement)</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6 (Excellent)</option>
                                    </select>
                                </div>
                            {orgnizationalError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{orgnizationalError}</p>}
                        </div>
                        <div style={{flex: 1}}>
                            <label>Response to Supervision</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                                <div className='input'>
                                    <select name="responseToSupervision" id="responseToSupervision" onChange={handleChange} style={{cursor: 'pointer'}}>
                                        <option></option>
                                        <option value="1">1 (Needs Improvement)</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6 (Excellent)</option>
                                    </select>
                                </div>
                            {responseError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{responseError}</p>}
                        </div>
                        <div style={{flex: 1}}>
                            <label>Name of Supervisor </label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                            <div className='input'><input type='text' required name='nameOfSupervisor' value={studentAssessData.nameOfSupervisor} onChange={handleChange}/></div>
                            {supervisorNameError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{supervisorNameError}</p>}
                        </div>
                    </div>
                    <div className="formContainer1">
                        <div style={{flex: 1}}>
                            <label>Position of Supervisor</label>
                            <div className='input'><input type='text' required name='positionOfSupervisor' value={studentAssessData.positionOfSupervisor} onChange={handleChange} /></div>
                        </div>
                        <div style={{flex: 1}}>
                            <label>Supervisor's Email</label>
                            <div className='input'><input type='email' required name='supervisorEmail' value={studentAssessData.supervisorEmail} onChange={handleChange}/></div>
                        </div>
                        <div style={{flex: 1}}>
                            <label>Supervisor's Phone Contact</label>
                            <div className='input'><input type='text' required name='supervisorContact' value={studentAssessData.supervisorContact} onChange={handleChange}/></div>
                        </div>
                    </div>
                    <div className='formContainer3'>
                        <div style={{flex: 1}}>
                            <p>Suggestions for Improvement</p>
                            <textarea rows="10" name='suggestionsForImprovement' onChange={handleChange} value={studentAssessData.suggestionsForImprovement} required></textarea>
                        </div>
                    </div>
                    <button type='submit' onClick={onSubmitApplication}>Submit Assessment</button>
                </div>
                {/* <Modal
                    open={modalOpen}
                    onClose={()=>onClosed()}
                    aria-labelledby="title"
                    aria-describedby="description"                    
                >
                    <Box sx={modStyle} style={{maxWidth: '500px', width: '90%'}}>
                    <span style={{display: 'flex', justifyContent: 'flex-end'}}><FontAwesomeIcon onClick={()=>onClosed()} icon={faXmark} style={{fontSize: "32px", color: "#8F8F8F", cursor:'pointer',marginTop: "-1rem",}}/></span>   
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{fontFamily: 'Montserrat', padding: "1rem 1rem 1rem 1rem"}}>
                        Thank you for signing up your company, our admin will respond to your registration shortly via email.
                    </Typography>
                    </Box>
                </Modal> */}
            </section>
        </article>
    )
}

export default ManagerInternAssessment;