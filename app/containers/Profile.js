'use strict';

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {fetchData, API_ENDPOINT} from '../actions/Utils';

import * as ProfileActions from '../actions/ProfileActions';
import {removeToken} from '../actions/GlobalActions';

import AvatarImage from '../components/AvatarImage';
import BackBar from '../components/BackBar';
import HireFooter from '../components/HireFooter';


const Profile = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            user: this.props.user
        }
    },


    _back() {
        this.props.navigator.pop();
    },

    _logOut() {
        this.props.removeToken();
    },

    render() {
        const user = this.state.user;
        console.log(user)
        if (user) {
            return (
                <View style={styles.mainContainer}>
                    <ScrollView ref='scrollView' keyboardDismissMode='interactive'
                                style={styles.mainContainer} contentContainerStyle={styles.contentContainerStyle}>
                        <BackBar back={this.props.navigator.pop}>
                            {user.id == this.props.RequestUser.id ?
                                <TouchableOpacity style={[styles.topNavButton, styles.submitButton]}
                                                  onPress={this._logOut}>
                                    <Text style={[styles.blueText]}>Sign Out</Text>
                                </TouchableOpacity>
                                : null
                            }
                        </BackBar>
                        <View style={styles.mainContent}>
                            <AvatarImage image={user.profile.avatar} style={styles.avatar}/>
                            <Text style={[styles.center, styles.userName]}>{user.first_name} {user.last_name}</Text>
                        </View>
                    </ScrollView>
                </View>
            );
        } else {
            return <Text>Loading...</Text>
        }

    }
});


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    nav: {
        borderColor: '#d4d4d4',
        borderBottomWidth: 1,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    topNavButton: {
        padding: 5,
        flexDirection: 'row'
    },
    cancelButton: {
        left: 0,
        alignSelf: 'center'
    },
    submitButton: {
        right: 0,
        alignSelf: 'center'
    },
    blueText: {
        color: '#00BFFF'
    },
    cancel: {
        marginLeft: 5,
        color: '#d4d4d4',
        fontSize: 15
    },
    mainContent: {
        margin: 10
    },
    avatar: {
        alignSelf: 'center',
        height: 200,
        width: 200,
        borderRadius: 100
    },
    center: {
        alignSelf: 'center'
    },
    userName: {
        fontSize: 18,
        fontWeight: "400",
        paddingTop: 15
    }
});

const stateToProps = (state) => {
    return {
        RequestUser: state.Global.RequestUser
    };
};

const dispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ProfileActions, dispatch),
        removeToken: bindActionCreators(removeToken, dispatch)
    }
};

export default connect(stateToProps, dispatchToProps)(Profile);
