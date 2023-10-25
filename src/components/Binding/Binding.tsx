import { useSelector } from "react-redux";
import "./binding.scss";
import { StoreType } from "@/store";
import { useEffect, useState } from "react";
import { ListBinding } from "@/store/slices/user.slices";
import AddBinding from "../AddBinding/AddBinding";
// import { Device } from "@/store/slices/user.slices"

interface Device {
    id: string;
    name: string;
    user_device_id: string;
    node_id: number;
    status: boolean;
    power: number;
    groupName: string;
    groupId: string;
}
export default function Binding() {
    const [listDevice, setListDevice] = useState<Device[]>([]);
    const [listBinding, setListBinding] = useState<ListBinding[]>([]);
    const [shouldUpdateListDevice, setShouldUpdateListDevice] = useState(false);
    // const [listDevice, setListDevice] = useState()
    const userStore = useSelector((store: StoreType) => {
        return store.userStore;
    });
    useEffect(() => {
        if (userStore.Device && userStore.Device.length > 0) {
            setListDevice(userStore.Device);
            setShouldUpdateListDevice(true);
        }
        if (userStore.ListBinding && userStore.ListBinding.length > 0) {
            setListBinding(userStore.ListBinding);
            setShouldUpdateListDevice(true);
        }
    }, [userStore.Device, userStore.ListBinding]);

    useEffect(() => {
        if (shouldUpdateListDevice) {
            if (listDevice && listBinding) {
                const updatedListDevice = listDevice.map((device) => {
                    const matchingBinding = listBinding.find((binding) => binding.bindingDevice.id === device.id);
                    if (matchingBinding) {
                        return { ...device, groupName: matchingBinding.binding.name, groupId:matchingBinding.binding.id };
                    }
                    return device;
                });
                setListDevice(updatedListDevice);
                setShouldUpdateListDevice(false);
            }
        }
    }, [shouldUpdateListDevice, listDevice, listBinding]);
    console.log("listDevice", listDevice);
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
                    <span
                        className="text"
                        data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal"
                    >
                        Add New
                    </span>
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
                                
                                <th>Name</th>
                                <th>Power</th>
                                <th>Create Time</th>
                                <th>Group Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listDevice?.map((item: any) => (
                                <tr key={Date.now() * Math.random()}>
                                    <td>
                                        {item.groupName ? <></> : <input type="checkbox" />}
                                    </td>

                                    <td>
                                        <p>
                                            <input
                                                type="text"
                                                defaultValue={item.name}
                                            />
                                        </p>
                                    </td>
                                    <td>
                                        <p>{item.power}W/h</p>
                                    </td>
                                    <td>2023/10/10</td>
                                    <td>
                                        {item.groupName ? <span>{item.groupName}</span> : <span>Chưa Binding</span>}
                                    </td>
                                    <td>
                                        <span> {item.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <AddBinding/>
                    </table>
                </div>
            </div>
        </main>
    );
}
