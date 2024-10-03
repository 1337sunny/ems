import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const { id } = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const employee = { firstName, lastName, email };
            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            }
            else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (!firstName) {
            valid = false;
            errorsCopy.firstName = 'Please enter first name';
        }

        if (!lastName) {
            valid = false;
            errorsCopy.lastName = 'Please enter last name';
        }

        if (!email) {
            valid = false;
            errorsCopy.email = 'Please enter email';
        }
        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-muted m-2'>Update Employee</h2>
        }
        else {
            return <h2 className='text-muted m-2'>Add Employee</h2>
        }
    }

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name: </label>
                                <input type="text" placeholder='Enter first name of employee' name='firstName' value={firstName} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} onChange={(e) => setFirstName(e.target.value)} />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name: </label>
                                <input type="text" placeholder='Enter last name of employee' name='lastName' value={lastName} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} onChange={(e) => setLastName(e.target.value)} />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email: </label>
                                <input type="email" placeholder='Enter email of employee' name='email' value={email} className={`form-control ${errors.email ? 'is-invalid' : ''}`} onChange={(e) => setEmail(e.target.value)} />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>
                            <button className='btn btn-light border mt-4' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EmployeeComponent