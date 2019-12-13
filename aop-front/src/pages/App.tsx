import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Menu } from 'antd'
import Search from './Search'
const { SubMenu } = Menu
class App extends React.Component {
  
    // state = {
    //   current: 'search'
    // }
  

  handleClick = (e) => {
    console.log('click', e)
  }
  render() {
    return (
      <Router>
        <div>
          
          <Menu
            onClick={this.handleClick}
            theme="dark"
            mode="horizontal" 
            style={{paddingLeft: '10%', height: 60, fontSize: 18, lineHeight: '60px'}}
            >
            <SubMenu title="检索" key="search">
              <Menu.Item key="ke">KE</Menu.Item>
              <Menu.Item key="ker">KER</Menu.Item>
              <Menu.Item key="aop">AOP</Menu.Item>
            </SubMenu>
          </Menu>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <div style={{backgroundColor: 'rgb(244,245,246)'}}>
          <Switch>
            <Route path="/search">
              <Search />
            </Route>
            {/* <Route path="/users">
              <Users />
            </Route> */}
            <Route path="/">
              <Search />
            </Route>
          </Switch>
          </div>
        </div>
      </Router>
    )
  }
}
export default App