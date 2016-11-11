'use strict';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    ListView
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';

import AvatarImage from './AvatarImage';
import TriangleCorner from './TriangleCorner';
import WorkerBox from './WorkerBox';

const WorkRequestBox = React.createClass({
    propTypes: {
        WorkRequest: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return {
            showUsers: false
        }
    },

    _toggleShow() {
        this.setState({showUsers: !this.state.showUsers})
    },


    render() {
        const workRequest = this.props.WorkRequest;
        let users = null;
        if (this.state.showUsers) {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            const dataSource = ds.cloneWithRows(workRequest.matches);
            users = <ListView
                style={styles.container} enableEmptySections={true}
                dataSource={dataSource} onEndReached={this.onEndReached} onEndReachedThreshold={50}
                renderRow={(worker, i) => <WorkerBox key={i}
                                                     notified={_.indexOf(workRequest.notified, worker.id) != -1}
                                                     worker={worker} _redirect={this.props._redirect}/>}
            />;
        }
        const minDate = moment(_.minBy(workRequest.days, function (o) {
            return o.end;
        }).start);
        const maxDate = moment(_.maxBy(workRequest.days, function (o) {
            return o.end;
        }).end);
        return (
            <View>
                <TouchableHighlight style={styles.container} onPress={this._toggleShow} underlayColor='#99d9f4'>
                    <View style={styles.detailStyle}>
                        <Text style={styles.rate}>Rate: {workRequest.rate}</Text>
                        <Text style={[styles.rate,{bottom: 10}]}>Matches: {workRequest.matches.length}</Text>
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
                {users}
            </View>
        )
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: .5,
        borderBottomColor: 'rgba(0,0,0,.15)'
    },
    rate: {
        position: 'absolute',
        fontSize: 15,
    },
    detailStyle: {
        padding: 10,
    },
    dateSection: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    dayDay: {
        // fontFamily: 'OpenSans-Bold',
        fontSize: 23,
        color: '#4d4d4e',
        paddingLeft: 6
    },
    dayMonth: {
        // fontFamily: 'OpenSans-Bold',
        fontSize: 11,
        backgroundColor: 'transparent',
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
    }

});

export default WorkRequestBox;