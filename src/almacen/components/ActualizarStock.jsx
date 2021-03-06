import React, { Component } from "react";
import { Table, Button, Row, Col, Upload } from "antd";
import Icon from '@ant-design/icons';
import { ExcelRenderer } from "react-excel-renderer";
import { actualizarStockAlmacenGeneral } from '../services/AlmacenAPI'

export default class ActualizarStock extends Component {

    constructor(props) {

        super(props);
        this.state = {

            cols: [],
            rows: [],
            errorMessage: null,
            columns: [
                {
                    title: "SKU",
                    dataIndex: "sku",

                },
                {
                    title: "PRECIO",
                    dataIndex: "precio",

                },
                {
                    title: 'CANTIDAD',
                    dataIndex: 'cantidad'
                }
            ]
        };
    }

    handleSave = row => {
        const newData = [...this.state.rows];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row
        });
        this.setState({ rows: newData });
    };

    checkFile(file) {
        let errorMessage = "";
        if (!file || !file[0]) {
            return;
        }
        const isExcel =
            file[0].type === "application/vnd.ms-excel" ||
            file[0].type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if (!isExcel) {
            errorMessage = "You can only upload Excel file!";
        }
        // console.log("file", file[0].type);
        const isLt2M = file[0].size / 1024 / 1024 < 2;
        if (!isLt2M) {
            errorMessage = "File must be smaller than 2MB!";
        }
        // console.log("errorMessage", errorMessage);
        return errorMessage;
    }

    fileHandler = fileList => {
        // console.log("fileList", fileList);
        let fileObj = fileList;
        if (!fileObj) {
            this.setState({
                errorMessage: "No file uploaded!"
            });
            return false;
        }
        // console.log("fileObj.type:", fileObj.type);
        if (
            !(
                fileObj.type === "application/vnd.ms-excel" ||
                fileObj.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
        ) {
            this.setState({
                errorMessage: "Unknown file format. Only Excel files are uploaded!"
            });
            return false;
        }
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                let newRows = [];
                // eslint-disable-next-line
                resp.rows.slice(1).map((row, index) => {
                    if (row && row !== "undefined") {
                        newRows.push({
                            key: index,
                            sku: row[0],
                            precio: row[1],
                            cantidad: row[2],

                        });
                    }
                });
                if (newRows.length === 0) {
                    this.setState({
                        errorMessage: "No data found in file!"
                    });
                    return false;
                } else {
                    this.setState({
                        cols: resp.cols,
                        rows: newRows,
                        errorMessage: null
                    });
                }
            }
        });
        return false;
    };

    handleSubmit = async () => {
        // console.log("submitting: ", this.state.rows);

        //submit to API
        //if successful, banigate and clear the data
        const data = await actualizarStockAlmacenGeneral(this.state.rows)
        console.log(data);

        this.setState({ rows: [] })

    };




    render() {

        const columns = this.state.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave
                })
            };
        });
        return (
            <>
                <h1>Escoga su archivo de excel para subir</h1>
                <Row>
                    <Col md={4}>
                        <Upload

                            name="file"
                            beforeUpload={this.fileHandler}
                            onRemove={() => this.setState({ rows: [] })}
                            multiple={false}
                        >
                            <Button>
                                <Icon type="upload" /> Click aquí para subir tu archivo excel
                            </Button>

                        </Upload>
                    </Col>
                    <Col
                        md={24}
                        align="right"
                        style={{ display: "flex", justifyContent: "space-between", marginTop: '1em' }}
                    >
                        {this.state.rows.length > 0 && (
                            <>
                                <Button
                                    onClick={this.handleSubmit}
                                    size="large"
                                    type="primary"
                                    style={{ marginBottom: 16, marginLeft: 10 }}
                                >
                                    Subir al sistema
                                    </Button>
                            </>
                        )}
                    </Col>
                    <Col md={24} style={{ marginTop: 20 }}>
                        <Table

                            rowClassName={() => "editable-row"}
                            dataSource={this.state.rows}
                            columns={columns}
                            pagination={{ pageSize: 5 }}
                        />
                    </Col>
                </Row>
            </>
        );
    }
}

