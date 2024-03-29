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

import BackBar from '../components/BackBar';
import DayBox from './DayBox';
import SubmitButton from './SubmitButton';


import {getRoute} from '../Routes';


var {width: deviceWidth} = Dimensions.get('window');


var SearchModal = React.createClass({
    propTypes: {
        closeModal: React.PropTypes.func.isRequired,
        createRequest: React.PropTypes.func.isRequired,
        updateAvailability: React.PropTypes.func.isRequired,
        RequestUser: React.PropTypes.object.isRequired
    },

    getInitialState() {
        const originalDates = this.props.RequestUser.profile.availability.map(day => {
            const zonedStart = moment(day.start).local();
            const zonedEnd = moment(day.end).local();
            return {
                ...day,
                date: moment(day.start).local(),
                zonedStart: zonedStart,
                zonedEnd: zonedEnd,
                hours: zonedEnd.diff(zonedStart, 'hours')
            }
        });
        return {
            selectedDate: null,
            startTime: null,
            endTime: null,
            original: originalDates,
            days: originalDates,
            daysToAdd: [],
            rate: null,
            addError: null,
            showCalender: false,
            remove: []
        }
    },

    asyncActions(start){
        if (start) {
            this.refs.postbutton.setState({busy: true});
        } else {
            this.refs.postbutton.setState({busy: false});
            this.setState(this.getInitialState());
            this.props.closeModal();
        }
    },

    componentDidUpdate(prevProps, prevState) {
        if (this.state.addError) {
            Alert.alert(
                this.state.addError,
                this.state.addError,
                [
                    {text: 'OK', onPress: () => this.setState({addError: null})},
                ]
            );
        }
    },

    isValid() {
        if (this.props.RequestUser.type == "Client") {
            return (this.state.days.length && this.state.rate);
        } else {
            return (this.state.days.length);
        }
    },

    onDateSelect(selectedDate) {
        var daysToAdd = this.state.daysToAdd;
        let index = _.findIndex(daysToAdd, {date: moment(selectedDate)});
        if (index != -1) {
            daysToAdd = daysToAdd.slice(0, index).concat(daysToAdd.slice(index + 1))
        } else {
            daysToAdd = daysToAdd.concat({date: moment(selectedDate)})
        }
        this.setState({
            selectedDate: moment(selectedDate),
            daysToAdd: daysToAdd
        });
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
                    let startDate = day.date.set('hour', startTime.get('hour'))
                        .set('minute', startTime.get('minute')).set('second', 0);
                    return {
                        ...day,
                        start: startDate.clone().utc().format("YYYY-MM-DD HH:mm:ssZ"),
                        end: endDate.clone().utc().format("YYYY-MM-DD HH:mm:ssZ"),
                        zonedStart: startDate,
                        zonedEnd: endDate,
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
                    showCalender: false
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
            showCalender: false
        })
    },

    _addMore() {
        this.setState({
            showCalender: true
        });
    },

    removeDay(index) {
        this.setState({
            remove: [
                ...this.state.remove,
                this.state.days[index]
            ],
            days: this.state.days.slice(0, index).concat(this.state.days.slice(index + 1))
        })
    },

    _onSubmit() {
        if (this.isValid()) {
            if (this.props.RequestUser.type == "Client") {
                this.props.createRequest({
                    days: this.state.days,
                    rate: this.state.rate
                }, this.asyncActions);
            } else {
                this.props.updateAvailability({
                    remove: this.state.remove,
                    add: _.difference(this.state.days, this.state.original),
                }, this.asyncActions);
            }
        }
    },


    render: function () {
        const acceptedDay = _.sortBy(this.state.days, ['start', 'end']).map((day, i) => {
            return <DayBox key={i} day={day} cancel={this.removeDay} index={i}/>;
        });
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={styles.flexCenter} contentContainerStyle={styles.contentContainerStyle}>
                    <BackBar back={this.props.closeModal} backText="Cancel">
                        <SubmitButton buttonStyle={[styles.topNavButton, styles.submitButton]}
                                      textStyle={[styles.cancel, this.isValid() ? styles.blueText : null]}
                                      onPress={this._onSubmit} ref='postbutton'
                                      text='Submit'/>
                    </BackBar>

                    {this.props.RequestUser.type == "Client" ? <View>
                        <Text style={styles.mainTitle}>POST A JOB</Text>
                        <View style={[{paddingTop: 20, flexDirection: 'row'}, styles.section]}>
                            <Text style={{marginTop: 8, width: 12, marginLeft: 5, fontSize: 18}}>$</Text>
                            <TextInput ref="rate" style={[styles.textInput,{ flex: 1}]}
                                       keyboardType='numeric'
                                       autoCorrect={false}
                                       onChangeText={(rate)=>this.setState({rate: rate})}
                                       value={this.state.rate}
                                       placeholder="Per Hour"/>
                        </View>
                    </View> :
                        null
                    }

                    {acceptedDay}
                </ScrollView>
                {this.state.showCalender ?
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
                        {this.state.daysToAdd.map((day, index) => {
                            return (
                                <Text key={`date-${index}`}>{day.date.format('MMM D')} </Text>
                            )
                        })}
                        <View style={styles.extraButtons}>
                            <TouchableOpacity
                                style={[styles.bottomButtons, {borderRightWidth: 1, borderRightColor: 'white'}]}
                                onPress={this._cancel}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bottomButtons} onPress={this._addDays}>
                                <Text style={styles.buttonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <TouchableOpacity style={styles.addDays} onPress={this._addMore}>
                        <Text style={styles.buttonText}>
                            {this.props.RequestUser.type == "Client" ? 'ADD DAYS' : 'ADD AVAILABILITY'}
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
});


var styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    flexCenter: {
        flex: 1,
        width: deviceWidth
    },
    topNavButton: {
        padding: 5,
        flexDirection: 'row'
    },
    submitButton: {
        right: 0,
        alignSelf: 'center'
    },
    mainTitle: {
        fontSize: 20,
        paddingTop: 10,
        alignSelf: 'center',
        color: '#4d4d4d',
        fontWeight: 'bold'
    },
    section: {
        borderBottomWidth: 1,
        borderColor: '#b1aea5'
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
        // fontFamily: 'OpenSans-Semibold',
        borderBottomWidth: 0,
        borderBottomColor: '#4d4d4e',
        backgroundColor: 'transparent',
        height: 40,
        marginLeft: 10
    },
    dateCard: {
        borderWidth: 1,
        borderColor: '#b1aea5',
    },
    timePickers: {
        height: 40,
        flexDirection: 'row'
    },
    extraButtons: {
        height: 40,
        marginTop: 10,
        flexDirection: 'row'
    },
    bottomButtons: {
        flex: 2,
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
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
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 40,
        paddingRight: 40,
        position: 'absolute',
        bottom:0,
        left:0,
        width: deviceWidth
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
