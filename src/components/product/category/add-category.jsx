import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import Pubsub from 'pubsub-js';
import EventKeys from '../../../common/eventKeys';


class AddCategory extends React.Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
        categoryName: PropTypes.object,
    }
    getValues = (e)=>{
        Pubsub.publish(EventKeys.getCategoryName, e.target.value);
    }
    componentWillMount() {
        // 父子组件通信，要先声明在子组件接收对象函数
        this.props.setForm(this.props.form);
        // 采用pubsu
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const categoryName = this.props;
        return (
            <Form className="login-form">
                <Form.Item>
                    {getFieldDecorator('categoryName', {
                        rules: [{ required: true, message: '不能为空' }],
                        initialValue: categoryName.categoryName.bookKindName,
                    })(
                        <Input placeholder="请输入种类名称..." onBlur={this.getValues}/>,
                    )}
                </Form.Item>
            </Form>
        )
    }
}


export default Form.create()(AddCategory)