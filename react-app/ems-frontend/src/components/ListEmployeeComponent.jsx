import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })

    }, [])

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }

    function deletedEmployee(id) {
        deleteEmployee(id).then((response) => {
            listEmployees().then((response) => {
                setEmployees(response.data);
            }).catch(error => {
                console.error(error);
            })
            console.log(response.data + ' with id: ' + id);
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='container'>
            <h3 className='text-muted mt-4'>List of Employees</h3>
            <table className=' table table-hover table-borderless'>
                <thead className='table table-light'>
                    <tr>
                        <th className='text-muted'>Id</th>
                        <th className='text-muted'>First Name</th>
                        <th className='text-muted'>Last Name</th>
                        <th className='text-muted'>Email</th>
                        <th className='text-muted'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((employee) =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td><button className='btn btn-light border text-muted' onClick={() => updateEmployee(employee.id)}>Update</button><button className='btn btn-light border text-muted ms-2' onClick={() => deletedEmployee(employee.id)}>Delete</button></td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent