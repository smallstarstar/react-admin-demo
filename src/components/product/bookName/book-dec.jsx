import React from 'react';
import './book-dec.less';
// import PropTypes from 'prop-types'
import BookInfoServices from '../../../services/getBookInfoServices';

export default class BookDec extends React.Component {
    // 声明传递的变量
    // static propTypes = {
    //     bookInfo: PropTypes.object
    // }
    constructor(props) {
        super(props)
        this.bookId = props.match.params.id;
        this.state = {
            bookInfo: {}
        }
    }
    async componentDidMount() {
        await this.getInit();
    }
    getInit = async () => {
        const data = await BookInfoServices.getBookAllInfo(this.bookId);
        this.setState({ bookInfo: data.bookImgEntity || [] });
    }
    render() {
        return (
            <div>
                <div>{this.state.bookInfo.id}</div>
            </div>
        )
    }
}