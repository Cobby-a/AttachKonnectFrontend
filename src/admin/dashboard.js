import './dashboard.css'
import profile from './assets/profile.png'
import welcome from './assets/welcome.png'
const AdminDashboard = () => {
    return (
        <main className="adminBody">
            <section>
                <div className='profile'>
                    <img src={profile} alt="profile" />
                    <div>
                        <h2>Solomon</h2>
                    </div>
                </div>
                <div className='welcome'>
                    <div>
                        <p>March 4, 2024</p>
                        <h3>Welcome back, Solomon!</h3>
                        <p>Always stay updated in your system’s portal</p>
                    </div>
                    <img src={welcome} alt="welcome" />
                </div>
                <div className='welcome1'>
                    <div>
                        <p>March 4, 2024</p>
                        <h3>Welcome back, Solomon!</h3>
                        <p>Always stay updated in your system’s portal</p>
                    </div>
                    <img src={welcome} alt="welcome" />
                </div>
            </section>
        </main>
    )
}


export default AdminDashboard;