import React, { useState, useEffect } from 'react'
import { Table, Tag } from 'antd';
import { Space, Popconfirm } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons'
import DetallePedido from './DetallePedido'
import { getDetallesPedidosId, exportarExcelApi, deletePedidoId } from '../services/pedidosApi'
import { CSVLink } from "react-csv";
import exportFromJSON from 'export-from-json'

const ListPedidos = ({ pedidos, listarPedidos }) => {

    const [detalle, setDetalle] = useState({ visible: false, pedidos: [] });

    const listaPedidos = []
    const [pedidosExport, setPedidosExport] = useState([])

    const verDetalle = async (idPedido) => {
        const pedidos = await getDetallesPedidosId(idPedido)

        setDetalle({
            visible: true,
            pedidos: pedidos
        })


        if (pedidosExport.length > 0) {
            const fileName = 'download'
            const exportType = 'xls'

            exportFromJSON({ pedidosExport, fileName, exportType })
        }

    }


    const exportarExcel = async (idPedido) => {
        const { pedidos } = await exportarExcelApi(idPedido)
        console.log(pedidos);
        setPedidosExport(pedidos)
        return false
    }


    const deletePedido = async (idPedido) => {
        console.log(idPedido);
        const { success } = await deletePedidoId(idPedido);
        if (success) {
            listarPedidos()
        }
    }



    pedidos.map((pedido, index) => (
        listaPedidos.push({
            orden: index + 1,
            fecha: pedido.fecha,
            estado: pedido.estado,
            usuario: pedido.nombrePersonalUsuario,
            ceco: pedido.nombreCeco,
            nombreFundo: pedido.nombreFundo,
            sede: pedido.nombreSede,
            idPedido: pedido.idPedido,
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
            title: 'nombreFundo',
            key: 'nombreFundo',
            dataIndex: 'nombreFundo',

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
            title: 'Acciones',
            dataIndex: "idPedido",
            key: 'idPedido',

            render: (idPedido, row) => (

                <Space size="middle">

                    <Popconfirm title="¿Deseas ver los detalles del pedido?"
                        okText="Si"
                        onConfirm={() => verDetalle(idPedido)}
                        cancelText="No">
                        <SearchOutlined />
                    </Popconfirm>


                    <CSVLink
                        data={pedidosExport}
                        //editando el nombre de archivo                        
                        filename={row.usuario + "_" + row.fecha + ".csv"}
                        asyncOnClick={true}
                        onClick={() => exportarExcel(idPedido)}
                    >
                        Descargar
                    </CSVLink>

                    <Popconfirm title="¿Deseas eliminar del pedido?"
                        okText="Si"
                        onConfirm={() => deletePedido(idPedido)}
                        cancelText="No">
                        <DeleteOutlined />
                    </Popconfirm>


                </Space>

            ),
        },
    ];

    return (

        !detalle.visible ?
            <Table rowKey="idPedido" columns={columns} dataSource={listaPedidos} />
            : <DetallePedido pedidoEscogido={detalle.pedidos} setDetalle={setDetalle} />


    )
}

export default ListPedidos
