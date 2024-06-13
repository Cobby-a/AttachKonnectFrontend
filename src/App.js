import '@fortawesome/fontawesome-free/css/all.css';

import AdminDashboard from "./admin/dashboard";
import Auth from "./authentication/auth"
import AdminCompany from "./admin/company";
import AdminVacancy from './admin/vacancy';
import AdminApplicants from './admin/applicants';
import AdminManageUsers from './admin/manageUsers';
import ManagerDashboard from './manager/dashboard';
import ManagerCompany from './manager/company';
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


function App() {
  return (
    // <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/'>
            <Route exact index element = {<Navigate to= "portal" replace/>}/>
            <Route exact path = "/portal" element = {<Auth/>}/>
            <Route exact path = "/admin/dashboard" element = {<AdminDashboard/>}/>
            <Route exact path = "/admin/companyboard" element = {<AdminCompany/>}/>
            <Route exact path = "/admin/vacancyboard" element = {<AdminVacancy/>}/>
            <Route exact path = "/admin/applicantsboard" element = {<AdminApplicants/>}/>
            <Route exact path = "/admin/manage-users" element = {<AdminManageUsers/>}/>
            <Route exact path = "/manager/dashboard" element = {<ManagerDashboard/>}/>
            <Route exact path = "/manager/companyboard" element = {<ManagerCompany/>}/>
            <Route exact path = "/manager/applicantsboard" element = {<ManagerApplicants/>}/>
            <Route exact path = "/supervisor/dashboard" element = {<SupervisorDashboard/>}/>
            <Route exact path = "/supervisor/dashboard/register-intern" element = {<SupervisorRegisterIntern/>}/>
            <Route exact path = "/supervisor/companyboard" element = {<SupervisorCompany/>}/>
            <Route exact path = "/supervisor/manage-users" element = {<SupervisorManageUsers/>}/>
            <Route exact path = "/student/dashboard" element = {<StudentDashboard/>}/>
            <Route exact path = "/student/companyboard" element = {<StudentCompany/>}/>
            <Route exact path = "/student/vacancyboard" element = {<StudentVacancy/>}/>
            <Route exact path = "/student/vacancyboard/apply" element = {<StudentApply/>}/>
            <Route exact path="*" element={<Navigate to="portal" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    // </div>
  );
}

export default App;
