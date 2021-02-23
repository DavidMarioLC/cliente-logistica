const API_URL = `${process.env.REACT_APP_API_URL}/accesoUsuario`;

export const agregarAccesoUsuarioApi = async (accesoUsuario) =>{
    const config = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(accesoUsuario)
    };

    const responseApi = await fetch(API_URL,config);
    const response = await responseApi.json();
    return response; 
}