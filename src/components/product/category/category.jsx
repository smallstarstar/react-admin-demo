import React from 'react';
import categoryServices from '../../../services/getCategoryServices';
import { Button, Card, Table, Modal, message, Pagination } from 'antd';
import AddCategory from './add-category';
import memoeyInfo from '../../../utils/memoeyInfo';
import './category.less';
import Pubsub from 'pubsub-js';
import EventKeys from '../../../common/eventKeys';


export default class Category extends React.Component {
    state = {
        CategoryList: [],
        size: 'large',
        visible: false,
        visibles: false,
        currentPage: 1,
        currentSize: 4,
        kindDataList: [],
        userInfo: memoeyInfo.user,
        total: 0,
        columns: [
            {
                title: '名称',
                dataIndex: 'bookKindName',

            },
            {
                title: '添加人',
                dataIndex: 'bookCreatedName',

            },
            {
                title: '编辑',
                dataIndex: 'operate',
                width: 300,
                render: (item, index) => <span className="deleteButton">
                    <Button type="primary" onClick={this.updata.bind(item, index)}>编辑</Button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <Button type="danger" onClick={this.handleDelete.bind(item, index)}>删除</Button>
                </span>
            },
        ]
    }
    updata = (e) => {
        this.setState({ visibles: true })
        this.category = e;
    }
    async  componentDidMount() {
        await this.initData(this.state.currentPage, this.state.currentSize);
        // 订阅
        Pubsub.subscribe(EventKeys.getCategoryName, (keyName, val) => {
            this.val = val.trim();
            if (!this.val) {
                message.warn('请输入种类名称')
            }
        });
    }

    // 获取初始的数据
    async initData(page, size) {
        // const result = await categoryServices.getCategoryList();
        // 分因获取种类数据信息
        const rd = await categoryServices.getBookKindfnoByPage(page, size);
        this.setState({
            // CategoryList: result.reverse(),
            kindDataList: rd.content,
            total: rd.totalElements
        })
    }
    handleOpenDialog = () => {
        this.setState({ visible: true, });
        this.category = {}
    }
    // 添加种类信息
    hideModal = () => {
        this.form.validateFields(async (err, values) => {
            if (!err && this.val) {
                // 保存种类信息
                const result = await categoryServices.addCategoryName(this.val, this.state.userInfo);
                if (result) {
                    // 刷新组件
                    await this.initData(this.state.currentPage, this.state.currentSize);
                    message.success('添加' + values.categoryName + '成功');
                    this.setState({ visible: false, });
                } else {
                    message.error('添加失败,' + values.categoryName + '已经存在');
                    this.setState({ visible: false })
                }
            } else {
                this.setState({ visible: true, });
            }
        });
        // 清空input
        this.form.resetFields();
    };
    // 编辑更新种类信息
    handleOpenUpdata = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                // 保存种类信息
                const obj = {
                    name: values.categoryName,
                    userEntity: this.state.userInfo
                }
                const result = await categoryServices.updataCategoryById(this.category.id, obj);
                if (result) {
                    // 刷新组件
                    await this.initData(this.state.currentPage, this.state.currentSize);
                    message.success('更新' + values.categoryName + '成功');
                    this.setState({ visibles: false, });
                } else {
                    message.error('更新失败');
                    this.setState({ visibles: false })
                }
            } else {
                this.setState({ visibles: true, });
            }
        });
        // 清空input
        this.form.resetFields();
    }
    cancelModel = () => {
        this.setState({ visible: false, });
        this.form.resetFields();
    }
    cancelModels = () => {
        this.setState({ visibles: false, });
        this.form.resetFields();
    }
    handleDelete = (e) => {
        console.log(e);
        // 显示确认登陆
        Modal.confirm({
            title: '确认删除',
            onOk: async () => {
                // todo
                const result = await categoryServices.deleteCategoryNameById(e.id);
                console.log(result);
                if (result) {
                    // 刷新列表
                    await this.initData(this.state.currentPage, this.state.currentSize);
                    message.success('删除' + e.bookKindName + '成功');
                    this.setState({ visible: false })
                } else {
                    message.success('删除' + e.bookKindName + '失败');
                    this.setState({ visible: false })
                }
            },
            onCancel() {
                // todolist
            },
        });
    }
    // 接收子组件的传递的参数
    getForm = form => this.form = form;
    showTotal = (total) => {
        return '总数' + total
    }
    onChange = async (e) => {
        await this.initData(e, this.state.currentSize);
    }
    render() {
        return (
            <div className="userContainer">
                <div className="addButton">
                    <Button type="primary" icon="plus" size={this.state.size} onClick={this.handleOpenDialog}>添 加</Button>
                </div>
                <div className="tableContainer">
                    <Card>
                        <Table bordered dataSource={this.state.kindDataList} columns={this.state.columns}
                            pagination={false}
                            rowKey="id"
                            loading={this.state.loading}
                        />;
                </Card>
                </div>
                {/* 弹窗 */}
                <Modal
                    title="添加种类信息"
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.cancelModel}
                    okText="确认"
                    cancelText="取消"
                >
                    <AddCategory setForm={this.getForm} categoryName={this.category || '{}'} />
                </Modal>

                <Modal
                    title="编辑种类信息"
                    visible={this.state.visibles}
                    onOk={this.handleOpenUpdata}
                    onCancel={this.cancelModels}
                    okText="确认"
                    cancelText="取消"
                >
                    <AddCategory setForm={this.getForm} categoryName={this.category || '{}'} />
                </Modal>
                <Pagination className="pagePosition" onChange={this.onChange} showTotal={this.showTotal} pageSize={4}
                    defaultCurrent={1} total={this.state.total} />
            </div>
        )
    }
}