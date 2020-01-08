import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import DaiichiHeader from '@component/DaiichiHeader'
import { styles } from '~/constants/Theme'
//import R from '@R'
import axios from 'axios'
import NavigationUtil from '~/navigation/NavigationUtil'
import reactotron from 'reactotron-react-native'
import { requestUserInfo } from '../constants/Api'

export default class UserScreen extends Component {

    state = {
        isLoading: true,
        err: false,
        data: {}
    }


    // componentDidMount() {
    //     axios.get("http://winds.hopto.org:8521/api/Service/GetUserInfor", {
    //         headers: {
    //             token: '65FD62931DE65C0F2F0EC18B28F78456'
    //         }
    //     }).then(response => {
    //         reactotron.log(response.data)
    //         this.setState({
    //             isLoading: false,
    //             data: response.data.data
    //         })
    //     }).catch(err => {
    //         console.log(err)
    //         this.setState({
    //             isLoading: false,
    //             err: err,
    //         })
    //     })

    // }
    componentDidMount() {
        this._getData()
    }

    _getData = async () => {
        try {
            response = await requestUserInfo()
            this.setState({
                isLoading: false,
                data: response.data
            })
        } catch (error) {
            this.setState({
                isLoading: false,
                err: error
            })
        }
    }

    _renderBody() {
        if (this.state.isLoading)
            return (<ActivityIndicator />)
        if (this.state.err)
            return (<Text>Có lỗi, cui lòng thử lại</Text>)
        return (
            <View
                style={style.container}>
                    <DaiichiHeader
                    title="thông tin tài khoản"/>
                    
                <View
                    style={style.user_info_block}>
                    <Image
                        style={
                            style.avatar
                        }
                        source={require('../assets/images/ic_user.png')}

                    >

                    </Image>
                    <View
                        style={
                            style.area_user}>
                        <View
                            style={{
                                flexDirection: 'row',

                            }}>
                            <Text
                                style={
                                    style.text_ten
                                }>
                                Nguyễn Thị Thu Phương
                        </Text>

                            <Text
                                style={
                                    style.text_phude
                                }>
                                Đại lý
                        </Text>

                        </View>
                        <TouchableOpacity
                        onPress = {() =>{
                            NavigationUtil.navigate('updateUserinfo')
                        }}>
                            <Text>
                                Chỉnh sửa thông tin
                    </Text>
                        </TouchableOpacity>

                    </View>

                </View>
                <View
                    style={
                        style.user_function_block
                    }>
                    {this._getfuncblock("Đơn hàng", require("../assets/images/ic_donhang3.png"))}
                    {this._getfuncblock("Cửa hàng", require("../assets/images/ic_store3x.png"))}
                    {this._getfuncblock("Lịch sử giao dịch", require("../assets/images/ic_history3x.png"))}
                    {this._getfuncblock("Trở thành đại lý", require("../assets/images/ic_rocket3x.png"))}
                    {this._getfuncblock("Thông tin bảo hành", require("../assets/images/ic_guarante3x.png"))}
                    {this._getfuncblock("Thông tin về Daiichi", require("../assets/images/ic_daichi_infor3x.png"))}
                    {this._getfuncblock("Đăng xuất", require("../assets/images/ic_logout3x.png"), true)}

                </View>
                <View
                    style={style.bonus_function}>
                    <View
                        style={style.point_function}
                    >
                        <Text
                            style={style.text_point}>Điểm tích lũy:</Text>
                        <Text
                            style={style.number_point}>1200</Text>
                    </View>
                    <View
                        style={style.rank_function}>
                        <Image
                            style={style.rank_image}
                            source={require('../assets/images/image_rank3x.png')} />
                        <View
                            style={style.hurdle_text}>
                            <Text style={style.green_text}>Thành viên</Text>
                            <Text style={style.green_text}>Bạc</Text>
                            <Text style={style.black_text}>Vàng</Text>
                            <Text style={style.black_text}>Bạch kim</Text>
                        </View>
                        <Image style={style.avatar_rank}
                            source={require('../assets/images/ic_rank3x.png')} />
                        <Text style={style.infor_rank}>Bạn đang là thành viên bậc bạc của Daiichi</Text>
                        <Text style={style.infor_rank}>Quyền lợi:</Text>
                        {this._theEnd("Chiết khấu 5% khi mua sản phẩm")}
                        {this._theEnd("Có nhiều ưu đãi và chương trình")}

                    </View>

                </View>
            </View>)
    }
    render() {
        return (
            <View
                style={{
                    flex: 1
                }}>
                {this._renderBody()}
            </View>
        )
    }

    _getfuncblock(title, imagePath, isLast = false) {
        return (
            <View>
                <View
                    style={
                        style.function_block}>

                    <Image style={style.icon_function}
                        source={imagePath} />
                    <Text
                        style={style.word_function}
                    > {title}</Text>
                    <Image
                        style={style.image_arrow}
                        source={require('../assets/images/ic_arrow3x.png')} />
                </View>
                {!isLast && <View style={style.line}></View>}
            </View>
        )
    }
    _theEnd(title) {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <Image style={style.note_image} source={require('../assets/images/ic_note3x.png')} />
                <Text
                    style={style.text_note}>{title}</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF'
    },
    user_info_block: {

        flexDirection: 'row',
        backgroundColor: 'white'

    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 25,
        marginVertical: 12,
        marginLeft: 11,
    },
    area_user: {
        flex: 1,
        justifyContent: 'center',

    },
    text_ten: {
        fontSize: 18,
        color: '#000000',
        marginRight: 5,
        marginBottom: 5,
        fontFamily: 'Roboto-Medium',
    },
    text_phude: {
        textAlignVertical: "center",
        textAlign: 'center',
        backgroundColor: '#EA4335',
        marginRight: 10,
        paddingTop: 2,
        paddingBottom: 1,
        paddingRight: 9,
        paddingLeft: 8,
        fontSize: 10,
        borderRadius: 3,
        color: 'white',
        fontFamily: 'Roboto-Regular',
        marginBottom: 5,

    },
    user_function_block: {
        //flex: 1,
        marginTop: 4,
        backgroundColor: 'white',
        marginHorizontal: 6,
        marginBottom: 9,
        paddingBottom: 5,
    },
    function_block: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 21,
        marginLeft: 30.5,
        marginRight: 27.3,
        alignItems: 'center',
    },
    icon_function: {
        width: 16.64,
        height: 22.19,
        marginLeft: 5,

    },
    word_function: {
        flex: 1,
        marginLeft: 16.86,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
    },
    image_arrow: {
        width: 8.08,
        height: 16.08,
        alignSelf: 'flex-end'

    },
    line: {
        height: 0.5,
        marginLeft: 22,
        marginRight: 22.5,
        backgroundColor: '#8B8B8B',

    },
    bonus_function: {
        flex: 1,
        marginTop: 0,
        marginBottom: 5,
        backgroundColor: '#FFFFFF',
    },
    point_function: {
        flexDirection: 'row',
        marginLeft: 140,
        marginTop: 6,
    },
    text_point: {
        // flex: 1,
        //alignItems: 'flex-end',
        paddingTop: 4,
        fontFamily: 'Roboto-Regular',
        color: '#EA4335',
        fontSize: 14,
    },
    number_point: {
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'flex-end',
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        color: '#EA4335',
        marginLeft: 6,
    },
    rank_function: {
        flex: 1,
        marginTop: 5,

        marginHorizontal: 22,
        alignItems: 'center',


    },
    rank_image: {
        height: 20,
        width: 310,
        marginLeft: 19,
        marginRight: 14,

    },
    hurdle_text: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 0,

    },
    green_text: {

        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: '#09AC29'
    },
    black_text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: '#707070'

    },
    avatar_rank: {
        height: 24,
        width: 180,
        marginTop: 10,

    },
    infor_rank: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: '#000000',

    },
    note_image: {
        width: 4,
        height: 4,

    },
    text_note: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: '#000000',
        marginLeft: 8,

    }





















})