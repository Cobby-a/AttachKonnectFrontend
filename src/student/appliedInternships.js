import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './appliedInternship.css'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

import { useEffect, useState } from 'react';

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
        document.title = ("Your Internships")
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
                    <p style={{fontFamily: 'Montserrat', fontWeight: "500", color: "#000", textTransform:'uppercase', fontSize: "1.2rem", textAlign: 'center', marginBottom: '3rem', marginTop: showMarginTop}}>Your Internships</p>
                </div>
                <div className='form'>
                    {}
                    <p style={{display: show, textAlign: 'center', fontFamily: 'Montserrat', fontSize: '1rem', color: '#002D5D',}}>You have not applied for any Internship on the system.</p>
                    {studentInternshipData.map((data)=>{
                        const {id, role, approval, smallInfo, optionalFile} = data;
                        
                        return(
                            <>
                            <StudentInternship key={id} approval={approval} role={role} optionalFile={optionalFile} smallInfo={smallInfo}/>
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

const StudentInternship = ({role, approval, smallInfo, optionalFile}) => {

    let classname = "rejected";


    if(approval === 'Accepted'){
        classname = "accepted"
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
                    <p>Attachment File on your accepted role (if any): <a href={optionalFile} target="_blank" rel="noreferrer" style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", cursor: 'pointer'}}><FontAwesomeIcon icon={faPaperclip} style={{paddingRight: '4px', paddingLeft :'6px'}}/>{optionalFile.substr(28)}</a></p>
                </div>
                <div style={{flex: 1, width:"100%",}}>
                    <p>Info about your accepted role (if any): <span style={{fontSize: '14px', color: '#002D5D', fontFamily: "Montserrat", }}>{smallInfo}</span></p>
                </div>
                </>
            }
        </div>
    )
}

export default AppliedInternships;