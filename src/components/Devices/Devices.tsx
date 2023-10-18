import { useEffect, useState } from 'react'
import './devices.scss'
import { useSelector } from 'react-redux'
import { StoreType } from '@/store'
import QrCode from './component/QrCode'
import { message } from 'antd'
import { log } from 'console'
export default function Productlist() {
    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })
    const [QR_Code, setQR_Code] = useState("")
    const [showModal, setShowModal] = useState(false);

    function handleSearchQrCode(node_id: number) {
        // Lấy dữ liệu từ localStorage
        const decodeTemp = localStorage.getItem('decode');
        if (decodeTemp !== null) {
            const parts = decodeTemp.split('+');
            if (parts.length === 2) {
                const a = parts[0];
                const timestamp = parseInt(parts[1], 10);
                if (!isNaN(timestamp)) {
                    const currentTime = Math.floor(Date.now());
                    const time = ((currentTime - timestamp) / 1000)
                    const isWithin10Minutes = time < 600;
                    // console.log("currentTime", currentTime );
                    // console.log("timestamp", timestamp);
                    // console.log("time", time);                    
                    if (isWithin10Minutes) {
                        setQR_Code(a)
                        console.log("vao23232");
                        
                        setShowModal(true)
                        console.log("qr_code", QR_Code);
                    } else {
                        if (userStore.socket) {
                            console.log("userStore.socket", userStore.socket);
                            userStore.socket.emit("requireDecoe", {
                                message: 8,
                                node_id: node_id
                            })
                        }
                    }
                }
            }
        }
    }
    userStore.socket?.on("decode", (decode: string | null) => {
        console.log("data test", decode);
        if (decode != null) {
            localStorage.setItem(`decode`, `${decode}+${Date.now()}`)
            setQR_Code(decode)
            setShowModal(true)
            console.log("qr_code", QR_Code);
        }
    })
    userStore.socket?.on("decodeFailed", (notification: string) => {
        console.log("notification", notification);
        if(notification != ""){
            message.error(notification)
        }
    })
  
    // useEffect(() => {
    //     if (QR_Code !== '') {
    //         <QR_Code />
    //     }    
    // }, [QR_Code]);
    return (
        <main>
            {showModal && <QrCode QR_Code={QR_Code} setQR_Code={setQR_Code} setShowModal={setShowModal} />}
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
                                        handleSearchQrCode(188)
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


