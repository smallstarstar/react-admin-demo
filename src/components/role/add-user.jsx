import React from 'react';
import { Form, Input } from 'antd';


// form 表单使用高阶组件
class AddUser extends React.Component {
    getInpuvalues = (e) => {
        console.log(e.target.value);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '不能为空' }],
                            initialValue: '',
                        })(
                            <Input placeholder="Username" onChange={this.getInpuvalues.bind(this)} />,
                        )}
                    </Form.Item>
                </Form>
            </div>
        )
    }

}


export default Form.create()(AddUser)