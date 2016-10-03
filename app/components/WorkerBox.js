'use strict';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';


import AvatarImage from './AvatarImage';

const CommentBox = React.createClass({
    propTypes: {
        worker: React.PropTypes.object.isRequired,
        loadProfile: React.PropTypes.func.isRequired,
        _redirect: React.PropTypes.func.isRequired,
    },

    _toProfile() {
        this.props.loadProfile(this.props.worker.user);
        this.props._redirect('Profile');
    },

    render() {
        const worker = this.props.worker;
        return (
            <TouchableHighlight style={styles.container} onPress={this._toProfile}>
                <View style={styles.inner}>
                    <AvatarImage image={worker.user.profile.avatar}/>
                    <View style={styles.details}>
                        <Text style={styles.bold}>{worker.user.first_name} {worker.user.last_name}</Text>
                        <Text style={styles.small}><Text
                            style={styles.bold}>Hours: </Text>{worker.user.profile.hours_available}</Text>
                        <Text style={styles.small}>
                            <Text><Text style={styles.bold}>Cred: </Text>1</Text>
                            <Text style={styles.safeSpace}><Text style={styles.bold}>Cred: </Text>1</Text>
                        </Text>
                    </View>
                    {worker.user.profile.is_available ? <View style={styles.greenDot}/> : null}
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
        margin: 15,
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

export default CommentBox;