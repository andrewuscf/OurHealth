'use strict';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import AvatarImage from './AvatarImage';

const CommentBox = React.createClass({
    propTypes: {
        worker: React.PropTypes.object.isRequired
    },

    render() {
        const worker = this.props.worker;
        console.log(worker);
        return (
            <View style={styles.container}>
                <View style={styles.inner}>
                    <AvatarImage image={worker.user.profile.avatar}/>
                    <View style={styles.details}>
                        <Text style={styles.bold}>{worker.user.first_name} {worker.user.last_name}</Text>
                        <Text style={styles.small}><Text style={styles.bold}>Hours: </Text>{worker.user.profile.hours_available}</Text>
                        <Text style={styles.small}>
                            <Text><Text style={styles.bold}>Cred: </Text>1</Text>
                            <Text style={styles.safeSpace}><Text style={styles.bold}>Cred: </Text>1</Text>
                        </Text>
                    </View>
                    {worker.user.profile.is_available ? <View style={styles.greenDot}/> : null}
                </View>
            </View>
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
    details : {
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