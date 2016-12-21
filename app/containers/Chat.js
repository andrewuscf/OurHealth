'use strict';

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ChatActions from '../actions/ChatActions';


const Chat = React.createClass({
    componentDidMount() {
        if (!this.props.Rooms.length) {
            this.props.actions.getChatRooms();
        }
    },

    render() {
        console.log(this.props.Rooms)
        return (
            <View style={styles.mainContainer}>
                <Text>Messages</Text>
            </View>
        );
    }
});


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
});

const stateToProps = (state) => {
    return {
        RequestUser: state.Global.RequestUser,
        ...state.Chat
    };
};

const dispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ChatActions, dispatch)
    }
};

export default connect(stateToProps, dispatchToProps)(Chat);
