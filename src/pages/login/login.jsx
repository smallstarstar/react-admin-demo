import React from 'react';
import './login.less';
import logo from './images/logo192.png';
import { Form, Icon, Input, Button, message } from 'antd';
import loginServies from '../../../src/services/loginServices.js';
import { Redirect } from 'react-router-dom'
import localStorages from '../../utils/localStorage.js';
import memoeyInfo from '../../utils/memoeyInfo.js';

const Item = Form.Item;

class Login extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        // 取出提交数据
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // 成功
                console.log('Received values of form: ', values);
                const result = await loginServies.userLogin(values.username, values.password);
                console.log(result, '-----获取用户信息');
                if (result.stateCode === 1) {
                    // 保存用户信息
                    localStorages.saveUser(result.userEntity);
                    memoeyInfo.user = result.userEntity;
                    message.success(result.message);
                    // 跳转路由
                    this.props.history.replace('/');
                } else {
                    message.error(result.message)
                }
            }
        });
        // const form = this.props.form.getFieldsValue();
        // console.log(form)
    }
    validatoPas = (rule, value, callback) => {
        value = value.trim();
        if (!value) {
            callback('密码不能为空')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文，数字，下划线组成')
        } else {
            callback();
        }
    }
    render() {
        // 读取localStory中的数据判断数据是否存在------>自动跳转
        const userInfo = memoeyInfo.user;
        if (userInfo.id) {
            return <Redirect to="/" />
        }
        // 校验函数对象 ---- 组件是一个函数类型
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo" />
                    <h1 className="word">welcome to Manager</h1>
                </div>
                <div className="login-container">
                    <div className="loginpassword">用户登陆</div>
                    <hr />
                    <div className="inputClass">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Item>
                                {
                                    getFieldDecorator('username', {
                                        initialValue: '',
                                        rules: [
                                            { required: true, message: '姓名不能为空!' },
                                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字，下划线组成' }
                                        ]
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="用户名"
                                        />
                                    )
                                }
                            </Item>
                            <Form.Item>
                                {
                                    getFieldDecorator('password', {
                                        initialValue: '',
                                        rules: [
                                            { validator: this.validatoPas }
                                        ]
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="密码"
                                        />,
                                    )
                                }
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">登 陆</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

const WarpperLogin = Form.create()(Login)

export default WarpperLogin;

/**
 * 利用Form.create()包装Form组件生成一个新的组件
 * 新的组件会向form组件传递一个属性，属性的名字就是叫做form，属性的值是一个对象。
 * 
 * 高阶函数：
 *    定义：接收的参数是函数，或者返回值是函数
 *    常见：数据的遍历，/ 定时器，/ Promise，/ 高阶组件
 *    作用：实现一个强大的功能，动态的实现功能。
 *    
 * 
 * 高阶组件：
 *    函数接收一个组件，返回一一个新的组件
 */
