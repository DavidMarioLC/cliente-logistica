import React from 'react'
import { Table, Tag } from 'antd';

const EstadoPedidoUsuario = ({pedidoInactivo,pedidoActivo }) => {


    const dataActivo = [];

    pedidoActivo.map((item,index)=>
        dataActivo.push({
            orden: index+1,
            idUsuario: item.idUsuario,
            nombrePersonalUsuario: item.nombrePersonalUsuario,
            apellidoPersonalUsuario: item.apellidoPersonalUsuario,
            estado: item.estado
        })
    )

    const dataInactivo = [];
    pedidoInactivo.map((item,index)=>
        dataInactivo.push({
            orden: index + 1,
            idUsuario: item.idUsuario,
            nombrePersonalUsuario: item.nombrePersonalUsuario,
            apellidoPersonalUsuario: item.apellidoPersonalUsuario,
            estado: item.estado
        })
    )

    console.log("vista prueba de data");
    const data = dataActivo.concat(dataInactivo);
    console.log(data);

    /*{orden: 5, idUsuario: 89,  : "GONZALES RAMIRES", estado: "0"} */
    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
            render: (orden) => <p>{orden}</p>,
        },
        {
            title: 'Nombre',
            dataIndex: 'nombrePersonalUsuario',
            key: 'nombrePersonalUsuario',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Apellido',
            dataIndex: 'apellidoPersonalUsuario',
            key: 'apellidoPersonalUsuario',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',            
            render: (estado)=>(
                <p className="text-center h6"><Tag color={estado === "1" ? "green" : "red"} >{estado === "1" ? "Pedido realizado" : "No hizo su pedido"}</Tag></p> 
            )
        }
      
    ];


    return (
        <>
            <Table
                size="small"
                scroll={{ x: 320 }}
                bordered columns={columns} dataSource={data} rowKey={"idCeco"} pagination={{ pageSize: 15 }} />

        </>
    )
}

export default EstadoPedidoUsuario
