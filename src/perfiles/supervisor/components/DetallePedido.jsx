import React, { useState, useEffect } from 'react'
import { PageHeader, Table, Space, Popconfirm, Drawer, Button, Tag, InputNumber, Typography } from 'antd'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { listarDetallePedido } from '../services/SupervisorApi';
import { updateCantidadPedidoEscogidoId, actualizarCantidadAPI, deleteProductoAPI, getDetallesPedidosId } from '../../../pedidosUsuarios/services/pedidosApi'
import { Fragment } from 'react'
import Item from 'antd/lib/list/Item';
const DetallePedido = ({ idUsuario, idPedido, setViewDetalle }) => {
    const { Text } = Typography
    const [visible, setVisible] = useState(false);
    //mis pedidos
    const [listPedidos, setListaPedidos] = useState([])

    //pedido escogido
    const [editPedido, setEditPedido] = useState({})

    //trayendo pedidos
    const listaDetallePedidos = async (idPedido) => {
        const pedidos = await await listarDetallePedido(idUsuario, idPedido)
        setListaPedidos(pedidos)
    }


    useEffect(() => {
        listaDetallePedidos(idPedido)
    }, [idPedido])


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


    const data = []


    listPedidos.map((pedido, index) => (
        data.push({
            orden: index + 1,
            producto: pedido.nombreProducto,
            sku: pedido.skuProducto,
            cantidad: pedido.cantidadPedido,
            unidad: pedido.unidad,
            precio: pedido.precioReferencialProducto,
            total: pedido.total,
            area: pedido.nombreArea,
            ceco: pedido.nombreCeco,
            idDetalle_pedido: pedido.idDetalle_pedido,
            almacen: pedido.almacen
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
            title: 'Codigo material',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'Material',
            dataIndex: 'producto',
            key: 'producto',
        },
        {
            title: 'cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
        },
        {
            title: 'unidad',
            dataIndex: 'unidad',
            key: 'unidad',
        },
        {
            title: 'precio',
            dataIndex: 'precio',
            key: 'precio',
            render: (precio) => (<p>S/ {precio}</p>)
        },
        {
            title: 'total',
            dataIndex: 'total',
            key: 'total',
            render: (total) => (<p>S/ {total}</p>)
        },

        {
            title: 'Almacen',
            dataIndex: 'almacen',
            key: 'almacen',
            render: (almacen) => {

                let almacenArray = almacen.split(" ");
                const myArrClean = almacenArray.filter(Boolean)

                const almacenJson = [];                

                myArrClean.forEach(element => {
                    const almacenValido = element.split(":");
                    almacenJson.push({"nombre":almacenValido[0],"stock":almacenValido[1]});                    
                });


                console.log(almacenJson);

                return (
                    <Fragment>
                        {almacenJson.map(item => (
                            <Tag color={item.stock>0?"green":"red"} width="10px" >{item.nombre}:{item.stock}</Tag>

                        ))}
                    </Fragment>

                )

            }
        },


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
                size="small"
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
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell></Table.Summary.Cell>
                                <Table.Summary.Cell>
                                    <Text type="danger">S/ {montoFinal}</Text>
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
