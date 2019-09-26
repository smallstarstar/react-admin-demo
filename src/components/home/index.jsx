import React from 'react';
import './index.less';
import memorayLocalStoray from '../../utils/memoeyInfo';


class Home extends React.Component {
    render() {
        const userInfo = memorayLocalStoray.user;
        return (
            <div>
                <div className="userContainer">
                    <div className="containerWord">
                        <span>Welcome To Admin Manager</span>
                        <br />
                        {userInfo.userName}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;