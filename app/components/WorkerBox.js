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
        this.props._redirect('Profile', {user: this.props.worker});
    },

    render() {
        const worker = this.props.worker;
        return (
            <TouchableHighlight style={styles.container} onPress={this._toProfile} underlayColor='white'>
                <View style={styles.inner}>
                    {!_.isNil(this.props.notified) ?
                        (!this.props.notified ?
                                <TouchableOpacity
                                    onPress={this.props.inviteWorker}>
                                    <Icon name="plus-circle" size={40} color='rgba(0,0,0,.15)' style={styles.invite}/>
                                </TouchableOpacity>
                                : <Icon name="check-circle" size={40} color='#99d9f4' style={styles.invite}/>
                        )
                        : null
                    }
                    <AvatarImage image={worker.profile.avatar} style={[styles.avatar]}/>
                    <View style={[styles.details]}>
                        <Text style={styles.name}>{worker.first_name} {worker.last_name[0]}.</Text>
                        <Text style={styles.small}>
                            <Text><Text style={styles.bold}>Cred: </Text>1</Text>
                            <Text style={styles.safeSpace}><Text style={styles.bold}>Cred: </Text>1</Text>
                        </Text>
                        <View style={styles.starSection}>
                            <Icon name="star-o" size={12} color='#99d9f4'/>
                            <Icon name="star-o" size={12} color='#99d9f4'/>
                            <Icon name="star-o" size={12} color='#99d9f4'/>
                            <Icon name="star-o" size={12} color='#99d9f4'/>
                            <Icon name="star-o" size={12} color='#99d9f4'/>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
});

const styles = StyleSheet.create({
    container: {
        // borderWidth: 3,
        // borderLeftWidth: 1,
        // borderRightWidth: 3,
        borderTopWidth: 3,
        borderColor: 'rgba(0,0,0,.15)',
        height: 150,
        width: deviceWidth/2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        marginTop: 20,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        // marginLeft: 5
    },
    details: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 5
    },
    small: {
        fontSize: 11,
        alignSelf: 'center'
    },
    name: {
        fontSize: 12,
        alignSelf: 'center'
    },
    safeSpace: {
        paddingLeft: 5
    },
    invite: {
        top: -10,
        right: -40,
        position: 'absolute'
    },
    starSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default WorkerBox;