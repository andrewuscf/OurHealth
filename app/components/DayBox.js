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

const IconSize = 25;

const DayBox = React.createClass({
    propTypes: {
        day: React.PropTypes.object.isRequired,
    },

    render() {
        let endDay = '';
        if (this.props.day.zonedStart.format('dddd') != this.props.day.zonedEnd.format('dddd')) {
            endDay = ` - ${this.props.day.zonedEnd.format('dddd')}`
        }
        return (
            <View style={[styles.DayBox, this.props.style]}>
                <View style={styles.boxDetail}>
                    <Text style={styles.daysTitle}>{this.props.day.zonedStart.format('dddd') + endDay}</Text>
                    <Text>{`Start: ${this.props.day.zonedStart.format('MMM Do YYYY, h:mm a')}`}</Text>
                    <Text>{`End: ${this.props.day.zonedEnd.format('MMM Do YYYY, h:mm a')}`}</Text>
                </View>
                {this.props.accept ?
                    this.props.acceptedDay == false ?
                        <TouchableOpacity style={styles.removeCircle}
                                          onPress={this.props.accept.bind(null, this.props.day)}>
                            <Icon name="plus-circle" size={IconSize} color='rgba(0,0,0,.15)'/>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.removeCircle}
                                          onPress={this.props.cancel.bind(null, this.props.day.id)}>
                            <Icon name="minus-circle" size={IconSize} color='red'/>
                        </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.removeCircle}
                                      onPress={this.props.cancel.bind(null, this.props.index)}>
                        <Icon name="minus-circle" size={IconSize} color='red'/>
                    </TouchableOpacity>
                }
            </View>
        )
    }
});

var styles = StyleSheet.create({
    DayBox: {
        height: 60,
        borderWidth: 1,
        borderColor: '#b1aea5',
        flexDirection: 'row',
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
