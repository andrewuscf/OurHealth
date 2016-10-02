'use strict';

import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

const AvatarImage = React.createClass({
    propTypes: {
        image: React.PropTypes.string.isRequired,
        redirect: React.PropTypes.func
    },

    onPress(userId) {
        if (this.props.redirect) {
            this.props.redirect();
        }
    },


    render() {
        if (this.props.redirect) {
            return (
                <TouchableOpacity onPress={this.onPress}>
                    <Image style={[styles.avatar, this.props.style]} source={{uri: this.props.image}}/>
                </TouchableOpacity>
            );
        }
        return (
            <Image style={[styles.avatar, this.props.style]} source={{uri: this.props.image}}/>
        );
    }
});

var styles = StyleSheet.create({
    avatar: {
        height: 100,
        width: 100,
        // borderRadius: 20
    }
});

export default AvatarImage;
