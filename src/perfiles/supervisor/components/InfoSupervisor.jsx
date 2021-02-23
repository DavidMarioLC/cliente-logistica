import React, { useState, useEffect } from 'react'
import { PageHeader, Tag, Typography, Row, Col, Layout, Divider } from 'antd';
// import { EllipsisOutlined } from '@ant-design/icons';
//import '../styles/styles.css'


import DatosPedido from './DatosPedido'
import { listarPedidosApi } from '../services/SupervisorApi';
import { connect } from 'react-redux'
const { Paragraph } = Typography;
const { Content } = Layout


const InfoSupervisor = ({usuario}) => {

    const [pedidos, setPedidos] = useState([])


    const listarPedidos = async () => {
        const data = await listarPedidosApi()
        console.log(data);
        setPedidos(data)
    }


    useEffect(() => {
        listarPedidos()

    }, [])

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PageHeader

                    title={usuario.nombrePersonal.toUpperCase()}
                    tags={<Tag color="green">{usuario.rol}</Tag>}                    
                >
                    <Content >
                        <Row >
                            <Col>
                                <Paragraph >

                                    Bienvenido al panel administrativo {usuario.nombrePersonal}, aqui podras: <br />                                    
                                    <Tag>Ver los pedidos segun su fundo donde supervisan</Tag>
                                </Paragraph>

                            </Col>
                        </Row>
                    </Content>
                </PageHeader>

            </div >
            <Row justify="space-around">

                <Col md={18}>
                    <Divider orientation="left">Pedidos</Divider>
                    <DatosPedido idUsuario = {usuario.id} listarPedidos={listarPedidos} pedidos={pedidos} />
                </Col>


            </Row>
        </>
    )
}


const mapStateToProps = state => ({
    usuario: state.sessionReducer.usuario
})
export default connect(mapStateToProps, null)(InfoSupervisor)