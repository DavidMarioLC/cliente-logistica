import React, { useState, useEffect } from 'react'
import { PageHeader, Table, Space, Popconfirm, Drawer, Button, InputNumber, Typography } from 'antd'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'

import { updateCantidadPedidoEscogidoId, actualizarCantidadAPI, deleteProductoAPI, getDetallesPedidosId } from '../../pedidosUsuarios/services/pedidosApi'
const DetallePedido = ({ idPedido, setViewDetalle }) => {
    const { Text } = Typography
    const [visible, setVisible] = useState(false);
    //mis pedidos
    const [listPedidos, setListaPedidos] = useState([])

    //pedido escogido
    const [editPedido, setEditPedido] = useState({})

    //trayendo pedidos
    const listaDetallePedidos = async (idPedido) => {
        const pedidos = await await getDetallesPedidosId(idPedido)
        setListaPedidos(pedidos)
    }


    useEffect(() => {
        listaDetallePedidos(idPedido)
    }, [idPedido])



    const showEdit = async (id) => {
        setVisible(true);
        const pedido = await updateCantidadPedidoEscogidoId(id)
        setEditPedido(pedido)

    }
    const onClose = () => {
        setVisible(false);
    };

    const cambiarCantidad = (value) => {
        setEditPedido({
            ...editPedido,
            cantidadPedido: value
        })
    }

    const actualizarCantidad = async () => {
        await actualizarCantidadAPI(editPedido.idDetalle_pedido, editPedido)
        setVisible(false);
        listaDetallePedidos(idPedido)

    }

    const deletePedido = async (id) => {
        await deleteProductoAPI(id)
        listaDetallePedidos(idPedido)

    }

    const data = []

    listPedidos.map((pedido, index) => (
        data.push({
            orden: index + 1,
            producto: pedido.nombreProducto,
            cantidad: pedido.cantidadPedido,
            precio: pedido.precioReferencialProducto,
            total: pedido.total,
            area: pedido.nombreArea,
            ceco: pedido.nombreCeco,
            idDetalle_pedido: pedido.idDetalle_pedido,
        })
    ))



    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
        },

        {
            title: 'ceco',
            dataIndex: 'ceco',
            key: 'ceco',
        },
        {
            title: 'area',
            dataIndex: 'area',
            key: 'area',
        },
        {
            title: 'producto',
            dataIndex: 'producto',
            key: 'producto',
        },
        {
            title: 'cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
        },
        {
            title: 'precio',
            dataIndex: 'precio',
            key: 'precio',
            render: (precio) => (<p>$ {precio}</p>)
        },
        {
            title: 'total',
            dataIndex: 'total',
            key: 'total',
            render: (total) => (<p>$ {total}</p>)
        },
        {
            title: 'Action',
            dataIndex: 'idDetalle_pedido',
            key: 'idDetalle_pedido',

            render: (idDetalle_pedido) => (

                <Space size="middle">

                    <Popconfirm title="¿Deseas modificar la cantidad del producto?"
                        okText="Si"
                        onConfirm={() => showEdit(idDetalle_pedido)}
                        cancelText="No">
                        <FormOutlined />
                    </Popconfirm>
                    <Popconfirm title="¿Deseas quitar este producto?"
                        okText="Si"
                        onConfirm={() => deletePedido(idDetalle_pedido)}
                        cancelText="No">
                        <DeleteOutlined />
                    </Popconfirm>

                </Space>
            ),
        }
    ];


    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => setViewDetalle({ visible: false })}
                title="Regresar"
                subTitle="volver a la lista de pedidos"
            />
            <Table rowKey="idDetalle_pedido"
                dataSource={data}
                columns={columns}
                scroll={{ x: 320 }}

                summary={pageData => {
                    let montoFinal = 0;

                    pageData.forEach(({ total }) => {
                        montoFinal += total;

                        ;
                    });

                    return (
                        <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell>Total</Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell>
                                    <Text type="danger">$ {montoFinal}</Text>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                            </Table.Summary.Row>

                        </>
                    );
                }}


            />
            {
                visible &&
                <Drawer
                    title="Modificando cantidad"
                    placement="bottom"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    footer={
                        <div
                            style={{
                                textAlign: 'left',
                            }}
                        >
                            <Button onClick={onClose} style={{ marginRight: 8 }}>
                                Cancel
                          </Button>
                            <Button onClick={actualizarCantidad} type="primary">
                                Actualizar
                          </Button>
                        </div>
                    }
                >
                    <InputNumber style={{ width: '100%' }} name="nueva_cantidad" value={editPedido.cantidadPedido} onChange={cambiarCantidad} />
                </Drawer>
            }
        </>

    )
}

export default DetallePedido
