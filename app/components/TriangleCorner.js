'use strict';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const TriangleCorner = React.createClass({
    render: function () {
        return (
            <View style={[styles.triangleCorner, this.props.style]}/>
        )
    }
});

const styles = StyleSheet.create({
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 25,
        borderTopWidth: 25,
        borderRightColor: 'transparent',
        transform: [
            {rotate: '90deg'}
        ]
    }
});

export default TriangleCorner;
