
import { useEffect, useState } from 'react'
import useUserStore from '../zusstand/userStore'
import '../css/login.css'
import { Button, Row, Col, Typography, Spin, Alert, Form, Input } from "antd";

const Vehicles = () => {


    const { Title, Text } = Typography;
    const { users, FetchGetAllUser, FetchGetUserId, FetchCreateUser, FetchUpdateUser, FetchDeleteUser, isLoading, isError } = useUserStore()

    return (
        <>
            <h2>Hello world2</h2>
        </>
    )

}
export default Vehicles