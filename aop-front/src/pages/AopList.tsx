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
            console.log(res)
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
                filters: [
                    { text: '无特异性', value: '无特异性' },
                    { text: '哺乳', value: '哺乳' },
                    { text: '两栖', value: '两栖' },
                    { text: '鱼类', value: '鱼类' },
                    { text: '鸟类', value: '鸟类' },
                    { text: '昆虫', value: '昆虫' },
                    { text: '尾感器', value: '尾感器' },
                    { text: '甲壳', value: '甲壳' },
                    { text: '单子叶植物', value: '单子叶植物' },
                    { text: '双甲', value: '双甲' },
                  ],
                onFilter: (value, record) => record.species.indexOf(value) === 0,

            },
            {
                title: '性别',
                dataIndex: 'sex',
                filters: [
                    { text: '无特异性', value: '无特异性' },
                    { text: '雄性', value: '雄性' },
                    { text: '雌性', value: '雌性' },
                  ],
                onFilter: (value, record) => record.sex.indexOf(value) === 0,

            },
            {
              
                title: '生命阶段',
                dataIndex: 'lifeCycle',
                filters: [
                    { text: '全生命阶段', value: '全生命阶段' },
                    { text: '胚胎', value: '胚胎' },
                    { text: '胎儿', value: '胎儿' },
                    { text: '幼体', value: '幼体' },
                    { text: '身体发育阶段', value: '身体发育阶段' },
                    { text: '成体', value: '成体' },
            
                  ],
                onFilter: (value, record) => record.lifeCycle.indexOf(value) === 0,

            },
            {
               

                title: '器官',
                dataIndex:'organ',
                filters: [
                    { text: '运动系统', value: '运动系统' },
                    { text: '消化系统', value: '消化系统' },
                    { text: '呼吸系统', value: '呼吸系统' },
                    { text: '泌尿系统', value: '泌尿系统' },
                    { text: '生殖系统', value: '生殖系统' },
                    { text: '内分泌系统', value: '内分泌系统' },
                    { text: '免疫系统', value: '免疫系统' },
                    { text: '神经系统', value: '神经系统' },
                    { text: '循环系统', value: '循环系统' },
                    { text: '其他', value: '其他' },
                  ],
                onFilter: (value, record) => record.organ.indexOf(value) === 0,

            },
            {
               
                title: '癌症',
                dataIndex:'cancer',
                filters: [
                    { text: '阴性', value: '阴性' },
                    { text: '阳性', value: '阳性' },
                    
                  ],
                onFilter: (value, record) => record.cancer.indexOf(value) === 0,

            },
            {
                title: '等级',
                dataIndex:'level',
                filters: [
                    { text: '分子', value: '分子' },
                    { text: '细胞', value: '细胞' },
                    { text: '组织', value: '组织' },
                    { text: '器官', value: '器官' },
                    { text: '个体', value: '个体' },
                    { text: '种群', value: '种群' },
                
                  ],
                onFilter: (value, record) => record.level.indexOf(value) === 0,
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