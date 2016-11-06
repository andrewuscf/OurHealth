'use strict';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';

import AvatarImage from './AvatarImage';
import TriangleCorner from './TriangleCorner';

const WorkRequestBox = React.createClass({
    propTypes: {
        WorkRequest: React.PropTypes.object.isRequired,
    },


    render() {
        const workRequest = this.props.WorkRequest;
        return (
            <View>
                <TouchableHighlight style={styles.container}>
                    <Text>{workRequest.rate}</Text>
                </TouchableHighlight>
            </View>
        )
    }
});

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: .5,
        borderBottomColor: 'rgba(0,0,0,.15)'
    }
});

export default WorkRequestBox;