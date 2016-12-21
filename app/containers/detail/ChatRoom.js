'use strict';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    RefreshControl,
    ListView,
    AsyncStorage
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';

import {fetchData, API_ENDPOINT} from '../../actions/Utils';

import AvatarImage from '../../components/AvatarImage';

moment.updateLocale('en', {
    relativeTime: {
        mm: "%d mins"
    }
});

const ChatRoom = React.createClass({
    propTypes: {
        roomId: React.PropTypes.number.isRequired
    },

    getInitialState() {
        return {
            messages: [],
            next: null
        }
    },

    componentDidMount() {
        this.getMessages();
    },

    getMessages(refresh = false) {
        AsyncStorage.getItem('USER_TOKEN', (err, result) => {
            let url = `${API_ENDPOINT}messages/${this.props.roomId}/`;
            if (!refresh && this.state.next) {
                url = this.state.next;
            }
            if (result) {
                fetch(`${API_ENDPOINT}messages/${this.props.roomId}/`, fetchData('GET', null, result))
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            messages: (refresh) ? responseJson.results : this.state.messages.concat(responseJson.results),
                            next: responseJson.next
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    },

    render() {
        console.log(this.state.messages)

        if (this.state.messages.length) {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            const dataSource = ds.cloneWithRows(this.state.messages);
            return (
                <ListView
                    refreshControl={<RefreshControl refreshing={this.props.Refreshing} onRefresh={this._refresh}/>}
                    style={styles.container} enableEmptySections={true}
                    dataSource={dataSource} onEndReached={this.onEndReached} onEndReachedThreshold={50}
                    renderRow={(message, i) => (
                    <View style={styles.inner}>
                        <AvatarImage image={message.user.profile.avatar}/>
                        <View style={[styles.details]}>
                            <Text style={styles.bold}>{message.user.first_name} {message.user.last_name}</Text>

                        </View>
                    </View>
                    )
           }
                />
            );
        }
        return (
            <View style={styles.container}>
                <Text>Start Chatting</Text>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: .5,
        borderBottomColor: 'rgba(0,0,0,.15)'
    },
    inner: {
        flex: 1,
        flexDirection: 'row',
        margin: 15,
        flexWrap: 'wrap'
    },
    details: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 5
    },
    bold: {
        fontWeight: 'bold'
    },
    lastMessageSection: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 5
    },
    lastMessage: {
        color: 'rgba(0,0,0,.45)'
    },
    timeAgo: {
        paddingLeft: 6,
        color: 'rgba(0,0,0,.45)'
    }
});

export default ChatRoom;