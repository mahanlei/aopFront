import React from 'react'
import { Input, Select, Row, Col, Icon, Form, Button, Table } from 'antd'
import { ke_attr } from '../utils/ChAndEn.js'
import { fetchEventRelativeAops, fetchEventBioassaysInfo, fetchEventInfo } from '../services/EventService.js'
import { keColumns } from '../pages/search/Search'
import './EventInfo.less'
const { Option, OptGroup } = Select
class EventInfo extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            info: {
                'ID': '',
                '名称': '',
                '中文名': '',
                '物种': '',
                '性别': '',
                '生命周期': '',
                '器官/毒性类型': '',
                '癌症/致命毒性': '',
                // '存活率': '',
                '生物水平': '',
            },
            relativeAops: [],
            relativeAopsLoading: false,
            bioassays: [],
            bioassaysLoading: false,
        }
    }
    componentDidMount() {
        const eid = window.location.hash.split('/')[2]
        //   this.props.history.location.p
        this.setState({
            relativeAopsLoading: true,
            bioassaysLoading: true,
        })
        fetchEventInfo(eid).then(res => {
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
        fetchEventRelativeAops(eid).then(res => {
            this.setState({
                relativeAops: res,
                relativeAopsLoading: false,
            })
        })
        fetchEventBioassaysInfo(eid).then(res => {
            this.setState({
                bioassays: res,
                bioassaysLoading: false,
            })
        })
    }
    renderEventInfo = () => {
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
    handleClickRow = (record) => {
        this.props.history.push(`/aop/${record.id}`)
    }
    renderBioassays() {
        const { bioassays } = this.state
        const bioCloumns = [
            {
                title: '名称',
                dataIndex: 'bioassayName',
            },
            {
                title: '影响',
                dataIndex: 'effect',
            }
        ]
        return (<div className="biosCon">
            <h3 style={{ marginBottom: '18px' }}>相关的生物检测信息</h3>
            <Table dataSource={bioassays}
                loading={this.state.bioassaysLoading}
                columns={bioCloumns}
                bordered
            />
        </div>
        )
    }
    renderRelativeAops() {
        const { relativeAops } = this.state
        let dataSource = []
        for (let i = 0; i < relativeAops.length; i++) {
            dataSource.push({
                key: i,
                ...relativeAops[i]
            })
        }
        return (<div className="aopsCon">
            <h3 style={{ marginBottom: '18px' }}>相关的AOP信息</h3>
            <Table dataSource={dataSource}
                loading={this.state.relativeAopsLoading}
                columns={keColumns}
                bordered
                onRowClick={record =>
                    this.handleClickRow(record)
                } />
        </div>
        )
    }

    render() {
        return (<div className="container">
            <div style={{display: 'flex', justifyContent: 'space-between',marginBottom: 25}}>
            {this.renderEventInfo()}
            {this.renderBioassays()}
            </div>
            {this.renderRelativeAops()}
        </div>)
    }
}
export default EventInfo