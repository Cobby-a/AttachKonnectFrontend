import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './managerSignUp.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
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

    const baseUrl = 'https://attachmentkonnect.pythonanywhere.com/manager/'

const ManagerSignUp = () => {
    const [managerData, setManagerData] = useState({
        'companyName' :'',
        'email' :'',
        'location': '',
        'ceo': '',
        'durationOfExistence': '',
        'briefInfo': '',
        'twitter': '',
        'instagram': '',
        'facebook': '',
        'website': '',
        'companyLogo': '',
        'companyCertificate': '',
    })
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [locationError, setLocationError] = useState('')
    const [ceoError, setCeoError] = useState('')
    const [durationError, setDurationError] = useState('')
    const [briefInfoError, setBriefInfoError] = useState('')
    const [logoError, setLogoError] = useState('')
    const [certificateError, setCertificateError] = useState('')

    const [buttonEnabled, setButtonEnabled] = useState(true)


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
        if(managerData.companyName.length < 1){
            setNameError("Field cannot be left empty")
            return;
        }
        else if(managerData.companyName.length >= 1){
            setNameError("")
        }
        if(managerData.email.length < 1){
            setEmailError("Field cannot be left empty")
            return;
        }
        else if(managerData.email.length >= 1){
            setEmailError("")
        }
        if(managerData.location.length < 1){
            setLocationError("Field cannot be left empty")
            return;
        }
        else if(managerData.location.length >= 1){
            setLocationError("")
        }
        if(managerData.ceo.length < 1){
            setCeoError("Field cannot be left empty")
            return;
        }
        else if(managerData.ceo.length >= 1){
            setCeoError("")
        }
        if(managerData.durationOfExistence.length < 1){
            setDurationError("Field cannot be left empty")
            return;
        }
        else if(managerData.durationOfExistence.length >= 1){
            setDurationError("")
        }
        if(managerData.briefInfo.length < 1){
            setBriefInfoError("Field cannot be left empty")
            return;
        }
        else if(managerData.briefInfo.length >= 1){
            setBriefInfoError("")
        }
        if(managerData.companyLogo === ""){
            setLogoError("Field cannot be left empty")
            return;
        }
        else if(managerData.companyLogo !== ""){
            setLogoError("")
        }
        if(managerData.companyCertificate === ""){
            setCertificateError("Field cannot be left empty")
            return;
        }
        else if(managerData.companyCertificate !== ""){
            setCertificateError("")
        }
        if(managerData.companyName.length >= 1 && managerData.email.length >= 1 && managerData.location.length >= 1 && managerData.ceo.length >= 1 && managerData.durationOfExistence.length >= 1 && managerData.briefInfo.length >= 1 && managerData.companyLogo !== "" && managerData.companyCertificate !== ""){
            const managerApplicationData = new FormData();
            managerApplicationData.append("companyName", managerData.companyName)
            managerApplicationData.append("email", managerData.email)
            managerApplicationData.append("location", managerData.location)
            managerApplicationData.append("ceo", managerData.ceo)
            managerApplicationData.append("durationOfExistence", managerData.durationOfExistence)
            managerApplicationData.append("briefInfo", managerData.briefInfo)
            managerApplicationData.append("contractStatus", "Pending")
            managerApplicationData.append("reportStatus", "Pending")
            managerApplicationData.append("twitter", managerData.twitter)
            managerApplicationData.append("instagram", managerData.instagram)
            managerApplicationData.append("facebook", managerData.facebook)
            managerApplicationData.append("website", managerData.website)
            managerApplicationData.append("companyLogo", managerData.companyLogo, managerData.companyLogo.name)
            managerApplicationData.append("companyCertificate", managerData.companyCertificate, managerData.companyCertificate.name)

            setButtonEnabled(false)

            try{
                axios.post(baseUrl, managerApplicationData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                .then((response)=>{
                    setManagerData({
                        'companyName' :'',
                        'email' :'',
                        'location': '',
                        'ceo': '',
                        'durationOfExistence': '',
                        'briefInfo': '',
                        'companyLogo': '',
                        'companyCertificate': '',
                    })
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
                          .then((result)=>{
                            // result.dismiss && window.location.reload()
                            result.dismiss && setButtonEnabled(true)
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
                            // result.dismiss && window.location.reload()
                            setButtonEnabled(true)
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
                            setButtonEnabled(true)
                          })
                      }
                })
            }
            catch(error){
                console.log(error)
            }
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
                            <label>Company name</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                            <div className='input'><input type='text' required name='companyName' value={managerData.companyName} onChange={handleChange} /></div>
                            {nameError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{nameError}</p>}
                        </div>
                        <div style={{flex: 1}}>
                            <label>Email</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                            <div className='input'><input type='email' required name='email' value={managerData.email} onChange={handleChange}/></div>
                            {emailError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{emailError}</p>}
                        </div>
                        <div style={{flex: 1}}>
                            <label>Location</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                            <div className='input'><input type='text' required name='location' value={managerData.location} onChange={handleChange}/></div>
                            {locationError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{locationError}</p>}
                        </div>
                    </div>
                    {/* <div className="formContainer1">
                        <div style={{flex: 1}}>
                            <label>Password</label>
                            <div className='input'><input type='password' required name='password' value={managerData.password} onChange={handleChange} /></div>
                        </div>
                    </div> */}
                    <div className='formContainer2'>
                        <div style={{flex: 1}}>
                            <label>Name of CEO</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                            <div className='input'><input type='text' required name='ceo' value={managerData.ceo} onChange={handleChange}/></div>
                            {ceoError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{ceoError}</p>}
                        </div>
                        <div style={{flex: 1}}>
                            <label>Duration of Company's existence</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                            <div className='input'><input type='text' required name='durationOfExistence' value={managerData.durationOfExistence} onChange={handleChange}/></div>
                            {durationError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{durationError}</p>}
                        </div>
                        <div style={{flex: 1}}>
                            <label>Company's logo (.jpg, .png and .jpeg formats)</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                            <div className='input'><input type='file' accept=".png, .jpg, .jpeg" name='companyLogo' required onChange={handleFileChange}/></div>
                            {logoError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{logoError}</p>}
                        </div>
                    </div>
                    <div className='formContainer3'>
                        <div style={{flex: 1}}>
                            <p>Company's missions, visions, and values.<span style={{ fontSize: '15px', color: "#ff3333", }}>*</span></p>
                            <textarea rows="10" name='briefInfo' onChange={handleChange} value={managerData.briefInfo} required></textarea>
                            {briefInfoError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{briefInfoError}</p>}
                        </div>
                        <div style={{flex: 1}}>
                            <p>Company’s Registration Certificate<span style={{ fontSize: '15px', color: "#ff3333", }}>*</span></p>
                            <div className='input'><input type='file' name='companyCertificate' required onChange={handleFileChange}/></div>
                            {certificateError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{certificateError}</p>}
                            {/* <textarea rows="10" name='jobDescription'></textarea> */}
                        </div>
                    </div>
                    <div className="formContainer2" style={{marginTop: '1rem'}}>
                        <div style={{flex: 1}}>
                            <label>Company's website (if any)</label>
                            <div className='input'><input type='text' required name='website' value={managerData.website} onChange={handleChange} /></div>
                        </div>
                    </div>
                        <p style={{fontSize: '13px', marginTop: '1rem',}}>Company's social media handles (if any)</p>
                    <div className="formContainer2">
                        <div style={{flex: 1}}>
                            <label>Facebook</label>
                            <div className='input'><input type='text' required name='facebook' value={managerData.facebook} onChange={handleChange} /></div>
                        </div>
                        <div style={{flex: 1}}>
                            <label>Twitter</label>
                            <div className='input'><input type='text' required name='twitter' value={managerData.twitter} onChange={handleChange}/></div>
                        </div>
                        <div style={{flex: 1}}>
                            <label>Instagram</label>
                            <div className='input'><input type='text' required name='instagram' value={managerData.instagram} onChange={handleChange}/></div>
                        </div>
                    </div>
                    
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    {buttonEnabled &&
                    <button type='submit' onClick={onSubmitApplication}>Submit</button>
                    }
                    {!buttonEnabled &&
                    <button type='submit' disabled onClick={onSubmitApplication}>Submit</button>
                    }
                    </div>
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

export default ManagerSignUp;