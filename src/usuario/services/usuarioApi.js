const API_URL = `${process.env.REACT_APP_API_URL}/usuarios`

export const getUsuariosApi = async () => {
    const config = {
        method: 'GET'
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
    console.log(usuario);
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
