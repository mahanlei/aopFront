import React from 'react'
import './DashBoard.less'
import { Collapse } from 'antd';
import {
    Link,
  } from "react-router-dom";
const { Panel } = Collapse;
class Dashboard extends React.Component {

    render() {
        const WhatIsaAop = () => {
            return <div>aAOP是基于<a href="https://aopkb.oecd.org/">AOP知识库</a>与<a href="https://tox21.gov/">Tox21</a>化学品的体外生物检测信息，汇编了超过4000种化学品的共800余种的生物检测方法信息，并将这些信息与超过250条AOPs建立联系的AOP应用型网站。</div>
        }
        const aAOPTodo = () => {
            return <ol>
                <li>获取AOP的组成及适用生物的属性信息</li>
                <p>用户可通过检索感兴趣的AOP，KE，KER，获取其包括名称，适用生物的物种，性别，生命周期等在内的信息，并通过可视化直观了解AOP的组成信息。</p>
                <li>获取MIE的体外生物检测方法的信息</li>
                <p>用户可通过检索感兴趣的MIE，获取其适用的体外生物检测对象，检测效应等信息。</p>
                <li>获取4000余种化学品的体外生物检测方法信息</li>
                <p>用户可通过检索感兴趣的化学品，获取适用的体外生物检测方法详细信息。</p>
                <li>获取200余种AO或感兴趣的毒性类型的潜在压力源信息</li>
                <p>用户通过检索AO或对不同毒性类型进行筛选，就获取可潜在性诱导AO或该毒性类型的化学品信息。</p>
            </ol>
        }
        const aAOPUser = () => {
            return <ol>
                <li>环境工作者、毒理学家等专业人士</li>
                <p>从事环境或毒理学研究的专业人士可通过aAOP了解AOP基本信息，感兴趣的化学品与AOP之间的联系，可为化学品的毒理学机制研究提供证据及建议。</p>
                <li>环境管理人员</li>
                <p>从事环境管理的人员可通过aAOP获取可潜在性引发AO或某种毒性类型的压力源信息，根据不同的保护目标筛选出应优先控制或重点关注的高风险化学品。</p>
                <li>普通群众</li>
                <p>对化学品安全感兴趣的普通群众可从aAOP获取到化学品潜在毒害效应信息。</p>
            </ol>
        }
        return <div style={{ backgroundColor: "#FFF", padding: "20px 30px" }}>
            <h2>欢迎使用application  Adverse Outcome Pathway aAOP,如需帮助请联系我们！</h2>
            <p>生态环保部固体废物与化学品管理技术中心    <span style={{color: "#1890ff"}}>yuyang@meescc.cn</span> </p>
            <p> 南京大学环境学院  <span style={{color: "#1890ff"}}> gouxiaonju@163.com </span></p>
            <div className="opeLine">
                <div className="circle" style={{ backgroundColor: "rgb(220,237,208)" }}><Link to="/aops">AOP信息检索</Link></div>
                <div className="circle" style={{ backgroundColor: "rgb(255,240,193)" }}><Link to="/singleForcast">化学品毒性预测</Link></div>
                <div className="circle" style={{ backgroundColor: "rgb(215,230,245)" }}><Link to="/environment">环境诊断</Link></div>
                <div className="circle" style={{ backgroundColor: "rgb(248,223,205)",color: "#1890ff" }} >下载</div> 
                {/* TODO 下载事件 */}
            </div>
            <h2>关于aAOP</h2>
            <Collapse defaultActiveKey={['1']} bordered={false} >
                <Panel header="什么是aAOP？" key="1">
                    <p>{WhatIsaAop()}</p>
                </Panel>
                <Panel header="为什么要建立aAOP？" key="2">
                    <p>AOP概念的提出为毒理学研究提供了基本的模式框架，也为化学品的毒性效应识别提供了一种跨物种，具有化学品非特异性的贯穿全生物水平的研究方法。aAOP网站的建立旨在通过Toxcast化学品与AOP内MIE的生物检测信息比对，建立化学品与AOP之间的联系，预测化学品可潜在性引发的AOP及毒害效应，为化学品的毒性效应识别及管控提供建议与证据。</p>
                </Panel>
                <Panel header="aAOP可以用来做什么？" key="3">
                    <p>{aAOPTodo()}</p>
                </Panel>
                <Panel header="哪些群体可能会使用aAOP？" key="4">
                    <p>{aAOPUser()}</p>
                </Panel>
            </Collapse>
            <h2>帮助</h2>
            <p>请查看用户使用说明</p>
        </div>
    }
}
export default Dashboard