import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './pages/App'
import 'antd/dist/antd.css'
import {BrowserRouter, Route,HashRouter,IndexRoute} from 'react-router-dom'
const Root = () => {
  return (
      <HashRouter >
          <Route path={`/`} component={App}/>
      </HashRouter>
  )

}
ReactDOM.render(
  <Root/>,
  document.getElementById('example'),
)
