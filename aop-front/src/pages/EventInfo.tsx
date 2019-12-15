import React from 'react'
import { Input, Select, Row, Col, Icon, Form, Button, Table } from 'antd'
import { fromJS, toJS } from 'immutable'
import { ke_attr } from '../../utils/ChAndEn.js'
import { fetchSearchResult,fetchKEInfo } from '../services/SearchServices.js'
const { Option, OptGroup } = Select
class EventInfo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      
      tableData: [],
      loading: false,
    }
  }
  componentDidMount(){
    const eid = window.location.hash.split('/')[2]
    //   this.props.history.location.p
    fetchKEInfo(eid).then(res =>{
        console.log('ressssss',res)
      })
  }
  render(){
      return <h1>111</h1>
  }
}
export default EventInfo