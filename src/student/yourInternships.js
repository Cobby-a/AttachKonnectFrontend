import './appliedInternship.css'


import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import axios from 'axios';

    const url = 'http://127.0.0.1:8000/'
    const studentId = localStorage.getItem('studentId');



const YourInternships = () => {
    
    const [studentInternshipData, setStudentInternshipData] = useState([])


    useEffect (()=>{
        document.title = ("Your Internships")
        try{
            axios.get(url+'student/studentinternships-list/'+studentId)
            .then((response)=>{
                setStudentInternshipData(response.data)
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
    },[])
    let show = "none"
    
    if (studentInternshipData.length < 1){
        show = "block"
    }
    return(
        <article className='yourAppliedInternshipsBody'>
            <section className='yourAppliedInternshipContainer' >
                <div style={{}}>
                    <p style={{fontFamily: 'Montserrat', fontWeight: "500", color: "#000", textTransform:'uppercase', fontSize: "1.2rem", textAlign: 'center', marginBottom: '3rem',}}>Your Internships</p>
                </div>
                <div className='form'>
                    {}
                    <p style={{display: show, textAlign: 'center', fontFamily: 'Montserrat', fontSize: '1rem', color: '#002D5D',}}>You have no Internship</p>
                    {studentInternshipData.map((data)=>{
                        const {id, role, offer,} = data;
                        
                        return(
                            <>
                            <StudentInternship key={id} offer={offer} role={role}/>
                            </>
                        )
                    })}
                </div>
            </section>
        </article>
    )
}

const StudentInternship = ({role, offer,}) => {

    let classname = "rejected";


    if(offer === 'Accepted'){
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
            <div style={{flex: 1, width:"100%",}}>
                <p>Offer Status: <span className={classname} style={{fontSize: '14px', fontFamily: "Montserrat", }}>{offer}</span></p>
            </div>
        </div>
    )
}

export default YourInternships;