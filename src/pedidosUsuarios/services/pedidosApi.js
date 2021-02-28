
const API_URL = `${process.env.REACT_APP_API_URL}/pedidos`

export const ListPedidosAPI = async (estado, month, year) => {

    const config = {
        method: 'GET'
    }

    // const response = await fetch(`${API_URL}/:estado/:mes/:año`, config);
    const response = await fetch(`${API_URL}/${estado}/${month}/${year}`, config);

    const pedidos = await response.json();
    console.log(pedidos);
    return pedidos;
}

export const getDetallesPedidosId = async (id) => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/detalles/${id}`, config);
    const pedidos = await response.json();
    console.log("Datos de detalle pedido API==========================")
    console.log(pedidos);
    return pedidos;
}

export const getDetallePedidoId = async (idDetallePedido) => {
    const config = {
        method: 'GET'
    }
    console.log("GETDETALLEPEDIDO API:")
    console.log(idDetallePedido);

    const response = await fetch(`${API_URL}/detallePedidoId/${idDetallePedido}`, config);
    const detallePedido = await response.json();
    console.log("detalle pedido ID API:")
    console.log(detallePedido);
    return detallePedido;
}


export const updateCantidadPedidoEscogidoId = async (idPedidoDetalle) => {
    const config = {
        method: 'GET'
    }

    console.log("Obteniend id API de: " + idPedidoDetalle);
    console.log(idPedidoDetalle);

    const response = await fetch(`${API_URL}/detalleProducto/${idPedidoDetalle}`, config);
    const pedidos = await response.json();
    console.log("cargando detalle pedido de id pedido ")
    console.log(response);
    return pedidos;
}

export const actualizarCantidadAPI = async (id, pedido) => {


    console.log("_::::::::::::::::::actualizar cantida:::::::::::::::_");
    console.log(id);
    console.log(pedido);
    const config = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
    }

    const response = await fetch(`${API_URL}/detalleProducto/${id}`, config);
    const pedidos = await response.json();
    return pedidos;
}

//estee es delete pedido del detalle
export const deleteProductoAPI = async (id) => {

    const config = {
        method: "DELETE"
    };

    const responseApi = await fetch(`${API_URL}/detalleProducto/${id}`, config);
    const response = await responseApi.json();
    return response;
}



export const aprobarPedidoAPI = async (id, idCeco, fk_usuario) => {

    const config = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idCeco, fk_usuario })
    }

    const response = await fetch(`${API_URL}/${id}`, config);
    const pedidos = await response.json();
    return pedidos;
}

export const rechazarPedidoAPI = async (id) => {
    const config = {
        method: 'DELETE'
    }

    const response = await fetch(`${API_URL}/${id}`, config);
    const pedidos = await response.json();
    return pedidos;
}

export const exportarExcelApi = async (id) => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/exportar/${id}`, config);
    const pedidos = await response.json();
    return pedidos;
}


export const deletePedidoId = async (id) => {
    const config = {
        method: "DELETE"
    };

    const responseApi = await fetch(`${API_URL}/deletePedido/${id}`, config);
    const response = await responseApi.json();
    return response;
}