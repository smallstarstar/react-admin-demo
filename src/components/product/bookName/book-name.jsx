import React from 'react';
import './book-name.less';
import { Button, Input, Select, Card, Table, Modal, message, Pagination } from 'antd';
import categoryServices from '../../../services/getCategoryServices';
import BookInfoServices from '../../../services/getBookInfoServices';
import BookState from '../../../common/enums';


const { confirm } = Modal;
const { Option } = Select;
export default class BookName extends React.Component {
    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            size: 'large',
            categoryNameList: [],
            bookInfoList: [],
            currentPage: 1,
            currentSize: 4,
            visible: false,
            total: 0,
            columns: [
                { title: '名称', dataIndex: 'bookName' },
                { title: '作者', dataIndex: 'bookAuthor' },
                { title: '价格', dataIndex: 'bookPrice' },
                { title: '种类', dataIndex: 'bKind' },
                { title: '状态', dataIndex: 'bookState' },
                { title: '库存', dataIndex: 'bookNum' },
                { title: '描述', width: 100, render: (iten, index) => <span title={index.bookDec} className="decBook">{index.bookDec}</span> },
                { title: '操作', dataIndex: 'operate', width: 200, render: (item, index) => this.getColun(item, index) },
            ]
        }
    }
    getColun = (item, index) => {
        return <span>
                <Button type="danger" onClick={this.handleDeleteBook.bind(item, index)}>下架</Button>&nbsp;&nbsp;
                <Button type="primary" onClick={this.handleOpenDecBok.bind(item,index)}>查看详情</Button>
             </span>
    }
    // 下架图书弹框
    handleDeleteBook = (e) => {
        console.log(e);
        // 保护this操作
        const _this = this;
        confirm({
            title: '确定删除',
            content: '此操作不能将永久删除文件',
            async onOk() {
                const result = await BookInfoServices.deleletBookInfoById(e.id);
                if (result) {
                    _this.setState({ visible: false });
                    message.success(e.bookName + '成功下架');
                    // 刷新组件
                    await _this.getInit();
                } else {
                    message.error('下架失败');
                    _this.setState({ visible: false });
                }
            },
            onCancel() { },
        });
    }
    // 查看详情
    handleOpenDecBok = (e)=>{
        console.log(e);
        this.bookInfo = e;
        this.setState({bookInfo:e});
        // this.props.history.push({
        //     pathname:'/produceDec',
        //     query:e
        // })
        this.props.history.push({
            pathname:'/produceDec/' + e.id,

        })
    }
    async componentDidMount() {
        await this.getInit();
    }
    getInit = async () => {
        const data = await categoryServices.getCategoryList();
        this.setState({ categoryNameList: data });
        await this.getPageInfoMessage(this.state.currentPage, this.state.currentSize);
    }
    getPageInfoMessage = async (page, size) => {
        const result = await BookInfoServices.getBookInfoByPage(page, size);
        result.content.forEach((e) => {
            if (e.bookState) {
                e.bookState = BookState.bookState;
            } else {
                e.bookState = BookState.bookStateBorrow;
            }
        })
        this.setState({ bookInfoList: result.content, total: result.totalElements });
    }
    selectCategoryName = (categoryNameList) => {
        if (categoryNameList === undefined) {
            return
        } else {
            return categoryNameList.map(e => {
                return <Option key={e.id} value={e.bookKindName}>{e.bookKindName}</Option>
            })
        }
    }
    showTotal = (total) => {
        return '总数' + total
    }
    onChange = async (e) => {
        await this.getPageInfoMessage(e, this.state.currentSize);
    }
    render() {     
        return (
            <div className="bookContainer">
                <div className="bookForFun">
                    <Select size={this.state.size} className="selectInput" placeholder="请选择名称....">
                        {
                            this.selectCategoryName(this.state.categoryNameList)
                        }
                    </Select>
                    <Input type="text" placeholder="请输入名称..." className="searchInput" />
                    <Button type="primary" size={this.state.size} icon="search">搜 索</Button>
                </div>
                <div className="cardContent">
                    <Card>
                        <Table bordered dataSource={this.state.bookInfoList} columns={this.state.columns}
                            pagination={false}
                            rowKey="id"
                            loading={this.state.loading}
                        />
                    </Card>
                </div>
                <Pagination className="pagePosition" onChange={this.onChange} showTotal={this.showTotal} pageSize={4}
                    defaultCurrent={1} total={this.state.total}
                />
            </div>
        )
    }
}