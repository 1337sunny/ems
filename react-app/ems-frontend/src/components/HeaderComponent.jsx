import React from 'react'
import { useNavigate } from 'react-router-dom'

function HeaderComponent() {

    const navigator = useNavigate();

    function addNewEmployee() {
        navigator('/add-employee');
    }

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand ms-4 text-muted" href="/">Employee Management System</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link">
                                    <button className='btn btn-light border rounded' onClick={addNewEmployee}>
                                        <i className="bi bi-person-plus bi-lg align-middle">Add Employee</i>
                                    </button>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent