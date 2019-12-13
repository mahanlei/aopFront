import React from 'react'
import './Search.less'
import { Input, Select } from 'antd'
const { Option } = Select


class Search extends React.Component {


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