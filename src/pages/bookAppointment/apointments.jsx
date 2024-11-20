import React, { useEffect, useState } from "react";
import logo from '../../assets/logo.png'
import { AppName } from "../..";
import { getAppointmentsApi } from "./appointmentAxio";

export default function AppointmentsPage() {

    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {

        const { data } = await getAppointmentsApi({ user_id: localStorage.getItem('id') })

        if (data) {
            setAppointments(data);
        }

    }

    useEffect(() => {
        getAppointments()
    }, []);
    return <>
        <div>
            <div className="d-flex justify-content-between p-2">
                <div className="d-flex align-items-center gap-2">
                    <img src={logo} alt="logo" height={50} />
                    <h5>{AppName}</h5>
                </div>
                <div>
                    <h3>Appointments</h3>
                </div>
                <div style={{ width: 200 }}></div>
            </div>

            <div className="row">
                {appointments.map((appointment) => {
                    return <div className="col-3">
                        <div className="card m-2 p-2">
                            <h5>ID : {appointment.appointment_id}</h5>
                            <h5>{appointment.patient_name}</h5>
                            <h5>{appointment.patient_contact}</h5>
                            <h5>{appointment.reason}</h5>
                            <h5>{appointment.doctor_name}</h5>
                        </div>

                    </div>
                })}
            </div>
        </div>
    </>
}