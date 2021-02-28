import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import DashboardLogistica from '../dashboard/components/Dashboard'
// import PanelRequerimientos from '../pedidos/containers/PanelRequerimientos'
import PanelRequerimientos from '../pedidos/containers/PanelRequerimientosv2'

import DashboardView from '../dashboardView/components/DashboardView'

import InvitadoContainer from '../perfiles/invitado/containers/InvitadoContainer';

import SupervisorContainer from '../perfiles/supervisor/containers/SupervisorContainer';

const ProtectedRoutes = ({ auth, rol, component: Component, ...rest }) => {




    if (auth) {
        switch (rol) {
            case "gerente":
                return <Route {...rest} component={DashboardView} />
                break;
            case "invitado":
                return <Route {...rest} component={InvitadoContainer} />
                break;
            case "supervisor":
                return <Route {...rest} component={SupervisorContainer} />
            case "Administrador":
                return <Route {...rest} component={DashboardLogistica} />
                break;
            case "usuario":
                return <Route {...rest} component={PanelRequerimientos} />
                break;
            default:
                return <Redirect to="/login" />
        }
    }


    /*if (auth && rol === 'gerente') {

        return <Route {...rest} component={DashboardView} />

    } else if (auth && rol === 'invitado') {

        return <Route {...rest} component={InvitadoContainer} />

    } else if (auth && rol === 'Administrador') {

        return <Route {...rest} component={DashboardLogistica} />
    }
    else if (auth && rol === 'usuario') {

        return <Route {...rest} component={PanelRequerimientos} />
    }
    else {


        return <Redirect to="/login" />
    }*/

}

const mapStateToProps = state => ({
    auth: state.sessionReducer.token,
    rol: state.sessionReducer.usuario.rol
})

export default connect(mapStateToProps, null)(ProtectedRoutes)
