import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './pages/home/home';
import HospitalPage from './pages/hospitals/hospitals';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DoctorPage from './pages/doctors/doctors';
import AppointmentBookPage from './pages/bookAppointment/bookAppointment';
import LoginPage from './pages/login/login';
import AppointmentsPage from './pages/bookAppointment/apointments';

export const AppName = 'Patient Care HUB';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/hospitals'} element={<HospitalPage />} />
        <Route path={'/doctors'} element={<DoctorPage />} />
        <Route path={'/bookAppointment'} element={<AppointmentBookPage />} />
        <Route path={'/appointments'} element={<AppointmentsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
