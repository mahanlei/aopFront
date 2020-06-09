import React from 'react'
import { Select } from 'antd'
import { ke_attr } from '../utils/ChAndEn.js'
import { fetchAopInfo, fetchAopNodes, fetchAopEdges } from '../services/AopService'
import './AopInfo.less'
import echarts from 'echarts'
const { Option, OptGroup } = Select
class AopInfo extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            info: {
                'ID': '',
                '名称': '',
                '中文名': '',
                '物种': '',
                '性别': '',
                '生命阶段': '',
                '器官/毒性类型': '',
                '致癌/遗传毒性': '',
                // '存活率': '',
                '生物水平': '',
            },
            nodeLinks: [],
            nodes: [],
        }
    }
    componentDidMount() {
        const eid = window.location.hash.split('/')[2]
        //   this.props.history.location.p
        this.setState({
            relativeAopsLoading: true,
            bioassaysLoading: true,
        })
        fetchAopInfo(eid).then(res => {
            let tempInfo = this.state.info
            for (var i in tempInfo) {
                tempInfo[i] = res[ke_attr[i]]
            }
            tempInfo['名称'] = res.title
            tempInfo['中文名'] = res.chinese
            tempInfo['ID'] = eid
            this.setState({
                info: tempInfo
            })
        })
        let nodeTemp = []
        let linkTemp = []
        fetchAopNodes(eid).then(res => {
            res.map((item, k) => {
                let nodeSymbol = this.getNodeSymbol(item, k)
                let node = { name: nodeSymbol.name, title: item.name, chinese: item.chinese, symbol: nodeSymbol.type, category: nodeSymbol.category, itemStyle: nodeSymbol.itemStyle }
                nodeTemp.push(node)
                this.setState({
                    nodes: nodeTemp,
                })
            })
            fetchAopEdges(eid).then(res1 => {
                res1.map((item1, k) => {
                    // let xp= k*50+50
                    // if(k == res.length-1){
                    // let node1 = {name: `${item.sourceId}`,x: xp, y:'200', tooltip: `${item.sourceId}: ${item.sourceTitle}`}
                    // let node2 = {name: `${item.targetId}`,x: xp, y:'270', tooltip: `${item.targetId}: ${item.targetTitle}`}
                    // let hasNode1 = nodeTemp.find(v => v.name == item.sourceId)
                    // if(hasNode1 == undefined){ 
                    // nodeTemp.push(node1)
                    // }
                    // let hasNode2 = nodeTemp.find(v => v.name == item.targetId)
                    // if(hasNode2 == undefined){
                    // nodeTemp.push(node2)
                    // }
                    // } else if(k == 0){
                    //     let node = {name: `MIE: ${item.sourceId}`,x: xp, y:'300',value: item.sourceId}
                    //     nodeTemp.push(node)
                    // }else{
                    //     let node = {name: `KE:${item.sourceId}`,x: xp, y:'300',value: item.sourceId}
                    //     nodeTemp.push(node)
                    // }
                    //TODO 节点的中文名
                    let sourceNode = nodeTemp.find(v => v.name.split(':')[1] == item1.sourceId)
                    let targetNode = nodeTemp.find(v => v.name.split(':')[1] == item1.targetId)
                    let link = { source: `${sourceNode.name}`, target: `${targetNode.name}` }
                    linkTemp.push(link)
                })
                this.setState({
                    nodeLinks: linkTemp,
                    nodes: nodeTemp,
                }, () => { this.getChartOption() })
            })
        })


    }
    getNodeSymbol = (item, k) => {
        switch (item.type) {
            case 'MolecularInitiatingEvent':
                return {
                    name: `MIE: ${item.eventId}`,
                    type: 'roundRect',
                    itemStyle: {
                        color: 'rgb(249,215,73)',
                    },
                    category: 'MIE',
                }
            case 'KeyEvent':
                return {
                    name: `KE: ${item.eventId}`,
                    type: 'circle',
                    itemStyle: {
                        color: 'rgb(55,131,148)'
                    },
                    category: 'KE',
                }
            case 'AdverseOutcome':
                return {
                    name: `AO: ${item.eventId}`,
                    type: 'triangle',
                    itemStyle: {
                        color: 'rgb(239,109,76)'
                    },
                    category: 'AO',
                }
        }
    }
    getChartOption = () => {
        const { info } = this.state
        var myChart = echarts.init(document.getElementById('graphPanel'))
        const categorys = [
            {
                name: 'MIE',
                icon: 'roundRect',
                itemStyle: {
                    color: 'rgb(249,215,73)',
                },
            },
            {
                name: 'KE',
                icon: 'circle',
                itemStyle: {
                    color: 'rgb(55,131,148)'
                },
            }, {
                name: 'AO',
                icon: 'triangle',
                itemStyle: {
                    color: 'rgb(239,109,76)'
                },
            }
        ]
        let option = {
            title: {
                text: info['中文名']
            },
            tooltip: {
                formatter: function (x) {
                    return x.data.title + "<br/>"+ x.data.chinese;
                }
            },
            legend: [{
                data: categorys,
                bottom: 0,
                right: 0,
            }],
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    type: 'graph',
                    layout: 'circular',
                    symbolSize: 50,
                    roam: true,
                    categories: categorys,
                    label: {
                        normal: {
                            show: true,
                        }
                    },
                    edgeSymbol: ['none', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        normal: {
                            textStyle: {
                                fontSize: 20
                            }
                        }
                    },
                    data: this.state.nodes,
                    // links: [],
                    links: this.state.nodeLinks,
                    lineStyle: {
                        normal: {
                            opacity: 0.9,
                            width: 2,
                            curveness: 0
                        }
                    }
                }
            ]
        }
        myChart.setOption(option)
    }
    renderAopInfo = () => {
        const { info } = this.state

        let infoList = []
        for (var attr in info) {
            if (info[attr]) {
                infoList.push({ 'key': attr, 'value': info[attr] })
            }
        }
        return <div className="aopInfoCon">
            <h3 style={{ marginBottom: '18px' }}>属性信息</h3>
            {infoList.map(v => {
                return (<div className="item">
                    <div className="attrLabel">{v.key}:</div>
                    <div className="attrValue">{v.value}</div>
                </div>)
            })
            }
        </div>
    }
    renderGraph = () => {
        return <div className="graphPanel">
            <div id="graphPanel" style={{ width: '100%', height: 400 }}></div>
        </div>
    }
    render() {
        return (<div className="aopInfocontainer">
            {this.renderAopInfo()}
            {this.renderGraph()}
        </div>)
    }
}
export default AopInfo