'use strict';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

import AvatarImage from './AvatarImage';

var {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');

const WorkerBox = React.createClass({
    propTypes: {
        worker: React.PropTypes.object.isRequired,
        _redirect: React.PropTypes.func.isRequired,
    },

    _toProfile() {
        console.log(this.props.worker);
        this.props._redirect('Profile', {user: this.props.worker});
    },

    render() {
        const worker = this.props.worker;
        return (
            <TouchableHighlight style={styles.container} onPress={this._toProfile} underlayColor='white'>
                <View style={styles.inner}>
                    <AvatarImage image={worker.profile.avatar} style={[styles.avatar]}/>
                    <View style={styles.details}>
                        <Text style={styles.name}>{worker.first_name} {worker.last_name[0]}.</Text>
                        <Text style={styles.small}>
                            6 miles away | {worker.profile.age} yrs old
                        </Text>
                        <Text style={styles.small}>
                            10 yrs experience | {worker.jobs_completed} Jobs Finished
                        </Text>
                        <View style={styles.starSection}>
                            <Icon name="star-o" size={starSize} color={starColor}/>
                            <Icon name="star-o" size={starSize} color={starColor}/>
                            <Icon name="star-o" size={starSize} color={starColor}/>
                            <Icon name="star-o" size={starSize} color={starColor}/>
                            <Icon name="star-o" size={starSize} color={starColor}/>
                        </View>
                    </View>
                    {!_.isNil(this.props.notified) ?
                        (!this.props.notified ?
                                <TouchableOpacity
                                    onPress={this.props.inviteWorker} style={styles.invite}>
                                    <Icon name="plus-circle" size={40} color='rgba(0,0,0,.15)'/>
                                </TouchableOpacity>
                                : <Icon name="check-circle" size={40} color='#99d9f4' style={styles.invite}/>
                        )
                        : null
                    }
                </View>
            </TouchableHighlight>
        )
    }
});

const starSize = 12;
const starColor = '#99d9f4';

const styles = StyleSheet.create({
    container: {
        // height: 150,
        flex: 1,
        borderTopWidth: 1,
        borderColor: '#C7C7CD'
    },
    inner: {
        paddingTop: 5,
        margin: 10,
        flexDirection: 'row',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    details: {
        // flex: 1,
        flexDirection: 'column',
        paddingTop: 5,
        paddingLeft: 10,
    },
    small: {
        fontSize: 11,
        color: 'gray'
    },
    name: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black'
    },
    safeSpace: {
        paddingLeft: 5
    },

    invite: {
        top: 10,
        right: 10,
        position: 'absolute'
    },
    starSection: {
        flexDirection: 'row',
        paddingTop: 2
    }
});

export default WorkerBox;