'use strict';

import React from 'react';
import {StyleSheet, Text, View, ListView, Platform} from 'react-native';
import moment from 'moment';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
// import * as GlobalActions from '../../actions/GlobalActions';

import AvatarImage from '../../components/AvatarImage';
import BackBar from '../../components/BackBar';
import DayBox from '../../components/DayBox';


const JobDetail = React.createClass({
    propTypes: {
        job: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        const workDaysWanted = this.props.job.work_request.days.map(day => {
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
            daysAccepted: [],
            workDaysWanted: workDaysWanted
        }
    },

    removeDay() {
        console.log('remove');
    },

    accept() {
        console.log('accept');
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
                        <Text>${this.props.job.work_request.rate}/Hour</Text>
                    </View>
                </View>
            </View>
        )
    },


    render() {
        const job = this.props.job;
        console.log(job);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dataSource = ds.cloneWithRows(this.state.workDaysWanted);
        return (
            <View style={styles.mainContainer}>
                <BackBar back={this.props.navigator.pop}/>
                <ListView removeClippedSubviews={(Platform.OS === 'ios') ? false : true}
                          renderHeader={this._renderHeader}
                          enableEmptySections={true}
                          dataSource={dataSource} onEndReached={this.onEndReached} onEndReachedThreshold={50}
                          renderRow={(day, i) => <DayBox key={i} day={day} cancel={this.removeDay} accept={this.accept} index={i}/>}
                />
            </View>
        );
    }
});


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },topCard: {
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
        borderRadius: 110/2,
        zIndex: 1,
        marginTop: 10
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