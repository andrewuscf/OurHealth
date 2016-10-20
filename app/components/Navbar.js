'use strict';

import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {getRoute} from '../Routes';

var NavBar = React.createClass({

    _onPress(routeName) {
        if (routeName == 'Profile'){
            this.props.navigator.push(getRoute(routeName, {user: this.props.RequestUser}));
            return;
        }
        this.props.navigator.push(getRoute(routeName));
    },

    isActiveRoute(routeName){
        return routeName == this.props.activeRoute;
    },

    render: function () {
        return (
            <View style={styles.primaryBar}>
                <TouchableOpacity style={styles.buttonWrap} onPress={this._onPress.bind(null, 'Home')}>
                    <View style={styles.button}>
                        <Icon name="th-list" size={20}
                              color={ (!this.isActiveRoute('Home')) ? iconColor : iconColorActive }/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonWrap} onPress={this._onPress.bind(null, 'Calendar')}>
                    <View style={styles.button}>
                        <Icon name="calendar-check-o" size={20}
                              color={ (!this.isActiveRoute('Calendar')) ? iconColor : iconColorActive }/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonWrap} onPress={this.props.openModal}>
                    <View style={[styles.createButton, {backgroundColor: this.props.checkInColor}]}>
                        <Text style={styles.createText}>+</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonWrap} onPress={this._onPress.bind(null, 'Messages')}>
                    <View style={styles.button}>
                        <Icon name="comment-o" size={20}
                              color={ (!this.isActiveRoute('Messages')) ? iconColor : iconColorActive }/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonWrap} onPress={this._onPress.bind(null, 'Profile')}>
                    <View style={styles.button}>
                        <Icon name="user" size={20}
                              color={ (!this.isActiveRoute('Profile')) ? iconColor : iconColorActive }/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
});

var iconColor = '#b1aea5';
var iconColorActive = '#ffa272';

var styles = StyleSheet.create({
    primaryBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 47,
        backgroundColor: 'white',
        borderColor: '#e1e3df',
        borderTopWidth: 1
    },

    text: {
        color: iconColor,
        marginTop: 1,
        fontSize: 10,
    },
    textActive: {
        color: iconColorActive,
        marginTop: 1,
        fontSize: 10,
    },
    buttonWrap: {
        alignItems: 'center',
        flex: 0.2
    },
    createButton: {
        borderRadius: 18,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    createText: {
        fontWeight: '700',
        fontSize: 20,
        color: 'white',
        marginBottom: 2
    },
    button: {
        alignItems: 'center',
        alignSelf: 'stretch'
    }
});


export default NavBar;