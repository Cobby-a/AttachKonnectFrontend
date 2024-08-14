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

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ManagerSignUp from './authentication/managerSignUp';
import ManagerCreateVacancy from './manager/createVacancy';

import CompanyDeets from './student/comapanyDeets';
import AppliedInternships from './student/appliedInternships';
import YourInternships from './student/yourInternships';
import StudentProfile from './student/profile';
import ManagerPrivateRoute from './managerPrivateRouter';

function App() {
  const isManagerLoggedIn = localStorage.getItem('managerLoginStatus') ? true : false;

  const wrapManagerPrivateRoute = (element, user, redirect) => {
    return (
      <ManagerPrivateRoute user={user} redirect={redirect}>
        {element}
      </ManagerPrivateRoute>
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
            <Route exact path = "/admin/dashboard" element = {<AdminDashboard/>}/>
            <Route exact path = "/admin/companyboard" element = {<AdminCompany/>}/>
            <Route exact path = "/admin/vacancyboard" element = {<AdminVacancy/>}/>
            <Route exact path = "/admin/applicantsboard" element = {<AdminApplicants/>}/>
            <Route exact path = "/admin/manage-users" element = {<AdminManageUsers/>}/>
            <Route exact path = "/manager/dashboard" element={wrapManagerPrivateRoute(<ManagerDashboard/>, isManagerLoggedIn, '/manager/dashboard')}/>
            <Route exact path = "/manager/vacancyboard" element={wrapManagerPrivateRoute(<CompanyVacancies/>, isManagerLoggedIn, '/manager/vacancyboard')}/>
            <Route exact path = "/manager/applicantsboard" element={wrapManagerPrivateRoute(<ManagerApplicants/>, isManagerLoggedIn, '/manager/applicantsboard')}/>
            <Route exact path = "/manager/create-vacancy" element={wrapManagerPrivateRoute(<ManagerCreateVacancy/>, isManagerLoggedIn, '/manager/create-vacancy')}/>
            <Route exact path = "/supervisor/dashboard" element = {<SupervisorDashboard/>}/>
            <Route exact path = "/supervisor/dashboard/register-intern" element = {<SupervisorRegisterIntern/>}/>
            <Route exact path = "/supervisor/companyboard" element = {<SupervisorCompany/>}/>
            <Route exact path = "/supervisor/manage-users" element = {<SupervisorManageUsers/>}/>
            <Route exact path = "/student/dashboard" element = {<StudentDashboard/>}/>
            <Route exact path = "/student/companyboard" element = {<StudentCompany/>}/>
            <Route exact path = "/student/vacancyboard" element = {<StudentVacancy/>}/>
            <Route exact path = "/student/vacancyboard/apply" element = {<StudentApply/>}/>
            <Route exact path="/student/company/:id/:companyName" element={<CompanyDeets/>} />
            <Route exact path = "/student/your-applied-internships" element = {<AppliedInternships/>}/>
            <Route exact path = "/student/your-internships" element = {<YourInternships/>}/>
            <Route exact path = "/student/profile" element = {<StudentProfile/>}/>
            <Route exact path="*" element={<Navigate to="portal" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    // </div>
  );
}

export default App;
