'use strict';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import AvatarImage from './AvatarImage';
import moment from 'moment';

moment.updateLocale('en', {
    relativeTime: {
        mm: "%d mins"
    }
});

var {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');

const MessageBox = React.createClass({
    propTypes: {
        message: React.PropTypes.object.isRequired,
        // _redirect: React.PropTypes.func.isRequired,
    },

    render() {
        const message = this.props.message;
        return (
            <View style={[styles.left.container]}>
                <View style={[styles.left.wrapper]}>
                    <Text style={styles.messageLabel}>{message.message}</Text>
                </View>
            </View>
        )
    }
});

const styles = {
    left: StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'flex-start',
            width : deviceWidth * .75,
            paddingTop: 10,
            // paddingTop: 10,
        },
        wrapper: {
            borderRadius: 15,
            backgroundColor: '#f0f0f0',
            marginRight: 60,
            minHeight: 20,
            justifyContent: 'flex-end'
        }
    }),
    right: StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'flex-end',
        },
        wrapper: {
            borderRadius: 15,
            backgroundColor: '#0084ff',
            marginLeft: 60,
            minHeight: 20,
            justifyContent: 'flex-end',
        },
        containerToNext: {
            borderBottomRightRadius: 3,
        },
        containerToPrevious: {
            borderTopRightRadius: 3,
        },
    }),
};

export default MessageBox;