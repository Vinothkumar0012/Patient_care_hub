import React, { useEffect, useState } from "react";
import logo from '../../assets/logo.png'
import { AppName } from "../..";
import { bookAppointmentApi } from "./appointmentAxio";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment/moment";


export default function AppointmentBookPage() {

    const [params, setParams] = useSearchParams();

    const [payload, setPayload] = useState();

    const navigator = useNavigate();

    const fields = [
        {
            name: 'Patient Name',
            id: 'patient_name',
            type: 'text',
        },
        {
            name: 'Age',
            type: 'number',
            id: 'patient_age',
        },
        {
            name: 'Gender',
            type: 'select',
            options: [
                'Male',
                'Female',
                'Others'
            ],
            id: 'patient_gender',
        },
        {
            name: 'Contact Number',
            type: 'tel',
            id: 'patient_contact',
        },
        {
            name: 'Email',
            type: 'email',
            id: 'email',
        },
        {
            name: 'Reason',
            type: 'textarea',
            id: 'reason',
        },
    ];

    const bookAppointment = async (e) => {
        e.preventDefault();

        const { data } = await bookAppointmentApi({
            ...payload,
            doctor_id: params.get('id'),
            user_id: localStorage.getItem('id'),
            date: moment().format('YYYY-MM-DD'),
            time: moment().format('HH:mm'),
        });

        if (data) {
            alert('Successfull')

            navigator('/')
        } else {
            alert('Something went wrong')
        }
    }

    return (
        <>
            <div>
                <div className="d-flex justify-content-between p-2">
                    <div className="d-flex align-items-center gap-2">
                        <img src={logo} alt="logo" height={50} />
                        <h5>{AppName}</h5>
                    </div>
                    <div>
                        <h3>Book Appointment</h3>
                    </div>
                    <div style={{ width: 200 }}></div>
                </div>
                <div className="row justify-content-center">
                    <form
                        style={{ width: '60vw' }}
                        onSubmit={bookAppointment}
                    >
                        <div className="row" >
                            {fields.map((field) => {
                                return <div className="form-group col-12 m-3">
                                    <label htmlFor={field.id} >{field.name}</label>
                                    {field.type === 'select' ?
                                        <select
                                            className="form-control"
                                            name={field.id}
                                            id={field.id}
                                            required
                                            onChange={(e) => {
                                                setPayload((pre) => {
                                                    return {
                                                        ...pre,
                                                        [field.id]: e.target.value,
                                                    }
                                                })
                                            }}
                                        >
                                            {
                                                field.options?.map((option) => <option value={option}>{option}</option>)
                                            }

                                        </select> :
                                        field.type === 'textarea' ?
                                            <textarea
                                                className="form-control"
                                                name={field.id}
                                                id={field.id}
                                                placeholder={field.name}
                                                required
                                                onChange={(e) => {
                                                    setPayload((pre) => {
                                                        return {
                                                            ...pre,
                                                            [field.id]: e.target.value,
                                                        }
                                                    })
                                                }}
                                            />
                                            :
                                            <input
                                                className="form-control"
                                                type={field.type}
                                                name={field.id}
                                                id={field.id}
                                                onChange={(e) => {
                                                    setPayload((pre) => {
                                                        return {
                                                            ...pre,
                                                            [field.id]: e.target.value,
                                                        }
                                                    })
                                                }}
                                                placeholder={field.name}
                                                required
                                            />}
                                </div>
                            })}

                        </div>
                        <div className="d-flex gap-3 justify-content-end">
                            <button
                                className="btn btn-secondary"
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                Book Appointment
                            </button>
                        </div>

                    </form>

                </div>

            </div>
        </>
    )
}