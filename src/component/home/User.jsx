import { useEffect, useState } from 'react'
import useUserStore from '../zusstand/userStore'
import '../css/login.css'
import { Button, Row, Col, Typography, Spin, Alert, Form, Input } from "antd";
import UserTable from '../table';

const User = () => {

    const { Title, Text } = Typography;
    const { users, FetchGetAllUser, FetchGetUserId, FetchCreateUser, FetchUpdateUser, FetchDeleteUser, isLoading, isError } = useUserStore()
    const [dataSource, setdataSource] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên User',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tài khoản',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Chức năng',
            dataIndex: 'funtion',
            key: 'funtion',
        },
    ];


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await FetchGetAllUser()
            const data = await users;
            console.log(data)
            const newData = data.map((user) => ({
                id: user.id,
                name: user.name,
                username: user.username,
                funtion: (
                    <>
                        <Button type="primary" onClick={() => { }}>Khoá</Button>
                        <Button type="default" onClick={() => { }}>Đổi mật khẩu</Button>
                    </>
                )
            }))
            setdataSource(newData);
            setLoading(false);
        }
        fetchData()
    }, [])

    return (
        <div>
            {isLoading ? <Spin tip="Đang tải..." /> : <UserTable columns={columns} dataSource={dataSource} isLoading={loading} />}
        </div>
    )
}
export default User