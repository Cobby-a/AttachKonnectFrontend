import profile from './assets/profile.png'
import { faBuilding, faHouse, faBriefcase, faUserTie, faUserGear, faRightFromBracket, faBars, faXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import './manageUsers.css'
import './sidebar.css'


const AdminManageUsers = () => {
    const [menu, setMenu] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    let passwordType = "password"
    if(showPassword === true){
        passwordType = "text";
    }

    return(
        <main className="adminManageUsersBody">
            <header>
                <div className='profile'>
                    <img src={profile} alt="profile" />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2 style={{alignSelf: 'center'}}>Solomon</h2>
                        <div className='hamMenu'>
                            <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer',}} onClick={()=>setMenu(!menu)}/>
                            <article className={menu ? 'Sidebar' : 'NonSidebar'}>
                                <FontAwesomeIcon icon={menu ? faXmark : faBars} style={{paddingRight: '0.5rem', fontSize: '1.75rem', cursor: 'pointer', position: 'relative', left: '87%', marginBottom: '0.75rem'}} onClick={()=>setMenu(!menu)}/>
                                {/* <p style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",   marginLeft: '-1rem', fontWeight:'600', fontSize: '1rem' }}>Welcome to dashboard</p> */}
                            <div className='SidebarIcons'>
                                <div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%', }}/>Dashboard</div>
                                <div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div>
                                <div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div>
                                <div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div>
                                <div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faUserGear} style={{paddingRight: '1rem', width: '10%'}}/>Manage Users</div>
                                <div><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                            </div>
                            </article>
                        </div>
                    </div>
                </div>
            </header>
            <section className='mainContainer'>
                <article className='sidebar'>
                    {/* <p style={{fontFamily: 'Segoe UI', marginTop: '-3rem', marginBottom: '3rem', marginLeft: '-1rem', fontWeight:'600',}}>Welcome to dashboard</p> */}
                    <div className='sidebarIcons'>
                        <div><FontAwesomeIcon icon={faHouse} style={{paddingRight: '1rem', width: '10%'}}/>Dashboard</div>
                        <div><FontAwesomeIcon icon={faBuilding} style={{paddingRight: '1rem', width: '10%'}}/>Company</div>
                        <div><FontAwesomeIcon icon={faBriefcase} style={{paddingRight: '1rem', width: '10%'}}/>Vacancy</div>
                        <div><FontAwesomeIcon icon={faUserTie} style={{paddingRight: '1rem', width: '10%'}}/>Applicants</div>
                        <div style={{color: '#9FD9B7'}}><FontAwesomeIcon icon={faUserGear} style={{paddingRight: '1rem', width: '10%'}}/>Manage Users</div>
                        <div><FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight: '1rem', width: '10%'}}/>Logout</div>
                    </div>
                </article>
                <article className='manageUserContainer'>
                    <h3 style={{fontSize: '1.2rem', fontFamily: 'Montserrat', marginTop: '-2.5rem', textTransform: 'uppercase', textAlign: 'center'}}>Edit User Information</h3>
                    <form>
                        <div style={{display: 'flex', flexFlow: 'row wrap', columnGap:"20rem", }}>
                            <div style={{flex: 1}}>
                                <label>Name</label>
                                <div className='input'><input type='text' required/></div>
                            </div>
                            <div style={{flex: 1}}>
                                <label>Password</label>
                                <div className='input' style={{display: 'flex', border: '1px solid #E6E6E6', borderRadius: "4px", alignItems: 'center', paddingRight: "8px"}}><input type={passwordType} required style={{border: 'none'}}/><span><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{fontSize: '1rem', justifySelf: 'center', cursor: 'pointer' }} onClick={()=>setShowPassword(!showPassword)}/></span></div>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexFlow: 'row wrap', columnGap:"20rem", marginTop: "5rem"}}>
                            <div style={{flex: 1}}>
                                <label>E-mail</label>
                                <div className='input'><input type='email' required/></div>
                            </div>
                            <div style={{flex: 1}}>
                                <label>Phone</label>
                                <div className='input'><input type='phone' required/></div>
                            </div>
                        </div>
                        <button type='submit'>Save</button>
                    </form>
                </article>
            </section>
            <section className='MainContainer'>
            <article className='manageUserContainer'>
                    <h3 style={{fontSize: '1.2rem', fontFamily: 'Montserrat', marginTop: '2.5rem', textTransform: 'uppercase', textAlign: 'center'}}>Edit User Information</h3>
                    <form>
                        <div style={{display: 'flex', flexFlow: 'row wrap', columnGap:"10rem", }}>
                            <div style={{margin: 'auto'}}>
                                <label>Name</label>
                                <div className='input'><input type='text' required/></div>
                            </div>
                            <div style={{margin: 'auto'}}>
                                <label>Password</label>
                                <div className='input' style={{display: 'flex', border: '1px solid #E6E6E6', borderRadius: "4px", alignItems: 'center', paddingRight: "8px"}}><input type={passwordType} required style={{border: 'none'}}/><span><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{fontSize: '1rem', justifySelf: 'center', cursor: 'pointer' }} onClick={()=>setShowPassword(!showPassword)}/></span></div>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexFlow: 'row wrap', columnGap:"10rem", marginTop: "5rem"}}>
                            <div style={{margin: 'auto'}}>
                                <label>E-mail</label>
                                <div className='input'><input type='email' required/></div>
                            </div>
                            <div style={{margin: 'auto'}}>
                                <label>Phone</label>
                                <div className='input'><input type='phone' required/></div>
                            </div>
                        </div>
                        <button type='submit'>Save</button>
                    </form>
                </article>
            </section>
        </main>
    )
}

export default AdminManageUsers;