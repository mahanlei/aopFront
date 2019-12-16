import React from 'react'
import './Search.less'
import { Input, Select, Row, Col, Icon, Form, Button, Table } from 'antd'
import { fromJS, toJS } from 'immutable'
import { ke_attr } from '../../utils/ChAndEn.js'
import { fetchSearchResult,fetchKEInfo } from '../../services/SearchServices.js'
const { Option, OptGroup } = Select
export const keColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '英文名',
    dataIndex: 'title',
  
  },
  {
    title: '中文名',
    dataIndex: 'chinese',
  
  },
  {
    title: '属性',
    children: [
      {
        title: '物种',
        dataIndex: 'species',
        width: 190,
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 70,
      },
      {
        title: '生命阶段',
        dataIndex: 'lifeCycle',
        width: 160,
      },
      {
        title: '器官',
        dataIndex: 'organ',
        width: 90,
      },
      {
        title: '癌症',
        dataIndex: 'cancer',
        width: 80,
      },
      {
        title: '存活率',
        dataIndex: 'survivalRates',
        width: 80,
      },
      {
        title: '生物水平',
        dataIndex: 'level',
        width:90,
      },

    ]
  },
];
class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      checkTypes: fromJS(
        [{
          name: '',
          enName: '',
          value: '',
        }],
      ),
      checkTypeOptions: [],
      type: 'events',
      tableData: [],
      loading: false,
    }
  }
  componentDidMount() {
    this.getCheckTypeoptions()
  }
  getCheckTypeoptions = () => {
    const path = window.location.hash
    if (path.includes('events')) {
      this.setState({
        checkTypeOptions: Object.keys(ke_attr),
        type: 'events',
      })
    } else{
      this.setState({
        checkTypeOptions: Object.keys(ke_attr),
        type: 'aops',
      })
    } 
  }
  handleClickAddCheckType = () => {
    const { checkTypes } = this.state
    this.setState({
      checkTypes: checkTypes.push(fromJS({
        name: '',
        value: '',
        enName: '',
      }))
    })
  }
  handleChangeCheckTypeName = (index, value) => {
    const { checkTypes } = this.state
    let temp = checkTypes.setIn([index, 'name'], value)
    temp = temp.setIn([index, 'enName'], ke_attr[value])
    this.setState({
      checkTypes: temp
    })
  }
  handleChangeCheckTypeValue = (index, value) => {
    const { checkTypes } = this.state
    this.setState({
      checkTypes: checkTypes.setIn([index, 'value'], value)
    })
  }
  handleClickDeleteCheckType = (index) => {
    const { checkTypes } = this.state
    this.setState({ checkTypes: checkTypes.delete(index) })
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) { return }
      const { checkTypes } = this.state
      let items = {}
      checkTypes.map(v => {
        let key = v.get('enName');
        items[key] = v.get('value')
      })
      if (checkTypes.size == 1) {
        if (checkTypes.getIn([0, 'name']) == '' || checkTypes.getIn([0, 'value']) == '') {
          items = {}
        }
      }
      let key1 = 'title'
      let value1 = values.name
      items[key1] = value1
      let key2 = 'chineseName'
      let value2 = values.chineseName
      items[key2] = value2
      this.setState({
        loading: true
      })
      fetchSearchResult(this.state.type, items).then(res =>
        this.setState({
          tableData: res.content,
          loading: false
        }))
      //  console.log('result', result)
    })
  }
  handleClickRow = (record) =>{
this.props.history.push(`/event/${record.id}`)
  }
  renderCheckTypes = () => {
    const { checkTypes } = this.state
    return (
      <React.Fragment>
        <div className="line" >
          <div className="nameLabel">属性值：</div>
          <div style={{ flexGrow: 1 }}>
            {checkTypes.map((checkType, index) => (
              <Row gutter={12} className='check-types-row'>
                <Col span={5}>
                  <Form.Item className='search-item'>
                    <Select
                      allowClear
                      showSearch
                      placeholder="属性"
                      optionFilterProp="childern"
                      value={checkType.get('name')}
                      onChange={value => { this.handleChangeCheckTypeName(index, value) }}
                      onSearch={v => {
                        if (v.trim() == '') {
                          this.handleChangeCheckTypeName(index, '')
                        }
                      }}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.state.checkTypeOptions.map(v => <Option key={v} value={v} title={v}>{v}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item className='search-item'>
                    <Input placeholder="属性值" value={checkType.get('value')} style={{height: 30}} onChange={(e) => this.handleChangeCheckTypeValue(index, e.target.value)} />
                  </Form.Item>
                </Col>
                {index !== 0 ? (
                  <Col span={3}>
                    <Icon type="delete" style={{ color: '#BFBFBF', lineHeight: '40px' }} className='check-type-delete' onClick={() => this.handleClickDeleteCheckType(index)} />
                  </Col>
                ) : null}
              </Row>
            ))}
          </div>
        </div>
        {checkTypes.size < 5 ? ( // 最多添加5个
          <div>
            <Row>
              <Col span={9} className='check-type-add' onClick={this.handleClickAddCheckType}>
                <Icon type="plus" />添加筛选属性值
                </Col>
            </Row>
          </div>
        ) : null}
      </React.Fragment>
    )
  }
  renderKESearch() {
    const { getFieldDecorator } = this.props.form
    return <React.Fragment>
      <Row >
        <Col>
          <Form.Item label={'名称'} className='line'>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入英文名称'
                }
              ],
            })(
              <Input placeholder="英文名称" style={{ width: 230 }} />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row >
        <Col>
          <Form.Item label={'中文名'} className='line'>
            {getFieldDecorator('chineseName', {
              rules: [],
            })(
              <Input placeholder="中文名称" style={{ width: 230 }} />
            )}
          </Form.Item>
        </Col>
      </Row>
      {this.renderCheckTypes()}
    </React.Fragment>
  }
 renderTableData() {
    const { tableData } = this.state
    let dataSource = []
    for (let i = 0; i < tableData.length; i++) {
      dataSource.push({
        key: i,
        ...tableData[i]
      })
    }
    return (
      <Table dataSource={dataSource} 
      loading={this.state.loading} 
      columns={keColumns} 
      bordered
      onRowClick={ record => 
         this.handleClickRow(record)
      } />
    )
  }
  render() {
    let subPath = window.location.hash.split('/')[1]
    return (
      <div className="container">
        <div className="search">
          <Form className='ant-advanced-search-form' >
            <h3 style={{ marginBottom: '18px' }}>{subPath}搜索条件</h3>
            {this.renderKESearch()}
          </Form>
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={this.handleSearch}>查询</Button>
            <Button style={{ marginLeft: 14, marghtRight: 30 }} onClick={this.handleReset}>
              清除
              </Button></div>
        </div>
        <div className="dataContent">
          <h3 style={{ marginBottom: '18px' }}>搜索结果</h3>
          {this.renderTableData()}
        </div>


      </div>
    )
  }
}
export default Form.create()(Search)