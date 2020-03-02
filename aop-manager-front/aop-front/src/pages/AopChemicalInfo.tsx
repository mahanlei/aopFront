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
            loading: false,
            tableData: [],
        }
    }
    componentDidMount() {
        var query = this.props.location.query;
        const selectedRows = query.selectedRows;
        this.setState({
            loading: true
        })


        fetchDiagnoseResult(selectedRows).then(res => {
            let arr = [];
            let count=0;
            const tableSize=10;
            for(var key in res){
                    const len = res[key].length;

                    res[key].map((temp,index)=>{
                        count=count+1;
                        let tempSize=index === 0 ? len : 0;
                        if(tempSize===0&&count%tableSize===1&&count>tableSize){
                            tempSize=len-index;
                        }
                        arr = [
                            ...arr,
                            {
                                aopId:key,
                                cas:temp.cas,
                                name:temp.name,
                                span:tempSize
                            }
                        ]
                        return arr
                    })
            }

            const tableData = arr.map((item, index) => {
                item.key = index;
                return item;
            })
            this.setState({
                loading:false,
                tableData: tableData,
            })
        })

    }
    renderTableData() {
        const columns = [
            {
                title: 'Aop',
                children: [
                    {
                        title: 'ID',
                        dataIndex: 'aopId',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: {rowSpan:row.span},
                            };
                        },
                    },


                ]
            },

            {
                title: '化学品',
                children: [
                    {
                        title: 'cas号',
                        dataIndex: 'cas',
                    },
                    {
                        title: '英文名',
                        dataIndex: 'name',
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
            />
        )
    }


    render() {
        return (<div className="container">
                <div className="dataContent">
                    {this.renderTableData()}
                </div>
            </div>
        )
    }
}
export default Form.create()(SingleForcast)