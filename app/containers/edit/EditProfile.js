'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Dimensions
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import CameraRollPicker from 'react-native-camera-roll-picker';

import {fetchData, API_ENDPOINT} from '../../actions/Utils';

import * as ProfileActions from '../../actions/ProfileActions';

import AvatarImage from '../../components/AvatarImage';
import {EMPTY_AVATAR} from '../../assets/constants';

var {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');


const Profile = React.createClass({
    getInitialState() {
        return {
            birthday: null,
            phone_number: null,
            showRoll: false,
            previewImage: null
        }
    },

    componentDidUpdate(prevProps) {
        if (!prevProps.RequestUser && this.props.RequestUser) {
            this.setState({birthday: moment(this.props.RequestUser.profile.date_of_birth).format('MM-DD-YYYY')})
        }
    },

    getSelectedImages(images) {
        this.setState({
            previewImage: images[0],
        });
        this.toggleRoll();
        this.refs._scrollView.scrollTo({y: 0,false});
    },

    toggleRoll() {
        console.log('hit');
        this.setState({
            showRoll: !this.state.showRoll,
        });
    },


    _back() {
        this.props.navigator.pop();
    },

    _onPhoneChange(number) {
        this.setState({
            phone_number: number
        })
    },

    render() {
        const rollPickerWidth = deviceWidth - 20;
        const user = this.props.RequestUser;
        console.log(user)
        if (user) {
            let userImage = EMPTY_AVATAR;
            if (user.profile.avatar) {
                userImage = user.profile.avatar;
            }
            return (
                <View style={styles.mainContainer}>
                    {this.state.showRoll ?
                        <CameraRollPicker imageMargin={2} containerWidth={rollPickerWidth}
                                          callback={this.getSelectedImages} maximum={1} selected={[]}/>
                        : null
                    }
                    <ScrollView ref='_scrollView' keyboardDismissMode='interactive'
                                style={styles.mainContainer} contentContainerStyle={styles.contentContainerStyle}>
                        {this.props.RequestUser.profile.completed ? <View style={styles.backNav}>
                            <TouchableOpacity onPress={this._back} style={styles.backNavButton}>
                                <Icon name="angle-left" size={28} color='#d4d4d4'/>
                            </TouchableOpacity>
                        </View> : null}
                        <View style={styles.mainContent}>
                            <AvatarImage image={userImage} style={styles.avatar} redirect={this.toggleRoll}/>
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
                                    onDateChange={(birthday) => {
                                        this.setState({birthday: birthday})
                                    }}
                                />
                            </View>
                            <View style={styles.section}>
                                <Text>Phone Number</Text>
                                <TextInput ref="phone_number" style={styles.textInput}
                                           underlineColorAndroid='transparent'
                                           keyboardType="phone-pad"
                                           maxLength={10}
                                           placeholderTextColor='#4d4d4d' onChangeText={this._onPhoneChange}
                                           value={this.state.phone_number}
                                           placeholder="Add Phone Number"/>
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
    },
    textInput: {
        flex: 1,
        height: 35,
        color: 'black',
        backgroundColor: 'transparent',
        paddingTop: 2,
        fontSize: 17,
        textAlignVertical: 'top',
    },
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
