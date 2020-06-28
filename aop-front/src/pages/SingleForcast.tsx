import React from 'react'
import { Input, Row, Col, Form, Button, Table } from 'antd'
import './SingleForcast.less'
import {fetchToxInfo,fetchAllInfo,fetchToxReport,fetchToxTableAll} from '../services/SingleForcast'
import echarts from 'echarts'
// import echarts from 'echarts'
class SingleForcast extends React.Component<any,any> {
    constructor(props) {
        super(props)
        // this.tryRestoreComponent();
        // this.itemsChanged = false;  // 本次渲染是否发生了文章列表变化，决定iscroll的refresh调用
        this.state = {
            loading: false,
            tableData: [],
            biodetectionTableData: [],
            bioLoading:false,
            allTableData:[],
            allLoading:false,
            isAll:true,
            current: 0,
            pageSize: 20,
            total: 0,
            load:true,
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
      getAllToxData(){
        const { current, pageSize} = this.state;
        console.log(current+" "+pageSize);
        this.setState({ loading: true })
        fetchAllInfo({ size: pageSize, page: current }).then(res => {
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
                        <Form.Item label={'名称'} className='line'>
                            {getFieldDecorator('name', {
                                rules: [],
                            })(
                                <Input placeholder="输入CAS号或者英文名称" style={{ width: 300 }} />
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

            // {
            //     title: 'ID',
            //     dataIndex: 'id',
            // },
            {
                title: '化学品名称',
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
                title: 'AC50(μM)',
                dataIndex: 'ac50',
                sorter: (a, b) => a.ac50 - b.ac50,
            },
            {
                title:'操作',
                render: (text, record) =>record.hasRes==true ? 
                (<a onClick={()=>this.handleClickRow(record)}>查看结果</a>) 
                : null,
            },
        ]
        let dataSource = this.state.tableData
        const paginationProps = {
            pageSize: pageSize,
            current: current + 1,
            total: total,
            onChange: (current) => {this.changePage(current - 1)},
          }
        return (
            <Table
                dataSource={dataSource}
                loading={this.state.loading}
                columns={columns}
                bordered
                pagination={paginationProps}
                
            />
        )
    }

    changePage = (current: number) => {
        const isAll=this.state.isAll;
        if(isAll){
            console.log(isAll)
            this.setState({
                current: current,
              },() => this.getAllToxData())
        }else{
        this.setState({
          current: current,
        },() => this.getToxTableData())
        }
      }


    renderBiodetectionTableData() {
        const columns = [
            {
                title: '生物检测信息汇总',
                children:[
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
        let dataSource = this.state.biodetectionTableData
        
        return (
            <Table
                dataSource={dataSource}
                loading={this.state.bioLoading}
                columns={columns}
                bordered
                
            />
        )
    }


    renderAllTableData() {
        const columns = [
            {
                title: '化学品生物检测',
                children:[
                    {
                        title: '化学品名称',
                        dataIndex: 'chemical',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: {rowSpan:row.aoSpan},
                            };
                        },
                    },
                    {
                        title: 'CAS号',
                        dataIndex: 'casrn',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: {rowSpan:row.aoSpan},
                            };
                        },
                    },
                    {
                        title: '生物检测名称',
                        dataIndex: 'assayName',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: {rowSpan:row.aoSpan},
                            };
                        },
                    },
                    {
                        title: '生物检测目标',
                        dataIndex: 'bioassay',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: {rowSpan:row.aoSpan},
                            };
                        },
                    },
                    {
                        title: '检测效应',
                        dataIndex: 'effect',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: {rowSpan:row.aoSpan},
                            };
                        },
                    },
                    {
                        title: '检测目标类型',
                        dataIndex: 'intendedTargetFamily',
                        render: (value, row) => {
                            return {
                                children: value,
                                props: {rowSpan:row.aoSpan},
                            };
                        },
                    },
                    {
                        title: 'AC50(μM)',
                        dataIndex: 'ac50',
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
                title: 'MIE或KE',
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


    

    handleClickRow = (record) => {
        var path="/keao/"+encodeURI(encodeURI(record.bioassay))+"/"+record.effect;
        this.props.history.push(path);
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    getToxTableData(){
        const { pageSize, current } = this.state;
        this.props.form.validateFields((err, values) => {
            if (err) { return }
        let items = {name:values.name, page: current, size: pageSize }
        fetchToxInfo(items).then(res => {
            this.setState({
                loading: false,
                tableData: res.content,
                total:res.totalElements,
            })
        })
        }) 
    }

    handleSearch = () => {
        this.setState({
            isAll:false,
        },()=>{console.log()})
        const { pageSize, current } = this.state;
        //e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) { return }
            this.setState({ loading: true,bioLoading:true,allLoading:true })
            this.getToxTableData();
            
            fetchToxReport(values.name).then(res => {
                let array = [];
                res.targetFamilyVOList.map(temp=>{
                    let ac50=""
                    if(temp.lowestAC!=undefined||temp.lowestAC!=null){
                        ac50=temp.lowestAC+"~"+temp.highestAC
                    }
                    array=[
                        ...array,

                        {
                            intendedTargetFamily:temp.intendedTargetFamily,
                            negative:temp.negative,
                            positive:temp.positive,
                            ac50:ac50,

                        }
                    ]
                })
                this.setState({
                    bioLoading: false,
                    biodetectionTableData: array,
                },() => { this.getChartOption() })
                

            }) 
            fetchToxTableAll(values.name).then(res => {
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
                            chemical:temp.tox.chemical,
                            casrn:temp.tox.casrn,
                            assayName:temp.tox.assayName,
                            bioassay:temp.tox.bioassay,
                            effect:temp.tox.chemical,
                            intendedTargetFamily:temp.tox.intendedTargetFamily,
                            ac50:temp.tox.ac50,
                            keId:temp.ke.id,
                            keTitle:temp.ke.title,
                            keChinese:temp.ke.chinese,
                            aoId:aoItem.event.id,
                            aoTitle:aoItem.event.title,
                            aoChinese:aoItem.event.chinese,
                            aoSpecies:aoItem.event.species,
                            aoOrgan:aoItem.event.organ,
                            aoCancer:aoItem.event.cancer,
                            aolifeCycle:aoItem.event.lifeCycle,
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
                allLoading: false,
                allTableData: tableData,
            })
            
            }) 
        
        })

    }
    getChartOption = () => {
        const { info } = this.state
        var myChart = echarts.init(document.getElementById('graphPanel'))
        let intendedTargetFamilyList=[];
        let negativeList=[];
        let positiveList=[];
        this.state.biodetectionTableData.map(temp=>{
            if(temp.intendedTargetFamily!='合计'){
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
                data: ['无生物检测活性数目', '有生物检测活性数目']
            },
            xAxis: {},
            yAxis: {data: intendedTargetFamilyList},
            series: [
                {
                name:'无生物检测活性数目',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        position: 'insideRight'
                    }
                },
                data: negativeList,
                },
                {
                    name:'有生物检测活性数目',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            position: 'insideRight'
                        }
                    },
                    data: positiveList,

                },
        ]
        }
        myChart.setOption(option)
    }

    renderGraph(){
        return <div className="graphPanel">
            <div id="graphPanel" style={{ width: '100%', height: 600 }}></div>
        </div>
    }

    render() {

        return (
            <div className="container">
                <div className="search">
                    <Form className='ant-advanced-search-form' >
                        <h3 style={{ marginBottom: '18px' }}>化学品搜索</h3>
                        {this.renderSearchForm()}
                    </Form>
                    <div style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.handleSearch}>查询</Button>
                        <Button style={{ marginLeft: 14, marghtRight: 30 }} onClick={this.handleReset}>
                            清除
                        </Button>
                    </div>
                </div>

                <div className="dataContent">
                    <h3 style={{ marginBottom: '18px' }}>搜索结果</h3>
                    {this.renderTableData()}
                    
                  
                </div>
                <div className="dataContent">
                    {this.renderBiodetectionTableData()}
                </div>

                {this.renderGraph()}

                <div className="dataContent">
                    {this.renderAllTableData()}
                </div>
            </div>

        )
    }
}
export default Form.create()(SingleForcast)