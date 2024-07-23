import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './createVacancy.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useEffect, useState } from 'react';

import axios from 'axios';

    const baseUrl = 'http://127.0.0.1:8000/manager/roles'

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

const ManagerCreateVacancy = () => {
    const [vacancyData, setVacancyData] = useState({
        'role' :'',
        'numberOfInterns': '',
        'deadline': '',
        'moreInfo': '',
    })
    console.log(vacancyData)
    const handleChange=(event)=>{
        setVacancyData({
            ...vacancyData,
            [event.target.name]:event.target.value
        })
    }
    useEffect (()=>{
        document.title = "Manager Create-Vacancy"
    })

    const managerId = localStorage.getItem('managerId');
    const companyName = localStorage.getItem('companyName');

    const [modalOpen, setModalOpen] = useState(false)

    const [roleError, setRoleError] = useState('')
    const [numOfInternError, setNumOfInternError] = useState('')
    const [deadlineError, setDeadlineError] = useState('')
    const onSubmitApplication = () => {
        // let regex = /^[a-zA-Z\s]+$/;
        let regex = new RegExp('^[0-9]+$');
        if(vacancyData.role.length === 0){
            setRoleError("Role field cannot be empty")
            return;
        }
        else if(vacancyData.role.length !== 0){
            setRoleError("")
        }
        if(vacancyData.role.length < 3){
            setRoleError("specify a valid role")
            return;
        }
        else if(vacancyData.role.length >= 3){
            setRoleError("")
        }
        if(vacancyData.numberOfInterns.length === 0){
            setNumOfInternError("Number of interns field cannot be empty")
            return;
        }
        else if(vacancyData.numberOfInterns.length !== 0){
            setNumOfInternError("")
        }
        if(regex.test(vacancyData.numberOfInterns) === false){
            setNumOfInternError("Invalid input type for number of Interns")
            return;
        }
        else if(regex.test(vacancyData.numberOfInterns) === true){
            setNumOfInternError("")
        }
        if(vacancyData.deadline.length !== 10){
            setDeadlineError("Input a valid date")
            return;
        }
        else if(vacancyData.deadline.length === 10){
            setDeadlineError("")
        }
        if(vacancyData.role.length !== 0 && vacancyData.role.length >= 3 && vacancyData.numberOfInterns.length !== 0 && regex.test(vacancyData.numberOfInterns) === true && vacancyData.deadline.length === 10){
            const managerApplicationData = new FormData();
            managerApplicationData.append("company", managerId)
            managerApplicationData.append("role", vacancyData.role)
            managerApplicationData.append("numberOfInterns", vacancyData.numberOfInterns)
            managerApplicationData.append("deadline", vacancyData.deadline)
            managerApplicationData.append("moreInfo", vacancyData.moreInfo)

            try{
                axios.post(baseUrl, managerApplicationData).then((response)=>{
                    setVacancyData({
                        'role' :'',
                        'numberOfInterns' :'',
                        'deadline': '',
                        'moreInfo': '',
                    });
                    setModalOpen(true);
                })
            }catch(error){
                console.log(error)
            }
            // setModalOpen(true);
        }
    }
    const onClosed = () => {
        setModalOpen(false);
        window.location.href='/manager/dashboard';
    }
    return(
        <article className='managerVacancyBody' >
            <section className='manageUserContainer' style={{display: modalOpen ? "none" : "block",}}>
                <div style={{display: 'flex', justifyContent:'space-between',}}>
                    <p style={{fontFamily: 'Montserrat', fontWeight: "600", textTransform:'uppercase', fontSize: "1.2rem", alignContent: 'center', alignSelf: 'center'}}>New Vacancy</p>
                    <Link to="/manager/dashboard"><FontAwesomeIcon icon={faXmark} style={{fontSize: "32px", color: "#8F8F8F", cursor:'pointer',marginTop: "-0.5rem"}}/></Link>
                </div>
                <div className='form'>
                    <div className="formContainer1">
                        <div style={{flex: 1}}>
                            <label>Name of Role</label>
                            <div className='input'><input type='text' required name='role' value={vacancyData.role} onChange={handleChange} /></div>
                            {roleError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{roleError}</p>}
                        </div>
                    </div>
                    <div className='formContainer2'>
                        <div style={{flex: 1}}>
                            <label>Number of Interns needed for the role</label>
                            <div className='input'><input type='number' required name='numberOfInterns' value={vacancyData.numberOfInterns} onChange={handleChange}/></div>
                            {numOfInternError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{numOfInternError}</p>}
                        </div>
                    </div>
                    <div className='formContainer3'>
                        <div style={{flex: 1, marginBottom: '0.5rem'}}>
                            <label>Deadline for the application</label>
                            <div className='input'><input type='date' required name='deadline' value={vacancyData.deadline} onChange={handleChange}/></div>
                            {deadlineError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{deadlineError}</p>}
                        </div>
                    </div>
                    <div className='formContainer3'>
                        <div style={{flex: 1}}>
                            <p>Optional Information about the role (optional)</p>
                            <textarea rows="10" name='moreInfo' onChange={handleChange} value={vacancyData.moreInfo} required></textarea>
                        </div>
                    </div>
                    <button type='submit' onClick={onSubmitApplication}>Create new role</button>
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

export default ManagerCreateVacancy;