import React, { useState } from "react";
import hospitalData from '../../data/hospital.json'
import logo from '../../assets/logo.png'
import { IoSearchCircleSharp } from "react-icons/io5";
import { AppName } from "../..";
import { useNavigate } from "react-router-dom";

export default function HospitalPage() {
    const [search, setSearch] = useState('');
    const [hospitals, setHospitals] = useState(hospitalData);

    const naviage = useNavigate();

    const handleChange = (e) => {
        setSearch(e.target.value.toLowerCase());
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setHospitals(hospitalData.filter((hospital) => hospital.hospital_name.toLowerCase().includes(search)));
    }

    const openDoctors = (id) => {
        naviage(`/doctors?id=${id}`);
    }

    return (
        <>
            <div>

                {/* Search Field */}
                <div className="d-flex justify-content-between mt-3">
                    <div className="d-flex align-items-center">
                        <img src={logo} alt="logo" height={50} />
                        <h5>{AppName}</h5>
                    </div>

                    <form onSubmit={handleSubmit} className="d-flex">
                        <input
                            className="form-control"
                            type="search"
                            onChange={handleChange}
                            placeholder="Search Hospitals"
                            style={{ width: '30vw' }}
                        />
                        <button
                            className="btn"
                            type="submit"
                        >
                            <IoSearchCircleSharp size={40} />
                        </button>
                    </form>

                    <div />

                </div>

                {/* Hospitals List */}

                <div className="">
                    <div className="row gap-3 m-5">
                        {
                            hospitals.map((hospital) => {
                                return <div
                                    className="card col-3 p-2"
                                    onClick={() => {
                                        openDoctors(hospital.hospital_id);
                                    }}
                                >
                                    <div>
                                        <h5>{hospital.hospital_name}</h5>
                                        <p>{hospital.location}</p>
                                        <h6>{hospital.open_time} - {hospital.close_time}</h6>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>

            </div>
        </>
    )
}