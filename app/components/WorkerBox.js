'use strict';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';

import AvatarImage from './AvatarImage';
import TriangleCorner from './TriangleCorner';

const WorkerBox = React.createClass({
    propTypes: {
        worker: React.PropTypes.object.isRequired,
        _redirect: React.PropTypes.func.isRequired,
    },

    _toProfile() {
        this.props._redirect('Profile', {user: this.props.worker.user});
    },

    render() {
        const worker = this.props.worker;
        return (
            <TouchableHighlight style={styles.container} onPress={this._toProfile}>
                <View style={styles.inner}>
                    <AvatarImage image={worker.user.profile.avatar} style={styles.pushDown}/>
                    <View style={[styles.details, styles.pushDown]}>
                        <Text style={styles.bold}>{worker.user.first_name} {worker.user.last_name}</Text>
                        <Text style={styles.small}><Text
                            style={styles.bold}>Hours: </Text>{worker.user.profile.hours_available}</Text>
                        <Text style={styles.small}>
                            <Text><Text style={styles.bold}>Cred: </Text>1</Text>
                            <Text style={styles.safeSpace}><Text style={styles.bold}>Cred: </Text>1</Text>
                        </Text>
                    </View>
                    <TriangleCorner
                        style={worker.user.profile.is_available ? {borderTopColor: 'green'} : {borderTopColor: 'red'}}/>
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