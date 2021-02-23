import React, { Fragment, useState } from 'react';
import { Button, Card, Divider } from 'antd';
import * as XLSX from 'xlsx'
import ExcelReader from './ExelRender';
const SubidaMasivo = () => {

    return (
        <Fragment>
            <Card>
                   <ExcelReader/>
            </Card>
        </Fragment>
    )
}

export default SubidaMasivo;
