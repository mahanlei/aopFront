
import React from "react";
import { Menu, Icon, Form, Button, Input, Checkbox,message } from 'antd'
import { handleLogin, uploadFile } from '../services/AopService.js'
import UploadFile from './UploadFile'
import './Login.less'
class Login extends React.Component {

    handleLogin = (e) => {
        e.preventDefault();
        // this.props.form.validateFields((err, values) => {
        //     if (err) { 
        //         return 
        //     }
        //     if(values.account == 'admin' && values.password == 'a12345'){
        //         message.success('登录成功！');
        //         this.props.history.push({ pathname: `/upload` })
        //     } else {
        //         message.error('账号或密码不正确')
        //     }
        // }
        // )
        this.props.history.push({ pathname: `/upload` })
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="main">
                <div className="form">
                    <Form onSubmit={this.handleLogin}>
                        <Form.Item>
                            {getFieldDecorator('account', {
                                rules: [{
                                    required: true, message: '请输入您的账号',
                                }],
                            })(
                                <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入您的密码' }],
                            })(
                                <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="submit">
                                登 录
            </Button>
                        </Form.Item>
                    </Form>
                </div>
             </div>
        )
    }
}
export default  Form.create()(Login);