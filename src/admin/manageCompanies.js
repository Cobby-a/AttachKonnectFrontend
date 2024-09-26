import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './internAssess.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'


import axios from 'axios';

const baseUrl = 'https://attachmentkonnect.pythonanywhere.com/'


const AdminManagerCompanies = () => {
    const [registerCompanyData, setRegisterCompanyData] = useState({
            companyId: "",
            companyName: "",
            email: "",
    })


    const [companyData, setCompanyData] = useState([])
    const [error, setError] = useState('')

    useEffect (()=>{
        document.title = "Admin - Register Company"
        try{
            axios.get(baseUrl+'manager/manager-company/')
            .then((response)=>{
                setCompanyData(response.data)
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

    const onRegisterCompany = () => {
        if (registerCompanyData.companyId.length < 1) {
            setError('Please select a company.');
            return;
        }
        // else if(registerCompanyData.companyId.length >= 1){
        //     setError("")
        // }
        
            Swal.fire({
                title: 'Confirm',
                text: `Register Company ${registerCompanyData.companyName} ?`,
                icon: 'info',
                confirmButtonText: 'Yes, Continue',
                showCancelButton: true
            })
            .then((result)=>{
                if(result.isConfirmed){
                    const registerData = new FormData();
                    registerData.append("companyName", registerCompanyData.companyName)
                    registerData.append("email", registerCompanyData.email)

                    try{
                        axios.post(baseUrl+'manager/registered-companies/', registerData)
                        .then((response)=>{
                            const companyTempPass = new FormData();
                            companyTempPass.append("reportStatus", "Verified")
                            companyTempPass.append("contractStatus", "Verified")
                            companyTempPass.append("password", "attachmentkonnect")

                            try{
                                axios.patch(baseUrl+'/manager/'+registerCompanyData.companyId, companyTempPass, {
                                    headers: {
                                        'content-type': 'multipart/form-data'
                                    }
                                })
                                .then((response)=>{
                                    setRegisterCompanyData({
                                        companyId: '',
                                        companyName: '',
                                        email: '',
                                    });
                                    window.location.reload()
                                })
                                .catch((error)=>{
                                    if (error.response) {
                                        Swal.fire({
                                            title: 'Error',
                                            text: `There was a ${error.response.status} bad request updating the data`,
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
                            }catch(error){
                                console.log(error)
                            }
                            window.location.reload()
                        })
                        .catch((error)=>{
                            if (error.response) {
                                Swal.fire({
                                    title: 'Error',
                                    text: `There was a ${error.response.status} bad request updating the data`,
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
                }
            })        
    }
    // const registCompanyForm = (company_id) => {
    //     // setRegisterCompanyData({
    //     //     'company' : company_id,
    //     //     "companyName" : company_name,
    //     //     'email': company_email, 
    //     // })
    //     setCid(company_id)
    // }
    const handleCompanyChange = (e) => {
        const selectedCompany = companyData.find((data) => data.id === parseInt(e.target.value));
        if (selectedCompany) {
            setRegisterCompanyData({
                companyId: selectedCompany.id,
                companyName: selectedCompany.companyName,
                email: selectedCompany.email,
            });
            setError('');
        }
    };

    return(
        <article className='internAssessBody' >
            <section className='manageUserContainer'>
                <div style={{display: 'flex', justifyContent:'space-between',}}>
                    <p style={{fontFamily: 'Montserrat', fontWeight: "600", textTransform:'uppercase', fontSize: "1.2rem", alignContent: 'center', alignSelf: 'center'}}>Register Company</p>
                    <Link to="/admin/dashboard"><FontAwesomeIcon icon={faXmark} style={{fontSize: "32px", color: "#8F8F8F", cursor:'pointer',marginTop: "-0.5rem"}}/></Link>
                </div>
                <div className='form'>
                    <div className="formContainer1">
                        <div style={{flex: 1}}>
                            <label>Companies</label><span style={{ fontSize: '15px', color: "#ff3333", }}>*</span>
                                    <div className='input'>
                                        {/* <select name="company" id="company" style={{cursor: 'pointer'}}>
                                            <option></option>
                                        {companyData.map((data)=>{
                                            const {id, companyName, email, password} = data;
                                            if(password === null){
                                            return(
                                                <Companies id={id} companyName={companyName} email={email} setRegisterCompanyData={setRegisterCompanyData} registerCompanyData={registerCompanyData} setCid={setCid} registCompanyForm={registCompanyForm}/>
                                            )
                                        }
                                        return null
                                        })}
                                        </select> */}
                                        <select name="company" id="company" onChange={handleCompanyChange} style={{ cursor: 'pointer' }}>
                                            <option value="">Select a company</option>
                                            {companyData.map((data) => {
                                                return (
                                                    data.password === null && (
                                                        <option key={data.id} value={data.id}>
                                                            {data.companyName} - {data.email}
                                                        </option>
                                                    )
                                                );
                                            })}
                                        </select>
                                    {error && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{error}</p>}
                                    </div>
                            {/* <div className='input'><input type='text' required name='companyName' value={managerData.companyName} onChange={handleChange} /></div> */}
                        </div>
                    </div>
                    <button type='submit' onClick={onRegisterCompany}>Register Company</button>
                </div>
            </section>
        </article>
    )
}

const Companies = ({id, companyName, email, setRegisterCompanyData, registerCompanyData, setCid,}) => {
    const registCompanyForm = (company_id, company_name, company_email) => {
        setRegisterCompanyData({
            'company' : company_id,
            "companyName" : company_name,
            'email': company_email, 
        })
        // setCid(company_id)
    }
    return(
        <option onClick={()=>registCompanyForm(id, companyName, email)}>{companyName} - {email}</option>
        // <option onClick={()=>setRegisterCompanyData({'companyId': id, "companyName" : companyName, 'email': email })}>{companyName} - {email} -{id} </option>
        // <option value={registerCompanyData.company} onClick={()=> registCompanyForm(companyName, email)}>{companyName} - {email} </option>
    )
}
export default AdminManagerCompanies;