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
          <Route path='/'>
            <Route index element = {<Navigate to= "portal" replace/>}/>
            <Route path = "/portal" element = {<Auth/>}/>
            <Route path = "/admin/dashboard" element = {<AdminDashboard/>}/>
            <Route path = "/admin/companyboard" element = {<AdminCompany/>}/>
            <Route path = "/admin/vacancyboard" element = {<AdminVacancy/>}/>
            <Route path = "/admin/applicantsboard" element = {<AdminApplicants/>}/>
            <Route path = "/admin/manage-users" element = {<AdminManageUsers/>}/>
            <Route path = "/manager/dashboard" element = {<ManagerDashboard/>}/>
            <Route path = "/manager/companyboard" element = {<ManagerCompany/>}/>
            <Route path = "/manager/applicantsboard" element = {<ManagerApplicants/>}/>
            <Route path = "/supervisor/dashboard" element = {<SupervisorDashboard/>}/>
            <Route path = "/supervisor/dashboard/register-intern" element = {<SupervisorRegisterIntern/>}/>
            <Route path = "/supervisor/companyboard" element = {<SupervisorCompany/>}/>
            <Route path = "/supervisor/manage-users" element = {<SupervisorManageUsers/>}/>
            <Route path = "/student/dashboard" element = {<StudentDashboard/>}/>
            <Route path = "/student/companyboard" element = {<StudentCompany/>}/>
            <Route path = "/student/vacancyboard" element = {<StudentVacancy/>}/>
            <Route path = "/student/vacancyboard/apply" element = {<StudentApply/>}/>
            <Route path="*" element={<Navigate to="portal" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    // </div>
  );
}

export default App;
