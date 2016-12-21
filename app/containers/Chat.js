'use strict';

import React from 'react';
import {StyleSheet, Text, View, RefreshControl, ListView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getRoute} from '../Routes';

import * as ChatActions from '../actions/ChatActions';

import ChatRoomBox from '../components/ChatRoomBox';


const Chat = React.createClass({
    componentDidMount() {
        if (!this.props.Rooms.length) {
            this.props.actions.getChatRooms();
        }
    },

    _refresh() {
        this.props.actions.getChatRooms(true);
    },

    _redirect(routeName, props = null) {
        this.props.navigator.push(getRoute(routeName, props));
    },

    render() {
        if (this.props.Rooms.length) {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            const dataSource = ds.cloneWithRows(this.props.Rooms);
            return (
                <ListView
                    refreshControl={<RefreshControl refreshing={this.props.Refreshing} onRefresh={this._refresh}/>}
                    style={styles.container} enableEmptySections={true}
                    dataSource={dataSource} onEndReached={this.onEndReached} onEndReachedThreshold={50}
                    renderRow={(room, i) => <ChatRoomBox key={i} room={room} RequestUser={this.props.RequestUser} 
                                             _redirect={this._redirect} />}
                />
            );
        }
        return (
            <View style={styles.mainContainer}>
                <Text>No Messages</Text>
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
