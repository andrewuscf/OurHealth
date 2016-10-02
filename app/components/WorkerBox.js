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
                <AvatarImage image={worker.user.profile.avatar} />
                <Text>{worker.user.first_name} {worker.user.last_name}</Text>
            </View>
        )
    }
});

const styles = StyleSheet.create({
    container: {
        margin: 15,
    }
});

export default CommentBox;