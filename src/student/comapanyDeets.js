import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './companyDeets.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useEffect, useState } from 'react';
import Swal from "sweetalert2";

import axios from 'axios';

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


const CompanyDeets = () => {
    // companyName.split(` `).join(`-`).toLowerCase()
    const {companyName, id} = useParams();
    
    const [companyDetailsData, setCompanyDetailsData] = useState([])
    const [companyData, setCompanyData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    useEffect (()=>{
        document.title = companyName.split('-').join(' ')
        try{
            axios.get(url+'manager/companyroles-list1/'+id)
            .then((response)=>{
                setCompanyDetailsData(response.data)
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
            axios.get(url+'manager/'+id)
            .then((response)=>{
                setCompanyData(response.data)
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
    },[id, companyName])
    let show = "none"
    
    if (companyDetailsData.length < 1){
        show = "block"
    }

    return(
        <main className= {modalOpen ? "managerSignUp" : "managerSignUp1"}>
        <article className='companyDetailsBody'>
            <section className='companyDetailsContainer' style={{display: modalOpen ? "none" : "block",}}>
                <div style={{}}>
                    <p style={{fontFamily: 'Montserrat', fontWeight: "600", textTransform:'uppercase', fontSize: "1.2rem", alignContent: 'center', alignSelf: 'center', lineHeight: '1.6rem'}}>{companyName.split('-').join(' ')}</p>
                    <p>Information about the company: <span style={{fontSize: '14px', color: '#000000', fontFamily: "Montserrat", }}>{companyData.briefInfo}</span></p>
                    <p>Location: <span style={{fontSize: '14px', color: '#000000', fontFamily: "Montserrat", }}>{companyData.location}</span></p>
                </div>
                <div className='form'>
                <p style={{fontFamily: 'Montserrat', fontWeight: "400", fontSize: "1.2rem", alignContent: 'center', alignSelf: 'center', marginBottom: '0.5rem', marginTop: '2rem', color: '#000'}}>Vacancies</p>
                    <p style={{display: show, textAlign: 'center', fontFamily: 'Montserrat', fontSize: '1.3rem', color: '#002D5D', marginTop: '3rem', lineHeight: '1.4rem'}}>There are no vacancy slots for this company</p>
                    {companyDetailsData.map((data)=>{
                        const {id, role, numberOfInterns, deadline, moreInfo, total_accepted_students, company} = data;
                        let roleId = id
                        return(
                            <CompanyDeet companyName={companyName} key={roleId} roleId={roleId} role={role} numberOfInterns={numberOfInterns} deadline={deadline} moreInfo={moreInfo} company={company} total_accepted_students={total_accepted_students} setModalOpen={setModalOpen} modalOpen={modalOpen}/>
                        )
                    })}
                </div>
            </section>
        </article>
        </main>
    )
}
const CompanyDeet = ({roleId, role, numberOfInterns, deadline, moreInfo, company, companyName, total_accepted_students, modalOpen, setModalOpen}) => {

    const [studentApplyData, setStudentApplyData] = useState({
        'applicationFile' :'',
    })
    const [onfile, setOnFile] = useState(false);
    const [appliedStatus, setAppliedStatus] = useState(false)

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
    return(
        <div className="formContainer1">
            <div style={{flex: 1, width:"100%", }}>
                <p>Name of Role: <span style={{fontSize: '14px', color: '#000000', fontFamily: "Montserrat", }}>{role}</span></p>
            </div>
            <div style={{flex: 1, width:"100%", }}>
                <p>Number of Interns remaining needed: <span style={{fontSize: '14px', color: '#000000', fontFamily: "Montserrat", }}>{numberOfInterns}</span></p>
            </div>
            <div style={{flex: 1, width:"100%", }}>
                <p>Deadline for submission:  <span style={{fontSize: '14px', color: '#000000', fontFamily: "Montserrat", }}>{deadline}</span></p>
            </div>
            <div style={{flex: 1, width:"100%",}}>
                <p>More Information about the role: <span style={{fontSize: '14px', color: '#000000', fontFamily: "Montserrat", }}>{moreInfo}</span></p>
            </div>
            {onfile && <div style={{flex: 1, width:"100%", marginTop: '8px'}}>
                <label>Submit your file</label>
                <div className='input'><input type='file' accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf" required name='applicationFile' onChange={handleFileChange}/></div>
                {applicationError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{applicationError}</p>}
            </div>}
            {!appliedStatus ? 
                (numberReached ? 
                    <p style={{fontSize: '14px', color: '#ff3333', fontFamily: "Montserrat", }}>Number of people needed for this role has been reached</p>
                        : 
                    (onfile ? <button type='submit' onClick={()=>onSubmitApplication(roleId, company.id, setModalOpen)}>Submit your file for application</button> : <button type='submit' onClick={()=> setOnFile(true)}>Click to Submit your file for application</button>)
                )
                : 
                <p style={{fontSize: '14px', color: '#ff3333', fontFamily: "Montserrat", }}>You have already applied for this vacancy role</p>
            }
            <Modal
                open={modalOpen}
                onClose={()=>onClosed()}
                aria-labelledby="title"
                aria-describedby="description"                    
            >
                <Box sx={modStyle} style={{maxWidth: '500px', width: '90%'}}>
                <span style={{display: 'flex', justifyContent: 'flex-end'}}><FontAwesomeIcon onClick={()=>onClosed()} icon={faXmark} style={{fontSize: "32px", color: "#8F8F8F", cursor:'pointer',marginTop: "-1rem",}}/></span>   
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{fontFamily: 'Montserrat', padding: "1rem 1rem 1rem 1rem"}}>
                    You have applied for the internship vacancy, {role} at {companyName.split('-').join(' ')}
                </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default CompanyDeets;