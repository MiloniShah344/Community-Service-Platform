import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes,Route,Link } from 'react-router-dom';
import LoginForm from './LoginForm.js';
import RegistrationForm from './RegistrationForm.js';
import NGODashboard from './NGO/NGODashboard.js';
import NGOManageProjects from './NGO/NGOManageProjects.js';
import NGOPostProjects from './NGO/NGOPostProject.js';
import NGOProfile from './NGO/NGOProfile.js';
import NGOViewVolunteers from './NGO/NGOViewVolunteers.js';
import NGOManageDonations from './NGO/NGOManageDonations.js';
import NGORegister from './NGORegister.js';
import ContributorRegister from './ContributorRegister.js';
import DonorRegister from './DonorRegister.js';
import MainDashboard from './Main Page/MainDashboard.js';
import NGODashboard1 from './NGO/NGODashboard1.js';
import NGOCurrentProjects from './NGO/NGOCurrentProjects.js';
import ContributorDashboard from './Contributor/ContributorDashboard.js';
function App() {

 

  return (
    <div>
      
    <Router>     
      <Routes>
        <Route path='/' element={<MainDashboard/>}/>
        <Route path='/Login' element = {<LoginForm/>}/>
        <Route path='/Register' element={<RegistrationForm/>}/>

        <Route path='/NGODashboard' element={<NGODashboard/>}/>
        <Route path='/NGODashboard1' element={<NGODashboard1/>}/>
        <Route path='/post-project' element={<NGOPostProjects/>}/>
        <Route path='/manage-projects' element={<NGOManageProjects/>}/>
        <Route path='/manage-donations' element={<NGOManageDonations/>}/>
        <Route path='/view-volunteers' element={<NGOViewVolunteers/>}/>
        <Route path='/current-projects' element={<NGOCurrentProjects/>}/>
        <Route path='/profile' element={<NGOProfile/>}/>

        
        <Route path='/ContributorDashboard' element={<ContributorDashboard/>}/>

        
        <Route path='/NGORegister' element={<NGORegister/>}/>
        <Route path='/ContributorRegister' element={<ContributorRegister/>}/>
      </Routes>
    </Router>

    </div>
  );
}

export default App;
