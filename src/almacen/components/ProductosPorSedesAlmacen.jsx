import React, { useEffect, useState } from 'react'
import { Select, Card, Col, Row, Button, Spin } from 'antd';

//APIS
import { getSedes } from '../../sedes/services/sedesApi'
import { obtenerAlmacenPorSede, listarProductosSedesAlmacen } from '../services/AlmacenAPI'
import ListaProductosFiltradosPorSedeAlmacen from './ListaProductosFiltradosPorSedeAlmacen'
import { Fragment } from 'react';


const ProductosPorSedesAlmacen = () => {
    // eslint-disable-next-line
    const { Option } = Select;

    const [sedes, setSedes] = useState([])
    const [almacenes, setAlmacenes] = useState([])
    const [loading, setLoading] = useState(false)
    const [listaProductos, setProductos] = useState([])


    //state de mi filtro personalizado
    const [sedeyAlmacenEscogido, setSedeyAlmacenEscogido] = useState({
        sede: 0,
        todos: false,
        almacen: ''
    })

    useEffect(() => {
        getSedes()
            .then(data => setSedes(data))
    }, [])

    const handleChangeSede = async (value) => {
        // console.log(`selected sede id: ${value}`);
        const { almacenes } = await obtenerAlmacenPorSede(value);
        setAlmacenes(almacenes)

        setSedeyAlmacenEscogido({
            ...sedeyAlmacenEscogido,
            sede: value
        })
    }

    const handleChangeAlmacen = (value) => {
        // console.log(`selected almacen id:${value}`);

        if (value === 'TODOS') {

            setSedeyAlmacenEscogido({
                ...sedeyAlmacenEscogido,
                todos: true
            })

        } else {
            setSedeyAlmacenEscogido({
                ...sedeyAlmacenEscogido,
                todos: false,
                almacen: value
            })
        }

    }


    const filtrarProductos = () => {
        setLoading(true)
        setTimeout(async () => {
            setLoading(false)
            const { data } = await listarProductosSedesAlmacen(sedeyAlmacenEscogido)
            setProductos(data)

        }, 1000);

    }
    return (
        <Fragment>
            <Card>
                <Row justify="center" gutter={[16, 8]}>

                    <Col xs={22} md={4}>

                        <Select
                            placeholder="ESCOGE LA SEDE"
                            style={{ width: '100%' }}
                            onChange={handleChangeSede}

                        >

                            {
                                sedes.map((item) => (
                                    <Option key={item.idSede} value={item.idSede}>{item.nombreSede}</Option>
                                ))
                            }

                        </Select>
                    </Col>
                    <Col xs={22} md={8}>

                        <Select
                            placeholder="ESCOGE EL ALMACEN"
                            style={{ width: '100%' }}
                            onChange={handleChangeAlmacen}

                        >
                            <Option value="TODOS">TODOS</Option>
                            {

                                almacenes.map((item) => (
                                    <Option key={item.codigoInventario} value={item.codigoInventario}>{item.nombreInventario}</Option>
                                ))
                            }

                        </Select>
                    </Col>
                    <Col xs={22} md={6}>
                        <Button onClick={filtrarProductos} type="primary" block>Filtrar</Button>
                    </Col>

                </Row>

            </Card>
            <Card style={{ marginTop: '1em', textAlign: 'center' }}>
                {/* mis productos estaran listados aqui dentro de este componente */}
                {
                    loading ?
                        <Spin size="small" tip="Cargando materiales.." />
                        : <ListaProductosFiltradosPorSedeAlmacen listaProductos={listaProductos} />
                }
            </Card>
        </Fragment>
    )
}

export default ProductosPorSedesAlmacen
