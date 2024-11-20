import axios from "axios";

const url = `${process.env.REACT_APP_URL}`;

export async function loginAxios(payload) {
    return await axios.post(`${url}login`, payload);
}