import moment from 'moment'
const API_URL = `${process.env.REACT_APP_API_URL}/almacen`


/*Agregando una nueva funcionalida */
export const obtenerAlmacenApi = async () => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/almacen`, config)
    const inventario = await response.json();
    return inventario;
}

export const IngresoMasivoExel = async (material) => {


        /*
          "codigo": 14015711,
    "material": "RODAMIENTO 6303-2RS",
    "cantidad": 10,
    "unidad": "UN",
    "fecha": "29/12/2020",
    "gpo_articulo": 1,
    "centro": 4202,
    "codigo_almacen": 61,
    "grupo_compra": "c01",
    "usuario": "ANGEL",
    "tipo_Mantenimiento": "Correctivo",
    "maquina_Destino": "Motos"
        */

    //    const dataExel = [];

    // material.map((item)=>{
    //     dataExel.push({
    //         codigo: item.CODIGO,
            
    //     })
    // })
       
    /*
    
    cantidad: 3
centro: 4202
codigo: 14057087
codigo_almacen: 61
fecha: "29/12/2020"
gpo_articulo: 1
grupo_compra: "c01"
maquina_Destino: "Motos"
material: "BATERIA 12N9-3B"
tipo_Mantenimiento: "Correctivo"
unidad: "UN"
usuario: "ANGEL"
*/
    
    console.log("API almacen ",material);
    const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(material)
    };

    console.log("movimient ===>");
    const response = await fetch(`${API_URL}/IngresoMasivoExel`, config)
    const responseApi = await response.json();

    return responseApi;
}

export const ingresarMaterialExelKardex = async (material) => {
    console.log("=========API KARDEX===========")
    console.log(material);
    console.log("=========API KARDEX===========")
    const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(material)
    }

    const response = await fetch(`${API_URL}/material/exel/kardex`, config);
    const responseApi = response.json();

    return responseApi;
}

export const IngresarMaterialExelMovimiento = async (material) => {

    const data = [];
    let fechaActual = moment().format("DD/MM/YYYY");
    material.map((item) =>
        data.push({
            tipoMovimiento: 'INGRESO',
            codigoDocumento: 'IMPORTACION MASIVA',
            fk_inventario: '0061',
            personaResponsable: item.usuario,
            uso: 'NO DEFINIDO',
            create_date: fechaActual
        })
    )

    const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    console.log("movimient ===>");
    console.log(data);
    const response = await fetch(`${API_URL}/material/exel/movimiento`, config)
    const responseApi = await response.json();

    return responseApi;
}

export const ingresarMaterialExel = async (material) => {

    console.log(typeof (material));
    console.log("API ===>")

    const data = [];
    //console.log(materiales);
    material.map((item) =>
        data.push({
            skuProducto: item.codigo,
            nombreProducto: item.material,
            cantidadProductoAlmacen: item.cantidad
        }),
    );

    console.log(data);

    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const response = await fetch(`${API_URL}/material/exel`, config);
    const responseApi = await response.json();
    return responseApi;
}

export const obtenerAlmacenPorSede = async (fk_sede) => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/almacenPorSede/${fk_sede}`, config)
    const inventario = await response.json();
    return inventario;
}


export const obtenerMaterialesPorAlmacen = async (codigoAlmacen) => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/materialPorAlmacen/${codigoAlmacen}`, config)
    const inventario = await response.json();
    return inventario;
}

export const obtenerMaterialesPorSede = async (idSede) => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/materiales/${idSede}`, config)
    const inventario = await response.json();
    return inventario;
}


export const getMaterialbyStock = async (idAlmacen) => {
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/materialPorAlmacen/${idAlmacen}`, config)
    const inventario = await response.json();
    return inventario;
}

export const registrarInicializacionAlmacen = async (ingreso) => {

    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingreso)
    };

    const responseApi = await fetch(API_URL, config);
    const response = await responseApi.json();
    return response;
}

export const validarMaterialExistente = async (idProducto, idAlmacen) => {
    console.log(idProducto, idAlmacen);
    const config = {
        method: 'GET'
    }

    const response = await fetch(`${API_URL}/material/${idProducto}/almacen/${idAlmacen}`, config)
    const inventario = await response.json();
    return inventario;
}

export const registrarIngresoMaterial = async (material) => {

    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(material)
    };

    const responseApi = await fetch(`${API_URL}/ingreso`, config);
    const response = await responseApi.json();
    return response;

}

export const registrarSalidaMaterial = async (material) => {
    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(material)
    };

    const responseApi = await fetch(`${API_URL}/salida`, config);
    const response = await responseApi.json();
    return response;
}


export const listaKardexAlmacenAPI = async () => {
    const config = {
        method: 'GET'
    }

    const responseApi = await fetch(`${API_URL}/kardex`, config)
    const response = await responseApi.json()
    return response


}

export const listaMovimientosAlmacenAPI = async () => {
    const config = {
        method: 'GET'
    }
    const responseApi = await fetch(`${API_URL}/movimientos`, config)
    const response = await responseApi.json()
    return response

}
export const obtenerMovimientosDetalles = async (idMovimiento) => {
    const config = {
        method: 'GET'
    }
    const responseApi = await fetch(`${API_URL}/movimientos/detalles/${idMovimiento}`, config)
    const response = await responseApi.json()
    return response
}

export const obtenerDetalleMovimientoId = async (idMovimientoDetalle) => {
    const config = {
        method: 'GET'
    }
    const responseApi = await fetch(`${API_URL}/movimientos/detalles/editar/${idMovimientoDetalle}`, config)
    const response = await responseApi.json()
    return response
}

export const actualizarCantidadProductoAPI = async (idMovimientoDetalle, fk_productoAlmacen, cantidadProducto) => {
    const config = {

        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fk_productoAlmacen: fk_productoAlmacen,
            cantidadProducto: cantidadProducto
        })
    };

    const responseApi = await fetch(`${API_URL}/movimientos/detalles/actualizar/${idMovimientoDetalle}`, config);
    const response = await responseApi.json();
    return response;
}

export const moverMateriales = async (material) => {

    const config = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(material)
    };

    const responseApi = await fetch(`${API_URL}/moverMaterial`, config);
    const response = await responseApi.json();
    return response;

}

//filtro de los productos por sede y almacen

export const listarProductosSedesAlmacen = async (filtro) => {

    const { sede, almacen, todos } = filtro;

    const config = {
        method: 'GET'

    }

    if (todos) {
        const response = await fetch(`${API_URL}/filtroProductoSedeAlmacen/${sede}`, config)
        const inventario = await response.json();
        return inventario;

    } else {
        const response = await fetch(`${API_URL}/filtroProductoSedeAlmacen/${sede}/${almacen}`, config)
        const inventario = await response.json();
        return inventario;
    }
}


//filtrar productos por fecha y material

export const FiltrarProductoEscogido = async ({ fechaInicio, fechaFin, material }) => {
    const config = {
        method: 'GET'
    }

    const responseApi = await fetch(`${API_URL}/kardex/${material}/${fechaInicio}/${fechaFin}`, config)
    const response = await responseApi.json()
    return response

}
export const filtrarKardexPorFecha = async (fechaInicio, fechaFin) => {
    const config = {
        method: 'GET'
    }

    const responseApi = await fetch(`${API_URL}/kardex/${fechaInicio}/${fechaFin}`, config)
    const response = await responseApi.json()
    return response

}


export const actualizarStockAlmacenGeneral = async (materiales) => {

    const config = {

        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(materiales)
    };

    const responseApi = await fetch(`${API_URL}/actualizarStock/almacenGeneral`, config);
    const response = await responseApi.json();
    return response;
}

export const MostrarProductoAlmacen = async () => {
    const config = {
        method: 'GET'
    };

    const responseApi = await fetch(`${API_URL}/mostarProductoAlmacen`, config);
    const response = await responseApi.json();

    return response;

}