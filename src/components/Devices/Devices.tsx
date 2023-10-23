import { useEffect, useState } from 'react'
import './devices.scss'
import { useSelector, useStore } from 'react-redux'
import { StoreType } from '@/store'
import QrCode from './component/QrCode'
import { message } from 'antd'
export default function Productlist() {
    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })
    const [QR_Code, setQR_Code] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [tempId, setTempId] = useState("")
    const [search, setSearch] = useState(true);
    const [loading, setLoading] = useState(false);

    function handleSearchQrCode(node_id: number, idDevice: string) {
        // Lấy dữ liệu từ localStorage
        const decodeTemp = localStorage.getItem('decodeData');
        setLoading(true)
        if (decodeTemp) {
            const decodeData = JSON.parse(decodeTemp);
            for (let i in decodeData) {
                if (decodeData[i].id == idDevice) {
                    setSearch(false);
                    const parts = decodeData[i].decode.split('+')
                    if (parts.length === 2) {
                        const a = parts[0];
                        const timestamp = parseInt(parts[1], 10);
                        if (!isNaN(timestamp)) {
                            const currentTime = Math.floor(Date.now());
                            const time = ((currentTime - timestamp) / 1000)
                            const isWithin10Minutes = time < 300;
                            console.log("isWithin10Minutes", isWithin10Minutes);
                            console.log("time", time);
                            if (isWithin10Minutes) {
                                setLoading(false)
                                // mã QR còn hạn => show mã
                                setQR_Code(a)
                                setShowModal(true)
                                return;
                            } else {
                                if (userStore.socket) {
                                    setLoading(true)
                                    // mã QR đã hết hạn =>  gọi tạo mới                               
                                    setTempId(idDevice)
                                    userStore.socket.emit("requireDecoe", {
                                        message: 8,
                                        node_id: node_id
                                    })
                                }
                            }
                        }
                    }
                    // localStorage.setItem('decodeData', JSON.stringify(decodeData));
                }
            }
            if (userStore.socket) {
                setLoading(true)
                // mã QR của ID đó đã hêt hạn =>  gọi tạo mới
                console.log("da roi vao truong hop khac");
                setTempId(idDevice)
                userStore.socket.emit("requireDecoe", {
                    message: 8,
                    node_id: node_id
                })
            }

        } else {
            if (userStore.socket) {
                setLoading(true)
                // không có mã QR của ID đó trong local => gọi cập nhật cái mới 
                setTempId(idDevice)
                userStore.socket.emit("requireDecoe", {
                    message: 8,
                    node_id: node_id
                })
            }
        }
    }
    useEffect(() => {
        // lắng nghe kêt quả trả về và tạo mới
        userStore.socket?.on("decode", (decode: string) => {
            if (decode != null) {
                if (tempId != "") {
                    setLoading(false)
                    const decodeData = [
                        {
                            id: tempId,
                            decode: `${decode}+${Date.now()}`
                        }
                    ];
                    const storeData = localStorage.getItem('decodeData');
                    if (storeData) {
                        const storeArray = JSON.parse(storeData);
                        decodeData.push(...storeArray);
                    }
                    localStorage.setItem('decodeData', JSON.stringify(decodeData));
                    setQR_Code(decode)
                    setShowModal(true)
                }
            }
        })
    }, [tempId])

    useEffect(() => {
        userStore.socket?.on("decodeFailed", (notification: string) => {
            setLoading(false)
            // lắng nghe và thông báo các lỗi 
            if (notification != "") {
                message.error(notification)
            }
        })
    }, [])

    function handleUnpair(id: string, node_id: number) {
        console.log("id", id);
        console.log("node_id", node_id);
        if (userStore.socket) {
            userStore.socket.emit("unpairDevice", {
                message: 7,
                id: id,
                node_id: node_id
            })
        }
    }
    userStore.socket?.on('unpairSucces', (message) => {
        if (message != "") {
            message.success(message)
        }
    })
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
                                        handleSearchQrCode(230, "011010103c2d1cd")
                                    }}>{loading ? <span className='loading-spinner'></span> : "Share Connect"}</button>
                                    <button className="status delete"
                                        onClick={() => {
                                            handleUnpair("5641011f-6ff9-11ee-b7f3-4c797d08af55", 230)
                                        }}
                                    >Unpair</button>
                                    <button className="status pending">Detail</button>

                                </td>
                                <td>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </div>

            </div>
        </main >
    )
}


