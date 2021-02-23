import React from 'react'
import { Route, Redirect } from 'react-router-dom'

//redux
import { connect } from 'react-redux'

const PublicRoutes = ({ auth, rol, component: Component, ...rest }) => {


    if (auth && rol === 'Administrador') {
        return < Redirect to="/dashboard" />

    } else if (auth && rol === "invitado") {

        return <Redirect to="/dashboard/invitado" />
    } else if (auth && rol === "supervisor") {

        return <Redirect to="/dashboard/supervisor" />
    } else if (auth && rol === 'usuario') {

        return < Redirect to="/requerimientos/pedido" />
    }
    else if (auth && rol === 'gerente') {
        return < Redirect to="/gerente" />
    }
    else {


        return <Route {...rest} component={Component} />
    }




}
const mapStateToProps = state => ({
    auth: state.sessionReducer.token,
    rol: state.sessionReducer.usuario.rol
})

export default connect(mapStateToProps, null)(PublicRoutes)
