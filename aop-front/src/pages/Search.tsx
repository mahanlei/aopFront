import React from 'react'
import './Search.less'
import { Input, Select, Row,Col,Icon, Form } from 'antd'

import { fromJS, toJS } from 'immutable'
const { Option, OptGroup } = Select
class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
       
          // 属性值
          checkTypes: fromJS(
            [{
              name: '',
              value: '',
             
            }],
          ),
          
        }
      }
    renderCheckTypes = () => {
        const { checkTypes } = this.state
        return (
          <React.Fragment>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '120px', textAlign: 'right', color: 'rgba(0, 0, 0, 0.85)', lineHeight: '40px' }}>指标及范围：</div>
              <div style={{ flexGrow: 1 }}>
                {checkTypes.map((checkType, index) => (
                  <Row gutter={24} className='check-types-row'>
                    <Col span={6}>
                      <Form.Item className='search-item'>
                        <Input placeholder="检查指标" value={checkType.get('name')} onChange={(e) => this.handleChangeCheckTypeName(index, e.target.value)} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item className='search-item'>
                        <Input placeholder="最小值" value={checkType.get('min')} onChange={(e) => this.handleChangeCheckTypeMin(index, e.target.value)} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item className='search-item'>
                        <Input placeholder="最大值" value={checkType.get('max')} onChange={(e) => this.handleChangeCheckTypeMax(index, e.target.value)} />
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
                  <Col span={3} className='check-type-add' onClick={this.handleClickAddCheckType}>
                    <Icon type="plus" />添加指标及范围
                </Col>
                </Row>
              </div>
            ) : null}
          </React.Fragment>
        )
      }
    render() {
        const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

        return (
            <div className="container">
                <div className="search">
                    <div className="line">
                        <div className="label">名称:</div>
                        <div><Input placeholder="名称" /></div>
                    </div>
                    <div className="line">
                        <div className="label">属性:</div>
                        <div>
                            <Select mode="multiple"
    style={{ width: '100%' }}
    placeholder="Please select"
    defaultValue={['a10', 'c12']}
    onChange={handleChange}/>
                            </div>
                    </div>
                </div>
                    <div className="dataContent">
                        tttt
                    </div>
               
               
            </div>
        )
    }
}
export default Search