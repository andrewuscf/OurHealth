import React from 'react';
import {StyleSheet, Text, View, RefreshControl, ListView, ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            <ScrollView contentContainerStyle={styles.scrollContainer}
                        refreshControl={<RefreshControl refreshing={this.props.Refreshing} onRefresh={this._refresh}/>}>
                <View style={styles.noRequests}>
                    <Icon name="comment-o" size={60}
                          color='#b1aea5'/>
                    <Text style={styles.noRequestTitle}>
                        You don't have any matched jobs. As soon as you are matched with a job you can message care
                        givers.
                    </Text>
                </View>
            </ScrollView>
        );
    }
});


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    scrollContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noRequests: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    noRequestTitle: {
        fontSize: 15,
        color: '#b1aeb9',
        textAlign: 'center',
        paddingTop: 20,
        // fontFamily: 'OpenSans-Semibold'
    }
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
