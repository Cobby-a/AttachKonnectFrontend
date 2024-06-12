import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './apply.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './sidebar.css'

const StudentApply = () => {
    return(
        <article className='studentApplyBody'>
            <section className='applyContainer'>
                <div style={{display: 'flex', justifyContent:'space-between',}}>
                    <p style={{fontFamily: 'Montserrat', fontWeight: "600", textTransform:'uppercase', fontSize: "1.2rem", alignContent: 'center', alignSelf: 'center'}}>Apply</p>
                    <Link to="/student/vacancyboard"><FontAwesomeIcon icon={faXmark} style={{fontSize: "32px", color: "#8F8F8F", cursor:'pointer',marginTop: "-0.5rem"}}/></Link>
                </div>
                <form>
                    <div className="formContainer1">
                        <div style={{flex: 1}}>
                            <label>First name</label>
                            <div className='input'><input type='text' required name='firstName'/></div>
                        </div>
                        <div style={{flex: 1}}>
                            <label>Last name</label>
                            <div className='input'><input type='text' required name='lastName'/></div>
                        </div>
                        <div style={{flex: 1}}>
                            <label>RA</label>
                            <div className='input'><input type='text' required/></div>
                        </div>
                    </div>
                    <div className='formContainer2'>
                        <div style={{flex: 1}}>
                            <label>E-mail</label>
                            <div className='input'><input type='email' required name='email'/></div>
                        </div>
                        <div style={{flex: 1}}>
                            <label>Phone</label>
                            <div className='input'><input type='tel' required name='phone'/></div>
                        </div>
                        <div style={{flex: 1}}>
                            <label>Contracting Company</label>
                            <div className='input'><input type='text' required name='contractingCompany'/></div>
                        </div>
                    </div>
                    <div className='formContainer3'>
                        <div style={{flex: 1}}>
                            <p>Skills</p>
                            <textarea rows="10" name='jobDescription'></textarea>
                        </div>
                        <div style={{flex: 1}}>
                            <p>Internship Activities (separate with commas)</p>
                            <textarea rows="10" name='jobDescription'></textarea>
                        </div>
                    </div>
                    <Link to="/student/vacancyboard"><button type='submit'>Apply Internship</button></Link>
                </form>
            </section>
        </article>
    )
}

export default StudentApply;