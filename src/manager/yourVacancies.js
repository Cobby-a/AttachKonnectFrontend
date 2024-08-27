import { faHouse, faBriefcase, faUserTie, faRightFromBracket, faBars, faXmark, faMagnifyingGlass, faTrash, faEnvelopeOpen, faUser, faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import './company.css'
import './sidebar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Swal from 'sweetalert2'
import defaultProf from './assets/defaultProf.jpg'




const managerId = localStorage.getItem('managerId');
const url = "https://attachmentkonnect.pythonanywhere.com/manager/"

const CompanyVacancies = () => {
    const [menu, setMenu] = useState(false);
    const [vacancyData, setVacancyData] = useState([]);
    const [managerData, setManagerData] = useState([])
    const [nextUrl, setNextUrl] = useState()
    const [previousUrl, setPreviousUrl] = useState()

    const [query, setQuery] = useState('');
    const results = filterItems(vacancyData, query)

    const onLogout = () =>{
        localStorage.removeItem('managerLoginStatus')
        window.location.href='/portal'
    }

    useEffect(()=>{
        document.title = "Vacancies"
        try{
            axios.get(url+"companyroles-list/"+managerId)
            .then((response)=>{
                console.log(response.data);
                setNextUrl(response.data.next)
                setPreviousUrl(response.data.previous)
                setVacancyData(response.data.results)
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
            axios.get(url+managerId)
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

    function handleSearchChange(e) {
        setQuery(e.target.value);
    }

    const paginationHandler = (url) => {
        try{
            axios.get(url)
            .then((response)=>{
                setNextUrl(response.data.next)
                setPreviousUrl(response.data.previous)
                setVacancyData(response.data.results)
            })
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <main className="managerCompanyBody">
            <header>
                <div className='profile'>
                    <img src={company_pic} alt={managerData.companyName} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>{managerData.companyName}</h2>
                        <div className='hamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'Sidebar' : 'NonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                {/* <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p> */}
                            <div className='SidebarIcons'>
                                <Link to ="/manager/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                                <Link to ="/manager/vacancyboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Your Vacancies</div></Link>
                                <Link to ="/manager/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div></Link>
                                <Link to ="/manager/applicants-offer-status"><div><FontAwesomeIcon icon={faEnvelopeOpen} style={{paddingRight: '1rem', width: '10%'}}/>Applicants Status</div></Link>
                                <Link to ="/manager/profile"><div><FontAwesomeIcon icon={faUser} style={{paddingRight: '1rem', width: '10%'}}/>Profile</div></Link>
                                <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                            </div>
                            </article>
                        </div>
                    </div>
                </div>
            </header>
            <section className='mainContainer'>
                <article className='sidebar'>
                    {/* <p style={{fontFamily: 'Segoe UI',  marginBottom: '3rem', marginLeft: '-1rem', fontWeight:'600',}}>Welcome to dashboard</p> */}
                    <div className='sidebarIcons'>
                        <Link to ="/manager/dashboard"><div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div></Link>
                        <Link to ="/manager/vacancyboard"><div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>YourVacancies</div></Link>
                        <Link to ="/manager/applicantsboard"><div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div></Link>
                        <Link to ="/manager/applicants-offer-status"><div><FontAwesomeIcon icon={faEnvelopeOpen} style={{paddingRight: '1rem', width: '10%'}}/>Applicants Status</div></Link>
                        <Link to ="/manager/profile"><div><FontAwesomeIcon icon={faUser} style={{paddingRight: '1rem', width: '10%'}}/>Profile</div></Link>
                        <div onClick={()=>onLogout()}><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                    </div>
                </article>
                <article className="mainCompanyBody">
                    <div className='companySearch'>
                        <div>
                            <p style={{ fontSize: '1.2rem', marginBottom: '0.4rem', fontFamily: 'Poppins'}}>Your Vacancies</p>
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>Monitor, edit and view your vacancies.</p>
                        </div>
                        <form action="javascript:void(0);">
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '1.2rem', padding: "10px 10px 10px 14px", color: '#4C4C4C' }}/></span><input type='search' name='searchCompany' placeholder='Search Vacancy' value={query} onChange={handleSearchChange}/>
                        </form>
                    </div>
                    <div className='table'>
                    <table className="companydeets">
                    <thead>
                    <tr>
                        <th style={{paddingLeft: '1rem'}}>Role Name</th>
                        <th>Interns Needed</th>
                        <th>Slots remaining</th>
                        <th>Deadline</th>
                        <th></th>
                        <th style={{paddingRight: "4rem"}}></th>
                    </tr>
                    </thead>
                    {results < 1 &&
                    <tbody>
                        <tr>
                            <td colSpan='6' style={{textAlign: 'center', fontFamily: 'Montserrat', fontSize: '1rem', color: '#002D5D', borderTop: '0'}}>
                                You have not created any vacancy slots for your company
                            </td>
                        </tr>
                    </tbody>
                    }
                    {results.map((data)=>{
                        const {id, role, numberOfInterns, deadline, moreInfo, total_accepted_students} = data;

                        return(
                            <Vac1 key={id} id={id} role={role} numberOfInterns={numberOfInterns} deadline={deadline} moreInfo={moreInfo} total_accepted_students={total_accepted_students} setVacancyData={setVacancyData} setNextUrl={setNextUrl} setPreviousUrl={setPreviousUrl}/>
                        )
                    })}
                    <tbody>
                    <tr >
                        <td colSpan='6' style={{backgroundColor: "#F2F2F2", fontSize: '12px', padding: '18px'}}>
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
                <article className="mainCompanyBody">
                    <div className='companySearch'>
                        <div>
                            <h3 style={{color: "#4C4C4C", fontSize: '1.1rem', marginBottom: '0.4rem', fontFamily: 'Montserrat'}}>Your Vacancies</h3>
                            <p style={{color: '#B3B3B3', fontSize: '0.8rem'}}>Monitor, edit and view your vacancies.</p>
                        </div>
                        <form action="javascript:void(0);">
                            <span><FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '1.2rem', padding: "10px 10px 10px 14px", color: '#4C4C4C' }}/></span><input type='search' name='searchCompany' placeholder='Search Vacancy' value={query} onChange={handleSearchChange}/>
                        </form>
                    </div>
                    
                </article>
                <div className='table'>
                    <table className="companydeets">
                    <thead>
                    <tr>
                        <th style={{paddingLeft: '1rem'}}>Role Name</th>
                        <th>Interns Needed</th>
                        <th>Slots remaining</th>
                        <th>Deadline</th>
                        <th></th>
                        <th style={{paddingRight: "4rem"}}></th>
                    </tr>
                    </thead>
                    {results < 1 &&
                    <tbody>
                        <tr>
                            <td colSpan='6' style={{textAlign: 'center', fontFamily: 'Montserrat', fontSize: '1rem', color: '#002D5D', borderTop: '0'}}>
                                You have not created any vacancy slots for your company
                            </td>
                        </tr>
                    </tbody>
                    }
                    {results.map((data)=>{
                        const {id, role, numberOfInterns, deadline, moreInfo, total_accepted_students} = data;

                        return(
                            <Vac1 key={id} id={id} role={role} numberOfInterns={numberOfInterns} deadline={deadline} moreInfo={moreInfo} total_accepted_students={total_accepted_students} setVacancyData={setVacancyData} setNextUrl={setNextUrl} setPreviousUrl={setPreviousUrl}/>
                        )
                    })}
                    <tbody>
                    <tr >
                        <td colSpan='6' style={{backgroundColor: "#F2F2F2", fontSize: '12px', padding: '18px'}}>
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

function filterItems(items, query) {
    query = query.toLowerCase();
    return items.filter(item =>
      item.role.split(' ').some(word =>
        // word.toLowerCase().match(query)
        word.toLowerCase().startsWith(query)
      )
    );
}

const Vac1 = ({id, role, numberOfInterns, deadline, moreInfo, setVacancyData, total_accepted_students, setNextUrl, setPreviousUrl}) => {

    
    const [showInfo, setShowInfo] = useState(false);
    const [edit, setEdit] = useState(false)
    const [vacancy1Data, setVacancy1Data] = useState({
        'role' :role,
        'numberOfInterns' :numberOfInterns,
        'deadline': deadline,
        'moreInfo': moreInfo,
    })

    const handleChange = (event)=>{
        setVacancy1Data({
            ...vacancy1Data,
            [event.target.name]:event.target.value
        })
    }

    const onEdit = () =>{
        setShowInfo(true)
        setEdit(true)
    }
    const onCancel = () =>{
        setShowInfo(false)
        setEdit(false)
        setVacancy1Data({role : role, numberOfInterns : numberOfInterns, deadline: deadline, moreInfo: moreInfo })
        setRoleError("")
        setDeadlineError("")
        setNumOfInternError("")
    }
    
    const [roleError, setRoleError] = useState('')
    const [numOfInternError, setNumOfInternError] = useState('')
    const [deadlineError, setDeadlineError] = useState('')
    
    const onSave = (id, setNextUrl, setPreviousUrl) =>{
        let regex = new RegExp('^[0-9]+$');
        if(vacancy1Data.role.length === 0){
            setRoleError("Role field cannot be empty")
            return;
        }
        else if(vacancy1Data.role.length !== 0){
            setRoleError("")
        }
        if(vacancy1Data.role.length < 3){
            setRoleError("specify a valid role")
            return;
        }
        else if(vacancy1Data.role.length >= 3){
            setRoleError("")
        }
        if(vacancy1Data.numberOfInterns.length === 0){
            setNumOfInternError("Number of interns field cannot be empty")
            return;
        }
        else if(vacancy1Data.numberOfInterns.length !== 0){
            setNumOfInternError("")
        }
        if(regex.test(vacancy1Data.numberOfInterns) === false){
            setNumOfInternError("Invalid input type for number of Interns")
            return;
        }
        else if(regex.test(vacancy1Data.numberOfInterns) === true){
            setNumOfInternError("")
        }
        if(vacancy1Data.deadline.length !== 10){
            setDeadlineError("Input a valid date")
            return;
        }
        else if(vacancy1Data.deadline.length === 10){
            setDeadlineError("")
        }
        if(vacancy1Data.role.length !== 0 && vacancy1Data.role.length >= 3 && vacancy1Data.numberOfInterns.length !== 0 && regex.test(vacancy1Data.numberOfInterns) === true && vacancy1Data.deadline.length === 10){
            const formData = new FormData();
            formData.append('company', managerId);
            formData.append('role', vacancy1Data.role);
            formData.append('numberOfInterns', vacancy1Data.numberOfInterns);
            formData.append('moreInfo', vacancy1Data.moreInfo)
            
            try{
                axios.put(url+'roles/'+id+'/', formData)
                .then((response)=>{
                    console.log(response)
                    if(response.status===200){
                        Swal.fire({
                            title: 'Data has been updated',
                            icon: 'success',
                            toast: true,
                            timer: 3000,
                            position: 'top-right',
                            timerProgressBar:true,
                            showConfirmButton: false,
                        });
                        try{
                            axios.get(url+"companyroles-list/"+managerId)
                            .then((response)=>{
                                setNextUrl(response.data.next)
                                setPreviousUrl(response.data.previous)
                                setVacancyData(response.data.results)
                                setShowInfo(false)
                                setEdit(false)
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
                                      })
                                  }
                            })
                        }
                        catch(error){
                            console.log(error)
                        }
                    }
                    // window.location.href='/manager/vacancyboard'
                })
            }catch(error){
                console.log(error)
            }
        }
    }

    const handleDeleteClick = (role, id) => {
        Swal.fire({
            title: 'Confirm',
            text: `Are you sure you want to delete vacancy for ${role}?`,
            icon: 'info',
            confirmButtonText: 'Yes, Continue',
            showCancelButton: true
        })
        .then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(url+'roles/'+id+'/')
                    .then((response)=>{
                        console.log(response)
                        Swal.fire('success', `Vacancy for ${role} has been deleted.`);
                        try{
                            axios.get(url+'companyroles-list/'+managerId)
                            .then((response)=>{
                                setNextUrl(response.data.next)
                                setPreviousUrl(response.data.previous)
                                setVacancyData(response.data.results)
                            })
                            .catch((error)=>{
                                if (error.response) {
                                    Swal.fire({
                                        title: 'Error',
                                        text: `There was a ${error.response.status} bad request deleting the data`,
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
                                      })
                                  }
                            })
                        }
                        catch(error){
                            console.log(error)
                        }
                    })
                }
                catch(error){
                    console.log(error)
                }
            }
          })
    }

    let slot_remaining = numberOfInterns - total_accepted_students
    if(total_accepted_students >= numberOfInterns){
        slot_remaining = "Quota reached"
    }

    return(
        <tbody>
        <tr style={{cursor: 'pointer'}}>
            <td style={{paddingLeft: '1rem'}} onClick={()=>setShowInfo(!showInfo)}>{edit ? <input style={{padding: "1px 5px 1px 5px", width: '175px'}} value={vacancy1Data.role} onChange={handleChange} name='role'/>:role} {roleError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{roleError}</p>}</td>
            <td onClick={()=>setShowInfo(!showInfo)}>{edit ? <input style={{padding: "1px 5px 1px 5px", width: '50px', textAlign: 'center'}} value={vacancy1Data.numberOfInterns} onChange={handleChange} name='numberOfInterns'/>:numberOfInterns} {numOfInternError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{numOfInternError}</p>}</td>
            <td onClick={()=>setShowInfo(!showInfo)}>{slot_remaining}</td>
            <td onClick={()=>setShowInfo(!showInfo)}>{edit ? <input style={{padding: "1px 5px 1px 5px", width: '115px'}} value={vacancy1Data.deadline} onChange={handleChange} name='deadline' type='date'/>:deadline} {deadlineError && <p style={{ fontSize: '12.5px', color: "#ff3333", }}>{deadlineError}</p>}</td>
            <td>
                <span style={{marginRight: '0.5rem', cursor: 'pointer'}}>
                    {edit ? <button style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat'}} onClick={()=>onSave(id, setNextUrl, setPreviousUrl)}>Save</button> : <button style={{fontSize: '13px', backgroundColor: "#1A7AE0", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat'}} onClick={()=>onEdit()}>Edit</button>}
                </span>
            </td>     
            <td>   
                <span style={{marginLeft: '1rem', marginRight: '-1rem', cursor: 'pointer'}}>
                    {edit ? <button style={{fontSize: '13px', backgroundColor: "#ff3333", padding: '4px', borderRadius: '4px', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat', marginLeft: '-1rem',}} onClick={()=>onCancel()}>Cancel</button> : <FontAwesomeIcon onClick={()=>handleDeleteClick(role, id)} icon={faTrash} style={{fontSize: '1.2rem', color: "#ff3333"}}/>}
                </span>
            </td>
        </tr>
        <tr style={{borderTop: '0', }} className={showInfo ? 'showInfo1' : 'showInfo'}>
            <td colSpan='4' style={{paddingLeft: '1rem', borderTop: '0',paddingRight: "1.5rem", fontSize: '12px' }}><span style={{fontWeight: 'bold', fontFamily: 'Montserrat', color: '#4C4C4C', fontSize: '12px'}}>Short info on the role: </span>{edit ? <input style={{padding: "1px 5px 1px 5px", width: '100%',}} value={vacancy1Data.moreInfo} onChange={handleChange} name='moreInfo'/>:moreInfo}</td>
        </tr>
        </tbody>
    )
}
export default CompanyVacancies;