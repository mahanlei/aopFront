import React from 'react'
import { Input, Row, Col, Form, Button, Table, Anchor, BackTop } from 'antd'
import './SingleForcast.less'
import { fetchToxInfo, fetchAllInfo, fetchToxReport, fetchToxTableAll } from '../services/SingleForcast'
import echarts from 'echarts'
import { serverIP } from "../utils/GlobalConstants"

const { Link } = Anchor;
const MODULE_TYPE = {
    detection_gather: 0,
    detection_info: 1,
    toxicity_prediction: 2,

}
class SingleForcast extends React.Component<any, any> {
    constructor(props) {
        super(props)
        // this.tryRestoreComponent();
        // this.itemsChanged = false;  // 本次渲染是否发生了文章列表变化，决定iscroll的refresh调用
        this.state = {
            loading: false,
            tableData: [],
            biodetectionTableData: [],
            bioLoading: false,
            allTableData: [],
            allLoading: false,
            isAll: true,
            current: 0,
            pageSize: 20,
            total: 0,
            load: true,
            ac50Sort:"",
            resSort:"hasRes,DESC",
        }

    }
    // tryRestoreComponent() {
    //     let data = window.sessionStorage.getItem(this.props.location.key);

    //     // 恢复之前状态
    //     if (data) {
    //         data = JSON.parse(data);
    //         this.state = {
    //             tableData: data.tableData,
    //             isloading: false,
    //             loading:false,// 是否处于首屏加载中
    //         };
    //     } else {
    //         this.state = {
    //             tableData: [],          // 文章列表
    //             isloading: true,
    //             loading:false,// 是否处于首屏加载中
    //         };
    //     }
    // }

    componentDidMount() {
        this.getAllToxData();
    }
    getAllToxData() {
        const { current, pageSize,ac50Sort,resSort } = this.state;
        this.setState({ loading: true })

        fetchAllInfo({ size: pageSize, page: current,ac50Sort:ac50Sort,resSort:resSort}).then(res => {
            this.setState({
                loading: false,
                tableData: res.content,
                total: res.totalElements,
            })
        }) //传的参数
    }

    // componentWillUnmount() {
    //     // 备份当前的页面状态
    //     if (!this.state.loading) {
    //         let data = {
    //             tableData: this.state.tableData,
    //         };
    //         window.sessionStorage.setItem(this.props.location.key, JSON.stringify(data));
    //     } else {
    //         window.sessionStorage.removeItem(this.props.location.key);
    //     }
    // }
    renderSearchForm() {
        const { getFieldDecorator } = this.props.form
        return (
            <React.Fragment>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label={'名称'} className='line' >
                            {getFieldDecorator('name', {
                                rules: [],
                            })(
                                <Input id='name' placeholder="输入CAS号或者英文名称" style={{ width: 300 }} />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
    renderTableData() {
        const { pageSize, current, total, loading } = this.state
        const columns = [
            {
                title: '序列号',
                width: '10%',
                render:(text,record,index)=> `${current*20+index+1}`,
              },
        
            {
                title: '化学物质名称',
                dataIndex: 'chemical',
            },
            {
                title: 'CAS号',
                dataIndex: 'casrn',
            },
            {
                title: '生物检测名称',
                dataIndex: 'assayName',
            },
            {
                title: '生物检测目标',
                dataIndex: 'bioassay',
            },
            {
                title: '检测效应',
                dataIndex: 'effect',
            },
            {
                title: '检测目标类型',
                dataIndex: 'intendedTargetFamily',
            },
            {
                title: '50%的最大生物活性浓度AC50（μM）',
                dataIndex: 'ac50',
                sorter: (a, b) => true,
            },
            {
                title: '操作',
                render: (text, record) => record.hasRes == true ?
                    (<a onClick={() => this.handleClickRow(record)}>查看结果</a>)
                    : null,
            },
        ]
        let dataSource = this.state.tableData
        const paginationProps = {
            pageSize: pageSize,
            current: current + 1,
            total: total,
            onChange: (current) => { this.changePage(current - 1) },
        }
        return (
            <Table
                dataSource={dataSource}
                loading={this.state.loading}
                columns={columns}
                bordered
                onChange={this.handleTableChange}
                pagination={paginationProps}

            />
        )
    }
    handleTableChange= (pagination, filters, sorter) =>{
        const { pageSize, current } = this.state;
        const order=sorter.order;
        const ac50Sort="ac50,"+(order.substr(0,order.indexOf("c")+1)).toUpperCase();
        const resSort="";
        const isAll = this.state.isAll;
        this.setState({
            ac50Sort,
            resSort,
        }, () => { console.log() })
        if(isAll){
            fetchAllInfo({ size: pageSize, page: current,ac50Sort:ac50Sort,resSort:resSort }).then(res => {
                this.setState({
                    loading: false,
                    tableData: res.content,
                    total: res.totalElements,
                })
            }) //传的参数
        
        }else{
        this.props.form.validateFields((err, values) => {
            if (err) { return }
            let items = { name: values.name, page: current, size: pageSize,ac50Sort:ac50Sort,resSort:resSort }
            fetchToxInfo(items).then(res => {
                console.log(res)
                this.setState({
                    loading: false,
                    tableData: res.content,
                    total: res.totalElements,
                })
            })
        })
    }
        
    }

    changePage = (current: number) => {
        const isAll = this.state.isAll;
        if (isAll) {
            this.setState({
                current: current,
            }, () => this.getAllToxData())
        } else {
            this.setState({
                current: current,
            }, () => this.getToxTableData())
        }
    }


    renderBiodetectionTableData() {
        const { biodetectionTableData, bioLoading } = this.state;
        const columns = [
            {
                title: '生物检测信息汇总',
                children: [
                    {
                        title: '生物检测目标类型',
                        dataIndex: 'intendedTargetFamily',
                    },
                    {
                        title: '无生物检测活性数目',
                        dataIndex: 'negative',
                    },
                    {
                        title: '有生物检测活性数目',
                        dataIndex: 'positive',
                    },
                    {
                        title: 'AC50(μM)范围',
                        dataIndex: 'ac50',
                    },
                ]
            },

        ]
        let dataSource = biodetectionTableData

        return (
            <>
                <Table
                    dataSource={dataSource}
                    loading={bioLoading}
                    columns={columns}
                    bordered

                />
                {biodetectionTableData.length > 0 && this.renderGraph()}
            </>
        )
    }


    renderAllTableData() {
        const columns = [
            {
                title: '化学物质生物检测',
                children: [
                    {
                        title: '化学物质名称',
                        dataIndex: 'chemical',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: { rowSpan: row.aoSpan },
                            };
                        },
                    },
                    {
                        title: 'CAS号',
                        dataIndex: 'casrn',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: { rowSpan: row.aoSpan },
                            };
                        },
                    },
                    {
                        title: '生物检测名称',
                        dataIndex: 'assayName',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: { rowSpan: row.aoSpan },
                            };
                        },
                    },
                    {
                        title: '生物检测目标',
                        dataIndex: 'bioassay',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: { rowSpan: row.aoSpan },
                            };
                        },
                    },
                    {
                        title: '检测效应',
                        dataIndex: 'effect',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: { rowSpan: row.aoSpan },
                            };
                        },
                    },
                    {
                        title: '检测目标类型',
                        dataIndex: 'intendedTargetFamily',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: { rowSpan: row.aoSpan },
                            };
                        },
                    },
                    {
                        title: 'AC50(μM)',
                        dataIndex: 'ac50',
                        sorter: (a, b) => a.ac50 - b.ac50,
                        render: (value, row) => {
                            return {
                                children: value,
                                props: { rowSpan: row.aoSpan },
                            };
                        },
                    },
                ]
            },
            {
                title: 'MIE或KE',
                children: [
                    {
                        title: 'ID',
                        dataIndex: 'keId',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: { rowSpan: row.aoSpan },
                            };
                        },
                    },
                    {
                        title: '英文名',
                        dataIndex: 'keTitle',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: { rowSpan: row.aoSpan },
                            };
                        },

                    },
                    {
                        title: '中文名',
                        dataIndex: 'keChinese',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: { rowSpan: row.aoSpan },
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
                        dataIndex: 'aoTitle',
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
                        title: '器官/毒性类型',
                        dataIndex: 'aoOrgan',
                    },
                    {
                        title: '致癌/遗传毒性',
                        dataIndex: 'aoCancer',
                    },
                    {
                        title: '生命周期',
                        dataIndex: 'aolifeCycle',
                    },
                    {
                        title: '生物水平',
                        dataIndex: 'aoLevel',
                    },
                    {
                        title: '距离(KER)',
                        dataIndex: 'distance',
                    },
                ]
            },


        ]
        let dataSource = this.state.allTableData

        return (
            <Table
                dataSource={dataSource}
                loading={this.state.allLoading}
                columns={columns}
                bordered
                scroll={{ x: 1300 }}
            />
        )
    }
    downloadFile = () => {
        const name=this.state.allTableData[0].chemical;
        const cas=this.state.allTableData[0].casrn;
        var filename = cas+"-"+name+".xlsx";
        var filepath = `${serverIP}/result/`+filename;
        document.getElementById("export").setAttribute("href",filepath)
        document.getElementById("export").setAttribute("download",filename)
        document.getElementById("export").click();
    }

    handleClickRow = (record) => {
        var path = "/keao/" + encodeURI(encodeURI(record.bioassay)) + "/" + record.effect;
        this.props.history.push(path);
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    getToxTableData() {
        const { pageSize, current,ac50Sort,resSort } = this.state;
        this.props.form.validateFields((err, values) => {
            if (err) { return }
            let items = { name: values.name, page: current, size: pageSize,ac50Sort:ac50Sort,resSort:resSort  }
            fetchToxInfo(items).then(res => {
                this.setState({
                    loading: false,
                    tableData: res.content,
                    total: res.totalElements,
                })
            })
        })
    }

    handleSearch = () => {
        this.setState({
            isAll: false,
        }, () => { console.log() })
        const { pageSize, current } = this.state;
        //e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) { return }
            this.setState({ loading: true, bioLoading: true, allLoading: true })
            this.getToxTableData();

            fetchToxReport(values.name).then(res => {
                let array = [];
                res.targetFamilyVOList.map(temp => {
                    let ac50 = ""
                    if (temp.lowestAC != undefined || temp.lowestAC != null) {
                        ac50 = temp.lowestAC + "~" + temp.highestAC
                    }
                    array = [
                        ...array,

                        {
                            intendedTargetFamily: temp.intendedTargetFamily,
                            negative: temp.negative,
                            positive: temp.positive,
                            ac50: ac50,

                        }
                    ]
                })
                this.setState({
                    bioLoading: false,
                    biodetectionTableData: array,
                }, () => { this.getChartOption() })


            })
            fetchToxTableAll(values.name).then(res => {
                let arr = [];
                let count = 0;
                const tableSize = 10;
                res.map(temp => {
                    const len = temp.aos.length;
                    temp.aos.map((aoItem, index) => {
                        count = count + 1;
                        let tempSize = index === 0 ? len : 0;
                        if (tempSize === 0 && count % tableSize === 1 && count > tableSize) {
                            tempSize = len - index;
                        }
                        arr = [
                            ...arr,
                            {
                                chemical: temp.tox.chemical,
                                casrn: temp.tox.casrn,
                                assayName: temp.tox.assayName,
                                bioassay: temp.tox.bioassay,
                                effect: temp.tox.effect,
                                intendedTargetFamily: temp.tox.intendedTargetFamily,
                                ac50: temp.tox.ac50,
                                keId: temp.ke.id,
                                keTitle: temp.ke.title,
                                keChinese: temp.ke.chinese,
                                aoId: aoItem.event.id,
                                aoTitle: aoItem.event.title,
                                aoChinese: aoItem.event.chinese,
                                aoSpecies: aoItem.event.species,
                                aoOrgan: aoItem.event.organ,
                                aoCancer: aoItem.event.cancer,
                                aolifeCycle: aoItem.event.lifeCycle,
                                aoLevel: aoItem.event.level,
                                distance: aoItem.distance,
                                aoSpan: tempSize
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
                    allLoading: false,
                    allTableData: tableData,
                })

            })

        })

    }
    getChartOption = () => {
        const { info, biodetectionTableData } = this.state
        var myChart = echarts.init(document.getElementById('graphPanel'))
        let intendedTargetFamilyList = [];
        let negativeList = [];
        let positiveList = [];
        biodetectionTableData.map(temp => {
            if (temp.intendedTargetFamily != '合计') {
                intendedTargetFamilyList.push(temp.intendedTargetFamily)
                negativeList.push(temp.negative)
                positiveList.push(temp.positive)
            }

        })
        let option = {
            title: {
                text: '检测目标类型'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
            },
            legend: {
                data: ['有生物检测活性数目', '无生物检测活性数目']
            },
            xAxis: {},
            yAxis: { data: intendedTargetFamilyList },
            series: [
                {
                    name: '有生物检测活性数目',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            position: 'insideRight'
                        }
                       
                    },
                    itemStyle:{
                        color:  'rgb(112,166,172)',
                    },
                    data: positiveList,

                },
                {
                    name: '无生物检测活性数目',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            position: 'insideRight'
                        }
                    },
                    itemStyle:{
                        color:  'rgb(173,173,173)',
                    },
                    data: negativeList,
                },

            ]
        }
        myChart.setOption(option)
    }

    handleClickFun = (e, link) => {
        e.preventDefault();
        if (link.href) {
            // 找到锚点对应得的节点
            let element = document.getElementById(link.href);
            // 如果对应id的锚点存在，就跳滚动到锚点顶部
            element && element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    };
    renderGraph() {
        return <div className="graphPanel" id="graph">
            <div id="graphPanel" style={{ width: '100%', height: 600 }}></div>
        </div>
    }

    render() {
        return (
            <div className="container" id="wholePage">
               
                <div className="search" id="search">
                    <Form className='ant-advanced-search-form' >
                        <h3>化学物质搜索</h3>
                        {this.renderSearchForm()}
                    </Form>
                    <div style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.handleSearch}>查询</Button>
                        <Button style={{ marginLeft: 14, marghtRight: 30 }} onClick={this.handleReset}>
                            清除
                        </Button>
                        
                    </div>
                    <div >
                            <h4 style={{ marginBottom: 10 }}>快速到达：</h4>
                            <Anchor onClick={this.handleClickFun} getContainer={() => document.getElementById('wholePage')} affix={false}>
                                <Link href="search" title="化学物质搜索" />
                                <Link href="detection_gather" title="生物检测信息汇总" />
                                <Link href="detection_info" title="生物检测详情" />
                                <Link href="toxicity_prediction" title="毒性预测" />
                            </Anchor>
                        </div>
                </div>
                <div className="dataContent" id="detection_gather">
                    <h3>生物检测信息汇总</h3>
                    {this.renderBiodetectionTableData()}
                </div>
                <div className="dataContent" id="detection_info">
                    <h3>生物检测详情</h3>
                    {this.renderTableData()}
                </div>
                <div className="dataContent" id="toxicity_prediction">
                    <h3>毒性预测</h3>
                    <div style={{ textAlign: 'right',marginBottom:20 }}>
                        <Button type="primary"  onClick={this.downloadFile} >导出数据</Button>
                        <a id="export" type="hidden" download="" href="" ></a>
                    </div>
                    {this.renderAllTableData()}
                </div>
                <BackTop/>
            </div>
        )
    }
}
export default Form.create()(SingleForcast)