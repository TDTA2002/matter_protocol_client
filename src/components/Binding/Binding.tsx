import "./binding.scss"

export default function Binding() {
    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Products</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="#">Dashboard</a>
                        </li>
                        <li>
                            <i className="bx bx-chevron-right" />
                        </li>
                        <li>
                            <a className="active" href="#">
                                Products
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
                        <h3>Binding Device</h3>
                        <i className="bx bx-search" />
                        <i className="bx bx-filter" />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Default</th>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Create Time</th>
                                <th>Group Name</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>
                                    <p>1</p>
                                </td>
                                <td>
                                    <p><input type="text" placeholder='LED' /></p>
                                </td>
                                <td>
                                    2023/10/10
                                </td>
                                <td>

                                    <span>Chưa Binding</span>

                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>
                                    <p>1</p>
                                </td>
                                <td>
                                    <p><input type="text" placeholder='LED' /></p>
                                </td>
                                <td>
                                    2023/10/10
                                </td>
                                <td>

                                    <span>Chưa Binding</span>

                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>
                                    <p>1</p>
                                </td>
                                <td>
                                    <p><input type="text" placeholder='LED' /></p>
                                </td>
                                <td>
                                    2023/10/10
                                </td>
                                <td>

                                    <span>Chưa Binding</span>

                                </td>
                                <td>
                                    on
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>
        </main >
    )
}
