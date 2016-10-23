'use strict';

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

import {fetchData, API_ENDPOINT} from '../../actions/Utils';

import * as ProfileActions from '../../actions/ProfileActions';

import AvatarImage from '../../components/AvatarImage';


const Profile = React.createClass({
    getInitialState() {
        return {
            birthday: null
        }
    },

    componentDidUpdate(prevProps) {
        if (!prevProps.RequestUser && this.props.RequestUser) {
            this.setState({birthday: moment(this.props.RequestUser.profile.date_of_birth).format('MM-DD-YYYY')})
        }
    },


    _back() {
        this.props.navigator.pop();
    },

    render() {
        const user = this.props.RequestUser;
        console.log(user)
        if (user) {
            return (
                <View style={styles.mainContainer}>
                    <ScrollView ref='scrollView' keyboardDismissMode='interactive'
                                style={styles.mainContainer} contentContainerStyle={styles.contentContainerStyle}>
                        {this.props.RequestUser.profile.completed ? <View style={styles.backNav}>
                            <TouchableOpacity onPress={this._back} style={styles.backNavButton}>
                                <Icon name="angle-left" size={28} color='#d4d4d4'/>
                            </TouchableOpacity>
                        </View> : null}
                        <View style={styles.mainContent}>
                            <AvatarImage image={user.profile.avatar} style={styles.avatar}/>
                            <View style={styles.userName}>
                                <Text style={[styles.userNameText]}>
                                    {user.first_name} {user.last_name}
                                </Text>
                                <TouchableOpacity style={styles.userNameEdit}>
                                    <Icon name="pencil" size={14} color='black'/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.section}>
                                <Text>Birthday</Text>
                                <DatePicker
                                    style={{width: 200}}
                                    date={this.state.birthday}
                                    mode="date"
                                    placeholder="select date"
                                    format="MM-DD-YYYY"
                                    minDate="01-01-1930"
                                    maxDate={moment().format('MM-DD-YYYY')}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={DatePickerStyle}
                                    onDateChange={(birthday) => {this.setState({birthday: birthday})}}
                                />
                            </View>
                            <View style={styles.section}>
                                <Text>Phone Number</Text>

                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        } else {
            return <Text>Loading...</Text>
        }

    }
});


const DatePickerStyle = {
    dateIcon: {
        position: 'absolute',
        left: 0,
        top: 4,
        marginLeft: 0
    },
    dateInput: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e3df',
        backgroundColor: 'transparent',
    }
};

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
        height: 100,
        width: 100
    },
    section: {
        marginTop: 30
    },
    userName: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userNameEdit: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingBottom: 5
    },
    userNameText: {
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
        actions: bindActionCreators(ProfileActions, dispatch)
    }
};

export default connect(stateToProps, dispatchToProps)(Profile);
