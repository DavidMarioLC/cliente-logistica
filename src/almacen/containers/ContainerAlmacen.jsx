import React, { useState, useEffect } from 'react'
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons'
import { Tabs, Descriptions, DatePicker, Select, Row, Col, Button } from 'antd'
import moment from 'moment'
import { listaKardexAlmacenAPI, listaMovimientosAlmacenAPI, FiltrarProductoEscogido, filtrarKardexPorFecha } from '../services/AlmacenAPI'
import InicializacionDeAlmacen from '../components/InicializacionDeAlmacen'
import KardexAlmacen from '../components/KardexAlmacen'
import MovimientosAlmacen from '../components/MovimientosAlmacen'
import MovimientoDeAlmacenes from '../components/MovimientoDeAlmacenes'
import ProductosPorSedesAlmacen from '../components/ProductosPorSedesAlmacen'
import { listarProductosAPI } from '../../materiales/services/materialesApi'
import IngresoDeAlmacen from '../components/IngresoDeAlmacen'
import SalidaDeAlmacen from '../components/SalidaDeAlmacen'

const ContainerAlmacen = () => {
    const { RangePicker } = DatePicker
    const { TabPane } = Tabs
    const { Option } = Select

    const [listaKardex, setKardex] = useState([])
    const [listaMovimientos, setMovimientos] = useState([])


    const ListarKardex = async () => {
        const data = await listaKardexAlmacenAPI()
        setKardex(data)
        setResetButton(false)

    }

    const ListarMovimientos = async () => {
        const data = await listaMovimientosAlmacenAPI()
        setMovimientos(data)
    }

    const [productos, setProductos] = useState([])

    const obtenerProductos = async () => {
        const data = await listarProductosAPI()
        setProductos(data)
    }

    const [filtro, setFiltro] = useState({
        fechaInicio: '',
        fechaFin: '',
        material: ''
    })
    //handler events
    const onChangeRangeDate = (dates, dateStrings) => {
        // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        setFiltro({
            ...filtro,
            fechaInicio: dateStrings[0],
            fechaFin: dateStrings[1]
        })
    }

    const onSelectProductos = (value) => {
        // console.log(value);
        setFiltro({
            ...filtro,
            material: value
        })
    }

    const [resetButton, setResetButton] = useState(false)

    const FiltrarProducto = async () => {
        const data = await FiltrarProductoEscogido(filtro)
        setKardex(data)
        setResetButton(true)
    }
    const filtrarPorFecha = async () => {
        const { fechaInicio, fechaFin } = filtro;
        const data = await filtrarKardexPorFecha(fechaInicio, fechaFin)
        setKardex(data)
    }

    useEffect(() => {
        ListarKardex()
        ListarMovimientos()
        obtenerProductos()
    }, [])
    return (
        <>
            <Descriptions title="Nuestro Almacén">
                <Descriptions.Item>
                    Bienvenido a la sección Almacén.
                </Descriptions.Item>

            </Descriptions>
            <Tabs type="card" >
                <TabPane tab="Ingresos" key="1">
                    {/* <IngresoAlmacen listaKardex={ListarKardex} ListarMovimientos={ListarMovimientos} /> */}
                    <IngresoDeAlmacen listarKardex={ListarKardex} ListarMovimientos={ListarMovimientos} />
                </TabPane>
                <TabPane tab="Salidas" key="2">
                    <SalidaDeAlmacen listarKardex={ListarKardex} ListarMovimientos={ListarMovimientos} />

                </TabPane>
                <TabPane tab="Kardex" key="3">
                    <Row align="bottom">
                        <Col>
                            <p>Seleccione un rango de fechas:</p>
                            <RangePicker
                                placeholder={["Fecha inicio", "Fecha fin"]}
                                format="DD-MM-YYYY"
                                style={{ marginBottom: '1em', marginRight: '1em' }}
                                ranges={{
                                    Today: [moment(), moment()],
                                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                                }}
                                onChange={onChangeRangeDate}
                            />
                            <Button
                                onClick={filtrarPorFecha}
                                style={{ marginBottom: '1em', marginRight: '1em' }} type="primary" icon={<CalendarOutlined />}>
                                Filtrar
                            </Button>
                        </Col>
                        <Col>
                            <p>Selecciona el material:</p>
                            <Select
                                showSearch
                                style={{ width: 300, marginBottom: '1em', marginRight: '1em' }}
                                autoClearSearchValue
                                placeholder="Seleccione el material"
                                optionFilterProp="children"
                                onChange={onSelectProductos}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >

                                {
                                    productos.map((item) => (
                                        <Option key={item.nombreProducto} value={item.nombreProducto}>{item.nombreProducto}</Option>
                                    ))
                                }
                            </Select>
                        </Col>
                        <Col md={4}>

                            {
                                resetButton ?
                                    <Button
                                        onClick={ListarKardex}
                                        style={{ marginBottom: '1em', marginRight: '1em' }} type="primary" icon={<SearchOutlined />}>
                                        Mostrar todo
                            </Button>
                                    : <Button
                                        onClick={FiltrarProducto}
                                        style={{ marginBottom: '1em', marginRight: '1em' }} type="primary" icon={<SearchOutlined />}>
                                        Filtrar material
                        </Button>
                            }


                        </Col>
                    </Row>

                    <KardexAlmacen listaKardex={listaKardex} />
                </TabPane>
                <TabPane tab="Materiales por sede y almacén" key="7">
                    <ProductosPorSedesAlmacen />
                </TabPane>
                <TabPane tab="Inicializar almacen" key="5">
                    <InicializacionDeAlmacen listarKardex={ListarKardex} />
                </TabPane>
                <TabPane tab="Movimientos entre almacenes" key="6">
                    <MovimientoDeAlmacenes listarKardex={ListarKardex} />
                </TabPane>

                <TabPane tab="Movimientos" key="4">
                    <MovimientosAlmacen listaMovimientos={listaMovimientos} ListarKardex={ListarKardex} />
                </TabPane>
                {/* <TabPane tab="Actualizar Stock" key="8">
                    <ActualizarStock />
                </TabPane> */}
            </Tabs>
        </>
    )
}

export default ContainerAlmacen
