import React from 'react';
// import PropTypes from 'prop-types'
import './book-img.less';
import { Upload, message, Button } from 'antd';
import BookInfoServices from '../../../services/getBookInfoServices';
import memoeyInfo from '../../../utils/memoeyInfo';
import { connect } from 'react-redux'

class BookImg extends React.Component {
    // static propTypes = {
    //     imgInfo: PropTypes.object
    // }
    constructor(props) {
        super(props)
        this.state = {
            base4Code: null,
            large: 'large',
            bookBaseCode: null,
            isDisabled: true,
        }

    }
    Isshowimg = (e) => {
        // console.log(this.state.bookBaseCode)
        if (e.bookImg === null && this.state.bookBaseCode === null) {
            return <div className="imgshowWord">Please Add Picture</div>
        } else {
            return <img src={this.state.bookBaseCode} alt="" className="img" />
        }
    }
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    handleChange = (info) => {
        const reader = new FileReader();
        this.setState({isDisabled:false})
        reader.readAsDataURL(info.file.originFileObj);
        reader.onload = e => {
            this.pictBase64 = e.currentTarget.result;
            this.setState({
                base4Code: e.currentTarget.result
            })
        };
    }
    showPicturefor = (e) => {
        return <img src={(e) => {
            e = this.showPicturefor
        }} alt="上传" style={{ width: '100%' }} />
    }
    UploadPict = async () => {
        const imgInfos = {};
        imgInfos.bookId = this.props.imgInfo.bookId;
        imgInfos.bookImg = this.state.base4Code;
        imgInfos.createPeolple = memoeyInfo.user.userName;
        imgInfos.createdId = memoeyInfo.user.id;
        const data = await BookInfoServices.saveBookPictureInfo(imgInfos);
        if (data) {
            message.success('更新图片成功');
            this.setState({ bookBaseCode: imgInfos.bookImg,base4Code:'',isDisabled:true})
        }
        // 获取用户信息
    }
    async componentDidMount() {
        const data = await BookInfoServices.getImgInfoById(this.props.saveBookIds.id);
        this.setState({ bookBaseCode: data.bookImg })
    }
    render() {
        const imgInfo = this.props.imgInfo
        return (
            <div>
                <div className="pictureShoww">{this.Isshowimg(imgInfo)}</div>
                <Upload className="uploadPit"
                    name="上传"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange.bind(this)}
                >
                    <img src={this.state.base4Code} alt="更新" style={{ width: '100%' }} />
                </Upload>
                <Button type="primary" disabled={this.state.isDisabled} size={this.state.large} className="upButton" onClick={this.UploadPict}>更 新</Button>
            </div>
        )
    }
}

export default connect(
    state => ({
        saveBookIds: state.saveBookIds
    }),
    {}
)(BookImg)