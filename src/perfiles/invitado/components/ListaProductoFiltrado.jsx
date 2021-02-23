import { Table, Tag, Input, Space, Button } from 'antd'
import React, { useRef } from 'react';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';

const ListaProductoFiltrado = ({listaProductos}) =>{
    //estado
    const [estado,setEstado] = useState({
        searchText: '',
        searchColumn: ''
    })

    let searchInput = useRef(null);

    const handleSearch = (selectedKeys,confirm,dataIndex)=>{
        confirm();
        setEstado({
            searchText: selectedKeys[0],
            searchColumn: dataIndex,
        });
    };

    const handleReset = (clrearFilter) =>{
        clrearFilter();
        setEstado({
            searchText:''
        })
    }

    //metodo de filtrado
    const getColumnSearchProps = dataIndex =>({
        filterDropdown: ({
            setSelectedKeys, selectedKeys,confirm,clearFilters
        })=>(
            <div style={{padding:8}}>
                <Input
                    ref={node =>{
                        searchInput = node
                    }}
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange = {e =>setSelectedKeys(e.target.value?[e.target.value]:[])}
                    onPressEnter = {() => handleSearch(selectedKeys,confirm,dataIndex)}
                    style={{width: 188,marginBottom: 8, display: 'block'}}    
                />

                <Space>
                    <Button
                        type="primary"
                        onClick={()=>handleSearch(selectedKeys,confirm,dataIndex)}
                        icon={<SearchOutlined />}
                    >
                     Buscar   
                    </Button>

                    <Button
                        onClick={()=>handleReset(clearFilters)}
                        size={{width:90}}
                    >
                        Resetear
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered=><SearchOutlined style={{color:filtered ? '#1890ff' : undefined }}/>,
        onFilter: (value,record)=>record[dataIndex]?record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        :'',
        onFilterDropdownVisibleChange: visible =>{
            if(visible){
                setTimeout(() => searchInput.select(),100);
            }
        },
        render: text=>
                estado.searchColumn === dataIndex?(
                    <Highlighter
                        highlightStyle={{background: '#ffc069',padding:0}}
                        searchWords={[estado.searchText]}
                        autoEscape
                        textToHighlight = {text ? text.toString():''}
                    />
                ):(text)
    })
    const dataSource = [];

    // eslint-disable-next-line
    listaProductos.map((item, index) => {

        dataSource.push({
            orden: index + 1,
            nombreAlmacen: item.nombreInventario,
            nombreMaterial: item.nombreProducto,
            cantidadMaterial: item.cantidadProductoAlmacen            
        })
    })
    
    const columns = [
        {
            title: 'Orden',
            dataIndex: 'orden',
            key: 'orden',
        },
        {
            title: 'Almacen',
            dataIndex: 'nombreAlmacen',
            key: 'nombreAlmacen',
            render: (nombreAlmacen) => {
                switch (nombreAlmacen) {
                    case 'ALMACEN  GENERAL':
                        return <Tag color="blue">{nombreAlmacen}</Tag>

                    case 'ALMACEN MANTENIMIENTO CASTILLOS':
                        return <Tag color="green" > {nombreAlmacen}</Tag>

                    case 'ALMACEN MANTENIMIENTO VID':
                        return <Tag color="purple" > {nombreAlmacen}</Tag>

                    default:
                        break;
                }


            }

        },
        {
            title: 'Material',
            dataIndex: 'nombreMaterial',
            key: 'nombreMaterial',
            ...getColumnSearchProps('nombreMaterial')
        },
        {
            title: 'Cantidad total',
            dataIndex: 'cantidadMaterial',
            key: 'cantidadMaterial',
            render: (cantidadMaterial)=>{
                if(cantidadMaterial>0){
                   return <Tag style={{fontWeight:'bold'}} color="#87d068">{cantidadMaterial}</Tag>
                }else{
                    return <Tag style={{fontWeight:'bold'}} color="red">{cantidadMaterial}</Tag>
                }
            },
            align: 'center'
        }      
    ];

    return (
    
        <Table
        scroll={{ x: 320 }}
        size="small" bordered columns={columns} rowKey={"orden"} dataSource={dataSource} pagination={{ pageSize: 10 }} />)

}

export default ListaProductoFiltrado;