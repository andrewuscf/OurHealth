'use strict';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import _ from 'lodash';
// import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import AvatarImage from './AvatarImage';

const JobBox = React.createClass({
    propTypes: {
        job: React.PropTypes.object.isRequired,
        _redirect: React.PropTypes.func.isRequired
    },

    render() {
        const job = this.props.job;
        console.log(job)
        var text = 'has requested you.';
        if (job.worker_accept) {
            text = 'waiting for days to be accepted'
        } else if (job.accepted) {
            text = 'has accepted.'
        }
        const minDate = moment(_.minBy(job.work_request.days, function (o) {
            return o.end;
        }).start);
        const maxDate = moment(_.maxBy(job.work_request.days, function (o) {
            return o.end;
        }).end);
        return (
            <TouchableHighlight style={styles.container} onPress={this.props._redirect.bind(null, 'JobDetail', {job: job})}
                                underlayColor='#99d9f4'>
                <View style={styles.inner}>
                    <AvatarImage image={job.work_request.user.profile.avatar} style={styles.pushDown}/>
                    <View style={[styles.details, styles.pushDown]}>
                        <Text
                            style={styles.bold}>{job.work_request.user.first_name} {job.work_request.user.last_name}</Text>
                        <Text>{text}</Text>
                    </View>
                    <View style={styles.dateSection}>
                        <View>
                            <Text style={styles.dayMonth}>
                                {minDate.format("MMM").toUpperCase()}
                            </Text>
                            <Text style={styles.dayDay}>
                                {minDate.date()}
                            </Text>
                            <Text style={styles.dateTime}>{minDate.format('h:mm a')}</Text>
                        </View>
                        <Text style={styles.dateDivider}>-</Text>
                        <View>
                            <Text style={styles.dayMonth}>
                                {maxDate.format("MMM").toUpperCase()}
                            </Text>
                            <Text style={styles.dayDay}>
                                {maxDate.date()}
                            </Text>
                            <Text style={styles.dateTime}>{maxDate.format('h:mm a')}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: .5,
        borderBottomColor: 'rgba(0,0,0,.15)'
    },
    inner: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 15,
        marginLeft: 15
    },
    pushDown: {
        marginTop: 15
    },
    details: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 5
    },
    bold: {
        fontWeight: 'bold'
    },
    dateSection: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dayDay: {
        // fontFamily: 'OpenSans-Bold',
        fontSize: 23,
        color: '#4d4d4e',
        alignSelf: 'center',
        // paddingLeft: 4
    },
    dayMonth: {
        // fontFamily: 'OpenSans-Bold',
        fontSize: 10,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#4d4d4e'
    },
    dateDivider: {
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'center'
    },
    dateTime: {
        fontSize: 7,
        color: '#4d4d4e',
        alignSelf: 'center',
    }
});

export default JobBox;