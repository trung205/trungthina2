import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    
} from 'react-native'
import { Header } from 'react-native-elements'
import R from '@R'
//import { styles } from '~/constants/Theme'
import NavigationUtil from '~/navigation/NavigationUtil'
//import *as from '@theme'

export default class DaiichiHeader extends Component {
    render() {
        return (
            <Header
                statusBarProps={{ barStyle: 'dark-content', translucent: true, backgroundColor: 'transparent'}}
                placement='left'
                containerStyle={styles.header}
                leftComponent={this.props.back &&
                    <TouchableOpacity
                        onPress={() => {
                            NavigationUtil.goBack()
                        }}>
                        <Image
                            style={{
                                height: 17,
                                width: 24,
                            }}
                        />

                    </TouchableOpacity>}
                centerComponent={<Text
                style={styles.header_title}>
                    {this.props.title}
                </Text>}
            />
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#12A74E'
    },
    header_title: {
        fontSize: 18,
        color: 'white'
    }

})