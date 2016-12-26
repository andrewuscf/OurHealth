'use strict';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    AsyncStorage,
    TouchableHighlight,
    Dimensions,
    TextInput
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {fetchData, API_ENDPOINT} from '../../actions/Utils';

import * as ChatActions from '../../actions/ChatActions';

import AvatarImage from '../../components/AvatarImage';
import BackBar from '../../components/BackBar';
import MessageBox from '../../components/MessageBox';

var windowSize = Dimensions.get('window');

const ChatRoom = React.createClass({
    propTypes: {
        roomId: React.PropTypes.number.isRequired
    },

    getInitialState() {
        return {
            messages: [],
            next: null,
            message: null
        }
    },

    componentDidMount() {
        this.getMessages();
    },

    _back() {
        this.props.navigator.pop();
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

    onSendPress() {
        return {

        }
    },

    render() {
        var list = this.state.messages.map((message, index) => {
            return (
                <MessageBox key={index} message={message}
                            position={message.user.id == this.props.RequestUser.id ? 'right': 'left'}/>
            )
        });
        return (
            <View style={styles.container}>
                <BackBar back={this._back} backText="Cancel"/>
                <View style={styles.chatContainer}>
                    <ScrollView
                        ref={(c) => this._scrollView = c}
                        scrollEventThrottle={16}
                        onContentSizeChange={(e) => {
                        }}>
                        {list}
                    </ScrollView>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.textContainer}>
                        <TextInput
                            ref="newcomment"
                            autoCapitalize='none'
                            underlineColorAndroid='transparent'
                            autoCorrect={true}
                            placeholder="Write a message..."
                            placeholderTextColor="#b1aea5"
                            style={styles.input}
                            value={this.state.message}
                            onChangeText={(text) => this.setState({message: text})}
                        />
                    </View>
                    <View style={styles.sendContainer}>
                        <TouchableHighlight
                            underlayColor={'#4e4273'}
                            onPress={this.onSendPress}
                        >
                            <Text style={styles.sendLabel}>SEND</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#ffffff'
    },
    chatContainer: {
        flex: 11,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    sendContainer: {
        justifyContent: 'flex-end',
        paddingRight: 10
    },
    sendLabel: {
        color: '#00BFFF',
        fontSize: 15
    },
    input: {
        width: windowSize.width - 70,
        color: 'black',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        height: 32,
        borderColor: '#b1aea5',
        borderWidth: 1,
        borderRadius: 2,
        alignSelf: 'center',
        backgroundColor: '#ffffff'
    },
});

const stateToProps = (state) => {
    return {
        RequestUser: state.Global.RequestUser
    };
};

const dispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ChatActions, dispatch)
    }
};


export default connect(stateToProps, dispatchToProps)(ChatRoom);
