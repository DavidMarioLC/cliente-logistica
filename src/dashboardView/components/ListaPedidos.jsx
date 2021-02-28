import React, { useState } from 'react'
import { Table, Tag } from 'antd';
import { Space, Popconfirm } from 'antd';
import { EyeOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import DetallePedido from './DetallePedido'
import { aprobarPedidoAPI, rechazarPedidoAPI } from '../../pedidosUsuarios/services/pedidosApi'
import { openNotificationAprobado, openNotificationRechazado } from './Notification'

const ListaPedidos = ({ pedidos, listarPedidos, listarCentroCostos }) => {

    const [viewDetalle, setViewDetalle] = useState({ visible: false })

    const [idPedido, setIdPedido] = useState(0)


    //guardando el idPedido y mostrando la lista de detalle
    const mostrarDetalleProducto = (idPedido) => {
        setIdPedido(idPedido)
        setViewDetalle({
            visible: true
        })

    }


    //aprobar pedido
    const aprobarPedido = async (idPedido, obj) => {

        const { success } = await aprobarPedidoAPI(idPedido, obj.idCeco, obj.fk_usuario)
        if (success) {
            listarPedidos();
            listarCentroCostos()
            openNotificationAprobado("success")
        }


    }

    const rechazarPedido = async (idPedido) => {
        const { success } = await rechazarPedidoAPI(idPedido)
        if (success) {
            listarPedidos();
            openNotificationRechazado('error')
        }
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
            fk_usuario: pedido.fk_usuario,
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
                    <Popconfirm title="¿Deseas aprobar el pedido?"
                        okText="Si"
                        onConfirm={() => aprobarPedido(idPedido, obj)}
                        cancelText="No">
                        <CheckCircleOutlined />
                    </Popconfirm>
                    <Popconfirm title="¿Deseas rechazar el pedido?"
                        okText="Si"
                        onConfirm={() => rechazarPedido(idPedido)}
                        cancelText="No">
                        <CloseCircleOutlined />
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    return (

        !viewDetalle.visible ?
            <Table rowKey="orden" columns={columns} dataSource={listaPedidos} scroll={{ x: 320 }} />
            : <DetallePedido idPedido={idPedido} setViewDetalle={setViewDetalle} />


    )
}

export default ListaPedidos
