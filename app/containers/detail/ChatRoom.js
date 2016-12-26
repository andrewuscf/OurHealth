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

import {fetchData, API_ENDPOINT} from '../../actions/Utils';

import AvatarImage from '../../components/AvatarImage';
import MessageBox from '../../components/MessageBox';

var windowSize = Dimensions.get('window');

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
        var list = this.state.messages.map((message, index) => {
            return (
                <MessageBox key={index} message={message}/>
            )
        });
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <TouchableHighlight
                        underlayColor={'#4e4273'}
                        onPress={this.onBackPress}
                        style={{marginLeft: 15}}
                    >
                        <Text style={{color: '#fff'}}>&lt; Back</Text>
                    </TouchableHighlight>
                </View>
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
                            style={styles.input}
                            value={this.state.message}
                            onChangeText={(text) => this.setState({message: text})}
                        />
                    </View>
                    <View style={styles.sendContainer}>
                        <TouchableHighlight
                            underlayColor={'#4e4273'}
                            onPress={() => this.onSendPress()}
                        >
                            <Text style={styles.sendLabel}>SEND</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
        // }
        // return (
        //     <View style={styles.container}>
        //         <Text>Start Chatting</Text>
        //     </View>
        // );
    }
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#ffffff'
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#6E5BAA',
        paddingTop: 20,
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
        backgroundColor: '#6E5BAA'
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
        color: '#ffffff',
        fontSize: 15
    },
    input: {
        width: windowSize.width - 70,
        color: '#555555',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        height: 32,
        borderColor: '#6E5BAA',
        borderWidth: 1,
        borderRadius: 2,
        alignSelf: 'center',
        backgroundColor: '#ffffff'
    },
});

export default ChatRoom;