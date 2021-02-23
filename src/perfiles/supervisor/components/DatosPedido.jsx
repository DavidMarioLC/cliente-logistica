import React, { useState } from 'react'
import { Table, Tag } from 'antd';
import { Space, Popconfirm } from 'antd';
import { EyeOutlined, } from '@ant-design/icons'
import DetallePedido from './DetallePedido'


const DatosPedidos = ({ pedidos,idUsuario }) => {

    const [viewDetalle, setViewDetalle] = useState({ visible: false })

    const [idPedido, setIdPedido] = useState(0)

    console.log(pedidos);

    //guardando el idPedido y mostrando la lista de detalle
    const mostrarDetalleProducto = (idPedido) => {
        setIdPedido(idPedido)
        setViewDetalle({
            visible: true
        })

    }

    const listaPedidos = []
    pedidos.map((pedido, index) => (
        //console.log(pedido),
        listaPedidos.push({
            orden: index + 1,
            fecha: pedido.fecha,
            estado: pedido.estado,
            usuario: pedido.nombrePersonalUsuario,
            ceco: pedido.nombreCeco,
            sede: pedido.nombreSede,
            idPedido: pedido.idPedido,
            idCeco: pedido.idCeco,
            maquinas: pedido.maquinaDestino
        })
    ))



    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
            // eslint-disable-next-line
            render: orden => <a>{orden}</a>,
        },
        {
            title: 'fecha',
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: 'estado',
            dataIndex: 'estado',
            key: 'estado',
            render: (estado) => {
                switch (estado) {
                    case 'pendiente':
                        return <Tag color="orange">{estado}</Tag>
                    case 'aprobado':
                        return <Tag color="green">{estado}</Tag>
                    case 'rechazado':
                        return <Tag color="red">{estado}</Tag>
                    default:
                        break;
                }
            }
        },
        {
            title: 'usuario',
            key: 'usuario',
            dataIndex: 'usuario',

        },
        {
            title: 'ceco',
            key: 'ceco',
            dataIndex: 'ceco',

        },
        {
            title: 'sede',
            key: 'sede',
            dataIndex: 'sede',
        },
        {
            title: 'Maquina destino ',
            key: 'maquinas',
            dataIndex: 'maquinas',
        },
       
        {
            title: 'Action',
            dataIndex: 'idPedido',
            key: 'idPedido',

            render: (idPedido, obj) => (

                <Space size="middle">

                    <Popconfirm title="¿Deseas ver los detalles del pedido?"
                        okText="Si"
                        onConfirm={() => mostrarDetalleProducto(idPedido)}
                        cancelText="No">
                        <EyeOutlined />
                    </Popconfirm>          
                </Space>
            ),
        },
    ];

    return (

        !viewDetalle.visible ?
            <Table rowKey="idPedido" columns={columns} dataSource={listaPedidos} scroll={{ x: 320 }} />
            : <DetallePedido idUsuario={idUsuario} idPedido={idPedido} setViewDetalle={setViewDetalle} />


    )
}

export default DatosPedidos
