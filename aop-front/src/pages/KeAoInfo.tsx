import React from 'react'
import { Input, Select, Row, Col, Icon, Form, Button, Table } from 'antd'
import { ke_attr } from '../utils/ChAndEn.js'
import { fetchAopInfo, fetchAopNodes } from '../services/AopService'
import { keColumns } from '../pages/search/Search'
import './AopInfo.less'
import {fetchToxInfo,fetchKEandAO} from '../services/SingleForcast'
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
        const bioassay = query.bioassay;
        const effect=query.effect;
        //   this.props.history.location.p
        this.setState({
            loading: true
        })

        fetchKEandAO(bioassay,effect).then(res => {
            let arr = [];
            let count=0;
            const tableSize=10;
            res.map(temp=>{
                const len = temp.aos.length;
                temp.aos.map((aoItem,index)=>{
                    count=count+1;
                    let tempSize=index === 0 ? len : 0;
                    if(tempSize===0&&count%tableSize===1&&count>tableSize){
                        tempSize=len-index;
                    }
                    arr = [
                        ...arr,
                        {
                            keId:temp.ke.id,
                            keTitle:temp.ke.title,
                            keChinese:temp.ke.chinese,
                            keSpecies:temp.ke.species,
                            keLevel:temp.ke.level,
                            aoId:aoItem.id,
                            aoTitle:aoItem.title,
                            aoChinese:aoItem.chinese,
                            aoSpecies:aoItem.species,
                            aoOrgan:aoItem.organ,
                            aoCancer:aoItem.cancer,
                            aoLevel:aoItem.level,
                            aoSpan:tempSize,
                            count:count
                        }
                    ]
                    return arr
                })
                return arr
            })
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
                title: 'KE',
                children: [
                    {
                        title: 'ID',
                        dataIndex: 'keId',
                        render: (value, row) => {
                            
                            return {
                                children: value,
                                props: {rowSpan:row.aoSpan},
                            };
                        },
                    },
                    {
                        title: '英文名',
                        dataIndex: 'keTitle',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: {rowSpan:row.aoSpan},
                            };
                        },
                    },
                    {
                        title: '中文名',
                        dataIndex: 'keChinese',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: {rowSpan:row.aoSpan},
                            };
                        },
                    },
                    {
                        title: '物种',
                        dataIndex: 'keSpecies',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: {rowSpan:row.aoSpan},
                            };
                        },
                    },
                    {
                        title: '等级',
                        dataIndex: 'keLevel',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: {rowSpan:row.aoSpan},
                            };
                        },
                    },

                ]
            },

            {
                title: 'AOs',
                children: [
                    {
                        title: 'ID',
                        dataIndex: 'aoId',
                    },
                    {
                        title: '英文名',
                        dataIndex: 'aoTitlw',
                    },
                    {
                        title: '中文名',
                        dataIndex: 'aoChinese',
                    },
                    {
                        title: '物种',
                        dataIndex: 'aoSpecies',
                    },
                    {
                        title: '器官',
                        dataIndex: 'aoOrgan',
                    },
                    {
                        title: '是否致癌',
                        dataIndex: 'aoCancer',
                    },
                    {
                        title: '等级',
                        dataIndex: 'aoLevel',
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

        return (<div className="container">
                <div className="dataContent">
                    {this.renderTableData()}
                </div>



            </div>
        )
    }
}
export default Form.create()(SingleForcast)