'use strict';

import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

const AvatarImage = React.createClass({
    propTypes: {
        image: React.PropTypes.string,
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
        // Deal with no image inside component rather than parent.
        if (this.props.image) {
            return (
                <Image style={[styles.avatar, this.props.style]} source={{uri: this.props.image}}/>
            );
        }
        return null;
    }
});

var styles = StyleSheet.create({
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25
    }
});

export default AvatarImage;
