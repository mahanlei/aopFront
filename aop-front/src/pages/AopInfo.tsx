import React from 'react'
import {  Select } from 'antd'
import { ke_attr } from '../utils/ChAndEn.js'
import { fetchAopInfo, fetchAopNodes } from '../services/AopService'
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
                '器官': '',
                '癌症': '',
                '存活率': '',
                '生物水平': '',
            },
            nodeLinks: [],
            nodes:[],
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
        let nodeTemp=[]
        let linkTemp=[]

        fetchAopNodes(eid).then(res =>{
            console.log('res', res)
            res.map((item,k) => {
                let xp= k*50+50
                // if(k == res.length-1){
                    let node1 = {name: `${item.sourceId}`,x: xp, y:'200', tooltip: `${item.sourceId}: ${item.sourceTitle}`}
                    let node2 = {name: `${item.targetId}`,x: xp, y:'270', tooltip: `${item.targetId}: ${item.targetTitle}`}
                    let hasNode1 = nodeTemp.find(v => v.name == item.sourceId)
                    if(hasNode1 == undefined){ 
                    nodeTemp.push(node1)
                    }
                    let hasNode2 = nodeTemp.find(v => v.name == item.targetId)
                    if(hasNode2 == undefined){
                    nodeTemp.push(node2)
                    }
                // } else if(k == 0){
                //     let node = {name: `MIE: ${item.sourceId}`,x: xp, y:'300',value: item.sourceId}
                //     nodeTemp.push(node)
                // }else{
                //     let node = {name: `KE:${item.sourceId}`,x: xp, y:'300',value: item.sourceId}
                //     nodeTemp.push(node)
                // }
                let link = {source: node1.name, target: node2.name}
               linkTemp.push(link)
            })
            this.setState({
                nodeLinks: linkTemp,
                nodes: nodeTemp,
            }, () => {  console.log('nodes', this.state.nodes);this.getChartOption()})
        })
      
    }
   
    getChartOption = () => {
        var myChart = echarts.init(document.getElementById('graphPanel'))
        let option = {
            title: {
                text: 'AOP链图'
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
                {
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 50,
                    symbol:'circle',
                    roam: true,
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
        return <div className="infoCon">
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
    renderGraph = () =>{
return <div className="graphPanel">
<div id="graphPanel" style={{width: '100%', height: 400}}></div>
</div>
    }
    render() {
        return (<div className="container">
            {this.renderAopInfo()}
            {this.renderGraph()}
        </div>)
    }
}
export default AopInfo