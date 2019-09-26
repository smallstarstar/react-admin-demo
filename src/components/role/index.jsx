import React from 'react';
import './index.less';
import { Button, Card, Table, Modal } from 'antd';
import loginServies from '../../services/loginServices';

export default class Role extends React.Component {
    state = {
        size: 'large',
        dataSource: [],
        visible: false,
        loading: true,
        userInfo: {},
        columns: [
            {
                title: 'id',
                dataIndex: 'id',

            },
            {
                title: '姓名',
                dataIndex: 'userName',

            },
            {
                title: '密码',
                dataIndex: 'userPassword',

            },
            {
                title: '电话',
                dataIndex: 'userPhone',

            },
            {
                title: '邮箱',
                dataIndex: 'userEmail',

            },
            {
                title: '角色',
                dataIndex: 'userRole',
            },
            {
                title: '编辑',
                dataIndex: '删除',
                render: (item, index) => <span className="deleteButton" onClick={this.handleDelete.bind(item, index)}>删 除</span>,
            },
        ]
    }
    handleDelete = (e) => {
        console.log(e);
        this.setState({
            userInfo: e,
            visible: true
        })
    }
    // 获取数据
    getInitData = async () => {
        const data = await loginServies.getUserInfoByPage(1, 7);
        console.log(data.content);
        if (data) {
            this.setState({
                loading: false
            })
        }
        data.content.forEach((e, index) => {
            if (e.userRole === '1') {
                e.userRole = '管理员';
            }
            if (e.userRole === '0') {
                e.userRole = '普通用户';
            }
        })
        this.setState({
            dataSource: data.content
        })
    }
    async componentDidMount() {
        await this.getInitData();
    }
    handleOpenDialog = () => {
        this.setState({
            visible: true,
        });
    }
    hideModal = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div className="userContainer">
                <div className="addButton">
                    <Button type="primary" icon="plus" size={this.state.size} onClick={this.handleOpenDialog}>Primary</Button>
                </div>
                <div className="tableContainer">
                    <Card>
                        <Table bordered dataSource={this.state.dataSource} columns={this.state.columns}
                            pagination={{
                                defaultPageSize: 4, showQuickJumper: true
                            }}
                            rowKey="id"
                            loading={this.state.loading}
                        />;
                    </Card>
                </div>


                {/* 弹窗 */}
                <Modal
                    title="Modal"
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    {this.state.userInfo.id}
                    {this.state.userInfo.userName}
                    {this.state.userInfo.userPassword}
                    {this.state.userInfo.userPhone}
                    {this.state.userInfo.userEmail}
                    {this.state.userInfo.userRole}
                </Modal>
            </div>
        )
    }
}