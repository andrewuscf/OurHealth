'use strict';

import React from 'react';
import {StyleSheet, Text, View, ListView, Platform} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';

import * as HomeActions from '../actions/HomeActions';

import DayBox from '../components/DayBox';


const Calendar = React.createClass({
    getInitialState() {
        return {
            schedule: this.updateSchedule(this.props.Jobs),
        }
    },
    componentDidMount() {
        if (!this.props.Jobs.length) {
            this.props.actions.getJobs();
        }
    },

    updateSchedule(jobs) {
        const schedule = [];
        jobs.forEach(job => {
            job.work_days.forEach(work_day => {
                const zonedStart = moment(work_day.start).local();
                const zonedEnd = moment(work_day.end).local();
                const updatedDay = {
                    ...work_day,
                    date: moment(work_day.start).local(),
                    zonedStart: zonedStart,
                    zonedEnd: zonedEnd,
                    hours: zonedEnd.diff(zonedStart, 'hours'),
                    job: job
                };
                schedule.push(updatedDay);
            })
        });
        return schedule;
    },

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.Jobs != this.props.Jobs) {
            this.setState({schedule: this.updateSchedule(this.props.Jobs)});
        }
    },

    checkInModal(job) {
        this.props.actions.selectJob(job);
        this.props.openModal();
    },

    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dataSource = ds.cloneWithRows(this.state.schedule);
        return (
            <View style={styles.mainContainer}>
                <Text>Calendar</Text>
                <ListView removeClippedSubviews={(Platform.OS === 'ios') ? false : true}
                          enableEmptySections={true}
                          dataSource={dataSource}
                          renderRow={(day, i) => <DayBox key={i} day={day} RequestUser={this.props.RequestUser}
                                                         checkInModal={this.checkInModal}
                                                         index={i}/>}
                />
            </View>
        );
    }
});


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
});

const stateToProps = (state) => {
    return {
        RequestUser: state.Global.RequestUser,
        ...state.Home
    };
};

const dispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(HomeActions, dispatch)
    }
};

export default connect(stateToProps, dispatchToProps)(Calendar);
