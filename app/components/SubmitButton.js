'use strict';

import React, {Component} from 'react';
import {TouchableHighlight, View, Image, Text, StyleSheet} from 'react-native';

const MiddleButton = React.createClass({
    getInitialState() {
        return {
            busy: false,
            disabled: this.props.disabled
        }
    },
    onPress: function () {
        if (this.state.busy) {
            console.log('This button is busy -- onPress blocked');
        } else if (this.state.disabled) {
            console.log('This button is disabled -- onPress blocked');
        } else {
            this.props.onPress();
        }
    },
    render() {

        // button style based on action
        let actionstyle = null;
        if (this.state.busy) {
            actionstyle = styles.activeButtonStyle;
        } else if (this.state.disabled) {
            actionstyle = styles.disabledButtonStyle;
        }

        // text or icon?
        let content = this.props.text;

        // render
        return (
            <TouchableHighlight style={[this.props.buttonStyle, actionstyle]} onPress={this.onPress}
                                underlayColor='#99d9f4'>
                <View style={styles.wrapper}>
                    {this.state.busy ?
                        <View style={[styles.iconWrapper]}>
                            <Image style={styles.icon} source={require('../assets/images/wait-white.gif')}/>
                        </View> :
                        <Text style={[this.props.textStyle]}>
                            {content}
                        </Text>
                    }
                </View>
            </TouchableHighlight>
        )
    }
});

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    disabledButtonStyle: {
        backgroundColor: '#d9d6cd'
    },
    activeButtonStyle: {
        backgroundColor: '#fff'
    },
    iconWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 36,
        height: 9,
    }
});

export default MiddleButton;