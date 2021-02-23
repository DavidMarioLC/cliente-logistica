import React from 'react'
import { Route, useRouteMatch, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
/*styles and layout*/
import styles from '../styles/dashboardStyles'
import '../styles/dashboard.css'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'

/*modules*/
import Sedes from '../../sedes/containers/SedesContainer'
import Fundos from '../../fundo/containers/FundoContainer'
import Areas from '../../area/containers/AreasContainer'
import FundosAreas from '../../fundoArea/containers/FundoAreaContainer'
import Usuarios from '../../usuario/containers/UsuarioContainer'
import Roles from '../../rol/containers/RolContainers'
import Materiales from '../../materiales/containers/MaterialesContainer';
import Cecos from '../../ceco/containers/CecoContainer';
import Pedidos from '../../pedidosUsuarios/containers/ContainerPedidosUsuarios'
import Almacen from '../../almacen/containers/ContainerAlmacen'

const Dashboard = () => {

    const { Content } = Layout;
    let { path } = useRouteMatch();


    return (
        <Layout style={styles.layout}>
            {/* header */}
            <Navbar />
            <Layout>
                {/* mi sidebar */}
                <Sidebar />
                <Layout style={styles.layoutContent}>
                    <Content className="site-layout-background" style={styles.content}>
                        {/* routes */}
                        <Route exact path={`${path}/sedes`} component={Sedes} />
                        <Route exact path={`${path}/fundos`} component={Fundos} />
                        <Route exact path={`${path}/areas`} component={Areas} />
                        <Route exact path={`${path}/designacion`} component={FundosAreas} />
                        <Route exact path={`${path}/usuarios`} component={Usuarios} />
                        <Route exact path={`${path}/roles`} component={Roles} />
                        <Route exact path={`${path}/materiales`} component={Materiales} />
                        <Route exact path={`${path}/cecos`} component={Cecos} />
                        <Route exact path={`${path}/pedidos`} component={Pedidos} />
                        <Route exact path={`${path}/almacen`} component={Almacen} />

                        <Route exact path={`/requerimientos`} >
                            <Redirect to={`/dashboard`}></Redirect>
                        </Route>
                        <Route exact path={`/gerente`} >
                            <Redirect to={`/dashboard`}></Redirect>
                        </Route>

                        <Route exact path={`/invitado`}>
                            <Redirect to={`/dashboard`}></Redirect>
                        </Route>

                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default Dashboard
