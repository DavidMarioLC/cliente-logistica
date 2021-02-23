import React ,{useState,useEffect} from 'react';
import { PageHeader, Tag, Typography, Row, Col, Layout, Divider, Card } from 'antd';
//componente
import ListaProductoAlmacen from './ListaProductoAlmacen';
import { connect } from 'react-redux'
import SubidaMasivo from './SubidaMasivo';

const { Paragraph } = Typography;
const { Content } = Layout

const InfoInvitado =({usuario})=>{

    //avatar
    const usuarios = 'DM'
    const colores = '#89B545';
    
    const [user, setUser] = useState('');
    const [color, setColor] = useState('');

    useEffect(() => {
        setUser(usuarios)
        setColor(colores)
    }, [])

    return(
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
                                    
                                    <Tag color="purple">Ver cantidad de stock disponible de cada sede de Ica</Tag>
                                </Paragraph>

                            </Col>
                        </Row>
                    </Content>
                </PageHeader>

            </div >
            <Row justify="space-around">

                <Col md={18}>
                    <Divider orientation="left">Materiales</Divider>
                    <ListaProductoAlmacen />
                </Col>
            </Row>    
            <Row justify="space-around">
                <Col md={18}>
                    <Divider orientation="left">Subida Masivo</Divider>
                    <SubidaMasivo />
                </Col>
            </Row>

        </>
    )

}

const mapStateToProps = state => ({
    usuario: state.sessionReducer.usuario
})
export default connect(mapStateToProps, null)(InfoInvitado)

//export default InfoInvitado;