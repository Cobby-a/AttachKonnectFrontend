import { Link } from 'react-router-dom';
import '../src/student/appliedInternship.css'


import { useEffect } from 'react';


const NotFound = () => {
    


    useEffect (()=>{
        document.title = ("404 - Page Not Found");
    },[])
   
    return(
        <article className='yourAppliedInternshipsBody'>
            <section className='yourAppliedInternshipContainer' >
                <div style={{}}>
                    <p style={{fontFamily: 'Montserrat', fontWeight: "500", color: "#000", fontSize: "1.2rem", textAlign: 'center', marginBottom: '2rem', lineHeight: '1.3rem'}}>Sorry, The page you are looking for cannot be found</p>
                </div>
                <div className='form'>
                    <Link to='/portal'><p style={{textAlign: 'center', fontFamily: 'Montserrat', fontSize: '1.2rem', color: '#002D5D', fontWeight: 'bold', textDecoration: 'underline'}}>Go back to our portal</p></Link>
                </div>
            </section>
        </article>
    )
}

export default NotFound;