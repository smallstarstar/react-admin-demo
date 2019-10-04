import React from 'react';
import './index.less';
import { Button, Card, Table, Modal, Pagination, message} from 'antd';
import loginServies from '../../services/loginServices';
import AddUser from './add-user';

export default class Role extends React.Component {
    state = {
        size: 'large',
        dataSource: [],
        visible: false,
        loading: true,
        userInfo: {},
        currentSize: 4,
        currentPage: 1,
        total: 0,
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
        // 显示确认登陆
        Modal.confirm({
            title: '确认删除',
            onOk: async () => {
                // todo
                const result = await loginServies.deleteUserInfoSimple(e.id);
                if(result) {
                  message.success('删除用户' + e.userName + '成功');
                  // 刷新列表
                   this.getInitData();
                }
            },
            onCancel() {
                console.log('不删除')
            },
        });
    }
    // 获取数据
    getInitData = async () => {
        const data = await loginServies.getUserInfoByPage(this.state.currentPage, this.state.currentSize);
        this.setState({
            total: data.totalElements
        })
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
    showTotal = (total) => {
        return '总数' + total
    }
    onChange = async (page) => {
        const data = await loginServies.getUserInfoByPage(page, this.state.currentSize);
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
    render() {
        return (
            <div className="userContainer">
                <div className="addButton">
                    <Button type="primary" icon="plus" size={this.state.size} onClick={this.handleOpenDialog}>添 加</Button>
                </div>
                <div className="tableContainer">
                    <Card>
                        <Table bordered dataSource={this.state.dataSource} columns={this.state.columns}
                            rowKey="id"
                            loading={this.state.loading}
                            pagination={false}
                        />;
                    </Card>
                    <Pagination className="pagePosition" onChange={this.onChange} showTotal={this.showTotal} pageSize={4}
                        defaultCurrent={1} total={this.state.total}
                    />
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
                    <AddUser />
                </Modal>
            </div>
        )
    }
}