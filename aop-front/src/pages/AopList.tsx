import React from 'react'
import { Input, Select, Row, Col, Icon, Form, Button, Table } from 'antd'
import { ke_attr } from '../utils/ChAndEn.js'
import { fetchAopInfo, fetchAopNodes } from '../services/AopService'
import { keColumns } from '../pages/search/Search'
import './AopInfo.less'
import './KeAoInfo.less'
import {fetchAopList} from '../services/EnvironmentService'
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
        console.log(dataSource)
        return (
            <Table
                dataSource={dataSource}
                loading={this.state.loading}
                columns={columns}
                bordered
            />
        )
    }

    renderKeInfo = () => {
        // var query = this.props.location.query;
        // const bioassay = query.bioassay;
        // const effect=query.effect;
        // return( <div className="keInfoCon">
        //     <h3 style={{ marginBottom: '18px' }}>Ke信息</h3>
        //     <div className="item">
        //         <div className="attrLabel">Bioaasay:</div>
        //         <div className="attrValue">{bioassay}</div>
        //     </div>
        //     <div className="item">
        //         <div className="attrLabel">Effect:</div>
        //         <div className="attrValue">{effect}</div>
        //     </div>
        // </div>)
    }

    render() {
        return (<div className="container">
                {this.renderKeInfo()}
                <div className="dataContent">
                    {this.renderTableData()}
                </div>
            </div>
        )
    }
}
export default Form.create()(SingleForcast)