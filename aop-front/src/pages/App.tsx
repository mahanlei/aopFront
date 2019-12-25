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
import './App.less'
const { SubMenu } = Menu
@withRouter
class App extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  handleClick = (e) => {
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
        >
          <SubMenu title={<div style={{display: 'flex'}}>
            <Icon type="search" id="searchIcon"/>
            搜索</div>} 
            key="search">
            <Menu.Item key="events">KE</Menu.Item>
            <Menu.Item key="edges">KER</Menu.Item>
            <Menu.Item key="aops">AOP</Menu.Item>
          </SubMenu>
        </Menu>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div style={{ backgroundColor: 'rgb(244,245,246)' }} >
          <Switch>
            {/* <Route path="/"  component={EdgeSearch}/> */}
            {/* <IndexRoute component={EdgeSearch}/> */}
            <Route path="/edges" component={EdgeSearch} />
            <Route path="/events" component={Search} />
            <Route path="/aops" component={Search} />
            <Route path="/event/:eventId" component={EventInfo} />
            <Route path="/aop/:aopId" component={AopInfo} />
          </Switch>
        </div>
      </div>
      // </Router>
    )
  }
}

export default App