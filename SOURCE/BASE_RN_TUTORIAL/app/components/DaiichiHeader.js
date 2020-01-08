import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Header } from 'react-native-elements'
import R from '@R'
import *as theme from '@theme'
import NavigationUtil from '~/navigation/NavigationUtil'

export default class DaiichiHeader extends Component {
    render() {
        return (
            <Header
                statusBarProps={{ barStyle: 'dark-content', translucent: true, backgroundColor: theme.colors.primaryDark }}
                placement='left'
                containerStyle={styles.header}
                leftComponent={this.props.back &&
                    <TouchableOpacity
                        onPress={() => {
                            NavigationUtil.goBack()
                        }}
                    >
                        <Image
                            style={{
                                width: 24,
                                height: 17
                            }}
                            source={R.images.ic_back}
                        />
                    </TouchableOpacity>
                }
                centerComponent={<Text
                    style={styles.haeder_title}
                >{this.props.title}</Text>}
            />
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#12A74E"
    },
    haeder_title: {
        fontSize: 18,
        color: 'white',
    }
})
