'use strict';

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as ProfileActions from '../actions/ProfileActions';

import AvatarImage from '../components/AvatarImage';
import HireFooter from '../components/HireFooter';


const Profile = React.createClass({

    _back() {
        this.props.navigator.pop();
    },

    render() {
        const user = this.props.User;
        console.log(user)
        return (
            <View style={styles.mainContainer}>
                <ScrollView ref='scrollView' keyboardDismissMode='interactive'
                            style={styles.mainContainer} contentContainerStyle={styles.contentContainerStyle}>
                    <View style={styles.backNav}>
                        <TouchableOpacity onPress={this._back} style={styles.backNavButton}>
                            <Icon name="angle-left" size={28} color='#d4d4d4'/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainContent}>
                        <AvatarImage image={user.profile.avatar} style={styles.avatar}/>
                        <Text style={[styles.center, styles.userName]}>{user.first_name} {user.last_name}</Text>
                    </View>
                </ScrollView>
                {user.type == '2' || user.type == 2 ?
                    <TouchableOpacity style={styles.newCommentSection} onPress={this.props.openHireModal}>
                        <Text style={styles.text}>Hire</Text>
                    </TouchableOpacity> : null}
            </View>
        );
    }
});


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    backNav: {
        borderBottomWidth: .5,
        borderBottomColor: 'rgba(0,0,0,.15)'
    },
    backNavButton: {
        padding: 5,
        paddingTop: 2,
        paddingLeft: 12,
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
        ...state.Profile
    };
};

const dispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ProfileActions, dispatch)
    }
};

export default connect(stateToProps, dispatchToProps)(Profile);
