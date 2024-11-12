import { useEffect, useState } from 'react'
import userAPI from '../zusstand/userAPI'
import '../css/login.css'
import { Button, Row, Col, Typography, Spin, Alert, Form, Input } from "antd";
import UserTable from '../component/table';

const User = () => {

    const { Title, Text } = Typography;
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
            title: 'Trạng Thái',
            dataIndex: 'situation',
            key: 'situation',
        },
        {
            title: 'Chức năng',
            dataIndex: 'funtion',
            key: 'funtion',
        },
    ];


    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const data = await userAPI.getAll()
            const newData = data.map((user) => ({
                id: user.id,
                name: user.name,
                username: user.username,
                situation: user.isFlag ? "Khoá":"Không khoá",
                funtion: (
                    <>
                        <Button type="primary" onClick={() => { }}>{user.isFlag ? "Mở Khoá":"khoá"}</Button>
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
            {loading ? <Spin tip="Đang tải..." /> : <UserTable columns={columns} dataSource={dataSource} isLoading={loading} />}
        </div>
    )
}
export default User