import '@fortawesome/fontawesome-free/css/all.css';

import AdminDashboard from "./admin/dashboard";
import Auth from "./authentication/auth"
import AdminCompany from "./admin/company";
import AdminVacancy from './admin/vacancy';
import AdminApplicants from './admin/applicants';
import AdminManageUsers from './admin/manageUsers';
import ManagerDashboard from './manager/dashboard';
import CompanyVacancies from './manager/yourVacancies';
import ManagerApplicants from './manager/applicants';
import SupervisorDashboard from './supervisor/dashboard';
import SupervisorRegisterIntern from './supervisor/registerIntern';
import SupervisorCompany from './supervisor/company';
import SupervisorManageUsers from './supervisor/manageUsers';
import StudentCompany from './student/company';
import StudentVacancy from './student/vacancy';
import StudentApply from './student/apply';
import StudentDashboard from './student/dashboard';
import ManagerApplicantsOffer from './manager/applicantsOfferStatus';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ManagerSignUp from './authentication/managerSignUp';
import ManagerCreateVacancy from './manager/createVacancy';

import CompanyDeets from './student/comapanyDeets';
import AppliedInternships from './student/appliedInternships';
import YourInternships from './student/yourInternships';
import StudentProfile from './student/profile';
import ManagerPrivateRoute from './privateRouter/managerPrivateRouter';
import StudentPrivateRoute from './privateRouter/studentPrivateRouter';
import SupervisorPrivateRoute from './privateRouter/supervisorPrivateRouter';
import AdminPrivateRoute from './privateRouter/adminPrivateRouter';

function App() {
  const isManagerLoggedIn = localStorage.getItem('managerLoginStatus') ? true : false;
  const isAdminLoggedIn = localStorage.getItem('adminLoginStatus') ? true : false;
  const isStudentLoggedIn = localStorage.getItem('studentLoginStatus') ? true : false;
  const isSupervisorLoggedIn = localStorage.getItem('supervisorLoginStatus') ? true : false;

  const wrapManagerPrivateRoute = (element, user, redirect) => {
    return (
      <ManagerPrivateRoute user={user} redirect={redirect}>
        {element}
      </ManagerPrivateRoute>
    );
  };
  const wrapAdminPrivateRoute = (element, user, redirect) => {
    return (
      <AdminPrivateRoute user={user} redirect={redirect}>
        {element}
      </AdminPrivateRoute>
    );
  };
  const wrapStudentPrivateRoute = (element, user, redirect) => {
    return (
      <StudentPrivateRoute user={user} redirect={redirect}>
        {element}
      </StudentPrivateRoute>
    );
  };
  const wrapSupervisorPrivateRoute = (element, user, redirect) => {
    return (
      <SupervisorPrivateRoute user={user} redirect={redirect}>
        {element}
      </SupervisorPrivateRoute>
    );
  };

  return (
    // <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/'>
            <Route exact index element = {<Navigate to= "portal" replace/>}/>
            <Route exact path = "/portal" element = {<Auth/>}/>
            <Route exact path = "/manager-apply" element = {<ManagerSignUp/>}/>

            <Route exact path = "/admin/dashboard" element = {wrapAdminPrivateRoute(<AdminDashboard/>, isAdminLoggedIn, '/admin/dashboard')}/>
            <Route exact path = "/admin/companyboard" element = {wrapAdminPrivateRoute(<AdminCompany/>, isAdminLoggedIn, '/admin/companyboard')}/>
            <Route exact path = "/admin/vacancyboard" element = {wrapAdminPrivateRoute(<AdminVacancy/>, isAdminLoggedIn, '/admin/vacancyboard')}/>
            <Route exact path = "/admin/applicantsboard" element = {wrapAdminPrivateRoute(<AdminApplicants/>, isAdminLoggedIn, '/admin/applicantsboard')}/>
            <Route exact path = "/admin/manage-users" element = {wrapAdminPrivateRoute(<AdminManageUsers/>, isAdminLoggedIn, '/admin/manage-users')}/>

            <Route exact path = "/manager/dashboard" element={wrapManagerPrivateRoute(<ManagerDashboard/>, isManagerLoggedIn, '/manager/dashboard')}/>
            <Route exact path = "/manager/vacancyboard" element={wrapManagerPrivateRoute(<CompanyVacancies/>, isManagerLoggedIn, '/manager/vacancyboard')}/>
            <Route exact path = "/manager/applicantsboard" element={wrapManagerPrivateRoute(<ManagerApplicants/>, isManagerLoggedIn, '/manager/applicantsboard')}/>
            <Route exact path = "/manager/create-vacancy" element={wrapManagerPrivateRoute(<ManagerCreateVacancy/>, isManagerLoggedIn, '/manager/create-vacancy')}/>
            <Route exact path = "/manager/applicants-offer-status" element={wrapManagerPrivateRoute(<ManagerApplicantsOffer/>, isManagerLoggedIn, '/manager/applicants-offer-status')}/>
            
            <Route exact path = "/supervisor/dashboard" element = {<SupervisorDashboard/>}/>
            <Route exact path = "/supervisor/dashboard/register-intern" element = {<SupervisorRegisterIntern/>}/>
            <Route exact path = "/supervisor/companyboard" element = {<SupervisorCompany/>}/>
            <Route exact path = "/supervisor/manage-users" element = {<SupervisorManageUsers/>}/>

            <Route exact path = "/student/dashboard" element = {wrapStudentPrivateRoute(<StudentDashboard/>, isStudentLoggedIn, '/student/dashboard')}/>
            <Route exact path = "/student/companyboard" element = {wrapStudentPrivateRoute(<StudentCompany/>, isStudentLoggedIn, '/student/companyboard')}/>
            <Route exact path = "/student/vacancyboard" element = {wrapStudentPrivateRoute(<StudentVacancy/>, isStudentLoggedIn, '/student/vacancyboard')}/>
            <Route exact path = "/student/vacancyboard/apply" element = {wrapStudentPrivateRoute(<StudentApply/>, isStudentLoggedIn, '/student/vacancyboard/apply')}/>
            <Route exact path="/student/company/:id/:companyName" element = {wrapStudentPrivateRoute(<CompanyDeets/>, isStudentLoggedIn, '/student/dashboard')}/>
            <Route exact path = "/student/your-applied-internships" element = {wrapStudentPrivateRoute(<AppliedInternships/>, isStudentLoggedIn, '/student/your-applied-internships')}/>
            <Route exact path = "/student/your-internships" element = {wrapStudentPrivateRoute(<YourInternships/>, isStudentLoggedIn, '/student/your-internships')}/>
            <Route exact path = "/student/profile" element = {wrapStudentPrivateRoute(<StudentProfile/>, isStudentLoggedIn, '/student/profile')}/>

            <Route exact path="*" element={<Navigate to="portal" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    // </div>
  );
}

export default App;
