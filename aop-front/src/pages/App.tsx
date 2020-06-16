import React from "react";
import {
  BrowserRouter as Router, IndexRoute,
  Switch,
  Route,
  Link,
  withRouter,
  Redirect

} from "react-router-dom";
import { Menu, Icon, Layout, Button } from 'antd'
import Search from './search/Search'
import EdgeSearch from './search/EdgeSearch'
import EventInfo from './EventInfo'
import AopInfo from './AopInfo'
import SingleForcast from './SingleForcast'
import Dashboard from './Dashboard'
import './App.less'
import KeAoInfo from "./KeAoInfo";
import { EnvironmentPlugin } from "webpack";
import Environment from "./Environment";
import AopList from "./AopList";
import AopChemicalInfo from "./AopChemicalInfo";
import sccIcon from '../images/scc-icon.png';
import njuEnvIcon from '../images/nju-env-icon.jpeg';
const { SubMenu } = Menu
const { Header, Content, Footer } = Layout;
@withRouter

class App extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {
      current: '',
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        current: this.props.location.pathname.split('/')[1],
      })
    }
  }
  handleClick = (e) => {
    this.setState({
      current: e.keyPath[0],
    })
    this.props.history.push({ pathname: `/${e.keyPath[0]}` })
  }
  render() {
    return (
      // <Router>
      <div className='app'>
        <Layout>
          <Header>
            <div className="logo" ><Link to="/">aAOP</Link></div>
            <Menu
              onClick={this.handleClick}
              theme="dark"
              mode="horizontal"
              style={{ paddingLeft: '4%', height: 60, fontSize: 18, lineHeight: '60px' }}
              selectedKeys={[this.state.current]}
            >
              <SubMenu title={<div style={{ display: 'flex', top: -10 }}>
                <Icon type="search" id="searchIcon" />
            搜索</div>}
                key="search">
                <Menu.Item key="events">KE</Menu.Item>
                <Menu.Item key="edges">KER</Menu.Item>
                <Menu.Item key="aops">AOP</Menu.Item>
              </SubMenu>
              <Menu.Item key="singleForcast" style={{ height: 60 }}>
                化学品毒性预测
              </Menu.Item>
              {/* <Menu.Item key="environment" style={{ height: 60 }}>
                环境诊断
              </Menu.Item> */}
            </Menu>
          </Header>
          <Content>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <div style={{ backgroundColor: 'rgb(244,245,246)', height: '100vh', overflow: 'scroll' }} >
              <Switch>
                <Route path="/" component={Dashboard} exact />
                <Route path="/edges" component={EdgeSearch} />
                <Route path="/events" exact component={Search} />
                <Route path="/aops" component={Search} />
                <Route path="/event/:eventId" component={EventInfo} />
                <Route path="/aop/:aopId" component={AopInfo} />
                <Route path="/singleForcast" component={SingleForcast} />
                <Route path="/keao/:bioassay/:effect" component={KeAoInfo} />
                <Route path="/environment" component={Environment} />
                <Route path="/aopList/:aoId" component={AopList} />
                <Route path="/aopChemicalInfo" component={AopChemicalInfo} />
              </Switch>
            </div>
          </Content>
          <Footer style={{backgroundColor: "#FFF"}}>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: 105 }}>
                <img src={sccIcon} width="36px" height="36px" style={{ marginRight: 6 }} />
                <span style={{ fontWeight: 500 }}>生态环境部固体废物与化学品管理技术中心</span>
              </div>
              <img src={njuEnvIcon} width={160} style={{ marginTop: "-4px" }} />
            </div>
            <p style={{ marginTop: 9 }}>aAOP网站由生态环境部固体废物与化学品管理技术中心资助，由南京大学环境学院生态毒理与健康风险团队负责完成。</p>
          </Footer>
        </Layout>
      </div>

      // </Router>
    )
  }
}

export default App