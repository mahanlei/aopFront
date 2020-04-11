import React from "react";
import {
  BrowserRouter as Router, IndexRoute,
  Switch,
  Route,
  Link,
  withRouter,
  Redirect

} from "react-router-dom";
import { Menu,Icon } from 'antd'
import Search from './search/Search'
import EdgeSearch from './search/EdgeSearch'
import EventInfo from './EventInfo'
import AopInfo from './AopInfo'
import SingleForcast from './SingleForcast'
import Dashboard from './Dashboard'
import './App.less'
import KeAoInfo from "./KeAoInfo";
import {EnvironmentPlugin} from "webpack";
import Environment from "./Environment";
import AopList from "./AopList";
import AopChemicalInfo from "./AopChemicalInfo";
const { SubMenu } = Menu
@withRouter

class App extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {
      current: 'singleForcast',
    }
  }
componentDidUpdate(prevProps, prevState){
  if(this.props.location.pathname !== prevProps.location.pathname){
    console.log('ddd',this.props.location.pathname.split('/')[1])
    this.setState({
      current: this.props.location.pathname.split('/')[1] || 'singleForcast',
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

        <Menu
          onClick={this.handleClick}
          theme="dark"
          mode="horizontal"
          style={{ paddingLeft: '10%', height: 60, fontSize: 18, lineHeight: '60px' }}
          selectedKeys={[this.state.current]}
        >
          <SubMenu title={<div style={{display: 'flex', top: -10}}>
            <Icon type="search" id="searchIcon"/>
            搜索</div>} 
            key="search">
            <Menu.Item key="events">KE</Menu.Item>
            <Menu.Item key="edges">KER</Menu.Item>
            <Menu.Item key="aops">AOP</Menu.Item>
          </SubMenu>
          <Menu.Item key="singleForcast" style={{height: 60}}>
            单一毒性预测
          </Menu.Item>
          <Menu.Item key="environment" style={{height: 60}}>
            环境诊断
          </Menu.Item>
        </Menu>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div style={{ backgroundColor: 'rgb(244,245,246)',height:'100vh', overflow:'scroll' }} >
          <Switch>
            <Route path="/" component={SingleForcast} exact />
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
      </div>
      // </Router>
    )
  }
}

export default App