import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import DaiichiHeader from '~/components/DaiichiHeader'

export default class UpdateUserInfo extends Component {

    state = {
        fullName :'Nguyễn Trường Thăng',
        phoneNumber : '0975545828'
    }


    render() {
        return (
            <View style={styles.container}>
                <DaiichiHeader
                    title='Cập nhật tài khoản'
                    back
                />
                <TextInput
                    style={styles.input_text}
                    placeholder='Họ và tên'
                    value = {this.state.fullName}
                    onChangeText = {newText =>{
                        this.setState({
                            fullName : newText
                        })
                    }}
                />

                <TextInput
                    style={styles.input_text}
                    placeholder='Số điện thoại'
                    value = {this.state.phoneNumber}
                    onChangeText = {newText =>{
                        this.setState({
                            phoneNumber : newText
                        })
                    }}
                />

                <TouchableOpacity
                    style = {{
                        width : '80%',
                        height : 50,
                        alignItems :'center',
                        justifyContent : 'center',
                        backgroundColor :'#12A74E',
                        marginTop : 10,
                        borderRadius : 25
                    }}
                    onPress ={()=>{
                        //  cập nhật lại dữ liệu trong state
                        this.setState({
                            fullName :'',
                            phoneNumber : ''
                        })
                    }}
                >
                    <Text 
                        style = {{
                            color : 'white'
                        }}
                    >Cập nhật</Text>
                </TouchableOpacity>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
        alignItems: 'center'
        
    },
    input_text: {
        width: '90%',
        height: 50,
        backgroundColor: 'gray',
        marginTop : 10

    }
})
