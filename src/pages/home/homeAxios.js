import axios from "axios";

const url = `${process.env.REACT_APP_URL}`;

export async function getDoctorsApi(params) {
    return await axios.get(`${url}doctors`, { params });
}