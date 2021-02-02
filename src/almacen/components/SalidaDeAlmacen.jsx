import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Select, Button, InputNumber, Input, Spin, notification } from 'antd'
import ListSalidaMateriales from './salidaAlmacen/ListSalidaMateriales';
import { getSedes } from '../../sedes/services/sedesApi'
import { obtenerAlmacenPorSede, obtenerMaterialesPorAlmacen, registrarSalidaMaterial } from '../services/AlmacenAPI';

const SalidaDeAlmacen = ({ listarKardex, ListarMovimientos }) => {

    //states
    let date = new Date()

    const [sedes, setSedes] = useState([]);
    const [almacenes, setAlmacenes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [ingreso, setIngreso] = useState({
        movimiento: 'SALIDA',
        fecha: date.toLocaleDateString(),
        sede: 0,
        fk_inventario: '',
        codigoDocumento: 'SIN CODIGO',
        responsable: '',
        uso: '',
        materiales: []
    })

    const [listMateriales, setListaMateriales] = useState([]);

    const [material, setMaterial] = useState({
        idProducto: 0,
        nombre: 'Aqui se mostrará el nombre del material escogido',
        cantidadActual: 0,
        unidad: '',
        cantidadIngresada: 0
    })


    const handleChangeSede = async (idSede) => {
        const { almacenes } = await obtenerAlmacenPorSede(idSede);
        setAlmacenes(almacenes);
        setIngreso({
            ...ingreso,
            sede: idSede
        })
    }

    const handleChangeAlmacen = async (codigoAlmacen) => {
        setLoading(true);
        const { materiales, success } = await obtenerMaterialesPorAlmacen(codigoAlmacen);
        if (success) {
            setListaMateriales(materiales);
            setIngreso({
                ...ingreso,
                fk_inventario: codigoAlmacen
            })

            setLoading(false)
        }

    }

    const handleChangeCodDocumento = (e) => {
        const codDocumento = e.target.value;
        setIngreso({
            ...ingreso,
            codigoDocumento: codDocumento
        })
    }

    const handleChangeResponsable = (e) => {
        const responsable = e.target.value;
        setIngreso({
            ...ingreso,
            responsable: responsable
        })
    }

    const handleChangeUso = (e) => {
        const uso = e.target.value;
        setIngreso({
            ...ingreso,
            uso: uso
        })
    }

    const handleSelectMaterial = (idProducto) => {

        let response = listMateriales.filter(material => material.idProducto === idProducto);

        let materialEscogido = response[0];

        setMaterial({
            ...material,
            idProducto: materialEscogido.idProducto,
            nombre: materialEscogido.nombreProducto,
            cantidadActual: materialEscogido.cantidadProductoAlmacen,
            unidad: materialEscogido.unidadProducto,
            cantidadIngresada: 0
        })


    }

    const handleChangeCantidadIngresada = (value) => {
        setMaterial({
            ...material,
            cantidadIngresada: value
        })

        if (value <= 0 || value > material.cantidadActual || material.cantidadActual === 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }

    const addMaterialToListMateriales = () => {
        setIngreso({
            ...ingreso,
            materiales: [...ingreso.materiales, material]
        })

        setMaterial({
            idProducto: 0,
            nombre: 'Aqui se mostrará el nombre del material escogido',
            cantidadActual: 0,
            unidad: '',
            cantidadIngresada: 0
        })
        setDisabled(true)
    }

    const removeMaterial = (idProducto) => {

        let response = ingreso.materiales.filter(material => material.idProducto !== idProducto);


        setIngreso({
            ...ingreso,
            materiales: response
        })
    }

    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Materiales retirados!',
            description:
                'Hola, acabas de retirar materiales del almacén.',
        });
    };
    const ingresarMateriales = async () => {
        const { success } = await registrarSalidaMaterial(ingreso)

        if (success) {
            openNotificationWithIcon('success');

            setIngreso({
                ...ingreso,
                sede: 0,
                fk_inventario: '',
                codigoDocumento: 'SIN CODIGO',
                responsable: '',
                uso: '',
                materiales: []
            })

            setDisabled(true);
            listarKardex();
            ListarMovimientos();
        }
    }
    // ui antdesign
    const { Option } = Select;

    useEffect(() => {
        getSedes()
            .then(data => setSedes(data));


    }, [])

    const { movimiento, fecha, materiales, codigoDocumento, responsable, uso } = ingreso;
    const { nombre, cantidadActual, cantidadIngresada, unidad } = material;

    return (
        <>
            <Row gutter={[24, 16]}>
                <Col md={12}>
                    <Card style={{ paddingBottom: '.2em' }}>
                        <Row gutter={[24, 24]} justify="space-around">
                            <Col span={16}>
                                <p>Tipo de movimiento: <strong style={{ color: '#5D3C81', fontWeight: 'bold' }}>{movimiento}</strong></p>
                            </Col>
                            <Col span={6}>
                                <p>Fecha: <strong style={{ color: '#5D3C81', fontWeight: 'bold' }}>{fecha}</strong></p>
                            </Col>
                        </Row>
                        <Row gutter={[16, 12]} justify="space-around">
                            <Col span={8}>
                                <p>Selecciona la sede:</p>
                            </Col>
                            <Col span={14}>
                                <Select placeholder="Aquí están las sedes" style={{ width: '100%' }} onChange={handleChangeSede}>
                                    {
                                        sedes.map((sede) => (
                                            <Option key={sede.idSede} value={sede.idSede}>{sede.nombreSede}</Option>

                                        ))
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={[16, 12]} justify="space-around">
                            <Col span={8}>Selecciona el almacén: </Col>
                            <Col span={14}>
                                <Select placeholder="Aquí están los almacenes" style={{ width: '100%' }} onChange={handleChangeAlmacen}>
                                    {
                                        almacenes.map((almacen) => (
                                            <Option key={almacen.codigoInventario} value={almacen.codigoInventario}>{almacen.nombreInventario}</Option>

                                        ))
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={[16, 12]} justify="space-around">
                            <Col span={8}><label>Ingresa el codigo de documento:</label> </Col>
                            <Col span={14}><Input value={codigoDocumento} name="codigoDocumento" onChange={handleChangeCodDocumento} placeholder="000000000" /></Col>
                        </Row>
                        <Row gutter={[16, 12]} justify="space-around">
                            <Col span={8}>Escriba la persona que solicito el material: </Col>
                            <Col span={14}><Input value={responsable} name="responsable" onChange={handleChangeResponsable} placeholder="David Licla" /></Col>
                        </Row>
                        <Row gutter={[16, 12]} justify="space-around">
                            <Col span={8}>Escriba el uso: </Col>
                            <Col span={14}><Input value={uso} name="uso" onChange={handleChangeUso} placeholder="uso: para chasqui" /></Col>
                        </Row>


                    </Card>
                </Col>
                <Col md={10}>
                    <Card>
                        <Spin tip="Cargando..." spinning={loading}>
                            <Row gutter={[24, 16]} justify="space-around">
                                <Col span={24}>
                                    <p style={{ color: '#5D3C81', fontWeight: 'bold' }}>
                                        Busca el material a retirar:
                                    </p>
                                </Col>
                                <Col span={24}>
                                    <span>
                                        Si el material no aparece debe inicializarlo(*)
                                    </span>
                                    <Select

                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Escribe tu material"
                                        optionFilterProp="children"
                                        onChange={handleSelectMaterial}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            listMateriales.map((item) => (
                                                <Option key={item.idProducto} value={item.idProducto}>{item.nombreProducto}</Option>
                                            ))
                                        }

                                    </Select>
                                </Col>
                                <Col span={24}>
                                    <div
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#F8F8F8',
                                            padding: '1em',
                                            borderRadius: '5px'
                                        }}
                                    >
                                        <p style={{ color: '#5D3C81', fontWeight: 'bold' }}>{nombre}</p>
                                        <p>Cantidad del almacén escogido: <strong>{cantidadActual} {unidad}</strong></p>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <label>Cantidad a sacar:</label>
                                </Col>
                                <Col span={16}>
                                    <InputNumber onChange={handleChangeCantidadIngresada} value={cantidadIngresada} min={0} max={9999} placeholder="0" style={{ width: '100%' }} />
                                </Col>
                                <Col span={24}>
                                    <Button onClick={addMaterialToListMateriales} disabled={disabled} type="primary" block>Agregar</Button>
                                </Col>
                            </Row>
                        </Spin>
                    </Card>
                </Col>
            </Row>
            {
                materiales.length > 0 &&
                <Row gutter={[24, 16]}>
                    <Col span={22}>
                        <Card>
                            <ListSalidaMateriales materiales={materiales} removeMaterial={removeMaterial} />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Button onClick={ingresarMateriales} type="primary" >Retirar esta lista de materiales</Button>
                    </Col>
                </Row>
            }

        </>

    )
}

export default SalidaDeAlmacen
