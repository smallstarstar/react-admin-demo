import React from 'react';
import { Redirect } from 'react-router-dom';
import memoeyInfo from '../../utils/memoeyInfo.js';
import { Layout } from 'antd';
import Router from '../../router/router';
import HeaderComponent from '../../components/header/index';
import SideMenu from '../../components/side-meun/index';
import './admin.less';

const { Footer, Sider, Content } = Layout;


export default class Admin extends React.Component {
    render() {
        const userInfo = memoeyInfo.user;
        if (!userInfo.id) {
            // this.props.history.replace --------> 事件回调函数中进行
            return <Redirect to="/login" /> // 自动跳转指定的路由路径
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <SideMenu />
                </Sider>
                <Layout>
                    <HeaderComponent></HeaderComponent>
                    <Content className="containerBody">
                        <Router />
                    </Content>
                    <Footer>
                        你好，世界
                    </Footer>
                </Layout>
            </Layout>

        )
    }
}