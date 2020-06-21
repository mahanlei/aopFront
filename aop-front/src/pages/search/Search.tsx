import React, { Component } from 'react'
import './Search.less'
import { Input, Select, Row, Col, Icon, Form, Button, Table } from 'antd'
import { fromJS, toJS } from 'immutable'
import { ke_attr } from '../../utils/ChAndEn.js'
import { fetchSearchResult, fetchKEInfo } from '../../services/SearchServices.js'
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
        title: '生命周期',
        dataIndex: 'lifeCycle',
        width: 160,
      },
      {
        title: '器官/毒性类型',
        dataIndex: 'organ',
        width: 90,
      },
      {
        title: '致癌/遗传毒性',
        dataIndex: 'cancer',
        width: 80,
      },
      {
        title: '生物水平',
        dataIndex: 'level',
        width: 90,
      },

    ]
  },
];
const speciesTypes = ['人类', '啮齿', '其他哺乳纲', '鱼类',
  '昆虫', '两栖', '鸟类', '植物', '其他']
const sexTypes = ['无特异性', '雄性', '雌性']
const lifeCycleTypes = ['胚胎及幼儿', '青春期', '成体', '全生命阶段', '无特异性']
const organTypes = ['运动系统', '消化系统', '呼吸系统', '泌尿系统', '生殖系统', '内分泌系统',
  '免疫系统', '神经系统', '循环系统', '急性毒性', '其他']
const cancerTypes = ['阳性', '阴性']
const survivalRatesTypes = ['降低']
const levelTypes = ['分子', '细胞', '组织', '器官', '个体', '种群']
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
      current: 1,
      pageSize: 20,
      total: 0,
    }
  }
  componentDidMount() {
    this.getCheckTypeoptions()

  }
  componentDidUpdate(prevProps, prevState) {
    const { pageSize, current } = this.state;
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.form.resetFields();
      fetchSearchResult(this.props.location.pathname.split('/')[1], {size: pageSize, page: 1}).then(res =>
        this.setState({
          tableData: res.content,
          loading: false,
          total: res.totalElements,
          pageSize: res.size,
          current: 1,
        })
      )
    }

  }
  getCheckTypeoptions = () => {
    const { pageSize, current } = this.state;
    const path = window.location.hash
    if (path.includes('events')) {
      this.setState({
        checkTypeOptions: Object.keys(ke_attr),
        type: 'events',
      })
      fetchSearchResult('events', {size: pageSize, page: current}).then(res =>
        this.setState({
          tableData: res.content,
          loading: false,
          total: res.totalElements,
          pageSize: res.size,
        })
      )

    } else {
      this.setState({
        checkTypeOptions: Object.keys(ke_attr),
        type: 'aops',
      })
      fetchSearchResult('aops', {size: pageSize, page: current}).then(res =>
        this.setState({
          tableData: res.content,
          loading: false,
          total: res.totalElements,
          pageSize: res.size,
        })
      )
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
  handleSearch = (resetPage:true) => {
    const{ pageSize, current } = this.state;
    // e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) { return }
      // const { checkTypes } = this.state
      let items = { ...values, page: current, size: pageSize }
      // checkTypes.map(v => {
      //   let key = v.get('enName');
      //   items[key] = v.get('value')
      // })
      // if (checkTypes.size == 1) {
      //   if (checkTypes.getIn([0, 'name']) == '' || checkTypes.getIn([0, 'value']) == '') {
      //     items = {}
      //   }
      // }
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
          loading: false,
          total: res.totalElements,
        }))
        if(resetPage){
          this.setState({
            current: 1,
          })
        }
    })
  }
  handleClickRow = (record) => {
    let subPath = window.location.hash.split('/')[1]
    if (subPath == 'events') {
      this.props.history.push(`/event/${record.id}`)
    } else {
      this.props.history.push(`/aop/${record.id}`)
    }
  }
  changePage = (current) => {
    this.setState({
      current: current,
    },() => this.handleSearch(false))
  }
  // renderCheckTypes = () => {
  //   const { checkTypes } = this.state
  //   return (
  //     <React.Fragment>
  //       <div className="line" >
  //         <div className="nameLabel">属性值：</div>
  //         <div style={{ flexGrow: 1 }}>
  //           {checkTypes.map((checkType, index) => (
  //             <Row gutter={12} className='check-types-row'>
  //               <Col span={5}>
  //                 <Form.Item className='search-item'>
  //                   <Select
  //                     allowClear
  //                     showSearch
  //                     placeholder="属性"
  //                     optionFilterProp="childern"
  //                     value={checkType.get('name')}
  //                     onChange={value => { this.handleChangeCheckTypeName(index, value) }}
  //                     onSearch={v => {
  //                       if (v.trim() == '') {
  //                         this.handleChangeCheckTypeName(index, '')
  //                       }
  //                     }}
  //                     filterOption={(input, option) =>
  //                       option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  //                     }
  //                   >
  //                     {this.state.checkTypeOptions.map(v => <Option key={v} value={v} title={v}>{v}</Option>)}
  //                   </Select>
  //                 </Form.Item>
  //               </Col>
  //               <Col span={5}>
  //                 <Form.Item className='search-item'>
  //                   <Input placeholder="属性值" value={checkType.get('value')} style={{height: 30}} onChange={(e) => this.handleChangeCheckTypeValue(index, e.target.value)} />
  //                 </Form.Item>
  //               </Col>
  //               {index !== 0 ? (
  //                 <Col span={3}>
  //                   <Icon type="delete" style={{ color: '#BFBFBF', lineHeight: '40px' }} className='check-type-delete' onClick={() => this.handleClickDeleteCheckType(index)} />
  //                 </Col>
  //               ) : null}
  //             </Row>
  //           ))}
  //         </div>
  //       </div>
  //       {checkTypes.size < 5 ? ( // 最多添加5个
  //         <div>
  //           <Row>
  //             <Col span={9} className='check-type-add' onClick={this.handleClickAddCheckType}>
  //               <Icon type="plus" />添加筛选属性值
  //               </Col>
  //           </Row>
  //         </div>
  //       ) : null}
  //     </React.Fragment>
  //   )
  // }
  renderKESearch() {
    const { getFieldDecorator } = this.props.form
    const speciesOptions = []
    for (let i = 0; i < speciesTypes.length; i++) {
      speciesOptions.push(<Option key={speciesTypes[i]}>{speciesTypes[i]}</Option>)
    }
    const sexOptions = []
    for (let i = 0; i < sexTypes.length; i++) {
      sexOptions.push(<Option key={sexTypes[i]}>{sexTypes[i]}</Option>)
    }
    const lifeCycleOptions = []
    for (let i = 0; i < lifeCycleTypes.length; i++) {
      lifeCycleOptions.push(<Option key={lifeCycleTypes[i]}>{lifeCycleTypes[i]}</Option>)
    }
    const organOptions = []
    for (let i = 0; i < organTypes.length; i++) {
      organOptions.push(<Option key={organTypes[i]}>{organTypes[i]}</Option>)
    }
    const cancerOptions = []
    for (let i = 0; i < cancerTypes.length; i++) {
      cancerOptions.push(<Option key={cancerTypes[i]}>{cancerTypes[i]}</Option>)
    }
    // const survivalRatesOptions = []
    // for (let i= 0;i<survivalRatesTypes.length;i++){
    //   survivalRatesOptions.push(<Option key={survivalRatesTypes[i]}>{survivalRatesTypes[i]}</Option>)
    // }
    const levelOptions = []
    for (let i = 0; i < levelTypes.length; i++) {
      levelOptions.push(<Option key={levelTypes[i]}>{levelTypes[i]}</Option>)
    }

    return <React.Fragment>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label={'ID'} className='line' >
            {getFieldDecorator('id', {
              rules: [],
            })(
              <Input placeholder="输入ID" style={{ width: 220 }} />
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={'名称'} className='line' >
            {getFieldDecorator('name', {
              rules: [],
            })(
              <Input placeholder="输入英文名称" style={{ width: 220 }} />
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={'中文名'} className='line'>
            {getFieldDecorator('chinese', {
              rules: [],
            })(
              <Input placeholder="输入中文名称" style={{ width: 220 }} />
            )}
          </Form.Item>
        </Col>

      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label={'性别'} className='line'>
            {getFieldDecorator('sex', {
              rules: [],
            })(
              <Select allowClear  >
                {sexOptions}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={'生命周期'} className='line'>
            {getFieldDecorator('lifeCycle', {
              rules: [],
            })(
              <Select allowClear  >
                {lifeCycleOptions}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={'器官/毒性类型'} className='line'>
            {getFieldDecorator('organ', {
              rules: [],
            })(
              <Select allowClear  >
                {organOptions}
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label={'致癌/遗传毒性'} className='line'>
            {getFieldDecorator('cancer', {
              rules: [],
            })(
              <Select allowClear >
                {cancerOptions}
              </Select>
            )}
          </Form.Item>
        </Col>
        {/* <Col span={8}>
          <Form.Item label={'存活率'} className='line'>
            {getFieldDecorator('survivalRates', {
              rules: [],
            })(
              <Select allowClear >
              {survivalRatesOptions}
              </Select>
            )}
          </Form.Item>
        </Col> */}
        <Col span={8}>
          <Form.Item label={'生物水平'} className='line'>
            {getFieldDecorator('level', {
              rules: [],
            })(
              <Select allowClear >
                {levelOptions}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={'物种'} className='line'>
            {getFieldDecorator('species', {
              rules: [],
            })(
              <Select allowClear>
                {speciesOptions}
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
      {/* {this.renderCheckTypes()} */}
    </React.Fragment>
  }
  
  renderTableData() {
    const { tableData, pageSize, current, total } = this.state
    let dataSource = []
    for (let i = 0; i < tableData.length; i++) {
      dataSource.push({
        key: i,
        ...tableData[i],
      })
    }
    const paginationProps = {
      pageSize: pageSize,
      current: current,
      total: total,
      onChange: (current) => {this.changePage(current)},
    }
    return (
      <Table 
        dataSource={dataSource}
        loading={this.state.loading}
        columns={keColumns}
        bordered
        onRowClick={record =>
          this.handleClickRow(record)
        } 
        pagination= {paginationProps}
        />
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
          <h3 style={{ marginBottom: '18px' }}>{subPath}数据</h3>
          {this.renderTableData()}
        </div>


      </div>
    )
  }
}
export default Form.create()(Search)