import React from 'react';
import './index.less';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import menulist from '../../config/menu-list';
import MenuItem from 'antd/lib/menu/MenuItem';

const { SubMenu } = Menu;


class SideMenu extends React.Component {
    getMenuList = (menulist) => {

        // return menulist.map(item => {
        //     if (item.children) {
        //         return <SubMenu />
        //     }
        //     return <Menu.Item key={item.path}>
        //         <Link to={item.path}>
        //             <Icon type={item.icon} />
        //             <span>{item.title}</span>
        //         </Link>
        //     </Menu.Item>
        // })
        return menulist.reduce((pre, item) => {
            // 存在子路由
            if (item.children) {
                pre.push(
                    <SubMenu key={item.path}
                    title={
                        <span>
                            <Icon type={item.icon}></Icon>
                            <span>{item.title}</span>
                        </span>
                    }
                    
                    >
                        {this.getMenuList(item.children)}
                    </SubMenu>
                )
                // 判断openKey

            } else {
                pre.push(
                    <MenuItem key={item.path}>
                        <Link to={item.path}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </MenuItem>
                )
            }
            return pre
        }, [])
    };
    render() {
        const selectKrey = this.props.location.pathname;
        let openKey;
        menulist.forEach((el)=>{
              if(el.children) {
                  el.children.forEach((e)=>{
                      if(e.path === selectKrey) {
                        openKey = el.path;
                      }
                  })
              }
        });
        return (
            <div className="side">
                <Link className="side_top" to="/home">后台管理系统</Link>
                <Menu
                    selectedKeys={[selectKrey]}
                    defaultOpenKeys = {[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.getMenuList(menulist)
                    }
                </Menu>
            </div>
        )
    }
}

/**1
 * 默认选中的路由
 * 传递属性history,location,match
 */



export default withRouter(SideMenu);