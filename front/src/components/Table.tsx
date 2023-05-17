import React, { useEffect, useState } from 'react'
import {Table,Button,Modal,Form,Input,Select} from 'antd'
import { useForm } from 'antd/lib/form/Form';
import { ColumnType } from 'antd/es/table'
import {User} from '../store'
import axiosInstance from '../utils/axiosInstance';
import useUsersStore from '../store';


interface IProps {
    data: User[]
}

const UserTable : React.FC<IProps> = ({data}) => {
    
    const {isChanged,setIsChanged}  = useUsersStore()
    const [visible,setVisible] = useState<boolean>(false)
    const [myForm] = useForm()
    const [isUpdate,setIsUpdate] = useState<boolean>(false)
    const [index,setIndex] = useState<number>(0)
    
    const columns : ColumnType<User>[] = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: "Street",
            dataIndex: "street",
            key: "street",
        },
        {
            title: "City",
            dataIndex: "city",
            key: "city",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Delete",
            key: "delete",
            render: (text,record) => (
                <Button onClick={() => handleDelete(record?.id)}>Delete</Button>
            )
        }
    ]
    
    const handleDelete = (id : number) => {
        axiosInstance.delete(`/users?id=${id}`)
        setIsChanged(isChanged)
    } 

    const handleAdd = () => {
       myForm.resetFields()
        setVisible(true)

    }

    const handleOk = () => {
        if(isUpdate) {
           myForm.validateFields().then(values => {
                axiosInstance.put(`/users/${data[index].id}`,JSON.stringify(values))
            })
        } else {
           myForm.validateFields().then(values => {
                axiosInstance.post('/users',JSON.stringify(values))        
            })
        }
        setVisible(false)
        setIsUpdate(false)
        setIsChanged(isChanged)
    }

    const handleCancel = () => {
        setVisible(false)
        setIsUpdate(false)
    }

    const handleRow = (record : User,index ?: number) => {
        return {
            onDoubleClick: () => {
                setVisible(true)
                setIsUpdate(true)
                setIndex(index || 0)
            }
        }
    }

    const [genderOptions,setGenderOptions] = useState<string[]>(["Male","Female","Prefer not to say"])

    return (<><Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record?.id.toString()}
        onRow={handleRow}
        // width="80%"
        footer={() => (
            <Button type="primary" onClick={handleAdd}>
                Add
            </Button>
        )}>
        </Table>
        <Modal
            title={"Add User"}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form form={myForm} name='myForm' id='myForm' onFinish={handleOk}>
                <Form.Item 
                    name='name'
                    label="Name" 
                    rules={[{required: true,message: "Please fill name field"}]}
                >
                    <Input value={isUpdate ? data[index].name : "" } />
                </Form.Item>
                <Form.Item 
                    name='email'
                    label="Email" 
                    rules={[{required: true,message: "Please fill email field"},{type: "email",message: "please write valid email"}]}
                >
                    <Input value={isUpdate ? data[index].email : "" }/>
                </Form.Item>
                <Form.Item
                    name='email'
                    label="Email" 
                    rules={[{required: true,message: "Please select gender"}]} >
                </Form.Item>
                <Form.Item
                name='gender'
                label="Gender" 
                rules={[{required: true,message: "Please select gender"}]} >
                    <Select value={isUpdate ? data[index].gender : ""}>
                        {genderOptions.map((gender,ind) => (
                            <Select.Option key={ind} value={gender}>{gender}</Select.Option>
                        ))}
                    </Select >
                </Form.Item>
                <Form.Item 
                    name='Street'
                    label="street" 
                    rules={[{required: true,message: "Please fill street field"}]}
                >
                    <Input value={isUpdate ? data[index].address.street : "" }/>
                </Form.Item>
                <Form.Item 
                    name='City'
                    label="city" 
                    rules={[{required: true,message: "Please fill city field"}]}
                >
                    <Input value={isUpdate ? data[index].address.city : "" }/>
                </Form.Item>
                <Form.Item 
                    name='phone'
                    label="Phone" 
                    rules={[{required: true,message: "Please fill phone field"}]}
                >
                    <Input value={isUpdate ? data[index].phone : "" } />
                </Form.Item>
            </Form>
        </Modal></>)
}

export default UserTable


