import React, { useState } from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from './layout/NavBar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './user/AddUser';
import EditUser from './user/EditUser';
import ViewUser from './user/ViewUser';
import AddTeacher from './teacher/AddTeacher';
import HomeEstudiantes from './pages/HomeEstudiantes';
import HomeProfesores from './pages/HomeProfesores';
import EditTeacher from './teacher/EditTeacher';
import ViewTeacher from './teacher/ViewTeacher';
import AddSubject from './Asignatura/AddSubject';
import HomeSubject from './pages/HomeSubject';
import EditSubject from './Asignatura/EditSubject';
import ViewSubject from './Asignatura/ViewSubject';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/addprofesor" element={<AddTeacher />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/editprofesor/:id" element={<EditTeacher />} />
          <Route exact path="/viewprofesor/:id" element={<ViewTeacher />} />
          <Route exact path="/homeestudiantes" element={<HomeEstudiantes />} />
          <Route exact path="/homeprofesores" element={<HomeProfesores />} />
          <Route exact path="/addsubject" element={<AddSubject />} />
          <Route exact path="/homesubject" element={<HomeSubject />} />
          <Route exact path="/editsubject/:id" element={<EditSubject />} />
          <Route exact path="/viewsubject/:id" element={<ViewSubject />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
