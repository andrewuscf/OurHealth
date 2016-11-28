'use strict';

import React from 'react';
import {StyleSheet, Text, View, ListView, Platform} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
// import * as GlobalActions from '../../actions/GlobalActions';

import AvatarImage from '../../components/AvatarImage';
import BackBar from '../../components/BackBar';
import DayBox from '../../components/DayBox';
import SubmitButton from '../../components/SubmitButton';


const JobDetail = React.createClass({
    propTypes: {
        job: React.PropTypes.object.isRequired,
        acceptJob: React.PropTypes.func.isRequired
    },

    getInitialState() {
        const workDaysWanted = this.props.job.work_request.days_user_can_work.map(day => {
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
        const daysAccepted = this.props.job.work_days.map(day => {
            const zonedStart = moment(day.start).local();
            const zonedEnd = moment(day.end).local();
            const updatedDay = {
                ...day,
                date: moment(day.start).local(),
                zonedStart: zonedStart,
                zonedEnd: zonedEnd,
                hours: zonedEnd.diff(zonedStart, 'hours')
            };
            workDaysWanted.push(updatedDay);
            return updatedDay;
        });
        return {
            daysAccepted: daysAccepted,
            workDaysWanted: workDaysWanted,
            worker_accept: this.props.job.worker_accept
        }
    },

    asyncActions(start){
        if (start) {
            this.refs.postbutton.setState({busy: true});
        } else {
            this.refs.postbutton.setState({busy: false});
        }
    },

    cancel(dayId) {
        const index = _.findIndex(this.state.daysAccepted, (day)=> {
            return day.id == dayId
        });
        this.setState({
            daysAccepted: this.state.daysAccepted.slice(0, index).concat(this.state.daysAccepted.slice(index + 1))
        });
    },

    accept(day) {
        this.setState({
            daysAccepted: this.state.daysAccepted.concat(day)
        });
    },

    _renderHeader() {
        const client = this.props.job.work_request.user;
        return (
            <View>
                <View style={styles.topCard}>
                    <AvatarImage style={styles.avatar} image={client.profile.avatar}/>
                    <View style={styles.name}>
                        <Text style={styles.nameText}>{client.first_name} {client.last_name}</Text>
                        <Text>has requested you.</Text>
                    </View>
                    <Text
                        style={[{alignSelf: 'center'}, styles.nameText]}>${this.props.job.work_request.rate}/Hour</Text>
                </View>
                <Text>Select the days you would like to work:</Text>
            </View>
        )
    },

    _onSubmit() {
        if (this.state.daysAccepted.length) {
            let data = {
                work_days: this.state.daysAccepted,
                worker_accept: true
            };
            this.props.acceptJob(this.props.job.id, data, this.asyncActions);
            this.setState({worker_accept: true});
        }
    },


    render() {
        const job = this.props.job;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dataSource = ds.cloneWithRows(this.state.workDaysWanted);
        return (
            <View style={styles.mainContainer}>
                <BackBar back={this.props.navigator.pop}/>
                <ListView removeClippedSubviews={(Platform.OS === 'ios') ? false : true}
                          renderHeader={this._renderHeader}
                          enableEmptySections={true}
                          dataSource={dataSource}
                          renderRow={(day, i) => <DayBox key={i} day={day}
                                                         acceptedDay={_.indexOf(this.state.daysAccepted, day) != -1}
                                                         cancel={this.cancel}
                                                         accept={this.accept}
                                                         index={i}/>}
                />
                {!job.accepted ? <SubmitButton buttonStyle={styles.button}
                                  textStyle={styles.submitText} onPress={this._onSubmit} ref='postbutton'
                                  text={this.state.worker_accept ? 'Update': 'Accept'}/>
                    : null
                }
            </View>
        );
    }
});


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    topCard: {
        elevation: 8,
        marginBottom: 16,
        backgroundColor: 'white'
    },
    name: {
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 22,
        paddingBottom: 22
    },
    nameText: {
        fontSize: 20,
        // color: '#494949',
        fontWeight: 'bold'
        // fontFamily: 'OpenSans-Semibold'
    },
    avatar: {
        alignSelf: 'center',
        width: 110,
        height: 110,
        borderRadius: 110 / 2,
        zIndex: 1,
        marginTop: 10
    },
    button: {
        backgroundColor: '#00BFFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    submitText: {
        color: 'white',
        fontSize: 15,
        // fontFamily: 'OpenSans-Bold',
    },
});

// const stateToProps = (state) => {
//     return state;
// };
//
// const dispatchToProps = (dispatch) => {
//     return {
//         actions: bindActionCreators(GlobalActions, dispatch)
//     }
// };
// export default connect(stateToProps, dispatchToProps)(Calendar);

export default JobDetail;