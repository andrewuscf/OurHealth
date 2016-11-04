'use strict';

import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var {width: deviceWidth} = Dimensions.get('window');

const DayBox = React.createClass({
    propTypes: {
        day: React.PropTypes.object.isRequired,
    },

    remove() {

    },

    // remove() {
    //
    // },


    render() {
        console.log(this.props.day)
        let endDay = '';
        if (this.props.day.start.format('dddd') != this.props.day.end.format('dddd')) {
            endDay = ` - ${this.props.day.end.format('dddd')}`
        }
        return (
            <View style={[styles.DayBox, this.props.style]}>
                <View style={styles.boxDetail}>
                    <Text style={styles.daysTitle}>{this.props.day.start.format('dddd') + endDay}</Text>
                    <Text>{`Start: ${this.props.day.start.format('MMM Do YYYY, h:mm a')}`}</Text>
                    <Text>{`End: ${this.props.day.end.format('MMM Do YYYY, h:mm a')}`}</Text>
                </View>
                <TouchableOpacity style={styles.removeCircle}>
                    <Icon name="times-circle" size={25} color='red'/>
                </TouchableOpacity>
            </View>
        )
    }
});

var styles = StyleSheet.create({
    DayBox: {
        height: 60,
        borderWidth: 1,
        borderColor: '#b1aea5',
        width: deviceWidth,
        flexDirection: 'row'
    },
    boxDetail: {
        width: deviceWidth * .90
    },
    daysTitle: {
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#000"
    },
    removeCircle: {
        alignSelf: 'center'
    }
});

export default DayBox;
