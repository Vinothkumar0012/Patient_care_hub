import React, { useState } from "react";
import logo from '../../assets/logo.jpg'
import { useNavigate } from "react-router-dom";
import { AppName } from "../..";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { ThreeDots } from 'react-loader-spinner';
import { getDoctorsApi } from "./homeAxios";
import { Tooltip } from "react-tooltip";

export default function HomePage() {

    const naviage = useNavigate();

    const [result, setResult] = useState('');

    const [prompt, setPrompt] = useState('');

    const [loading, setLoading] = useState(false);

    const [doctors, setDoctors] = useState([]);

    const [currentTab, setCurrentTab] = useState(0);

    const options = [
        {
            name: 'Hospitals',
            button: 'View Hospitals',
            path: '/hospitals',
        },
        {
            name: 'Doctors',
            button: 'View Doctors',
            path: '/doctors',
        },
        {
            name: 'Appointments',
            button: 'View Appointments',
            path: '/hospitals',
        },
        {
            name: 'Prescription',
            button: 'View Prescriptions',
            path: '/hospitals',
        },
        {
            name: 'Symptoms with Gen AI',
            button: 'Detect',
            path: '/hospitals',
        },

    ];

    const getDoctors = async () => {
        const { data } = await getDoctorsApi({ disease: prompt })
        if (data) {
            setDoctors(data)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const genAI = new GoogleGenerativeAI('AIzaSyByqgPyyaPV7mBwm5H8G-S10SYr6xgOEZU');
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

        const result = await model.generateContent(prompt + ' Make it in 8 lines and simple english');
        console.log(result.response.text());

        setResult(result.response.text());

        await getDoctors();

        setLoading(false);
    }


    return (
        <>
            <div>

                {/* Header */}
                <div style={{
                    backgroundImage: 'url(/assets/home.jpg)',
                    width: '100vw',
                    height: '100vh',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPositionY: 'bottom'
                }}>

                    <div className="d-flex justify-content-between p-2">
                        <div className="d-flex align-items-center gap-2">
                            <img src={logo} alt="logo" height={50} style={{ borderRadius: 100 }} />
                            <h2>{AppName}</h2>
                        </div>
                        <div>
                            {localStorage.getItem('id') ?

                                <>
                                    <div
                                        className="text-white fw-bold me-3"
                                        id="profile"
                                    >
                                        {localStorage.getItem('name')}
                                    </div>
                                    <Tooltip
                                        anchorSelect="#profile"
                                        clickable
                                    >
                                        <div>
                                            <button
                                                className="btn text-white"
                                                onClick={() => {
                                                    naviage('/appointments')
                                                }}
                                            >
                                                Appointments
                                            </button>
                                            <button
                                                className="btn text-white"
                                                onClick={() => {
                                                    localStorage.removeItem('id');
                                                    window.location.reload();
                                                }}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </Tooltip>
                                </>
                                :
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        naviage('/login')
                                    }}
                                > Login / Signup
                                </button>
                            }
                        </div>
                    </div>

                    <div >
                        <h1 className="text-center">Welcome to {AppName}</h1>
                        <h4 className="text-center">A complete health management system</h4>
                        <form
                            onSubmit={onSubmit}
                            className="d-flex align-items-center justify-content-center mt-5"
                        >
                            <input
                                type="search"
                                className="form-control"
                                name="search"
                                placeholder="Type Something"
                                style={{ width: '30vw' }}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                            <button
                                className="btn btn-primary ms-3"
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    <div className="container mt-5" style={{ width: '80vw' }}>
                        {loading ?
                            <div className="d-flex justify-content-center">
                                <ThreeDots
                                    visible={true}
                                />
                            </div> : !result ?
                                <div className="text-center mt-5">
                                    <h5>{'Type Something...!'}</h5>
                                </div>
                                :
                                <div>
                                    <ul className="nav nav-tabs mt-5 justify-content-center" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link ${currentTab === 0 ? 'active' : ''}`}
                                                id="prompt-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#prompt"
                                                type="button"
                                                role="tab"
                                                aria-controls="prompt"
                                                aria-selected="true"
                                                onClick={() => setCurrentTab(0)}
                                            >
                                                About It
                                            </button>
                                        </li>
                                        <li className="nav-item ms-4" role="presentation">
                                            <button
                                                className={`nav-link ${currentTab === 1 ? 'active' : ''}`}
                                                id="doctors-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#doctors"
                                                type="button"
                                                role="tab"
                                                aria-controls="doctors"
                                                aria-selected="false"
                                                onClick={() => setCurrentTab(1)}
                                            >
                                                Doctors List
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className={`tab-pane fade show ${currentTab === 0 ? 'active' : ''}`} id="prompt" role="tabpanel" aria-labelledby="prompt-tab" >
                                            <div
                                                className="bg-white p-5 rounded text-center mt-5"
                                            >
                                                {result}
                                            </div>
                                        </div>
                                        <div className={`tab-pane fade show ${currentTab === 1 ? 'active' : ''}`} id="prompt" role="tabpanel" aria-labelledby="doctors-tab" >
                                            <div
                                                className=" text-center mt-5"
                                            >
                                                <div className="row">
                                                    {doctors.map((doctor) => {
                                                        return <div className="col-3" onClick={() => {
                                                            if (localStorage.getItem('id')) {
                                                                naviage('bookAppointment?id=' + doctor.doctor_id);
                                                            } else {
                                                                naviage('login');
                                                            }
                                                        }}>
                                                            <div className="card p-3">
                                                                <h5>{doctor.name}</h5>
                                                                <h6>{doctor.hospital.hospital_name}</h6>
                                                                <p>{doctor.specialized_in}</p>
                                                                <h6>{doctor.experience}</h6>
                                                            </div>
                                                        </div>
                                                    })}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>}
                    </div>
                    {/* Options */}
                    {/* <div className="row gap-5 m-5 justify-content-evenly">
                        {
                            options.map((option) => {
                                return <div className="col-3 card p-3 align-items-center">
                                    <h5>{option.name}</h5>
                                    <button className="btn btn-secondary mt-3" onClick={() => {
                                        naviage(option.path)
                                    }}>{option.button}</button>
                                </div>
                            })
                        }
                    </div> */}
                </div>



            </div >
        </>
    )
}