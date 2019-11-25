import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import styles from './AppContainer.scss'
import classNames from 'classnames'
// import {pushURL} from '../history'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom"
import Search from './Search'
import Homepage from './Homepage'

const { Header, Content } = Layout

class AppContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: '',
        }

    }
    handleClickMenu = (e) => {
        // this.props.history.push(`/${e.key}`)
        this.setState({
            current: e.key,
        })
    }
    render() {
        return <div id={styles.container}>
            <Router style={{ height: '100%' }}>
                <Layout>
                    <Header>
                        {/* <div>AOP化学品应用</div> */}
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            onClick={this.handleClickMenu}
                            selectedKeys={[this.state.current]}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="home"><Link to="/"><Icon type="home" className={styles.homeIcon} /></Link></Menu.Item>
                            <Menu.Item key="search" ><Link to="/search">检索</Link></Menu.Item>
                            <Menu.Item key="line"><Link to="/line">AOP链路</Link></Menu.Item>
                            <Menu.Item key="forecast"><Link to="/forecast">毒性预测</Link></Menu.Item>
                        </Menu>
                    </Header>
                    <Content>
                        <Switch>
                            <Route path="/" exact > <Homepage /></Route>
                            <Route path="/search" exact> <Search /></Route>
                        </Switch>

                    </Content>
                </Layout>
            </Router>
        </div>
    }


}
export default AppContainer