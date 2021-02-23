import React, { useState, useEffect } from 'react'
import { DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col, Select, Radio, Button, Input, Table, message, Alert, Spin } from 'antd'
import { ListCecos } from '../../ceco/services/cecosApi'
import { buscarProdutoApi, crearPedidoApi } from '../services/pedidosApi'
import { listarProductosAPI } from '../../materiales/services/materialesApi'
import CardProducto from '../components/CardProducto'


const PedidoFirstForm = () => {
    const { TextArea } = Input;
    const { Option } = Select
    const { Search } = Input;
    const [viewOrder, setViewOrder] = useState(false)

    //lista de cecos
    const [cecos, setCecos] = useState([])
    const [spin, setSpin] = useState({
        loading: false
    })
    const [busquedaPorNombre, setBusquedaPorNombre] = useState({
        value: false
    })


    const [listaMateriales, setMateriales] = useState([])

    useEffect(() => {
        const listarMaterialesNombre = async () => {
            // setBusquedaPorNombre(true)
            const data = await listarProductosAPI()

            setMateriales(data);

        }

        listarMaterialesNombre()

        const listarCecos = async () => {
            const data = await ListCecos()
            setCecos(data)
        }
        listarCecos()
    }, [])



    const cambiarBusquedaNombreOcodigo = (valor) => {
        setBusquedaPorNombre({
            value: valor
        })
        setCard(false)
    }

    //cambiando a segunda vista
    const nextView = () => {
        setViewOrder(true)
    }
    const [showError, setError] = useState(false)
    const [pedido, setPedido] = useState({
        ceco: 35,
        maquinaDestino: 'fumigadora 1, 2, 3',
        tipoMantenimiento: 'Correctivo',
        materiales: []//codigoMaterial,cantidad
    })

    const selectCeco = value => {
        console.log(value);
        setPedido({
            ...pedido,
            ceco: value
        })
    }

    const selectMaquinaDestino = e => {

        let maquina = e.target.value
        setPedido({
            ...pedido,
            maquinaDestino: maquina
        })
    }

    const selectTipoMantenimiento = e => {
        const value = e.target.value
        console.log(value);
        setPedido({
            ...pedido,
            tipoMantenimiento: value
        })
    }

    //producto Buscado
    const [showCard, setCard] = useState(false)

    const [material, setMaterial] = useState({
        materialNombre: '',
        codigo: '',
        idProducto: 0,
        cantidadAlmacenGeneral: 0,
        cantidadAlmacenMantenimiento: 0,
        cantidad: 1,
        unidadProducto: ''
    })




    //buscando producto sku
    const buscarProducto = async (value) => {


        const { success, producto } = await buscarProdutoApi(value);
        const { nombreProducto, CantAlmacenGeneral, CantAlmacenMantenimiento, skuProducto, idProducto, unidadProducto } = producto;

        if (!success) {
            setError(true)
            setCard(false)

        } else {
            setMaterial({
                ...material,
                materialNombre: nombreProducto,
                idProducto: idProducto,
                codigo: skuProducto,
                cantidadAlmacenGeneral: CantAlmacenGeneral,
                cantidadAlmacenMantenimiento: CantAlmacenMantenimiento,
                unidadProducto: unidadProducto
            })
            setCard(true)
            setError(false)
        }

    }


    const cambiarCantidadMaterial = value => {
        setMaterial({
            ...material,
            cantidad: value
        })
    }

    const selectBuscarPorNombre = async (value) => {
        const { success, producto } = await buscarProdutoApi(value);
        console.log(success);
        const { nombreProducto, CantAlmacenGeneral, CantAlmacenMantenimiento, skuProducto, idProducto, unidadProducto } = producto;

        if (!success) {
            setError(true)
            setCard(false)

        } else {
            setMaterial({
                ...material,
                materialNombre: nombreProducto,
                idProducto: idProducto,
                codigo: skuProducto,
                cantidadAlmacenGeneral: CantAlmacenGeneral,
                cantidadAlmacenMantenimiento: CantAlmacenMantenimiento,
                unidadProducto: unidadProducto
            })
            setCard(true)
            setError(false)
        }
        // 
    }


    const agregarMaterial = () => {
        setCard(false)
       // const elementos = pedido.materiales.filter(item => item.codigo !== value)
        console.log(pedido.materiales);
        console.log("---------------------")
        const elementos = pedido.materiales.filter(item => item.codigo == material.codigo)
        console.log(elementos.length)
        if(elementos.length===0){
            setPedido({
                ...pedido,
                materiales: [...pedido.materiales, material]
            }) 
        }



        
    }    



    const quitarMaterial = (value) => {
        const elementos = pedido.materiales.filter(item => item.codigo !== value)
    
        setPedido({
            ...pedido,
            materiales: elementos
        })
    }



    const enviarPedido = async () => {
        setSpin({
            loading: true
        })
        const { success } = await crearPedidoApi(pedido)

        if (success) {
            message.success('Pedido enviado con exito!');
            setPedido({
                ceco: 35,
                maquinaDestino: 'Tractor',
                tipoMantenimiento: 'Correctivo',
                materiales: []
            })


            setMaterial({
                materialNombre: '',
                codigo: '',
                cantidadAlmacenGeneral: 0,
                cantidadAlmacenMantenimiento: 0,
                cantidad: 1
            })

            setSpin({
                loading: false
            })
        } else {
            message.error('El pedido excede el presupuesto, por lo cual no ha sido enviado, por favor elimine algunos materiales de la lista  o reduzca la cantidad de materiales pedidos!');
            setSpin({
                loading: false
            })
        }
    }

    const columns = [
        {
            title: 'codigo',
            dataIndex: 'codigo',
            key: 'codigo',
        },
        {
            title: 'material',
            dataIndex: 'materialNombre',
            key: 'materialNombre',
            width: '300px'
        },
        {
            title: 'cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
        },
        {
            title: 'Acciones',
            dataIndex: 'codigo',
            key: 'codigo',
            render: (codigo) => (
                <a href="#!" style={{ textAlign: 'center', display: 'block' }} onClick={() => quitarMaterial(codigo)}> <DeleteOutlined style={{ color: "#eb2f96" }} /></a>
            ),
        },
    ];

    return (

        !viewOrder ?
            <Row justify="space-around" gutter={[16, 32]} style={{ marginRight: 0 }}>
                <Col xs={24} style={{ paddingRight: '0' }}>
                    <h1 style={{ display: 'block', textAlign: 'center', background: '#5D3C81', paddingRight: '0px', color: '#FFFFFF' }}>Pedido</h1>
                </Col>
                <Col xs={22} span={8}>
                    {/* CECO */}
                    <p style={{ color: '#5D3C81' }}> Seleccione su ceco:</p>
                    <Select defaultValue={pedido.ceco}
                        style={{ width: '100%' }}
                        onChange={selectCeco}
                    >
                        {
                            cecos.map((item) => (
                                <Option key={item.idCeco} value={item.idCeco}>{item.nombreCeco}</Option>
                            ))
                        }

                    </Select>

                </Col>
                {/* MAQUINA */}
                <Col xs={22} span={8}>
                    <p style={{ color: '#5D3C81', }}> Escribe las maquinas destino:</p>
                    <TextArea value={pedido.maquinaDestino} onChange={selectMaquinaDestino}
                        placeholder="Escribe aqui las maquinas por las que solicitas materiales." autoSize />

                </Col>
                <Col xs={22} span={8}>
                    <p style={{ color: '#5D3C81', }}> Tipo de mantenimiento:</p>
                    <Radio.Group
                        onChange={selectTipoMantenimiento}
                        defaultValue={pedido.tipoMantenimiento}
                        buttonStyle="solid">
                        <Radio.Button value="Preventinvo">Preventivo</Radio.Button>
                        <Radio.Button value="Correctivo">Correctivo</Radio.Button>
                        <Radio.Button value="Predictivo">Predictivo</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col xs={22} span={12}>
                    <Button type="primary" ghost block onClick={nextView}>
                        Siguiente
               </Button>
                </Col>
            </Row>
            :
            // spin pedido
            <Spin spinning={spin.loading}>
                <Row justify="space-around" gutter={[16, 32]} style={{ marginRight: 0 }}>
                    <Col xs={24} style={{ paddingRight: '0' }}>

                        <h1
                            style={{ display: 'block', textAlign: 'center', background: '#5D3C81', padding: '.1em  .5em', color: '#FFFFFF' }}>

                            Pedido
                    </h1>
                        <Button onClick={() => setViewOrder(false)} type="link" icon={<ArrowLeftOutlined />}>
                            Regresar
                    </Button>
                    </Col>
                    <Col xs={22} span={8}>
                        {/* CECO */}
                        <p style={{ color: '#5D3C81', }}> Busca tu material:</p>



                        {
                            busquedaPorNombre.value ?
                                (
                                    <>
                                        <Select
                                            allowClear
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Escribe tu material"
                                            optionFilterProp="children"
                                            onChange={selectBuscarPorNombre}
                                            // onFocus={onFocus}
                                            // onBlur={onBlur}
                                            // onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {
                                                listaMateriales.map((item) => (
                                                    <Option key={item.skuProducto} value={item.skuProducto}>{item.nombreProducto}</Option>
                                                ))
                                            }

                                        </Select>
                                        <Button
                                            type="primary"
                                            ghost
                                            style={{ marginTop: '.5em' }}
                                            onClick={() => cambiarBusquedaNombreOcodigo(false)}
                                        >
                                            Buscar por codigo
                                </Button>
                                    </>
                                )
                                :

                                (
                                    <>
                                        <Search placeholder="ingresa el codigo"
                                            onSearch={buscarProducto}
                                            enterButton />
                                        <Button
                                            type="primary"
                                            ghost
                                            style={{ marginTop: '.5em' }}
                                            onClick={() => cambiarBusquedaNombreOcodigo(true)}
                                        >
                                            Buscar por nombre
                                </Button>
                                    </>
                                )
                        }

                    </Col>
                    <Col xs={22} span={8}>
                        {
                            showCard &&
                            <CardProducto material={material} cambiarCantidadMaterial={cambiarCantidadMaterial} agregarMaterial={agregarMaterial} />
                        }
                        {
                            showError &&
                            <Alert
                                message="Advertencia"
                                description="No existen este producto en el almacen."
                                type="warning"
                                showIcon
                                closable
                                onClose={() => setError(false)}
                            />

                        }

                    </Col>
                    <Col xs={22} span={8}>
                        <p
                            style={{ fontSize: '1em', color: '#5D3C81' }}
                        >
                            Lista de materiales añadidos:
                    </p>
                        <Table scroll={{ x: 400 }} rowKey="codigo" size="small" dataSource={pedido.materiales} columns={columns} />
                    </Col>
                    <Col xs={22} span={20}>
                        <Button onClick={enviarPedido} style={{ marginBottom: '4em' }} size="large" type="primary" block>Pedir</Button>
                    </Col>
                </Row>
            </Spin>
        // spin pedido
    )
}

export default PedidoFirstForm
