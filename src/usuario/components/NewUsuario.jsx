import React, { useState, useEffect } from 'react'
import { Form, Input, Row, Col, Button, Select } from 'antd'


//api
import { agregarAccesoUsuarioApi } from '../services/Accesousuario';
import { getRolesApi } from '../../rol/services/rolApi'
import { createUsuarioApi } from '../services/usuarioApi'
import { obtenerAlmacenApi } from '../../almacen/services/AlmacenAPI'

import { openNotificationSuccess } from '../components/Notification'

const NewUsuario = ({ listarUsuarios }) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]); //trae roles


    const [inventarios, setInventario] = useState([]);

    /*Obtnemos la lista de fundos para mostrar en combobox */
    const listarInventarios = async () => {
        const data = await obtenerAlmacenApi();
        setInventario(data);
    }


    useEffect(() => {
        getRolesApi()
            .then(data => setRoles(data))
        listarInventarios();
    }, []);

    const agregarAccesoUsuario = async (value) => {

        const { success } = await agregarAccesoUsuarioApi(value);
        if (success) {
            console.log("Acceso usuario insertardo");
        }
    }

    const RegisterUser = async (value) => {
        console.log(value);
        const { success } = await createUsuarioApi(value);
        if (success) {
            agregarAccesoUsuario(value)
            listarUsuarios()
            openNotificationSuccess()
            form.resetFields()
        }
    }

    return (
        <Form onFinish={RegisterUser} form={form} layout="vertical" >
            <Row justify="space-around">
                <Col md={10}>
                    <Form.Item
                        name="nombrePersonalUsuario"
                        label="Nombres"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: 'ingresa los nombres' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={10}>
                    <Form.Item
                        name="apellidoPersonalUsuario"
                        label="Apellidos"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: 'ingresa los apellidos' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col md={10}>
                    <Form.Item
                        extra="El nombre de usuario solo puede ser de 6 caracteres."
                        name="nombreUsuario"
                        label="nombre de usuario"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: 'ingresa el nombre de usuario' }]}
                    >
                        <Input maxLength={6} />
                    </Form.Item>
                </Col>
                <Col md={10}>
                    <Form.Item
                        name="claveUsuario"
                        label="clave de usuario"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: 'ingresa la clave' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
                <Col md={10}>
                    <Form.Item
                        name="fk_rol"
                        label="seleccione el rol de usuario"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: 'ingrese el rol' }]}
                    >
                        <Select
                            placeholder="Selecciona un rol"
                            allowClear
                        >
                            {
                                roles.map((rol) => (
                                    <Option key={rol.idRol} value={rol.idRol}>{rol.nombreRol}</Option>
                                ))
                            }

                        </Select>
                    </Form.Item>
                </Col>

                <Col md={10}>
                    <Form.Item
                        name="fk_inventario"
                        label="seleccione fundo"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[{ required: true, message: 'ingrese el fundo' }]}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Seleccione un inventario"
                            optionLabelProp="label"
                        >
                            {
                                inventarios.map((item) => (
                                    <Option value={item.codigoInventario} label={item.abr}>
                                        {item.nombreInventario}
                                    </Option>
                                ))
                            }

                        </Select>


                    </Form.Item>
                </Col>

                <Col md={22}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Button type="primary" htmlType="submit">
                            Registrar
                         </Button>
                    </Form.Item>
                </Col>

            </Row>

        </Form>
    )
}

export default NewUsuario
