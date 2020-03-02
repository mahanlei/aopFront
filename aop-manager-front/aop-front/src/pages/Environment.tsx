import React from 'react'
import { Input, Select, Row, Col, Icon, Form, Button, Table } from 'antd'
import { ke_attr } from '../utils/ChAndEn.js'
import { fetchAopInfo, fetchAopNodes } from '../services/AopService'
import { keColumns } from '../pages/search/Search'
import './AopInfo.less'
import {fetchAoInfo} from '../services/EnvironmentService'
// import echarts from 'echarts'
const { Option, OptGroup } = Select
class SingleForcast extends React.Component<any,any> {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            tableData: [],
        }

    }

    renderSearchForm() {
        const { getFieldDecorator } = this.props.form
        return (
            <React.Fragment>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label={'名称'} className='line'>
                            {getFieldDecorator('name', {
                                rules: [],
                            })(
                                <Input placeholder="输入id、中文名称或者英文名称" style={{ width: 300 }} />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
    renderTableData() {
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
                title: '性别',
                dataIndex: 'sex',

            },
            {
                title: '生命阶段',
                dataIndex: 'lifeCycle',

            },
            {
                title: '等级',
                dataIndex: 'level',

            },
        ]
        let dataSource = this.state.tableData
        return (
            <Table
                dataSource={dataSource}
                loading={this.state.loading}
                columns={columns}
                bordered
                onRowClick={ record =>
                    this.handleClickRow(record)
                }
            />
        )
    }

    handleClickRow = (record) => {
        // var path = {
        //     pathname: "/keao",
        //     query: param
        // };
        // this.props.history.push(path);
        this.props.history.push(`/aopList/${record.id}`)
    }

    handleReset = () => {
        this.props.form.resetFields();
    }


    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) { return }
            this.setState({ loading: true })
            fetchAoInfo(values.name).then(res => {
                this.setState({
                    loading: false,
                    tableData: res,
                })

            }) //传的参数
        })

    }

    render() {

        return (
            <div className="container">
                <div className="search">
                    <Form className='ant-advanced-search-form' >
                        <h3 style={{ marginBottom: '18px' }}>AO搜索</h3>
                        {this.renderSearchForm()}
                    </Form>
                    <div style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.handleSearch}>查询</Button>
                        <Button style={{ marginLeft: 14, marghtRight: 30 }} onClick={this.handleReset}>
                            清除
                        </Button></div>
                </div>

                <div className="dataContent">
                    <h3 style={{ marginBottom: '18px' }}>搜索结果</h3>
                    {this.renderTableData()}
                </div>

            </div>

        )
    }
}
export default Form.create()(SingleForcast)