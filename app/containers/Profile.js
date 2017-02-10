'use strict';

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, ListView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import FCM from 'react-native-fcm';

import {fetchData, API_ENDPOINT, getFontSize} from '../actions/Utils';

import * as ProfileActions from '../actions/ProfileActions';
import {removeToken} from '../actions/GlobalActions';

import AvatarImage from '../components/AvatarImage';
import BackBar from '../components/BackBar';
import CredentialBox from '../components/CredentialBox';
import HireFooter from '../components/HireFooter';
import Loading from '../components/Loading';


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
        const self = this;
        FCM.getFCMToken().then(token => {
            self.props.removeToken(token);
        });
    },

    render() {
        const user = this.state.user;
        console.log(user)
        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // const dataSource = ds.cloneWithRows(user.credentials);
        // const credentials = (
        //     <ListView enableEmptySections={true} dataSource={dataSource}
        //         renderRow={(credential, i) => <CredentialBox key={i} credential={credential} />}
        //     />
        // );
        if (user) {
            return (
                <View style={styles.mainContainer}>
                    <BackBar back={this.props.navigator.pop}>
                        {user.id == this.props.RequestUser.id ?
                            <TouchableOpacity style={[styles.topNavButton, styles.submitButton]}
                                              onPress={this._logOut}>
                                <Text style={[styles.blueText, {fontWeight: 'bold'}]}>Sign Out</Text>
                            </TouchableOpacity>
                            : null
                        }
                    </BackBar>
                    <ScrollView ref='scrollView' keyboardDismissMode='interactive'
                                style={styles.mainContainer} contentContainerStyle={styles.contentContainerStyle}>
                        <View style={styles.topDetails}>
                            <AvatarImage image={user.profile.avatar} style={styles.avatar}/>
                            <Text style={styles.userName}>{user.first_name} {user.last_name[0]}.</Text>
                            <View style={styles.details}>
                                <Text style={styles.small}>
                                    6 miles away | {user.profile.age} yrs old
                                </Text>
                                <Text style={styles.small}>
                                    10 yrs experience | {user.jobs_completed} Jobs Finished
                                </Text>
                                <View style={styles.starSection}>
                                    <Icon name="star-o" size={starSize} color={starColor}/>
                                    <Icon name="star-o" size={starSize} color={starColor}/>
                                    <Icon name="star-o" size={starSize} color={starColor}/>
                                    <Icon name="star-o" size={starSize} color={starColor}/>
                                    <Icon name="star-o" size={starSize} color={starColor}/>
                                    <Text style={styles.starRating}>(4)</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.mainDetails}>
                            <View style={styles.section}>
                                <View style={styles.sectionItem}>
                                    <Text style={styles.sectionTitle}>Crendentials</Text>
                                </View>
                                <View style={styles.sectionItem}>
                                    <Text>Crendentials</Text>
                                </View>
                                <View style={styles.sectionItem}>
                                    <Text>Crendentials</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        } else {
            return <Loading />
        }

    }
});

const starSize = 18;
const starColor = '#99d9f4';


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
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
    submitButton: {
        right: 0,
        alignSelf: 'center',
    },
    blueText: {
        color: '#00BFFF'
    },
    topDetails: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00BFFF'
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 15
    },
    details: {
        flexDirection: 'column',
    },
    small: {
        fontSize: 11,
        color: '#f2f3f4',
        textAlign: 'center',
        paddingTop: 2,
    },
    starSection: {
        flexDirection: 'row',
        paddingTop: 5,
        alignSelf: 'center',
    },
    starRating:{
        color: starColor,
        paddingLeft: 5,
        fontSize: starSize-1,
        top: 3,
        position: 'absolute'
    },
    mainDetails:{
        flex: 1,
        backgroundColor: '#edebe6'
    },
    section: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: 'white',
        marginTop: 5,
        borderTopWidth: 0.5,
        borderColor: '#d6d7da',
        // alignItems: 'center',
        // paddingTop: 13,
        // paddingBottom: 13
    },
    sectionItem: {
        borderBottomWidth: 0.5,
        borderColor: '#d6d7da',
        paddingBottom: 5,
        paddingTop: 5,
    },
    sectionTitle: {
        fontSize: getFontSize(22),
        lineHeight: getFontSize(26),
        backgroundColor: 'transparent',
        alignSelf: 'center',
        paddingBottom: 5,
        paddingTop: 5,
        // fontFamily: 'OpenSans-Semibold',
        // color: '#fee0d4',
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
