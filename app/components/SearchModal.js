'use strict';

import React, {Component} from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import Calendar from 'react-native-calendar';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

import SelectInput from './SelectInput';


import {getRoute} from '../Routes';


var {width: deviceWidth} = Dimensions.get('window');


var SubNav = React.createClass({
    propTypes: {
        closeModal: React.PropTypes.func.isRequired,
    },

    getInitialState: function () {
        return {
            selectedDate: moment(),
            startTime: null,
            endTime: null,
            days: [],
            daysToAdd: [{date:moment()}]
        }
    },
    componentDidMount: function () {

    },

    asyncActions(start){
        // if (start) {
        //     // indication of activity
        // } else {
        //     this.closeSubNav();
        // }
    },

    onDateSelect(date) {
        this.setState({selectedDate: moment(date)})
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
        this.setState({daysToAdd:daysToAdd})
    },


    render: function () {
        var repeatOptions = [
            ['No Repeat', 0],
            ['Next Week', 1],
            ['2 Weeks', 2],
            ['3 Weeks', 3]
        ];
        return (
            <ScrollView style={styles.flexCenter} contentContainerStyle={styles.contentContainerStyle}>
                <Calendar
                    scrollEnabled={true}              // False disables swiping. Default: False
                    showControls={true}               // False hides prev/next buttons. Default: False
                    showEventIndicators={true}        // False hides event indicators. Default:False
                    titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
                    onDateSelect={(date) => this.onDateSelect(date)} // Callback after date selection
                    events={this.state.daysToAdd}
                    selectedDate={this.state.selectedDate}       // Day to be selected
                    weekStart={0}
                    customStyle={calendarElementStyle} // Customize any pre-defined styles
                />
                {this.state.selectedDate ?
                    <View style={styles.dateCard}>
                        <View style={styles.repeatTop}>
                            <Text>Repeat:</Text>
                            <SelectInput ref='repeat' options={repeatOptions} onChange={this.onRepeatChange}/>
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
                        {this.state.daysToAdd.map((day, index) =>{
                            return (
                                <Text key={`date-${index}`}>{day.date.format('MMM D')} </Text>
                            )
                        })}
                        <View style={styles.extraButtons}>
                            <TouchableOpacity style={styles.bottomButtons}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bottomButtons}>
                                <Text style={styles.buttonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    : null
                }
            </ScrollView>
        )
    }
});


var styles = StyleSheet.create({
    flexCenter: {
        flex: 1,
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
});

const DatePickerStyle = {
    dateTouch: {
        width: 42,
        // borderWidth: 0,
        // borderBottomWidth: 1,
        // borderBottomColor: '#e1e3df',
        // backgroundColor: 'transparent',
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
        backgroundColor: 'blue'
    }
};

export default SubNav;
