import React, { FormEvent, useRef } from 'react';
import Input from 'antd/es/input/Input';
import { useSelector } from 'react-redux';
import { StoreType, } from '@/store';
import { UserState, } from '@/store/slices/user.slices';
import { io, Socket } from 'socket.io-client';
import api from '@services/apis'
import { message } from 'antd';
type InputRef = {
    input: HTMLInputElement;
};

export default function AddDevice() {
    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    }) as UserState
    const nameRef = useRef<InputRef | null>(null);
    const powerRef = useRef<InputRef | null>(null);
    const codeRef = useRef<InputRef | null>(null);

    // function handleAddDevice() {

    //     console.log('vao rdddddddd');

    //     setLoading(true)
    //     let data1 = {
    //         name: name,
    //         user_device_id: "3481627781236668",
    //         status: false,
    //         power: power,
    //         pair: true
    //     }
    //     let idDevices = idDevice
    //     console.log('vao r da ta la:', data1);
    //     console.log('idDevce', idDevices);
    //     api.deviceApi.create(data1, idDevices).then((res) => {
    //         console.log('res', res.data);
    //         setAdd(!add)
    //         setCount(count + 1)
    //         setLoading(false)
    //         if (res.data.data) {
    //             message.success(res.data.message)
    //         } else {
    //             message.error(res.data.message)
    //         }
    //     }).catch((err) => {
    //         message.warning("err device")
    //         console.log('err', err);
    //         setLoading(false)
    //     })
    // }

    const handleCreate = (e: FormEvent) => {
        e.preventDefault();
        console.log('vao r');

        if (nameRef.current && powerRef.current && codeRef.current) {
            const formData = {
                name: nameRef.current.input.value,
                power: powerRef.current.input.value,
                userDeviceId: userStore.data?.userDevice[0].id,
                isDeviceOn: false,// trạng thái đầu vào
                active: true
            };
            let id = codeRef.current.input.value
            console.log("formData", formData);
            console.log('id',id);
            
            if (formData) {
                // const socket = io('http://localhost:3001');
                if (userStore.socket) {
                    userStore.socket.emit('addDevices', formData);
                }
            }
            api.deviceApi.create(formData, id).then(res => {
                console.log('res.data', res.data);
            }).catch(err=>{
                message.warning('error syntax')
                console.log('errrrr',err);
            })
                

            
        }
    }

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form onSubmit={(e: FormEvent) => handleCreate(e)}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1>Add device</h1>
                                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className='detailproduct'>
                                    <div>
                                        <div>
                                            Name <br />
                                            <Input name="name" type="text" placeholder='Name' ref={nameRef} />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            Power <br />
                                            <Input name="power" type="number" placeholder='Power' ref={powerRef} />
                                        </div>
                                        <div>
                                            Code <br />
                                            <Input name="code" type="text" placeholder='code' ref={codeRef} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                                <button type='submit' className="btn btn-primary" data-mdb-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
