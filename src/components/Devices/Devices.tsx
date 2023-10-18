import { useEffect } from 'react'
import './devices.scss'
import { useSelector } from 'react-redux'
import { StoreType } from '@/store'

export default function Productlist() {

    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })
    console.log("userStore", userStore);
    
    function handleSearchQrCode(node_id:number){
        if(userStore.socket){
            console.log("userStore.socket", userStore.socket);
            
            userStore.socket.emit("requireDecoe", {
                message:8,
                node_id:node_id
            })
        }

            // userStore.socket?.emit("requireDecoe", {
            //     message:8,
            //     node_id:node_id
            // })
    }
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
                        <h3>Products</h3>
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
                                <th>Action</th>
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
                                    <button className="status completed" onClick={() => {
                                        handleSearchQrCode(167)
                                    }}>Share QR</button>
                                    <button className="status delete">Unpair</button>
                                    <button className="status pending">Detail</button>

                                </td>
                                <td>


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
                            <tr>
                                <td>
                                    <img src="img/people.png" alt="User" />
                                    <p>John Doe</p>
                                </td>
                                <td>01-10-2021</td>
                                <td>
                                    <span className="status process">Process</span>
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
                            <tr>
                                <td>
                                    <img src="img/people.png" alt="User" />
                                    <p>John Doe</p>
                                </td>
                                <td>01-10-2021</td>
                                <td>
                                    <span className="status completed">Completed</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>
        </main >
    )
}


