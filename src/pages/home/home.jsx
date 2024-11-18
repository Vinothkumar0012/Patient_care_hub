import React from "react";
import logo from '../../assets/logo.jpg'
import { useNavigate } from "react-router-dom";
import { AppName } from "../..";

export default function HomePage() {

    const naviage = useNavigate();

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

    ]
    return (
        <>
            <div>

                {/* Header */}
                <div style={{
                    backgroundImage: 'url(/assets/home.jpg)',
                    width: '100vw',
                    height: '60vh',
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
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    naviage('/login')
                                }}
                            > Login / Signup
                            </button>
                        </div>
                    </div>
                </div>


                {/* Options */}
                <div className="row gap-5 m-5 justify-content-evenly">
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
                </div>
            </div>
        </>
    )
}