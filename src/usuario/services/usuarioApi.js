const API_URL = `${process.env.REACT_APP_API_URL}/usuarios`


//Registro de usuario segun su estado de pedido
export const ListaUsuarioEstadoPedidoActivo = async () => {

    try {

        const config = {
            method: 'GET'
        }

        const response = await fetch(`${API_URL}/pedido/Activo`, config);

        const usuarioEstado = await response.json();

        return usuarioEstado;
    } catch (error) {
        console.log(error)
    }

}

export const ListaUsuarioEstadoPedidoInactivo = async () => {

    const config = {
        method: "GET"
    }

    const response = await fetch(`${API_URL}/pedido/Inactivo`, config);
    const usuarioInactivo = await response.json();
    return usuarioInactivo;
}

export const getUsuariosApi = async () => {
    const config = {
        method: "GET"
    }

    const response = await fetch(API_URL, config);
    const usuarios = await response.json();
    return usuarios;
}

export const createUsuarioApi = async (usuario) => {

    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    };

    const responseApi = await fetch(API_URL, config);
    const response = await responseApi.json();
    return response;
}



export const getUsuarioIdApi = async (idUsuario) => {

    const config = {
        method: "GET"
    };

    const response = await fetch(`${API_URL}/${idUsuario}`, config);
    const usuario = await response.json();
    return usuario;
};


export const updateUsuarioApi = async (idUsuario, usuario) => {

    const config = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    };

    const responseApi = await fetch(`${API_URL}/${idUsuario}`, config);
    const response = await responseApi.json();
    return response;
}

export const deleteUsuarioApi = async (idUsuario) => {

    const config = {
        method: "DELETE"
    };

    const responseApi = await fetch(`${API_URL}/${idUsuario}`, config);
    const response = await responseApi.json();
    return response;
}


export const changePasswordApi = async (idUsuario, password) => {

    const config = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    };

    const responseApi = await fetch(`${API_URL}/changePassword/${idUsuario}`, config);
    const response = await responseApi.json();
    return response;
}