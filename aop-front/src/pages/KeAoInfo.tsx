import React from 'react'
import { Input, Select, Row, Col, Icon, Form, Button, Table } from 'antd'
import { ke_attr } from '../utils/ChAndEn.js'
import { fetchAopInfo, fetchAopNodes } from '../services/AopService'
import { keColumns } from '../pages/search/Search'
import './AopInfo.less'
import './KeAoInfo.less'
import {fetchToxInfo,fetchKEandAO} from '../services/SingleForcast'
import { serverIP } from "../utils/GlobalConstants"
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
       const bioassay = window.location.hash.split('/')[2]
        const effect=window.location.hash.split('/')[3]
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
                            aoId:aoItem.event.id,
                            aoTitle:aoItem.event.title,
                            aoChinese:aoItem.event.chinese,
                            aoSpecies:aoItem.event.species,
                            aoOrgan:aoItem.event.organ,
                            aoCancer:aoItem.event.cancer,
                            aoLevel:aoItem.event.level,
                            distance:aoItem.distance,
                            aoSpan:tempSize
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
                    {
                        title: '距离',
                        dataIndex: 'distance',
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
        const bioassay =decodeURI(window.location.hash.split('/')[2]); 
        const effect=window.location.hash.split('/')[3]
        var filename = bioassay+"-"+effect+".xlsx";
        var filepath = `${serverIP}/result/`+filename;
        document.getElementById("export").setAttribute("href",filepath)
        document.getElementById("export").setAttribute("download",filename)
        document.getElementById("export").click();
    }
    renderKeInfo = () => {
        const bioassay =decodeURI(window.location.hash.split('/')[2]); 
        const effect=window.location.hash.split('/')[3]
        return( <div className="keInfoCon">
            <h3 style={{ marginBottom: '18px' }}>Ke信息</h3>
            <div className="item">
                    <div className="attrLabel">Bioaasay:</div>
                    <div className="attrValue">{bioassay}</div>
            </div>
            <div className="item">
                <div className="attrLabel">Effect:</div>
                <div className="attrValue">{effect}</div>
            </div>
        </div>)
    }

    render() {

        return (<div className="container">
                {this.renderKeInfo()}
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