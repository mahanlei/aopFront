import React from 'react'
import { Input, Select, Row, Col, Icon, Form, Button, Table } from 'antd'
import { ke_attr } from '../utils/ChAndEn.js'
import { fetchAopInfo, fetchAopNodes } from '../services/AopService'
import { keColumns } from '../pages/search/Search'
import './AopInfo.less'
import {fetchAoInfo} from '../services/EnvironmentService'
import {renderKESearch} from './search/Search.tsx'

const { Option, OptGroup } = Select
const speciesTypes=['人类', '啮齿', '其他哺乳纲', '鱼类', 
 '昆虫','两栖','鸟类','植物', '其他']
const sexTypes=['无特异性', '雄性', '雌性']
const lifeCycleTypes=[ '胚胎及幼儿', '青春期','成体','全生命阶段','无特异性']
const organTypes=['运动系统', '消化系统','呼吸系统','泌尿系统','生殖系统','内分泌系统',
  '免疫系统','神经系统','循环系统','其他','急性毒性']
const cancerTypes=['阳性', '阴性']
const  levelTypes = ['分子', '细胞','组织','器官','个体','种群']
class Environment extends React.Component<any,any> {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            tableData: [],
        }

    }
    componentDidMount() {
      this.setState({ loading: true })
      let items={};
        fetchAoInfo(items).then(res => {
        this.setState({
            loading: false,
            tableData: res,
        })

    }) //传的参数
    }

    // renderSearchForm() {
    //     const { getFieldDecorator } = this.props.form
    //     return (
    //         <React.Fragment>
    //             <Row gutter={16}>
    //                 <Col span={8}>
    //                     <Form.Item label={'名称'} className='line'>
    //                         {getFieldDecorator('name', {
    //                             rules: [],
    //                         })(
    //                             <Input placeholder="输入id、中文名称或者英文名称" style={{ width: 300 }} />
    //                         )}
    //                     </Form.Item>
    //                 </Col>
    //             </Row>
    //         </React.Fragment>
    //     )
    // }

    renderSearch() {
        const { getFieldDecorator } = this.props.form
        const speciesOptions = []
        for (let i= 0;i<speciesTypes.length;i++){
          speciesOptions.push(<Option key={speciesTypes[i]}>{speciesTypes[i]}</Option>)
        }
        const sexOptions = []
        for (let i= 0;i<sexTypes.length;i++){
          sexOptions.push(<Option key={sexTypes[i]}>{sexTypes[i]}</Option>)
        }
        const lifeCycleOptions = []
        for (let i= 0;i<lifeCycleTypes.length;i++){
          lifeCycleOptions.push(<Option key={lifeCycleTypes[i]}>{lifeCycleTypes[i]}</Option>)
        }
        const organOptions = []
        for (let i= 0;i<organTypes.length;i++){
          organOptions.push(<Option key={organTypes[i]}>{organTypes[i]}</Option>)
        }
        const cancerOptions = []
        for (let i= 0;i<cancerTypes.length;i++){
          cancerOptions.push(<Option key={cancerTypes[i]}>{cancerTypes[i]}</Option>)
        }
   
        const levelOptions = []
        for (let i= 0;i<levelTypes.length;i++){
          levelOptions.push(<Option key={levelTypes[i]}>{levelTypes[i]}</Option>)
        }
    
        return <React.Fragment>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={'名称'} className='line'>
                {getFieldDecorator('name', {
                  rules: [],
                })(
                  <Input placeholder="输入英文名称" style={{ width: 230 }} />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'中文名'} className='line'>
                {getFieldDecorator('chinese', {
                  rules: [],
                })(
                  <Input placeholder="输入中文名称" style={{ width: 230 }} />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'物种'} className='line'>
                {getFieldDecorator('species', {
                  rules: [],
                })(
                  <Select  allowClear style={{ width: 230 }} >
                  {speciesOptions}
                  </Select>
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
                  <Select allowClear style={{ width: 230 }} >
                  {sexOptions}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'生命阶段'} className='line'>
                {getFieldDecorator('lifeCycle', {
                  rules: [],
                })(
                  <Select allowClear style={{ width: 230 }} >
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
                  <Select allowClear style={{ width: 230 }} >
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
                  <Select allowClear style={{ width: 230 }} >
                  {cancerOptions}
                  </Select>
                )}
              </Form.Item>
            </Col>
          
            <Col span={8}>
              <Form.Item label={'生物水平'} className='line'>
                {getFieldDecorator('level', {
                  rules: [],
                })(
                  <Select allowClear style={{ width: 230 }} >
                  {levelOptions}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          {/* {this.renderCheckTypes()} */}
        </React.Fragment>
      }
    renderTableData() {
        const columns = [

            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: '英文名称',
                dataIndex: 'title',
            },
            {
                title: '中文名称',
                dataIndex: 'chinese',
            },
            {
                title: '性别',
                dataIndex: 'sex',

            },
            {
                title: '生命阶段',
                dataIndex: 'lifeCycle',

            },
            {
                title: '等级',
                dataIndex: 'level',

            },
        ]
        let dataSource = this.state.tableData
        return (
            <Table
                dataSource={dataSource}
                loading={this.state.loading}
                columns={columns}
                bordered
                onRowClick={ record =>
                    this.handleClickRow(record)
                }
            />
        )
    }

    handleClickRow = (record) => {
        // var path = {
        //     pathname: "/keao",
        //     query: param
        // };
        // this.props.history.push(path);
        this.props.history.push(`/aopList/${record.id}`)
    }

    handleReset = () => {
        this.props.form.resetFields();
    }


    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) { return }
            let items = {...values}
            let key1 = 'title'
            let value1 = values.name
            items[key1] = value1
            let key2 = 'chinese'
            let value2 = values.chineseName
            items[key2] = value2
            this.setState({ loading: true })
            fetchAoInfo(items).then(res => {
                this.setState({
                    loading: false,
                    tableData: res,
                })

            }) //传的参数
        })

    }

    render() {

        return (
            <div className="container">
                <div className="search">
                    <Form className='ant-advanced-search-form' >
                        <h3 style={{ marginBottom: '18px' }}>AO搜索</h3>
                        {this.renderSearch()}
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
export default Form.create()(Environment)