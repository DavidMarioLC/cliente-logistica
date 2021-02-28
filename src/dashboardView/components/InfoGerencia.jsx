import React, { useState, useEffect } from 'react'
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/es_ES';
import { PageHeader, Tag, Typography, Row, Col, Layout, Divider, DatePicker, Select, Space } from 'antd';
// import { EllipsisOutlined } from '@ant-design/icons';
import '../styles/styles.css'
import gerente from '../images/gerente.svg'

import ListaPedidos from '../components/ListaPedidos'
import ListaCentroCostos from '../components/ListaCentroCostos'
import EstadoPedidoUsuario from '../components/EstadoPedidoUsuario';
import { ListaUsuarioEstadoPedidoInactivo, ListaUsuarioEstadoPedidoActivo } from '../../usuario/services/usuarioApi';
import { ListPedidosAPI } from '../../pedidosUsuarios/services/pedidosApi'
import { ListCecos } from '../../ceco/services/cecosApi'
import ProductosPorSedesAlmacen from '../../almacen/components/ProductosPorSedesAlmacen';

const { Paragraph } = Typography;
const { Content } = Layout
const { Option } = Select
const monthFormat = 'MM-YYYY';


const InfoGerencia = () => {

    // console.log(ListaUsuarioEstadoPedidoInactivo());

    const [pedidos, setPedidos] = useState([])
    const [cecos, setCecos] = useState([])

    /*Lista de usuario que aun no hizo su pedido*/
    const [pedidoActivo, setPedidoActivo] = useState([]);

    /*Lista de usuario que ya hizo su pedido*/
    const [pedidoInactivo, setPedidoInactivo] = useState([]);


    /*agregando states de filtro pedido y mes*/
    const [filtros, setFiltros] = useState({
        estado: 'pendiente',
        fecha: moment()
    })

    const handleChangeFecha = async (date, fecha) => {
        let fechaModified = fecha.split('-');
        let month = fechaModified[0];
        let year = fechaModified[1];

        setFiltros({
            ...filtros,
            fecha: date
        })

        let { estado } = filtros;

        const data = await ListPedidosAPI(estado, month, year);

        setPedidos(data);


    }
    const handleChangeEstado = async (_, { value }) => {

        setFiltros({
            ...filtros,
            estado: value
        })

        let { fecha } = filtros;

        let monthModify = fecha.format(monthFormat).split('-');
        let month = monthModify[0];
        let year = monthModify[1];

        const data = await ListPedidosAPI(value, month, year);
        // console.log(`segunda carga: ${data}`);
        setPedidos(data);
    }

    const listarUsuarioPedidoInactivo = async () => {
        const dataPedidoInactivo = await ListaUsuarioEstadoPedidoInactivo();

        setPedidoInactivo(dataPedidoInactivo);
    }

    const listarUsuarioPedidoActivo = async () => {
        const dataPedidoActivo = await ListaUsuarioEstadoPedidoActivo();
        setPedidoActivo(dataPedidoActivo);
    }

    const listarPedidos = async () => {

        let { estado, fecha } = filtros;
        let monthModify = fecha.format(monthFormat).split('-');
        let month = monthModify[0];
        let year = monthModify[1];

        const data = await ListPedidosAPI(estado, month, year)
        // console.log(`primera carga: ${data}`);
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

                <Col md={18} >
                    <Divider orientation="left">Pedidos</Divider>
                    <Row style={{ marginBottom: '16px' }}>
                        <Space size="large">
                            <Col>
                                <label style={{ display: 'block', fontWeight: '200' }} htmlFor="estados">Filtrar por pedido:</label>
                                <Select
                                    id="estados"
                                    defaultValue={filtros.estado}
                                    style={{ width: '100%' }}
                                    onChange={handleChangeEstado}
                                >
                                    <Option value="pendiente">pendiente</Option>
                                    <Option value="aprobado">aprobado</Option>
                                    <Option value="rechazado">rechazado</Option>
                                </Select>
                            </Col>
                            <Col>
                                <label style={{ display: 'block', fontWeight: '200' }} htmlFor="months">Filtrar por mes:</label>
                                <DatePicker
                                    locale={locale}
                                    id="months"
                                    defaultValue={filtros.fecha} format={monthFormat}
                                    onChange={handleChangeFecha}
                                    picker="month" />

                            </Col>
                        </Space>

                    </Row>

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
