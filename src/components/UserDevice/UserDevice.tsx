import React from 'react'

export default function UserDevice() {
    
    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>User</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="#">Dashboard</a>
                        </li>
                        <li>
                            <i className="bx bx-chevron-right" />
                        </li>
                        <li>
                            <a className="active" href="#">
                                User
                            </a>
                        </li>
                    </ul>
                </div>
                <a href="#" className="btn-download">
                    <i className="bx bxs-cloud-download" />
                    <span className="text" data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal">Add New</span>
                </a>
            </div>

            <div className="table-data">
                <div className="order">
                    <div className="head">
                        <h3>User</h3>
                        <i className="bx bx-search" />
                        <i className="bx bx-filter" />
                    </div>
                    <table>

                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>User</th>
                                <th>Role</th>
                                <th>Action</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img src="img/people.png" alt="User" />
                                    <p>John Doe</p>
                                </td>
                                <td>01-10-2021</td>

                                <td>01-10-2021</td>
                                <td>01-10-2021</td>
                                <td>
                                    <span className="status completed">Completed</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/people.png" alt="User" />
                                    <p>John Doe</p>
                                </td>
                                <td>01-10-2021</td>
                                <td>
                                    <span className="status pending">Pending</span>
                                </td>
                            </tr>
                          
                        </tbody>
                    </table>

                </div>

            </div>
        </main >
    )
}
