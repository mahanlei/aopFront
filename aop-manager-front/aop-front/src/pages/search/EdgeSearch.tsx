import React from 'react'
import './Search.less'
import { Input, Select, Row, Col, Icon, Form, Button, Table } from 'antd'
import { fromJS, toJS } from 'immutable'
import { fetchKerSearchResult } from '../../services/SearchServices.js'
class EdgeSearch extends React.Component<any,any> {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            tableData: [],
        }
    }
    componentDidMount() {
        // this.getCheckTypeoptions()
        this.setState({ loading: true })
        fetchKerSearchResult({}).then(res => {
            this.setState({
                loading: false,
                tableData: res.content,
            })

        }) 
    }


    handleReset = () => {
        this.props.form.resetFields();
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) { return }
            this.setState({ loading: true })
            fetchKerSearchResult(values).then(res => {
                this.setState({
                    loading: false,
                    tableData: res.content,
                })

            }) //传的参数
        })
    }
    renderSearchForm() {
        const { getFieldDecorator } = this.props.form
        return (
            <React.Fragment>
                <Row gutter={12}>
                    <Col span={5}>
                        <Form.Item label={'ID'} className='line'>
                            {getFieldDecorator('id', {
                                rules: [
                                    //     {
                                    //     required: true, message: '请输入KER ID'
                                    // }
                                ],
                            })(
                                <Input placeholder="ID" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <div className="line" >
                    <div className="nameLabel">上游事件：</div>
                    <div style={{ flexGrow: 1 }}>
                        <Row gutter={12} className='check-types-row'>
                            <Col span={5}>
                                <Form.Item className='search-item'>
                                    {getFieldDecorator('sourceId', {
                                        rules: [
                                            //     {
                                            //     required: true,message:'请输入上游事件ID'
                                            // }
                                        ],
                                    })(
                                        <Input placeholder="上游事件ID" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item className='search-item'>
                                    {getFieldDecorator('sourceTitle', {
                                        rules: [
                                            //     {
                                            //     required: true,message:'请输入上游事件ID'
                                            // }
                                        ],
                                    })(
                                        <Input placeholder="上游事件英文名称" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="line" >
                    <div className="nameLabel">下游事件：</div>
                    <div style={{ flexGrow: 1 }}>
                        <Row gutter={12} className='check-types-row'>
                            <Col span={5}>
                                <Form.Item className='search-item'>
                                    {getFieldDecorator('targetId', {
                                        rules: [
                                            //     {
                                            //     required: true,message:'请输入上游事件ID'
                                            // }
                                        ],
                                    })(
                                        <Input placeholder="下游事件ID" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item className='search-item'>
                                    {getFieldDecorator('targetTitle', {
                                        rules: [
                                            //     {
                                            //     required: true,message:'请输入上游事件ID'
                                            // }
                                        ],
                                    })(
                                        <Input placeholder="下游事件英文名称" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    renderTableData() {
        const columns = [
            {
                title: 'KER-ID',
                dataIndex: 'id',
            },
            {
                title: '上游事件',
                children: [
                    {
                        title: 'ID',
                        dataIndex: 'sourceId',
                    },
                    {
                        title: '英文名',
                        dataIndex: 'sourceTitle',
                    },
                ]
            },
            {
                title: '下游事件',
                children: [
                    {
                        title: 'ID',
                        dataIndex: 'targetId',
                    },
                    {
                        title: '英文名',
                        dataIndex: 'targetTitle',
                    },
                ]
            },
        ]
        let dataSource = this.state.tableData
        
        return (
        <Table 
            dataSource={dataSource} 
            loading={this.state.loading} 
            columns={columns} 
            bordered
            onRow={record => {
                return {
                  onClick: this.handleClickRow, // 点击行
                };
              }}
             />
        )
    }
    render() {

        let subPath = window.location.hash.split('/')[1]
        return (
            <div className="container">
                <div className="search">
                    <Form className='ant-advanced-search-form' >
                        <h3 style={{ marginBottom: '18px' }}>{subPath}检索条件</h3>
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
export default Form.create()(EdgeSearch)