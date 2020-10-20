import React from 'react'
import { Table } from 'antd'
const ListaProductosFiltradosPorSedeAlmacen = () => {

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (<Table size="small" bordered columns={columns} rowKey={"id"} dataSource={dataSource} pagination={{ pageSize: 5 }} />)
}

export default ListaProductosFiltradosPorSedeAlmacen
