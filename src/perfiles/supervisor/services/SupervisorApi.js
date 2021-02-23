const API_URL = `${process.env.REACT_APP_API_URL}/supervisor`;

export const listarPedidosApi = async ()=>{
    const config = {
        method: 'GET'   
    }

    const resposne = await fetch(API_URL,config);
    const pedidos = await resposne.json();
    console.log(pedidos);
    return pedidos;
}


export const listarDetallePedido = async (idusuario,fk_pedido) =>{
    const config ={
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/${idusuario}/${fk_pedido}`,config);
    const detallePedido = await response.json();
    return detallePedido;
}