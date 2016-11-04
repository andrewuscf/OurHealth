'use strict';

import React, {Component} from 'react';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import Calendar from 'react-native-calendar';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

import DayBox from './DayBox';
import SelectInput from './SelectInput';


import {getRoute} from '../Routes';


var {width: deviceWidth} = Dimensions.get('window');


var SearchModal = React.createClass({
    propTypes: {
        closeModal: React.PropTypes.func.isRequired,
        createRequest: React.PropTypes.func.isRequired,
    },

    getInitialState: function () {
        return {
            selectedDate: moment(),
            startTime: null,
            endTime: null,
            days: [],
            daysToAdd: [{date: moment()}],
            rate: null,
            addError: null
        }
    },

    asyncActions(start){
        // if (start) {
        //     // indication of activity
        // } else {
        //     this.closeSearchModal();
        // }
    },

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedDate && this.state.selectedDate != prevState.selectedDate) {
            this.onRepeatChange(this.refs.repeat.state.value)
        }
        if (this.state.addError) {
            Alert.alert(
                this.state.addError,
                this.state.addError,
                [
                    {text: 'OK', onPress: () => this.clearAddError()},
                ]
            );
        }
    },

    isValid() {
        return !!(this.state.days.length && this.state.rate);
    },

    clearAddError() {
        this.setState({
            addError: null
        })
    },

    onDateSelect(date) {
        this.setState({selectedDate: moment(date)});
    },

    onRepeatChange(value) {
        const selectedDate = this.state.selectedDate;
        let daysToAdd = [
            {date: selectedDate.clone()},
            (value == 1 || value == 2 || value == 3) ? {date: selectedDate.clone().add(1, 'w')} : null,
            (value == 2 || value == 3) ? {date: selectedDate.clone().add(2, 'w')} : null,
            (value == 3) ? {date: selectedDate.clone().add(3, 'w')} : null,
        ];
        // Used to remove nulls from array.
        daysToAdd = _.compact(daysToAdd);
        this.setState({daysToAdd: daysToAdd})
    },

    onRateChange(rate){
        this.setState({rate: rate});
    },

    _addDays() {
        if (this.state.startTime && this.state.endTime) {
            let startTime = moment(this.state.startTime, "hh:mm A");
            let endTime = moment(this.state.endTime, "hh:mm A");

            let daysToAdd = this.state.daysToAdd.map(day => {
                    let endDate = day.date.clone();
                    // If start time is pm and end time is am. Then end time is next day.
                    if (startTime.get('hour') > 12 && endTime.get('hour') < 12) {
                        endDate = endDate.add(1, 'days');
                    }
                    endDate.set('hour', endTime.get('hour')).set('minute', endTime.get('minute')).set('second', 0);
                    let startDate = day.date.set('hour', startTime.get('hour')).set('minute', startTime.get('minute')).set('second', 0);
                    return {
                        ...day,
                        start: startDate,
                        end: endDate,
                        hours: endDate.diff(startDate, 'hours')
                    }
                }
            );
            let hasOverHours = _.findIndex(daysToAdd, function (o) {
                    return o.hours > 8
                }) != -1;
            let lessThanOneHour = _.findIndex(daysToAdd, function (o) {
                    return o.hours < 1
                }) != -1;
            if (hasOverHours) {
                this.setState({
                    addError: 'Job must be 8 hours or less.',
                });
            } else if (lessThanOneHour) {
                this.setState({
                    addError: 'Job must be at least 1 hour long.',
                });
            } else {
                this.setState({
                    selectedDate: null,
                    days: this.state.days.concat(daysToAdd),
                    daysToAdd: [],
                });
            }
        } else {
            this.setState({
                addError: 'Please add start time and end Time.',
            });
        }
    },

    _cancel() {
        this.setState({
            selectedDate: null,
            daysToAdd: [],
        })
    },

    _addMore() {
        this.setState({
            selectedDate: moment(),
            startTime: null,
            endTime: null,
            daysToAdd: [{date: moment()}],
        });
    },

    _onSubmit() {
        if (this.isValid()){
            this.props.createRequest();
        }
    },


    render: function () {
        var repeatOptions = [
            ['No Repeat', 0],
            ['Next Week', 1],
            ['2 Weeks', 2],
            ['3 Weeks', 3]
        ];
        const acceptedDay = _.sortBy(this.state.days, ['start', 'end']).map((day, i) => {
            return <DayBox key={i} day={day}/>;
        });
        return (
            <ScrollView style={styles.flexCenter} contentContainerStyle={styles.contentContainerStyle}>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={this.props.closeModal}
                                      style={[styles.topNavButton, styles.cancelButton]}>
                        <Icon name="arrow-left" size={17} color='#00BFFF'/>
                        <Text style={[styles.cancel, styles.blueText]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topNavButton, styles.submitButton]}>
                        <Text style={[styles.cancel, this.isValid() ? styles.blueText : null]}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.mainTitle}>Search for a nurse</Text>
                <View style={{padding: 15, paddingTop: 20}}>
                    <Text>How much would you like to pay per hour?</Text>
                    <TextInput ref="rate" style={styles.textInput}
                               keyboardType='numeric'
                               autoCorrect={false}
                               placeholderTextColor='#4d4d4d' onChangeText={this.onRateChange}
                               value={this.state.rate}
                               placeholder="Please enter a $ amount."/>
                </View>
                {this.state.selectedDate ?
                    <View style={styles.dateCard}>
                        <Calendar
                            scrollEnabled={false}              // False disables swiping. Default: False
                            showControls={true}               // False hides prev/next buttons. Default: False
                            showEventIndicators={true}        // False hides event indicators. Default:False
                            titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
                            onDateSelect={(date) => this.onDateSelect(date)} // Callback after date selection
                            events={[
                                ...this.state.daysToAdd,
                                ...this.state.days
                            ]}
                            selectedDate={this.state.selectedDate}       // Day to be selected
                            weekStart={0}
                            customStyle={calendarElementStyle} // Customize any pre-defined styles
                        />
                        <View style={styles.repeatTop}>
                            <Text>Repeat:</Text>
                            <SelectInput ref="repeat" options={repeatOptions} onChange={this.onRepeatChange}/>
                        </View>
                        <View style={styles.timePickers}>
                            <DatePicker style={{flex: 2}}
                                        mode="time"
                                        placeholder="Start Time"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        format="hh:mm A"
                                        date={this.state.startTime}
                                        showIcon={false}
                                        onDateChange={(startTime) => {
                                            this.setState({startTime: startTime})
                                        }}
                            />
                            <DatePicker style={{flex: 2}}
                                        mode="time"
                                        placeholder="End Time"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        format="hh:mm A"
                                        date={this.state.endTime}
                                        showIcon={false}
                                        onDateChange={(endTime) => {
                                            this.setState({endTime: endTime})
                                        }}
                            />
                        </View>
                        <Text>{this.state.selectedDate.format('dddd')}</Text>
                        {this.state.daysToAdd.map((day, index) => {
                            return (
                                <Text key={`date-${index}`}>{day.date.format('MMM D')} </Text>
                            )
                        })}
                        <View style={styles.extraButtons}>
                            <TouchableOpacity style={styles.bottomButtons} onPress={this._cancel}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bottomButtons} onPress={this._addDays}>
                                <Text style={styles.buttonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <TouchableOpacity style={styles.addDays} onPress={this._addMore}>
                        <Text style={styles.buttonText}>Add Days</Text>
                    </TouchableOpacity>
                }
                {acceptedDay}
            </ScrollView>
        )
    }
});


var styles = StyleSheet.create({
    flexCenter: {
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
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
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
    mainTitle: {
        fontSize: 20,
        alignSelf: 'center',
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#000"
    },
    cancel: {
        marginLeft: 5,
        color: '#d4d4d4',
        fontSize: 15
    },
    blueText: {
        color: '#00BFFF'
    },
    scrollStyle: {
        paddingTop: 10
    },
    textInput: {
        color: '#4d4d4e',
        fontSize: 17,
        // fontFamily: 'OpenSans-Semibold',
        borderBottomWidth: 0,
        borderBottomColor: '#4d4d4e',
        backgroundColor: 'transparent',
        height: 40
    },
    dateCard: {
        borderWidth: 1,
        borderColor: '#b1aea5',
    },
    repeatTop: {
        flexDirection: 'row'
    },
    timePickers: {
        height: 40,
        flexDirection: 'row'
    },
    extraButtons: {
        height: 20,
        bottom: 0,
        left: 0,
        flexDirection: 'row'
    },
    bottomButtons: {
        flex: 2,
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        // fontFamily: 'OpenSans-Bold',
    },
    addDays: {
        alignSelf: 'center',
        backgroundColor: '#00BFFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 70,
        marginTop: 10,
        marginBottom: 10
    }
});

const DatePickerStyle = {
    dateTouch: {
        width: 42,
    }
};

var calendarElementStyle = {
    weekendDayText: {
        fontSize: 15,
        color: 'black'
    },
    weekendHeading: {
        fontSize: 15,
        color: 'black'
    },
    eventIndicator: {
        backgroundColor: '#00BFFF'
    },
    selectedDayCircle: {
        backgroundColor: '#00BFFF'
    },
    currentDayCircle: {
        backgroundColor: '#00BFFF'
    }
};

export default SearchModal;
