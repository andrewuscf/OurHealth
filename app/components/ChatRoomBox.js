'use strict';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

import AvatarImage from './AvatarImage';

var {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');

const ChatRoomBox = React.createClass({
    propTypes: {
        room: React.PropTypes.object.isRequired,
        _redirect: React.PropTypes.func.isRequired,
    },

    _toProfile() {
        this.props._redirect('Messages', {room: this.props.room});
    },

    render() {
        const worker = this.props.worker;
        console.log(worker);
        return (
            <TouchableHighlight style={styles.container} onPress={this._toProfile} underlayColor='white'>
                <View style={styles.inner}>

                </View>
            </TouchableHighlight>
        )
    }
});

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: deviceWidth/2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        marginTop: 20,
    }
});

export default ChatRoomBox;