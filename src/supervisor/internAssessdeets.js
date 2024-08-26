import './internAssessdeets.css'
import { useParams } from "react-router-dom";


import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import axios from 'axios';

    const url = 'http://127.0.0.1:8000/'
    // const studentId = localStorage.getItem('studentId');



const StudentAssessmentDeets = () => {
    
    const [studentAssessmentData, setStudentAssessmentData] = useState([])

    const {id} = useParams();

    useEffect (()=>{
        document.title = (`${id} Internship Assessment Form`)
        try{
            axios.get(url+'student/student-assessment/'+id)
            .then((response)=>{
                setStudentAssessmentData(response.data)
                console.log(response.data)
            })
            .catch((error)=>{
                if (error.response) {
                    Swal.fire({
                        title: 'Error',
                        text: `There was a ${error.response.status} bad request requesting data`,
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
    },[id])
    
    return(
        <article className='studentAssessmentDeetsBody'>
            <section className='yourAppliedInternshipContainer' >
                <div style={{}}>
                    <p style={{fontFamily: 'Montserrat', fontWeight: "500", color: "#000", textTransform:'uppercase', fontSize: "1.2rem", textAlign: 'center', marginBottom: '3rem', lineHeight: '1.4rem'}}>{id} Internship Assessment Form</p>
                </div>
                <div className='form'>
                    <div className="formContainer1">
                        <div style={{flex: 1, width:"100%", }}>
                            <p>Email: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.email}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%", }}>
                            <p>Name of Student Intern: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.student_last_name} {studentAssessmentData.student_other_names}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%",}}>
                            <p>Name of Host Institution/Organization: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.company_name}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%",}}>
                            <p>Maximum duration of Internship: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.durationOfInternship}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%",}}>
                            <p>Quality of Work: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.qualityOfWork}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%",}}>
                            <p>Ability to Learn: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.abilityToWork}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%",}}>
                            <p>Initiative and Creativity: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.initiativeAndCreativity}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%",}}>
                            <p>Character Traits: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.characterTraits}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%",}}>
                            <p>Dependability: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.dependabilty}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%",}}>
                            <p>Attendance and Puntuality: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.attendanceAndPunctuality}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%",}}>
                            <p>Organizational Fit: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.organizationalFit}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%",}}>
                            <p>Response to Supervision: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.responseToSupervision}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%",}}>
                            <p>Suggestions for Improvement: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.suggestionsForImprovement}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%",}}>
                            <p>Name of Supervisor: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.nameOfSupervisor}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%",}}>
                            <p>Position of Supervisor: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.positionOfSupervisor}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%",}}>
                            <p>Supervisor's Email: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.supervisorEmail}</span></p>
                        </div>
                        <div style={{flex: 1, width:"100%",}}>
                            <p>Supervisor's Contact: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{studentAssessmentData.supervisorContact}</span></p>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    )
}

export default StudentAssessmentDeets;