import React, { useEffect, useState } from 'react'
import { PageHeader, Tag, Typography, Row, Col, Layout, Divider, DatePicker, Select, Space } from 'antd';
import PanelHeader from '../components/PanelHeader'
import ListPedidos from '../components/ListPedidos'

import { ListPedidosAPI } from '../services/pedidosApi'
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/es_ES';
const { Option } = Select
const monthFormat = 'MM-YYYY';
const ContainerPedidosUsuarios = () => {
    /*agregando states de filtro pedido y mes*/
    const [filtros, setFiltros] = useState({
        estado: 'pendiente',
        fecha: moment()
    })

    const [pedidos, setPedidos] = useState([])

    const listarPedidos = async () => {
        let { estado, fecha } = filtros;
        let monthModify = fecha.format(monthFormat).split('-');
        let month = monthModify[0];
        let year = monthModify[1];

        const data = await ListPedidosAPI(estado, month, year)

        setPedidos(data)
    }

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

    useEffect(() => {
        listarPedidos()

    }, [])

    return (
        <>
            <PanelHeader />
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

            <ListPedidos pedidos={pedidos} listarPedidos={listarPedidos} />

        </>
    )
}

export default ContainerPedidosUsuarios