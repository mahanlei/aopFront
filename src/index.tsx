import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import {
  Switch,
  Route,
  HashRouter,
  BrowserRouter,
} from "react-router-dom";

import Login from './pages/Login'
import UploadFile from './pages/UploadFile'

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/upload" component={UploadFile} />
      </Switch>
    </HashRouter>
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('example'),
)
