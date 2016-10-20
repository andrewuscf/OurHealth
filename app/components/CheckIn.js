'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Animated
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

var {height: deviceHeight} = Dimensions.get('window');

import {getRoute} from '../Routes';

var SubNav = React.createClass({
    propTypes: {
        checkInStatus: React.PropTypes.number.isRequired,
        checkInColor: React.PropTypes.string.isRequired,
        updateCheckInStatus: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return {offset: new Animated.Value(deviceHeight)}
    },
    componentDidMount: function () {
        Animated.timing(this.state.offset, {
            duration: 200,
            toValue: 0
        }).start();
    },

    asyncActions(start){
        if (start) {
            // indication of activity
        } else {
            this.closeSubNav();
        }
    },

    updateStatus(status) {
        if (status != this.props.checkInStatus) {
            this.props.updateCheckInStatus(this.asyncActions, status);
        }
    },

    closeSubNav: function () {
        Animated.timing(this.state.offset, {
            duration: 200,
            toValue: deviceHeight
        }).start(this.props.closeSubNav);
    },

    selectedStatus() {
        return {
            backgroundColor: this.props.checkInColor
        }
    },

    render: function () {
        const status = this.props.checkInStatus;
        return (
            <Animated.View style={[styles.modal, {transform: [{translateY: this.state.offset}]}]}>

                <View style={styles.optionGroup}>
                    <View style={styles.leftView}>
                        <Text style={styles.optionGroupTitle}>Post</Text>
                    </View>
                    <View style={styles.rightView}>
                        <TouchableOpacity activeOpacity={1} style={styles.subText} onPress={this.props.toggleCreateLoop}>
                            <Text style={styles.iconLabel}>Share something</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={styles.subText} onPress={this.props.toggleCreatePoll}>
                            <Text style={styles.iconLabel}>Take a poll</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.optionGroup, {marginTop: 30}]}>
                    <View style={styles.leftView}>
                        <Text style={styles.optionGroupTitle}>Check In</Text>
                    </View>
                    <View style={styles.rightView}>
                        <TouchableOpacity activeOpacity={1} style={[styles.subText,(status==1)? this.selectedStatus(): null]}
                                          onPress={this.updateStatus.bind(null,1)}>
                            <Text style={[styles.iconLabel,(status==1)? styles.iconLabelNope: null]}>Here</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={[styles.subText,(status==4)? this.selectedStatus(): null]}
                                          onPress={this.updateStatus.bind(null,4)}>
                            <Text style={[styles.iconLabel,(status==4)? styles.iconLabelNope: null]}>Working remotely</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={[styles.subText,(status==6)? this.selectedStatus(): null]}
                                          onPress={this.updateStatus.bind(null,6)}>
                            <Text style={[styles.iconLabel,(status==6)? styles.iconLabelNope: null]}>Tied up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={[styles.subText,(status==8)? this.selectedStatus(): null]}
                                          onPress={this.updateStatus.bind(null,8)}>
                            <Text style={[styles.iconLabel,(status==8)? styles.iconLabelNope: null]}>Done for today</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={[styles.subText,(status==2)? this.selectedStatus(): null]}
                                          onPress={this.updateStatus.bind(null,2)}>
                            <Text style={[styles.iconLabel,(status==2)? styles.iconLabelNope: null]}>Out sick</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={[styles.subText,(status==3)? this.selectedStatus(): null]}
                                          onPress={this.updateStatus.bind(null,3)}>
                            <Text style={[styles.iconLabel,(status==3)? styles.iconLabelNope: null]}>On vacation</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={[styles.subText,(status==5)? this.selectedStatus(): null]}
                                          onPress={this.updateStatus.bind(null,5)}>
                            <Text style={[styles.iconLabel,(status==5)? styles.iconLabelNope: null]}>Off</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.closeSubNavWrapper}>
                    <TouchableOpacity activeOpacity={1} onPress={this.closeSubNav}
                                      style={[styles.closeIcon, {backgroundColor: this.props.checkInColor}]}>
                        <Icon name="times" size={20} color='#fff' />
                    </TouchableOpacity>
                </View>

            </Animated.View>
        )
    }
});


var styles = StyleSheet.create({
    flexCenter: {
        flex: 1,
    },
    modal: {
        backgroundColor: 'rgba(0,0,0,.8)',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    leftView: {
        flex: 0.5,
        flexDirection: 'column',
    },
    rightView: {
        flex: 0.5,
        flexDirection: 'column',
    },

    optionGroup: {
        flexDirection: 'row',
    },
    optionGroupTitle: {
        fontFamily: 'OpenSans-Semibold',
        fontSize: 15,
        color: '#6a6a68',
        textAlign: 'center',
        margin: 2
    },
    subText: {
        alignSelf: 'flex-start',
        borderRadius: 4,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 7,
        paddingRight: 7,
        marginBottom: 8,
    },
    iconLabelNope: {
        textDecorationLine: 'none',
    },
    iconLabel: {
        fontFamily: 'OpenSans-Semibold',
        fontSize: 17,
        textDecorationLine: 'underline',
        color: 'white',
    },

    closeSubNavWrapper: {
        paddingTop: 20,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    closeIcon: {
        marginBottom: 7,
        borderRadius: 18,
        width: 36,
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeText: {
        transform: [{
            rotateZ: '-45deg'
        }]
    },
});

export default SubNav;
