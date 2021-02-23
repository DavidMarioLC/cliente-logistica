import React, { useState, useEffect } from 'react';

//Api sede
import { getSedes } from '../../../sedes/services/sedesApi';
import { listarProductosSedesAlmacen, obtenerAlmacenPorSede } from '../../../almacen/services/AlmacenAPI';
import { Fragment } from 'react';
import { Button, Card, Tag,Col, Row, Select, Spin } from 'antd';
import ListarProductoFiltrado from './ListaProductoFiltrado';

const ListaProductoAlmacen = () => {

    //componentes de diseño
    const { Option } = Select;

    const [sedes, setSedes] = useState([]);
    const [almacenes, setAlmacenes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listarProductos, setListarProductos] = useState([]);

    //estado de filtro personalizado
    const [sedeAlmacenEscogido, setSedeAlmacenEscogido] = useState({
        sede: 0,
        todos: false,
        almacen: 0
    });


    useEffect(() => {
        getSedes().then(data => setSedes(data));
    }, [])


    const handleChangeSede = async (value) => {
        const { almacenes } = await obtenerAlmacenPorSede(value);
        setAlmacenes(almacenes);
        console.log(sedeAlmacenEscogido);
        setSedeAlmacenEscogido({
            ...sedeAlmacenEscogido,
            sede: value
        })
    }

    const handleChangeAlmacen =  (value) => {
        console.log(value);
        if (value === "TODOS") {
            setSedeAlmacenEscogido({
                ...sedeAlmacenEscogido,
                todos: true
            })
        } else {
            setSedeAlmacenEscogido({
                ...sedeAlmacenEscogido,
                todos: false,
                almacen: value
            })
        }
    }

    const filtrarProducto = () => {
        setLoading(true);
        setTimeout(async () => {
            setLoading(false);
            const { data } = await listarProductosSedesAlmacen(sedeAlmacenEscogido);
            console.log(data);
            setListarProductos(data);
        }, 1000);
    }

    return (
        <Fragment>
            
             <Tag color="processing"> El registro solo muestra materiales con un stock mayor a cero</Tag><i class="ri-eye-line"></i> 
            <Card>
                <Row justify="center" gutter={[16]}>
                    <Col xs={22} md={4}>
                        <Select
                            placeholder="SELECCIONA UN SEDE"
                            style={{ width: '100%' }}
                            onChange={handleChangeSede}
                        >
                            {sedes.map((item) => (
                                <Option key={item.idSede} value={item.idSede} >{item.nombreSede}</Option>
                            ))
                            }
                        </Select>
                    </Col>
                    <Col xs={22} md={8}>
                        <Select 
                            placeholder="SELECCIONA UN ALMACEN"
                            style={{ width: '100%' }}
                            onChange={handleChangeAlmacen}
                        >
                            <Option value="TODOS">TODOS</Option>
                            {
                                almacenes.map((item) => (
                                <Option key={item.codigoInventario} value={item.codigoInventario} >{item.nombreInventario}</Option>
                                ))
                            }
                        </Select>
                    </Col>

                    <Col xs={22} md={6}>
                        <Button onClick={filtrarProducto} type="primary" block >Filtrar</Button>
                    </Col>
                </Row>
            </Card>
            <Card>
                {/* Mostrando lista de materiales */}
                {loading ?
                    <Spin size="small" tip="Cargando materiales..." /> :
                    <ListarProductoFiltrado listaProductos={listarProductos} />
                }
            </Card>
        </Fragment>
    )

}

export default ListaProductoAlmacen;