import React, { useState, useEffect } from 'react'
import { PageHeader, Tag, Typography, Row, Col, Layout, Divider } from 'antd';
// import { EllipsisOutlined } from '@ant-design/icons';
import '../styles/styles.css'
import gerente from '../images/gerente.svg'

import ListaPedidos from '../components/ListaPedidos'
import ListaCentroCostos from '../components/ListaCentroCostos'
import EstadoPedidoUsuario from '../components/EstadoPedidoUsuario';
import { ListaUsuarioEstadoPedidoInactivo, ListaUsuarioEstadoPedidoActivo} from '../../usuario/services/usuarioApi';
import { ListPedidosAPI } from '../../pedidosUsuarios/services/pedidosApi'
import { ListCecos } from '../../ceco/services/cecosApi'
import ProductosPorSedesAlmacen from '../../almacen/components/ProductosPorSedesAlmacen';

const { Paragraph } = Typography;
const { Content } = Layout


const InfoGerencia = () => {

    console.log(ListaUsuarioEstadoPedidoInactivo());
 
    const [pedidos, setPedidos] = useState([])
    const [cecos, setCecos] = useState([])

    /*Lista de usuario que aun no hizo su pedido*/
    const [pedidoActivo,setPedidoActivo] = useState([]);

    /*Lista de usuario que ya hizo su pedido*/
    const [pedidoInactivo,setPedidoInactivo] = useState([]);

    const listarUsuarioPedidoInactivo = async() =>{
        const dataPedidoInactivo = await ListaUsuarioEstadoPedidoInactivo();
        console.log("vista inactivo")
        console.log(dataPedidoInactivo);
        setPedidoInactivo(dataPedidoInactivo);
    }

    const listarUsuarioPedidoActivo = async() => {
        const dataPedidoActivo = await ListaUsuarioEstadoPedidoActivo();
        setPedidoActivo(dataPedidoActivo);
    }

    const listarPedidos = async () => {
        const data = await ListPedidosAPI()
        console.log(data);
        setPedidos(data)
    }

    const listarCentroCostos = async () => {
        const data = await ListCecos()
        setCecos(data)
    }

    useEffect(() => {
        listarPedidos()
        listarCentroCostos()
        listarUsuarioPedidoActivo()
        listarUsuarioPedidoInactivo()
    }, [])


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PageHeader

                    title="Rubén"
                    tags={<Tag color="green">Gerente</Tag>}
                    avatar={{
                        src: gerente
                    }}

                >
                    <Content >
                        <Row >
                            <Col>
                                <Paragraph >

                                    Bienvenido al panel administrativo de la gerencia, aqui podras: <br />
                                    <Tag>ver pedidos</Tag>
                                    <Tag>ver presupuesto CECO</Tag>
                                </Paragraph>

                            </Col>
                        </Row>
                    </Content>
                </PageHeader>

            </div >
            <Row justify="space-around">

                <Col md={18}>
                    <Divider orientation="left">Pedidos</Divider>
                    <ListaPedidos listarCentroCostos={listarCentroCostos} listarPedidos={listarPedidos} pedidos={pedidos} />
                </Col>


                <Col md={18}>
                    <Divider orientation="left">Presupuesto actual de los centro de costos</Divider>
                    <ListaCentroCostos cecos={cecos} />
                </Col>
                <Col md={18}>
                    <Divider orientation="left">Materiales</Divider>
                    <ProductosPorSedesAlmacen />
                </Col>

                <Col md={18}>
                    <Divider orientation="left">Estado de pedidos de usuarios</Divider>
                    <EstadoPedidoUsuario pedidoActivo={pedidoActivo} pedidoInactivo={pedidoInactivo} />
                </Col>
            </Row>
        </>
    )
}

export default InfoGerencia
