import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    Image,
    StyleSheet,
    ActivityIndicator,


} from 'react-native'
import axios from 'axios'
import { requsetHomedata } from '../constants/Api'
import reactotron from 'reactotron-react-native'
import DaiichiHeader from '../components/DaiichiHeader'


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            err: null,
            data: {},
        }
    }

    componentDidMount() {
        this._getData()
    }

    _getData = async () => {
        // try {
        //     Response = await requsetHomedata("deviceid")
        //     reactotron.log(Response)
        //     this.setState({
        //         isLoading: false,
        //         data: Response.data
        //     })
        // }
        // catch (erros) {
        //     this.setState({
        //         isLoading: false,
        //         err: erros
        //     })
        // }


        console.log("Bắt đầu lấy dữ liệu từ api")
        axios.get("http://winds.hopto.org:8521/api/Service/GetHomeScreen?deviceID=ahi", {
            headers: {
                token: '65FD62931DE65C0F2F0EC18B28F78456'
            }
        }).then(response => {
            reactotron.log(response.data)
            this.setState({
                isLoading: false,
                data: response.data.data
            })
        }).catch(err => {
            reactotron.log(err)
            this.setState({
                isLoading: false,
                err: err
            })
        })
    }


    render() {
        return (
            <View
                style={styles.container}>
                <DaiichiHeader
                    title="Trang chủ"
                />
                {this._renderbody()}
            </View>
        )
    }

    _renderbody() {
        if (this.state.isLoading)
            return (<ActivityIndicator />)
        if (this.state.err)
            return (<Text>Đã có lỗi xảy ra, vui lòng thử lại</Text>)
        return (
            <View style={styles.container}>
                <ScrollView style={{ backgroundColor: 'white' }}>
                    {this._funcBlock1()}
                    {this._funcBlock2()}
                    {this._newsBlock()}
                </ScrollView>
            </View>

        )
    }

    _funcBlock1() {
        return (
            <View style={styles.menu}>
                <View style={styles.user_info}>
                    <Text style={styles.score_text}>Điểm tích lũy</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Image style={styles.image_coin} source={require('../assets/images/ic_coin3x.png')} />
                        <Text style={styles.score_number} >2000</Text>
                        <Image style={styles.arrow_image} source={require('../assets/images/Path31_3x.png')} />
                    </View>
                </View>
                <View style={styles.line}></View>

                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 10,
                }}>
                    {this._getfuncblock("Tích điểm", require("../assets/images/ic_point3x.png"))}
                    {this._getfuncblock("Sử dụng điểm", require("../assets/images/ic_boxing3x.png"))}
                    {this._getfuncblock("Tiện ích", require("../assets/images/ic_Utilities3x.png"))}
                </View>
                <View style={{
                    width: '82%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                    marginLeft: 42,
                    // borderWidth:1,
                }}>
                    {this._getfuncblock("Hỏi-đáp", require("../assets/images/ic_QA3x.png"))}
                    {this._getfuncblock("Đặt hàng", require("../assets/images/ic_order3x.png"))}
                    {this._getfuncblock("Bảo hành", require("../assets/images/ic_guarantee3x.png"))}
                </View>
            </View>
        )
    }
    _funcBlock2() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', }}>
                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: '#EA4335', marginLeft: 13 }}>SẢN PHẨM</Text>
                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 13, color: '#EA4335', marginRight: 25, marginTop: 4 }}>Tất cả</Text>
                </View>
                <View style={{
                    width: '100%',
                    height: 227
                }}>
                    <ScrollView horizontal={true}>
                        {this.state.data.listProduct.map(product => {
                            return this._productItem(product)
                        })}
                    </ScrollView>
                </View>

            </View>
        )
    }

    _productItem(product) {
        return (
            <View style={{
                width: 150,
                height: 210,
                backgroundColor: 'white',
                marginLeft: 13,
                marginTop: 8,
                // alignItems:'center'
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,


            }}>
                <Image
                    style={{
                        width: 150,
                        height: 134,
                        resizeMode: 'contain',
                    }}
                    source={{ uri: product.image }} />
                <Text style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 15,
                    color: '#000000',
                    marginLeft: 8,
                    // alignItems:'center'
                }}>{product.name}</Text>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Image style={{
                        width: 14,
                        height: 14,
                        margin: 6,

                    }} source={require('../assets/images/ic_mac3x.png')} />
                    <Text style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: 14,
                        color: '#F70029',
                        marginBottom: 2
                    }}>{product.price}đ</Text>
                </View>
            </View>
        )
    }

    _newsBlock() {
        return (
            <View style={{
                flex: 1,
                //width:'100%',
                backgroundColor: 'white',
                marginTop: 5
            }}>
                <View style={{
                    width: '100%',
                    marginTop: 13,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: 'Roboto-Regular',
                        color: '#000000',
                        marginLeft: 18,
                    }}>TIN TỨC</Text>
                    <Text style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: 13,
                        color: 'red',
                        marginTop: 5,
                        marginRight: 20,
                    }}>Tất cả</Text>
                </View>
                <ScrollView>
                    {this.state.data.listNews.map(news => {
                        return this._newsItem(news)
                    })}
                </ScrollView>
            </View>

        )


    }

    _newsItem(news) {
        return (
            <View style={{
                width: 343,
                height: 91,
                marginLeft: 18,
                marginTop: 13,
                flexDirection: 'row',
                //backgroundColor: 'green'
            }}>
                <Image style={{
                    width: 91,
                    height: 91,
                    resizeMode: 'cover',
                    borderRadius: 5,
                }} source={{ uri: news.urlImage }} />
                <View style={{
                    width: 239,
                    marginLeft: 13,
                    //justifyContent:'center'
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontFamily: 'Roboto-Medium',
                        marginTop: 4,
                        //resizeMode: 'contain'
                    }}>
                        {news.title}</Text>
                    <Text style={{
                        fontSize: 12,
                        fontFamily: 'Roboto-Italic',
                    }}>{news.date}</Text>
                </View>
            </View>


        )
    }

    _getfuncblock(title, imagePath, ) {
        return (
            <View>
                <View
                    style={
                        styles.function_block}>

                    <Image style={styles.icon_function}
                        source={imagePath} />
                    <Text
                        style={styles.word_function}
                    > {title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray'
    },
    menu: {
        width: '95%',
        height: 200,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        margin: 10,

    },
    user_info: {
        margin: 8,
        width: '96%',
        backgroundColor: 'white',
        alignContent: 'space-between',
        flexDirection: 'row',
    },
    score_text: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        paddingTop: 5,
        //borderWidth: 1,
    },
    score_number: {

        fontSize: 18,
        fontFamily: 'Roboto-Medium',
        marginLeft: 5.7,
        color: '#EA4335',
        //borderWidth:1,
        paddingTop: 2,
    },
    image_coin: {

        width: 15.35,
        height: 15.62,
        marginTop: 7,
        marginRight: 0,
        resizeMode: 'contain',

    },
    arrow_image: {
        height: 15.5,
        width: 15.5,
        marginTop: 7,
        resizeMode: 'contain'

    },
    line: {
        height: 0.5,
        marginLeft: 6,
        marginRight: 6,
        backgroundColor: '#8B8B8B',
        marginTop: 5
    },
    function_block: {
        justifyContent: 'center',
        // justifyContent: 'center',
        //flex:1,
        alignItems: 'center',
        //borderWidth:1,

    },
    icon_function: {
        width: 36,
        height: 36,

    },
    word_function: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
    }
})
