import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './companyDeets.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useEffect, useState } from 'react';

import axios from 'axios';

    const url = 'http://127.0.0.1:8000/manager/'

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


const CompanyDeets = () => {
    // const location = useLocation();
    // console.log(location)
    // companyName.split(` `).join(`-`).toLowerCase()
    const {companyName, id} = useParams();
    
    const [companyDetailsData, setCompanyDetailsData] = useState([])
    const [companyData, setCompanyData] = useState([])

    useEffect (()=>{
        document.title = companyName.split('-').join(' ')
        try{
            axios.get(url+'companyroles-list/'+id)
            .then((response)=>{
                setCompanyDetailsData(response.data)
            });
        }
        catch(error){
            console.log(error)
        }
        try{
            axios.get(url+id)
            .then((response)=>{
                setCompanyData(response.data)
            });
        }
        catch(error){
            console.log(error)
        }
    },[id, companyName])


    const [modalOpen, setModalOpen] = useState(false)

    // const onSubmitApplication = () => {
    //     // let regex = /^[a-zA-Z\s]+$/;
    //         const managerApplicationData = new FormData();
    //         managerApplicationData.append("company", managerId)
    //         managerApplicationData.append("role", vacancyData.role)
    //         managerApplicationData.append("numberOfInterns", vacancyData.numberOfInterns)
    //         managerApplicationData.append("deadline", vacancyData.deadline)
    //         managerApplicationData.append("moreInfo", vacancyData.moreInfo)

    //         try{
    //             axios.post(baseUrl, managerApplicationData).then((response)=>{
    //                 setVacancyData({
    //                     'role' :'',
    //                     'numberOfInterns' :'',
    //                     'deadline': '',
    //                     'moreInfo': '',
    //                 });
    //                 setModalOpen(true);
    //             })
    //         }catch(error){
    //             console.log(error)
    //         }
    // }
    const onClosed = () => {
        setModalOpen(false);
        window.location.href='/manager/dashboard';
    }
    return(
        <article className='companyDetailsBody' >
            <section className='companyDetailsContainer' style={{display: modalOpen ? "none" : "block",}}>
                <div style={{}}>
                    <p style={{fontFamily: 'Montserrat', fontWeight: "600", textTransform:'uppercase', fontSize: "1.2rem", alignContent: 'center', alignSelf: 'center'}}>{companyName.split('-').join(' ')}</p>
                    <p>Information about the company: <span style={{fontSize: '14px', color: '#000000', fontFamily: "Montserrat", }}>{companyData.briefInfo}</span></p>
                    <p>Location: <span style={{fontSize: '14px', color: '#000000', fontFamily: "Montserrat", }}>{companyData.location}</span></p>
                </div>
                <div className='form'>
                <p style={{fontFamily: 'Montserrat', fontWeight: "400", fontSize: "1.2rem", alignContent: 'center', alignSelf: 'center', marginBottom: '0.5rem', marginTop: '2rem', color: '#000'}}>Vacancies</p>
                    {companyDetailsData.map((data)=>{
                        const {role, numberOfInterns, deadline, moreInfo} = data;
                        return(
                            <CompanyDeet role={role} numberOfInterns={numberOfInterns} deadline={deadline} moreInfo={moreInfo}/>
                        )
                    })}
                </div>
                <Modal
                    open={modalOpen}
                    onClose={()=>onClosed()}
                    aria-labelledby="title"
                    aria-describedby="description"                    
                >
                    <Box sx={modStyle} style={{maxWidth: '500px', width: '90%'}}>
                    <span style={{display: 'flex', justifyContent: 'flex-end'}}><FontAwesomeIcon onClick={()=>onClosed()} icon={faXmark} style={{fontSize: "32px", color: "#8F8F8F", cursor:'pointer',marginTop: "-1rem",}}/></span>   
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{fontFamily: 'Montserrat', padding: "1rem 1rem 1rem 1rem"}}>
                        You have added new role for your company, {companyName}
                    </Typography>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}
                    </Box>
                </Modal>
            </section>
        </article>
    )
}
const CompanyDeet = ({role, numberOfInterns, deadline, moreInfo}) => {
    const [onfile, setOnFile] = useState(false);

    return(
        <div className="formContainer1">
            <div style={{flex: 1, width:"100%", }}>
                <p>Name of Role: <span style={{fontSize: '14px', color: '#000000', fontFamily: "Montserrat", }}>{role}</span></p>
                {/* <div className='input'><input type='text' required name='role' value={vacancyData.role} onChange={handleChange} /></div> */}
            </div>
            <div style={{flex: 1, width:"100%", }}>
                <p>Number of Interns remaining needed: <span style={{fontSize: '14px', color: '#000000', fontFamily: "Montserrat", }}>{numberOfInterns}</span></p>
                {/* <div className='input'><input type='text' required name='role' value={vacancyData.role} onChange={handleChange} /></div> */}
            </div>
            <div style={{flex: 1, width:"100%", }}>
                <p>Deadline for submission:  <span style={{fontSize: '14px', color: '#000000', fontFamily: "Montserrat", }}>{deadline}</span></p>
                {/* <div className='input'><input type='text' required name='role' value={vacancyData.role} onChange={handleChange} /></div> */}
            </div>
            <div style={{flex: 1, width:"100%",}}>
                <p>More Information about the role: <span style={{fontSize: '14px', color: '#000000', fontFamily: "Montserrat", }}>{moreInfo}</span></p>
                {/* <div className='input'><input type='text' required name='role' value={vacancyData.role} onChange={handleChange} /></div> */}
            </div>
            {onfile && <div style={{flex: 1, width:"100%", marginTop: '8px'}}>
                <label>Submit your file</label>
                <div className='input'><input type='file' accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf" required name='applicationFile' /></div>
                {/* {roleError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{roleError}</p>} */}
            </div>}
            {onfile ? <button type='submit' >Submit your file for application</button> : <button type='submit' onClick={()=> setOnFile(true)}>Click to Submit your file for application</button>}
        </div>
    )
}

export default CompanyDeets;