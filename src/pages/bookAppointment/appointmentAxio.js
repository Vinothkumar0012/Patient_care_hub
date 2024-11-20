import axios from "axios";

const url = `${process.env.REACT_APP_URL}`;


export async function bookAppointmentApi(payload) {
    return await axios.post(`${url}bookAppointment`, payload);
}

export async function getAppointmentsApi(params) {
    return await axios.get(`${url}getAppointments`, { params });

}