import React from 'react'
import { Table } from 'antd'

const UserTable = ({columns, dataSource, isLoading}) =>{
    return(
        <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        bordered
        rowKey="id"  // Dùng `id` làm khóa cho mỗi hàng
    />
    )
}
export default UserTable