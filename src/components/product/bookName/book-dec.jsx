import React from 'react';
import './book-dec.less';
// import PropTypes from 'prop-types'
import BookInfoServices from '../../../services/getBookInfoServices';
import { Icon } from 'antd';
import BookImg from './book-img';

export default class BookDec extends React.Component {
    // 声明传递的变量
    // static propTypes = {
    //     bookInfo: PropTypes.object
    // }
    constructor(props) {
        super(props)
        this.bookId = props.match.params.id;
        this.state = {
            bookInfoEntity: {},
            bookImgInfo: {},
            bookPosition: {},
        }
    }
    async componentDidMount() {
        await this.getInit();
    }
    getInit = async () => {
        const data = await BookInfoServices.getBookAllInfo(this.bookId);
        this.setState({
            bookImgInfo: data.bookImgEntity,
            bookInfoEntity: data.bookInfoEntity,
            bookPosition: data.bookPositionEntity
        });
    }
    routerBack = () => {
        this.props.history.push({
            pathname: '/productOne'
        })
    }
    render() {
        const bookInfo = this.state.bookInfoEntity;
        const bookPositions = this.state.bookPosition;
        return (
            <div className="booKContainer">
                <Icon className="iconBack" type="arrow-left" onClick={this.routerBack} />
                <div className="bookInfo">
                    <label>书 名</label>
                    <div>{bookInfo.bookName}</div>
                </div>
                <div className="bookInfo">
                    <label>分 类</label>
                    <div>{bookInfo.bKind}</div>
                </div>
                <div className="bookInfo">
                    <label>作 者</label>
                    <div>{bookInfo.bookAuthor}</div>
                </div>
                <div className="bookInfo">
                    <label>库 存</label>
                    <div>{bookInfo.bookNum}&nbsp; 本</div>
                </div>
                <div className="bookInfo">
                    <label>价 格</label>
                    <div>{bookInfo.bookPrice}&nbsp; ￥</div>
                </div>

                <div className="bookInfo">
                    <label>位 置</label>
                    <div>
                        楼层&nbsp;{bookPositions.bookFloor}&nbsp;
                        房间&nbsp;{bookPositions.bookRoom}&nbsp;
                        定位&nbsp;{bookPositions.bookPosition}
                    </div>
                </div>
                <div className="imgInfo">
                    <BookImg imgInfo={this.state.bookImgInfo || {}} />
                </div>
                <div className="desribe">
                    <label>备 注:</label>
                    <div className="decribe_content">
                        {bookInfo.bookDec}
                    </div>
                </div>
            </div>
        )
    }
}