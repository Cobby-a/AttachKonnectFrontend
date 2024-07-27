import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './appliedInternship.css'
import { faPaperclip, faXmark } from '@fortawesome/free-solid-svg-icons';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useEffect, useState } from 'react';

import axios from 'axios';

    const url = 'http://127.0.0.1:8000/'
    const studentId = localStorage.getItem('studentId');

    const modStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: '100%',
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        borderRadius: 1,
        p: 4,
    };


const AppliedInternships = () => {
    // companyName.split(` `).join(`-`).toLowerCase()
    
    const [studentApplicationsData, setstudentApplicationsData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [studentApplicationDataAvailable, setStudentApplicationDataAvailable] = useState(false)

    // if(studentApplicationsData.length > 0){
    //     setStudentApplicationDataAvailable(true);
    // }

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
    },[])
    let show = "none"
    let showMarginTop = '0'
    console.log(studentApplicationsData.length)
    if (studentApplicationsData.length < 1){
        show = "block"
        showMarginTop = "-10rem"
    }
    return(
        <article className='yourAppliedInternshipsBody'  style={{display: modalOpen ? "none" : "",}}>
            <section className='yourAppliedInternshipContainer' >
                <div style={{}}>
                    <p style={{fontFamily: 'Montserrat', fontWeight: "500", color: "#000", textTransform:'uppercase', fontSize: "1.2rem", textAlign: 'center', marginBottom: '3rem', marginTop: showMarginTop}}>Your Applied Internships</p>
                </div>
                <div className='form'>
                    {}
                    <p style={{display: show, textAlign: 'center', fontFamily: 'Montserrat', fontSize: '1rem', color: '#002D5D',}}>You have not applied for any Internship on the system.</p>
                    {studentApplicationsData.map((data)=>{
                        const {id, role, applicationFile, approval} = data;
                        
                        return(
                            <>
                            <CompanyDeet key={id} approval={approval} role={role} applicationFile={applicationFile} setModalOpen={setModalOpen} modalOpen={modalOpen}/>
                            </>
                        )
                    })}
                </div>
            </section>
        </article>
    )
}
const CompanyDeet = ({role, approval, applicationFile, modalOpen, setModalOpen}) => {

    const onClosed = () => {
        setModalOpen(false);
        window.location.href='/student/dashboard';
    }

    // const onSubmitApplication = (roleId, setModalOpen) => {
    //     if(studentApplyData.applicationFile === ""){
    //         setApplicationError("Please provide the necessary file to proceed")
    //         return;
    //     }
    //     else{
    //         setApplicationError("")
    //     }
    //     if(studentApplyData.applicationFile !== ""){
    //         const studentApplicationData = new FormData();
    //         studentApplicationData.append("student", studentId)
    //         studentApplicationData.append("role", roleId)
    //         studentApplicationData.append("applicationFile", studentApplyData.applicationFile, studentApplyData.applicationFile.name)

    //         try{
    //             axios.post(url+'student/student-roles-applied/', studentApplicationData, {
    //                 headers: {
    //                     'content-type': 'multipart/form-data'
    //                 }
    //             })
    //             .then((response)=>{
    //                 console.log(response.data);
    //                 setModalOpen(true);
    //             })
    //         }
    //         catch(error){
    //             console.log(error)
    //         }
    //     }
    // }
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
                <p>Your Attachment File: <a href={applicationFile} target="_blank"style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", cursor: 'pointer'}}><FontAwesomeIcon icon={faPaperclip} style={{paddingRight: '4px', paddingLeft :'6px'}}/>{applicationFile.substr(28)}</a></p>
            </div>
            <div style={{flex: 1, width:"100%",}}>
                <p>Approval: <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{approval}</span></p>
            </div>
            {/* {onfile && <div style={{flex: 1, width:"100%", marginTop: '8px'}}>
                <label>Submit your file</label>
                <div className='input'><input type='file' accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf" required name='applicationFile' onChange={handleFileChange}/></div>
                {applicationError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{applicationError}</p>}
            </div>}
            {onfile ? <button type='submit' onClick={()=>onSubmitApplication(roleId, setModalOpen)}>Submit your file for application</button> : <button type='submit' onClick={()=> setOnFile(true)}>Click to Submit your file for application</button>} */}
            <Modal
                open={modalOpen}
                onClose={()=>onClosed()}
                aria-labelledby="title"
                aria-describedby="description"                    
            >
                <Box sx={modStyle} style={{maxWidth: '500px', width: '90%'}}>
                <span style={{display: 'flex', justifyContent: 'flex-end'}}><FontAwesomeIcon onClick={()=>onClosed()} icon={faXmark} style={{fontSize: "32px", color: "#8F8F8F", cursor:'pointer',marginTop: "-1rem",}}/></span>   
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{fontFamily: 'Montserrat', padding: "1rem 1rem 1rem 1rem"}}>
                    You have applied for the internship vacancy,
                </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default AppliedInternships;