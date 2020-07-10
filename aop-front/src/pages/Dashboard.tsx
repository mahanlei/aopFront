import React, { unstable_Profiler } from 'react'
import './DashBoard.less'
import { Collapse, Button } from 'antd';
import {
    Link,
} from "react-router-dom";
const { Panel } = Collapse;
import { serverIP } from "../utils/GlobalConstants"

class Dashboard extends React.Component {

    downloadZip = () => {
        fetch(`${serverIP}/api/download/zip`, {
            method: 'GET',
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then(res => res.blob()).then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `数据文件.zip`
            a.click()
            window.URL.revokeObjectURL(url)
        }).catch((err) => {
            return err
        })
    }

    downloadHelp = () => {
        fetch(`${serverIP}/api/download/instruction`, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-type': 'application/json',
            }),
        }).then(res => res.blob()).then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = '用户使用说明.pdf'
            a.click()
            window.URL.revokeObjectURL(url)
        }).catch((err) => {
            return err
        })
    }

render() {
    const WhatIsaAop = () => {
        return <div>aAOP是基于<a href="https://aopwiki.org/">AOP知识库</a>与<a href="https://comptox.epa.gov/dashboard">现有化学物质的体外生物检测信息</a>化学品的体外生物检测信息，前期汇编了101种化学物质的共1000余种的生物检测方法信息，并将这些信息与超过250条AOPs建立联系的AOP应用型网站。</div>
    }
    const WhyAop = () => {
        return <div>AOP概念的提出为毒理学研究提供了基本的模式框架，也为化学物质的毒性效应识别提供了一种跨物种，具有化学物质非特异性的贯穿全生物水平的研究方法。aAOP网站的建立旨在通过Toxcast化学物质与AOP内MIE的生物检测信息比对，建立化学物质与AOP之间的联系，预测化学物质可潜在性引发的AOP及毒害效应，为化学物质的毒性效应识别及管控提供建议与证据。 </div>
    }
    const aAOPTodo = () => {
        return <ol>
            <li>获取AOP的组成及适用生物的属性信息</li>
            <p>用户可通过检索感兴趣的AOP，KE，KER，获取其包括名称，适用生物的物种，性别，生命周期等在内的信息，并通过可视化直观了解AOP的组成信息。</p>
            <li>获取MIE的体外生物检测方法的信息</li>
            <p>用户可通过检索感兴趣的MIE，获取其适用的体外生物检测对象，检测效应等信息。</p>
            <li>获取101种化学物质的体外生物检测方法信息及可潜在性诱导AOP信息</li>
            <p>用户可通过检索感兴趣的化学物质，获取适用的体外生物检测方法详细信息，以及可潜在性引发的AOP信息。</p>
            <li>获取3000余种化学物质的体外生物检测方法信息及可潜在性诱导AOP信息（待开发）</li>
            <p>用户可通过检索感兴趣的化学物质，获取适用的体外生物检测方法详细信息，以及可潜在性诱导的AOP信息。</p>
            <li>获取200余种AO或感兴趣的毒性类型的潜在压力源信息（待开发）</li>
            <p>用户通过检索AO或对不同毒性类型进行筛选，就获取可潜在性诱导AO或该毒性类型的化学物质信息。。</p>
        </ol>
    }
    const aAOPUser = () => {
        return <ol>
            <li>环境工作者、毒理学家等专业人士</li>
            <p>从事环境或毒理学研究的专业人士可通过aAOP了解AOP知识库基本信息与感兴趣的化学物质与AOP之间的关系，可为化学物质的毒理学机制研究提供证据及建议。</p>
            <li>环境管理人员</li>
            <p>从事环境管理的人员可通过aAOP获取基于AOP框架的化学物质人体健康及生态环境风险信息，筛选出应优先控制或重点关注的高风险化学物质。</p>
            <li>普通群众</li>
            <p>对化学品安全感兴趣的普通群众可从aAOP获取到化学物质潜在毒害效应信息。</p>
        </ol>
    }
    return <div style={{ backgroundColor: "#FFF", padding: "20px 30px" }}>
        <h2>欢迎使用application  Adverse Outcome Pathway aAOP,如需帮助请联系我们！</h2>
        <p> 南京大学环境学院  <span style={{ color: "#1890ff" }}> gouxiaonju@163.com </span></p>
        <p>生态环保部固体废物与化学品管理技术中心    <span style={{ color: "#1890ff" }}>yuyang@meescc.cn</span> </p>  
        <div className="opeLine">
            <div className="circle" style={{ backgroundColor: "rgb(220,237,208)" }}><Link to="/aops">AOP信息检索</Link></div>
            <div className="circle" style={{ backgroundColor: "rgb(255,240,193)" }}><Link to="/singleForcast">化学品毒性预测</Link></div>
            <div className="circle" style={{ backgroundColor: "rgb(203,203,204)" }}><Link style={{color: "grey"}}>环境诊断</Link></div>
            <div className="circle" style={{ backgroundColor: "rgb(248,223,205)", color: "#1890ff" }} onClick={this.downloadZip}>下载</div>
            {/* TODO 下载事件 */}
        </div>
        <h2>关于aAOP</h2>
        <Collapse defaultActiveKey={['1']} bordered={false} >
            <Panel header="什么是aAOP？" key="1">
                <p>{WhatIsaAop()}</p>
            </Panel>
            <Panel header="为什么要建立aAOP？" key="2">
                <p>{WhyAop()}</p>
            </Panel>
            <Panel header="aAOP可以用来做什么？" key="3">
                <p>{aAOPTodo()}</p>
            </Panel>
            <Panel header="哪些群体可能会使用aAOP？" key="4">
                <p>{aAOPUser()}</p>
            </Panel>
        </Collapse>
        <h2>帮助</h2>
        <Button type="link" onClick={this.downloadZip}>下载用户使用说明</Button>
    </div>
}
}
export default Dashboard