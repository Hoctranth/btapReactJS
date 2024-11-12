import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { DesktopOutlined, PieChartOutlined} from '@ant-design/icons';
import { Layout, Breadcrumb, Menu, theme, Typography } from "antd";
import User from './User';
import Vehicles from './Vehicles';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const Home = () => {
    const [isForm, setIsForm] = useState(true);
    const [selectedMenuItem, setSelectedMenuItem] = useState('user');
    const [selectedHeaderItem, setSelectedHeaderItem] = useState('Quản lý User');
    const items = [
        {
            key: 'user',
            label: 'Quản lý User',
            icon: <DesktopOutlined />,
            onClick: () => { setIsForm(true), setSelectedMenuItem("user"), setSelectedHeaderItem("Quản lý User ") }
        },
        {
            key: 'vehicles',
            label: 'Quản lý Xe',
            icon: <PieChartOutlined style={{ fontSize: '18px', }} />,
            onClick: () => { setIsForm(false), setSelectedMenuItem("vehicles"), setSelectedHeaderItem("Quản lý Xe ") }
        },
    ];
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh', width: '1920px' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline" items={items}
                    style={{
                        fontSize: '18px',
                        marginTop: 20,
                        marginBottom: 20,
                    }} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Title style={
                        {
                            margin: 10
                        }
                    }>
                        {selectedHeaderItem}
                    </Title>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>{selectedMenuItem}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {isForm ? (
                            <>
                                <User />
                            </>
                        ) : (
                            <>
                                <Vehicles />
                            </>
                        )}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
            <div>
                <Outlet /> {/* Nơi hiển thị các route con */}
            </div>
        </Layout>
    );
}

export default Home;