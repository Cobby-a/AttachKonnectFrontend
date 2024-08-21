import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './managerSignUp.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';

import axios from 'axios';

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

    const baseUrl = 'http://127.0.0.1:8000/manager/'

const ManagerInternAssessment = () => {
    const [managerData, setManagerData] = useState({
        'companyName' :'',
        'email' :'',
        'location': '',
        'password': '',
        'ceo': '',
        'durationOfExistence': '',
        'briefInfo': '',
        'companyLogo': ''
    })
    console.log(managerData)
    const handleChange=(event)=>{
        setManagerData({
            ...managerData,
            [event.target.name]:event.target.value
        })
    }
    const handleFileChange=(event)=>{
        setManagerData({
            ...managerData,
            [event.target.name]:event.target.files[0]
        })
    }
    useEffect (()=>{
        document.title = "Manager SignUp"
    })

    const [modalOpen, setModalOpen] = useState(false)

    const onClosed = () => {
        setModalOpen(false);
        window.location.href='/manager-apply';
    }

    const onSubmitApplication = () => {
        const managerApplicationData = new FormData();
        managerApplicationData.append("companyName", managerData.companyName)
        managerApplicationData.append("email", managerData.email)
        managerApplicationData.append("location", managerData.location)
        managerApplicationData.append("password", managerData.password)
        managerApplicationData.append("ceo", managerData.ceo)
        managerApplicationData.append("durationOfExistence", managerData.durationOfExistence)
        managerApplicationData.append("briefInfo", managerData.briefInfo)
        managerApplicationData.append("companyLogo", managerData.companyLogo, managerData.companyLogo.name)

        try{
            axios.post(baseUrl, managerApplicationData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response)=>{
                console.log(response.data)
                setManagerData({
                    'companyName' :'',
                    'email' :'',
                    'location': '',
                    'password': '',
                    'ceo': '',
                    'durationOfExistence': '',
                    'briefInfo': '',
                    'companyLogo': '',
                });
                setModalOpen(true);
            })
        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <main className= {modalOpen ? "managerSignUp" : "managerSignUp1"} >
        <article className='managerSignUpBody' >
            <section className='manageUserContainer' style={{display: modalOpen ? "none" : "block",}}>
                <div style={{display: 'flex', justifyContent:'space-between',}}>
                    <p style={{fontFamily: 'Montserrat', fontWeight: "600", textTransform:'uppercase', fontSize: "1.2rem", alignContent: 'center', alignSelf: 'center'}}>Apply</p>
                    <Link to="/portal"><FontAwesomeIcon icon={faXmark} style={{fontSize: "32px", color: "#8F8F8F", cursor:'pointer',marginTop: "-0.5rem"}}/></Link>
                </div>
                <div className='form'>
                    <div className="formContainer1">
                        <div style={{flex: 1}}>
                            <label>Company name</label>
                            <div className='input'><input type='text' required name='companyName' value={managerData.companyName} onChange={handleChange} /></div>
                        </div>
                        <div style={{flex: 1}}>
                            <label>Email</label>
                            <div className='input'><input type='email' required name='email' value={managerData.email} onChange={handleChange}/></div>
                        </div>
                        <div style={{flex: 1}}>
                            <label>Location</label>
                            <div className='input'><input type='text' required name='location' value={managerData.location} onChange={handleChange}/></div>
                        </div>
                    </div>
                    <div className="formContainer1">
                        <div style={{flex: 1}}>
                            <label>Password</label>
                            <div className='input'><input type='password' required name='password' value={managerData.password} onChange={handleChange} /></div>
                        </div>
                    </div>
                    <div className='formContainer2'>
                        <div style={{flex: 1}}>
                            <label>Name of CEO</label>
                            <div className='input'><input type='text' required name='ceo' value={managerData.ceo} onChange={handleChange}/></div>
                        </div>
                        <div style={{flex: 1}}>
                            <label>Duration of Comapny's existence</label>
                            <div className='input'><input type='text' required name='durationOfExistence' value={managerData.durationOfExistence} onChange={handleChange}/></div>
                        </div>
                        <div style={{flex: 1}}>
                            <label>Company's logo (.jpg, .png and .jpeg formats)</label>
                            <div className='input'><input type='file' accept=".png, .jpg, .jpeg" name='companyLogo' required onChange={handleFileChange}/></div>
                        </div>
                    </div>
                    <div className='formContainer3'>
                        <div style={{flex: 1}}>
                            <p>Brief Intel on company's set objectives and activities</p>
                            <textarea rows="10" name='briefInfo' onChange={handleChange} value={managerData.briefInfo} required></textarea>
                        </div>
                        <div style={{flex: 1}}>
                            <p>Internship Activities (separate with commas)</p>
                            <textarea rows="10" name='jobDescription'></textarea>
                        </div>
                    </div>
                    <button type='submit' onClick={onSubmitApplication}>Submit</button>
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
                        Thank you for signing up your company, our admin will respond to your registration shortly via email.
                    </Typography>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}
                    </Box>
                </Modal>
            </section>
        </article>
        </main>
    )
}

export default ManagerInternAssessment;