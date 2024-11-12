import { useEffect, useState } from 'react'
import useUserStore from '../zusstand/userStore'
import '../css/login.css'
import { Button, Row, Col, Typography, Spin, Alert, Form, Input } from "antd";
import { useNavigate } from 'react-router-dom';

function Login() {
    const { Title, Text } = Typography;
    const { users, FetchGetAllUser, FetchGetUserId, FetchCreateUser, isLoading, isError } = useUserStore()
    const navigator = useNavigate();
    const [customMessage, setCustomMessage] = useState('')
    const [customMessageErros, setCustomMessageErros] = useState('')

    const [isLogin, setIsLogin] = useState(true);
    const [userName, setUserName] = useState('');
    const [userNameErros, setUserNameErros] = useState('');
    const [passWord, setPassWord] = useState('');
    const [passWordErros, setPassWordErros] = useState('');
    const [rePassWord, setRePassWord] = useState('');
    const [rePassWordErros, setRePassWordErros] = useState('');

    console.log(userName, passWord)

    const handleLogin = async () => {
        const isCheck = checkText(userName, passWord)
        if (!isCheck) {
            return;
        }
        const data = await users;
        const userId = data.id;
        const user = data.find(u => u.username === userName && u.password === passWord);

        if (user) {
            if (user.isFlag === false) {
                console.log('Em thành công rồi')
                navigator(`/home/${userId}`)
            }
            else {
                console.log("Tài khoản của bạn đã bị khoá, Vui lòng liên hệ admin");
            }
        }
        else {
            console.log("Đăng nhập không thành công");
        }
    };
    const handleLogup = async () => {
        const isCheck = checkTextLogup(userName, passWord, rePassWord)
        if (!isCheck) {
            return;
        }
        const data = await users
        const newUser = { username: userName, password: passWord };
        // data.username === newUser.username && data.password === newUser.password
        const user = data.find(u => u.username === newUser.username)
        if(user){
            setCustomMessageErros("Tài khoản đã tồn tại")
        }
        else{
            await FetchCreateUser(newUser);
            setCustomMessage("Đã tạo tài khoản thành công")
        }
    }

    function checkText(username, password) {
        let isCheck = true;

        if (username == "") {
            setUserNameErros("Tài khoản không được để trống")
            isCheck = false;
        }
        else {
            setUserNameErros("")
        }
        if (password == "") {
            setPassWordErros("Mật khẩu không được để trống")
            isCheck = false;
        }
        else {
            setPassWordErros("")
        }
        return isCheck;
    }

    function checkTextLogup(username, password, rePassword) {
        let isCheck = true;
        if (username == "") {
            setUserNameErros("Tài khoản không được để trống")
            isCheck = false;
        }
        else {
            setUserNameErros("")
        }
        if (password == "") {
            setPassWordErros("Mật khẩu không được để trống")
            isCheck = false;
        }
        else {
            setPassWordErros("")
        }
        if (rePassword == "") {
            setRePassWordErros("Nhập lại mật khẩu không được để trống")
            isCheck = false;
        }
        else {
            setRePassWordErros("")
            if (rePassword != password) {
                setRePassWordErros("Mật khẩu không giống nhau");
                isCheck = false;
            }
            else {
                setRePassWordErros("");
            }
        }

        return isCheck;
    }

    const switchToLogin = () => {
        setIsLogin(true);
    }
    const switchToLogup = () => {
        setIsLogin(false);
    }
    useEffect(() => {
        FetchGetAllUser()
    }, [FetchGetAllUser])

    useEffect(() => {
        if (customMessage || customMessageErros) {
            const timer = setTimeout(() => {
                setCustomMessage('');
                setCustomMessageErros('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [customMessage, customMessageErros]);

    return (
        <div className="login-container" style={{ width: '400px', padding: '25px', background: 'white', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
            {isLoading && <Spin tip="Đang tải..." />}
            {isError && <Alert message={`${isError}`} type="error" showIcon />}
            {customMessageErros && <Alert message={`${customMessageErros}`} type="error" showIcon />}
            {customMessage && <Alert message={`${customMessage}`} type="success" showIcon />}
            <div className="form-container">
                <Title level={3}>{isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}</Title>

                <form onSubmit={e => e.preventDefault()}>
                    <Row gutter={[16]}>
                        {/* Tên đăng nhập */}
                        <Col span={24} className="input-group">
                            <Form.Item label="Tên đăng nhập" required className='form-item'>
                                <Input
                                    type="text"
                                    id="username"
                                    name="username"
                                    onChange={e => setUserName(e.target.value)}
                                    required
                                    className={`input-field ${userNameErros ? 'input-error' : 'input-success'}`}
                                    style={{ fontSize: '16px' }}
                                />
                                {userNameErros && (
                                    <Text type="danger" className="error-text" style={{ fontSize: '13px' }}>
                                        {userNameErros}
                                    </Text>
                                )}
                            </Form.Item>
                        </Col>

                        {/* Mật khẩu */}
                        <Col span={24} className="input-group">
                            <Form.Item label="Mật khẩu" required className='form-item'>
                                <Input.Password
                                    id="password"
                                    name="password"
                                    onChange={e => setPassWord(e.target.value)}
                                    required
                                    className={`input-field ${passWordErros ? 'input-error' : 'input-success'}`}
                                    style={{ fontSize: '16px' }}
                                />
                                {passWordErros && (
                                    <Text type="danger" className="error-text" style={{ fontSize: '12px' }}>
                                        {passWordErros}
                                    </Text>
                                )}
                            </Form.Item>
                        </Col>

                        {/* Điều kiện đăng nhập hay đăng ký */}
                        {isLogin ? (
                            <>
                                <Col span={12}>
                                    <Button type="primary" onClick={handleLogin} className='button-item ' block>
                                        Đăng Nhập
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button type="primary" onClick={switchToLogup} className='button-item ' block>
                                        Đăng Ký
                                    </Button>
                                </Col>
                            </>
                        ) : (
                            <>
                                <Col span={24} className="input-group">
                                    <Form.Item label="Nhập lại mật khẩu" required className='form-item'>
                                        <Input.Password
                                            id="re-password"
                                            name="re-password"
                                            onChange={e => setRePassWord(e.target.value)}
                                            className={rePassWordErros ? 'input-error' : 'input-success'}
                                            style={{ fontSize: '16px' }}
                                        />
                                        {rePassWordErros && (
                                            <Text type="danger" className="error-text" style={{ fontSize: '12px' }}>
                                                {rePassWordErros}
                                            </Text>
                                        )}
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Button type="primary" onClick={handleLogup} className='button-item ' block>
                                        Đăng Ký
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button type="primary" onClick={switchToLogin}  className='button-item ' block>
                                        Đăng Nhập
                                    </Button>
                                </Col>
                            </>
                        )}
                    </Row>
                </form>
            </div>
        </div>
    )
}

export default Login
