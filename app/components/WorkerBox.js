'use strict';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import _ from 'lodash';

import AvatarImage from './AvatarImage';
import TriangleCorner from './TriangleCorner';

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
            <TouchableHighlight style={styles.container} onPress={this._toProfile} underlayColor='#99d9f4'>
                <View style={styles.inner}>
                    <AvatarImage image={worker.profile.avatar} style={styles.pushDown}/>
                    <View style={[styles.details, styles.pushDown]}>
                        <Text style={styles.bold}>{worker.first_name} {worker.last_name}</Text>
                        <Text style={styles.small}>
                            <Text><Text style={styles.bold}>Cred: </Text>1</Text>
                            <Text style={styles.safeSpace}><Text style={styles.bold}>Cred: </Text>1</Text>
                        </Text>
                    </View>
                    {!_.isNil(this.props.notified) ?
                        (!this.props.notified ?
                        <TouchableOpacity onPress={this.props.inviteWorker}><Text>Invite</Text></TouchableOpacity>
                            : null
                        )
                        : null
                    }
                    <TriangleCorner
                        style={worker.profile.is_available ? {borderTopColor: 'green'} : {borderTopColor: 'red'}}/>
                </View>
            </TouchableHighlight>
        )
    }
});

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: .5,
        borderBottomColor: 'rgba(0,0,0,.15)'
    },
    inner: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 15,
        marginLeft: 15,
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
    greenDot: {
        width: 7,
        height: 7,
        borderRadius: 50,
        backgroundColor: 'green',
    },
    small: {
        fontSize: 11
    },
    bold: {
        fontWeight: 'bold'
    },
    safeSpace: {
        paddingLeft: 5
    }
});

export default WorkerBox;