import React from 'react';
import './index.less';
import memorayLocalStoray from '../../utils/memoeyInfo';
import { Modal } from 'antd';
import localStorages from '../../utils/localStorage';
import { withRouter } from 'react-router-dom';
import TimeFormat from '../../utils/timeUtils';
import { connect } from 'react-redux'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryNameList: [],
            bookInfoList: [],
            currentPage: 1,
            currentSize: 4,
            currentTime: TimeFormat.currentTime(),
        }
    }
    // 生命周期
    componentDidMount() {
        this.interClear = setInterval(() => {
            // 更新组件的值
            this.setState({
                currentTime: TimeFormat.currentTime(),
            })
        }, 1000);
    }
    // 销毁组件
    componentWillUnmount() {
        clearInterval(this.interClear);
    }
    handleBack = () => {
        // 显示确认登陆
        Modal.confirm({
            title: '确认退出',
            onOk: () => {
                // todo
                localStorages.deleteUser();
                memorayLocalStoray.user = {};
                this.props.history.replace('/login')
            },
            onCancel() {
                // todo
            },
        });
    }
    render() {
        const userInfo = memorayLocalStoray.user;
        const title = this.props.headerTitle;
        return (
            <div className="header_top">
                <div className="header_top_right">
                    <span>欢迎</span>&nbsp;
                    <span>{userInfo.userName}</span>
                    <span className="backSystem" onClick={this.handleBack}>退出</span>
                </div>
                <div className="header_line"></div>
                <div className="heaser_bottom">
                    <span>{title}</span>
                    <span>{this.state.currentTime}</span>
                </div>
            </div>
        )
    }
}
// 格式是同统一的
export default connect(
    state => ({
        headerTitle: state.headerTitle
    }),
    {}
)(withRouter(Header));
