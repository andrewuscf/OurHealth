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
import SelectInput from '../../components/SelectInput';

var {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');


const Profile = React.createClass({
    getInitialState() {
        return {
            birthday: null,
            phone_number: null,
            showRoll: false,
            showEditName: false,
            previewImage: null,
            average_rate: null,
            first_name: null,
            last_name: null,
        }
    },

    componentDidUpdate(prevProps) {
        if (!prevProps.RequestUser && this.props.RequestUser) {
            this.setState({
                birthday: moment(this.props.RequestUser.profile.date_of_birth).format('MM-DD-YYYY'),
                first_name: this.props.RequestUser.first_name,
                last_name: this.props.RequestUser.last_name,
                average_rate: this.props.RequestUser.profile.average_rate.toString(),
                phone_number: this.props.RequestUser.profile.phone_number,
            })
        }
    },

    getSelectedImages(images) {
        this.setState({
            previewImage: images[0],
        });
        this.toggleRoll();
        this.refs._scrollView.scrollTo({y: 0, false});
    },

    toggleRoll() {
        this.setState({
            showRoll: !this.state.showRoll,
        });
    },

    _onEditName() {
        this.setState({
            showEditName: !this.state.showEditName,
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

    _onAverageChange(number) {
        this.setState({
            average_rate: number
        })
    },

    _onFirstChange(text) {
        this.setState({
            first_name: text
        })
    },

    _onLastChange(text) {
        this.setState({
            last_name: text
        })
    },

    checkAllRequired() {
        return !!(this.state.birthday && this.state.phone_number && this.state.previewImage && this.state.first_name && this.state.last_name);
    },

    _onSubmit(){
        if (this.checkAllRequired()) {
            let profileData = new FormData();
            profileData.append("avatar", {
                ...this.state.previewImage,
                url: this.state.previewImage.uri,
                name: 'image.jpg',
                type: 'multipart/form-data'
            });
            profileData.append("birthday", this.state.birthday);
            profileData.append("phone_number", this.state.phone_number);
            if (this.state.average_rate)
                profileData.append("average_rate", parseInt(this.state.average_rate));
            if (this.refs.hours_available.state.value)
                profileData.append("hours_available", this.refs.hours_available.state.value);
            // If user name updated then also update user model.
            if (this.state.first_name != this.props.RequestUser.first_name || this.state.last_name != this.props.RequestUser.last_name) {
                let userData = {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name
                };
                this.props.actions.updateUser(userData);
            }
            this.props.actions.updateProfile(profileData);
        }
    },

    render() {
        const rollPickerWidth = deviceWidth - 20;
        const user = this.props.RequestUser;
        // Hours available options
        var hoursOptions = [
            ['As Needed', 3],
            ['More than 30 hrs/week', 1],
            ['Less than 30 hrs/week', 2]
        ];
        if (user) {
            let userImage = EMPTY_AVATAR;
            if (this.state.previewImage) {
                userImage = this.state.previewImage.uri
            } else if (user.profile.avatar) {
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
                            {!this.state.showEditName ? <View style={styles.userName}>
                                <Text style={[styles.userNameText]}>
                                    {user.first_name} {user.last_name}
                                </Text>
                                <TouchableOpacity style={styles.userNameEdit} onPress={this._onEditName}>
                                    <Icon name="pencil" size={14} color='black'/>
                                </TouchableOpacity>
                            </View> : null}
                            {this.state.showEditName ?
                                <View style={styles.section}>
                                    <TextInput style={styles.textInput}
                                               underlineColorAndroid='transparent'
                                               autoCapitalize='words'
                                               keyboardType='default'
                                               autoCorrect={false}
                                               placeholderTextColor='#4d4d4d'
                                               onChangeText={this._onFirstChange}
                                               value={this.state.first_name}
                                               placeholder="First Name"/>
                                    <TextInput style={styles.textInput}
                                               underlineColorAndroid='transparent'
                                               autoCapitalize='words'
                                               keyboardType='default'
                                               autoCorrect={false}
                                               placeholderTextColor='#4d4d4d'
                                               onChangeText={this._onLastChange}
                                               value={this.state.last_name}
                                               placeholder="Last Name"/>
                                </View>
                                : null
                            }
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
                            {user.type == 'Worker' ?
                                <View style={styles.section}>
                                    <Text>Average Rate($)</Text>
                                    <TextInput ref="average_rate" style={styles.textInput}
                                               underlineColorAndroid='transparent'
                                               keyboardType="phone-pad"
                                               maxLength={6}
                                               placeholderTextColor='#4d4d4d' onChangeText={this._onAverageChange}
                                               value={this.state.average_rate}
                                               placeholder="Add Average Rate"/>
                                    <View style={styles.section}>
                                        <Text>Hours Available</Text>
                                        <SelectInput ref='hours_available' options={hoursOptions}/>
                                    </View>
                                </View>
                                : null
                            }
                            <TouchableOpacity style={styles.button} onPress={this._onSubmit} underlayColor='#99d9f4'>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
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
        width: 100,
        borderRadius: 50
    },
    section: {
        marginTop: 20
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
    buttonText: {
        color: 'white',
        fontSize: 15
        // fontFamily: 'OpenSans-Bold',
    },
    button: {
        marginTop: 80,
        backgroundColor: '#00BFFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 21
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
