import React from 'react'
import { Input, Select, Row, Col, Icon, Form, Button, Table } from 'antd'
import { ke_attr } from '../utils/ChAndEn.js'
import { fetchAopInfo, fetchAopNodes } from '../services/AopService'
import { keColumns } from '../pages/search/Search'
import './AopInfo.less'
import './KeAoInfo.less'
import {fetchAopList,fetchDiagnoseResult} from '../services/EnvironmentService'
// import echarts from 'echarts'
const { Option, OptGroup } = Select
class SingleForcast extends React.Component<any,any> {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [],
            selectedRows: [],
            loading: false,
            tableData: [],
        }
    }

    componentDidMount () {
        const id = window.location.hash.split('/')[2]
        this.setState({
            loading: true
        })
        fetchAopList(id).then(res => {
            this.setState({
                loading: false,
                tableData: res,
            })
        })

    }
    renderTableData() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange,
        };
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: '英文名称',
                dataIndex: 'title',
            },
            {
                title: '中文名称',
                dataIndex: 'chinese',
            },
            {
                title: '物种',
                dataIndex: 'species',

            },
            {
                title: '性别',
                dataIndex: 'sex',

            },
            {
                title: '生命阶段',
                dataIndex: 'lifeCycle',

            },
            {
                title: '等级',
                dataInd:'level',

            },

        ]

        let dataSource = this.state.tableData
        return (
            <Table
                dataSource={dataSource}
                loading={this.state.loading}
                columns={columns}
                bordered
                rowSelection={rowSelection}
                onRow={(record) => ({
                    onClick: () => {
                        this.selectRow(record);
                    },
                })}
            />
        )
    }
    selectRow = (record) => {
        const selectedRowKeys = [...this.state.selectedRowKeys];
        const selectedRows=[...this.state.selectedRows];
        if (selectedRowKeys.indexOf(record.keys) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.keys), 1);
            selectedRows.splice(selectedRows.indexOf(record), 1);
        } else {
            selectedRowKeys.push(record.keys);
            selectedRows.push(record);
        }
        this.setState({ selectedRowKeys,selectedRows });

    }

    onSelectedRowKeysChange = (selectedRowKeys,selectedRows) => {
        this.setState({ selectedRowKeys,selectedRows });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }


    handleDiagnose = (e) => {
        e.preventDefault();
        var param = {selectedRows:this.state.selectedRows };
        var path = {
            pathname: "/AopChemicalInfo",
            query: param
        };
        this.props.history.push(path);




    }
    render() {
        return (<div className="container">
                <div className="dataContent">
                    <div style={{ textAlign: 'right',marginBottom:20 }}>
                        <Button type="primary"  onClick={this.handleDiagnose} >诊断</Button>
                    </div>
                    {this.renderTableData()}

                </div>
            </div>
        )
    }
}
export default Form.create()(SingleForcast)