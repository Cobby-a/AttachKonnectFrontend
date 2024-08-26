import { faHouse, faBriefcase, faUserTie, faRightFromBracket, faBars, faXmark, faEnvelopeOpen, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import './applicantsOfferStatus.css'
import './sidebar1.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import defaultProf from './assets/defaultProf.jpg'
import Swal from 'sweetalert2'

const url = 'http://127.0.0.1:8000/'

const managerId = localStorage.getItem('managerId');

const ManagerApplicantsOffer = () => {
    const [menu, setMenu] = useState(false);
    const [applicantsOfferData, setApplicantsOfferData] = useState([])
    const [managerData, setManagerData] = useState([])

    const [nextUrl, setNextUrl] = useState()
    const [previousUrl, setPreviousUrl] = useState()


    useEffect (()=>{
        document.title = "Applicants Offer Status"
        try{
            axios.get(url+'student/managerstudentinternships-list/'+managerId)
            .then((response)=>{
                setApplicantsOfferData(response.data.results)
                setNextUrl(response.data.next)
                setPreviousUrl(response.data.previous)
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
        try{
            axios.get(url+"manager/"+managerId)
            .then((response)=>{
                setManagerData(response.data)
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
            alert(error)
        }
    },[])
    
    let company_pic = managerData.companyLogo

    if(managerData.companyLogo === null){
        company_pic = defaultProf
    }

    const paginationHandler = (url) => {
        try{
            axios.get(url)
            .then((response)=>{
                setNextUrl(response.data.next)
                setPreviousUrl(response.data.previous)
                setApplicantsOfferData(response.data.results)
            })
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <main className="managerOfferStatusApplicantsBody">
            <header>
                <div className='profile'>
                    <img src={company_pic} alt={managerData.companyName} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>{managerData.companyName}</h2>
                        <div className='applicantshamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'applicantsSidebar' : 'applicantsNonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                {/* <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p> */}
                            <div className='applicantsSidebarIcons'>
                                <Link to ="/manager/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                                <Link to ="/manager/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Your Vacancies</div></Link>
                                <Link to ="/manager/applicants-offer-status"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faEnvelopeOpen} style={{paddingRight: '1rem', width: '10%'}}/>Applicants Status</div></Link>
                                <Link to ="/manager/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div></Link>
                                <Link to ="/manager/profile"><div><FontAwesomeIcon icon={faUser} style={{paddingRight: '1rem', width: '10%'}}/>Profile</div></Link>
                                <Link to ="/portal"><div><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div></Link>
                            </div>
                            </article>
                        </div>
                    </div>
                </div>
            </header>
            <section className='mainContainer'>
                <article className='applicantssidebar'>
                    {/* <p style={{fontFamily: 'Segoe UI', marginTop: '-3rem', marginBottom: '3rem', marginLeft: '-1rem', fontWeight:'600',}}>Welcome to dashboard</p> */}
                    <div className='applicantssidebarIcons'>
                        <Link to ="/manager/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/manager/vacancyboard"><div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Your Vacancies</div></Link>
                        <Link to ="/manager/applicants-offer-status"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faEnvelopeOpen} style={{paddingRight: '1rem', width: '10%'}}/>Applicants Status</div></Link>
                        <Link to ="/manager/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div></Link>
                        <Link to ="/manager/profile"><div><FontAwesomeIcon icon={faUser} style={{paddingRight: '1rem', width: '10%'}}/>Profile</div></Link>
                        <Link to ="/portal"><div><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div></Link>
                    </div>
                </article>
                <article className="mainApplicantsBody">
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', fontFamily: 'Poppins', textAlign: 'center', margin: 'auto', marginTop: '-2rem'}}>Candidates</p>
                    <div className='table'>
                    <table className="applicantsdeets">
                    <thead>
                    <tr style={{border: 'none'}}>
                        <th style={{paddingLeft: '1rem', backgroundColor: '#ffffff', border: 'none'}}></th>
                        <th style={{paddingLeft: "1rem", borderTopLeftRadius: "6px", borderBottomLeftRadius: "6px", border: 'none'}}>Canadidate Name</th>
                        <th style={{border: 'none'}}>Applied Role</th>
                        <th style={{borderTopRightRadius: "6px", borderBottomRightRadius: "6px", border: 'none', paddingRight: '1rem'}}>Offer Status</th>
                    </tr>
                    </thead>
                    {applicantsOfferData.map((data)=>{
                        const {id, student, role, company, offer} = data;
                            return(
                                <Applicants key={id} role={role} student={student} company={company} offer={offer}/>
                            )
                    })}
                    <tbody>
                    <tr >
                        <td style={{border: 'none'}}></td>
                        <td colSpan='5' style={{border: 'none', fontSize: '12px', padding: '18px', margin: 'auto', paddingTop: '2rem', textAlign: 'center'}}>
                            {previousUrl &&
                                <div className={previousUrl && "page"} style={{color: "#4C4C4C", marginRight: '1rem', display: 'inline-block', cursor: 'pointer'}} onClick={()=>paginationHandler(previousUrl)}>Previous Page</div>
                            }
                            {nextUrl &&
                                <div className={nextUrl && "page"} style={{color: "#4C4C4C", display: 'inline-block', cursor: 'pointer'}} onClick={()=>paginationHandler(nextUrl)}>Next Page</div>
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                </article>
            </section>
            <section className='MainContainer'>
                <article className="mainApplicantsBody">
                <p style={{ fontSize: '1.1rem', fontFamily: 'Poppins', textAlign: 'center', margin: '0.5rem auto 2rem',}}>Candidates</p>
                    
                </article>
                <div className='table'>
                    <table className="applicantsdeets">
                    <thead>
                    <tr>
                        <th style={{paddingLeft: '1rem', backgroundColor: '#ffffff', border: 'none'}}></th>
                        <th style={{paddingLeft: "1rem", borderTopLeftRadius: "6px", borderBottomLeftRadius: "6px", border: 'none' }}>Canadidate Name</th>
                        <th style={{border: 'none'}}>Applied Role</th>
                        <th style={{borderTopRightRadius: "6px", borderBottomRightRadius: "6px", border: 'none', paddingRight: '1rem'}}>Offer Status</th>
                    </tr>
                    </thead>
                    {applicantsOfferData.map((data)=>{
                        const {id, student, role, company, offer} = data;
                                return(
                                    <Applicants key={id} role={role} student={student} company={company} offer={offer}/>
                            )
                    })}
                    <tbody>
                    <tr >
                        <td style={{border: 'none'}}></td>
                        <td colSpan='5' style={{border: 'none', fontSize: '12px', padding: '18px', margin: 'auto', paddingTop: '2rem',paddingBottom:'2rem', textAlign: 'center'}}>
                            {previousUrl &&
                                <div className={previousUrl && "page"} style={{color: "#4C4C4C", marginRight: '1rem', display: 'inline-block', cursor: 'pointer'}} onClick={()=>paginationHandler(previousUrl)}>Previous Page</div>
                            }
                            {nextUrl &&
                                <div className={nextUrl && "page"} style={{color: "#4C4C4C", display: 'inline-block', cursor: 'pointer'}} onClick={()=>paginationHandler(nextUrl)}>Next Page</div>
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </section>
        </main>
    )
}

const Applicants = ({id, student, role, company, offer}) => {


    let profile = student.profile_pic
    if (student.profile_pic === null){
        profile = defaultProf
    }
    return(
        <tbody>
        <tr>
            <td style={{paddingLeft: '1rem', borderTop: 'none'}}><img src={profile} alt={student.last_name} style={{width: "30px", height: "30px", objectFit: 'cover', borderRadius: '50%'}}></img></td>
            <td style={{}}>{student.other_names}</td>
            <td>{role.role}</td>
            <td style={{cursor: 'pointer'}}>
                {offer === "Accepted" && <button style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', fontFamily: 'Montserrat', marginRight: '0.5rem'}}>{offer}</button>}
                {offer === "Declined" && <button style={{fontSize: '13px', backgroundColor: "#ff3333", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', fontFamily: 'Montserrat'}}>{offer}</button>}
            </td>
        </tr>
        </tbody>
    )
}

export default ManagerApplicantsOffer;