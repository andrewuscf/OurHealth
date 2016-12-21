'use strict';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    ListView
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

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
                contentContainerStyle={{flexDirection: 'row',flexWrap: 'wrap',}}
                enableEmptySections={true}
                dataSource={dataSource} onEndReached={this.onEndReached} onEndReachedThreshold={50}
                renderRow={(worker, i) => <WorkerBox key={i}
                                                     inviteWorker={this.props.inviteWorker.bind(null, worker.id, workRequest.id)}
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
            <View  style={styles.container} >
                <TouchableHighlight onPress={this._toggleShow} underlayColor='white'>
                    <View style={styles.detailStyle}>
                        <Text style={styles.rate}>Rate: {workRequest.rate}</Text>
                        <Text style={[styles.rate, {bottom: 10}]}>
                            <Icon name="user" size={20} color="black"/>
                            {workRequest.matches.length}
                        </Text>
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
                            <TouchableOpacity onPress={this._toggleShow} underlayColor='#99d9f4' style={styles.edit}>
                                <Icon name="ellipsis-v" size={20} color='rgba(0,0,0,.55)'/>
                            </TouchableOpacity>
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
        borderBottomWidth: 3,
        borderBottomColor: '#99d9f4'
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayDay: {
        // fontFamily: 'OpenSans-Bold',
        fontSize: 23,
        color: '#4d4d4e',
        alignSelf: 'center'
    },
    dayMonth: {
        // fontFamily: 'OpenSans-Bold',
        fontSize: 11,
        backgroundColor: 'transparent',
        color: '#4d4d4e',
        alignSelf: 'center'
    },
    dateDivider: {
        paddingLeft: 5,
        paddingRight: 5,
        alignSelf: 'center'
    },
    dateTime: {
        fontSize: 7,
        color: '#4d4d4e',
        alignSelf: 'center'
    },
    edit: {
        paddingLeft: 15,
        paddingRight: 5,
        // borderWidth: 5,
        // borderColor: 'black'
    },

});

export default WorkRequestBox;