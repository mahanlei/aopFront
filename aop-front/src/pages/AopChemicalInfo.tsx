import React from 'react'
import { Input, Select, Row, Col, Icon, Form, Button, Table } from 'antd'
import { ke_attr } from '../utils/ChAndEn.js'
import { fetchAopInfo, fetchAopNodes } from '../services/AopService'
import { keColumns } from '../pages/search/Search'
import { serverIP } from "../utils/GlobalConstants"
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
            console.log(res);
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
                        let chinaOrNot;
                        switch(temp.beInChina){
                            case "0":chinaOrNot='无';break;
                            case "1":chinaOrNot='有';break;
                            case "2":chinaOrNot='优控化学品';break;
                        }
                        arr = [
                            ...arr,
                            {
                                aopId:key,
                                cas:temp.cas,
                                name:temp.name,
                                beInChina:chinaOrNot,
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
                    {
                        title: '我国有无',
                        dataIndex: 'beInChina',
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

    downloadFile = () => {
        var query = this.props.location.query;
        const selectedRows = query.selectedRows;
        var name = "";
        for(let i=0; i<selectedRows.length; i++) {
            name+=selectedRows[i].id+"_";
        }
        var filename = name+".xlsx";
        var filepath = `${serverIP}/result/`+filename;
        document.getElementById("export").setAttribute("href",filepath)
        document.getElementById("export").setAttribute("download",filename)
        document.getElementById("export").click();
    }

    render() {
        return (<div className="container">
                <div className="dataContent">
                    <div style={{ textAlign: 'right',marginBottom:20 }}>
                        <Button type="primary"  onClick={this.downloadFile} >导出数据</Button>
                        <a id="export" type="hidden" download="" href="" ></a>
                    </div>
                    {this.renderTableData()}
                </div>
            </div>
        )
    }
}
export default Form.create()(SingleForcast)