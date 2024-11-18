import React, { useEffect, useState } from "react";
import doctorsData from '../../data/doctor.json'
import hospitalsData from '../../data/hospital.json'
import logo from '../../assets/logo.png'
import { IoSearchCircleSharp } from "react-icons/io5";
import { AppName } from "../..";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function DoctorPage() {
    const [search, setSearch] = useState('');
    const [doctors, setDoctors] = useState(doctorsData);
    const [result, setResult] = useState([]);
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearch(e.target.value.toLowerCase());
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setResult(doctorsData.filter((hospital) => hospital.hospital_name.toLowerCase().includes(search)));
    }

    const getHospitalData = (id) => {
        return hospitalsData.find((hospital) => hospital.hospital_id === id);
    }


    useEffect(() => {
        const id = params.get('id');

        if (id) {
            const doctorsList = doctorsData.filter((doctor) => doctor.hospital_id === id);
            setDoctors(doctorsList);
            setResult(doctorsList);
        } else {
            setResult(doctorsData);

        }

    }, [params])

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
                            type="search"
                            className="form-control"
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

                <div className="row">
                    {
                        result.map((doctor) => {
                            return <div className="col-3 p-4">
                                <div className="card p-3">
                                    <div>
                                        <h5>{doctor.name}</h5>
                                        <h6>{getHospitalData(doctor.hospital_id)?.hospital_name}</h6>
                                        <p>{doctor.specialized_in}</p>
                                        <h6>{doctor.experience}</h6>
                                    </div>
                                    <div className="text-end">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                navigate('/bookAppointment')
                                            }}
                                        >
                                            Book Appointment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>


            </div>
        </>
    )
}