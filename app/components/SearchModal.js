'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Animated
} from 'react-native';
import _ from 'lodash';
import Calendar from 'react-native-calendar';
import Icon from 'react-native-vector-icons/FontAwesome';

var {height: deviceHeight} = Dimensions.get('window');

import {getRoute} from '../Routes';

var SubNav = React.createClass({
    propTypes: {
        closeModal: React.PropTypes.func.isRequired,
    },

    getInitialState: function () {
        return {
            selectedDate: null
        }
    },
    componentDidMount: function () {

    },

    asyncActions(start){
        // if (start) {
        //     // indication of activity
        // } else {
        //     this.closeSubNav();
        // }
    },

    onDateSelect(date) {
        this.setState({selectedDate: date})
    },


    render: function () {
        return (
            <View style={styles.flexCenter}>
                <Calendar
                    scrollEnabled={true}              // False disables swiping. Default: False
                    showControls={true}               // False hides prev/next buttons. Default: False
                    showEventIndicators={true}        // False hides event indicators. Default:False
                    titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
                    onDateSelect={(date) => this.onDateSelect(date)} // Callback after date selection
                    events={[{date:'2016-11-03'}, {date:'2016-11-04'}]}// Optional array of event objects with a date property and custom styles for the event indicator
                    selectedDate={this.state.selectedDate}       // Day to be selected
                    weekStart={0}
                    customStyle={{weekendDayText: weekendStyle, weekendHeading: weekendStyle}} // Customize any pre-defined styles
                />
            </View>
        )
    }
});

const weekendStyle = {
    fontSize: 15,
    color: 'black',
};

var styles = StyleSheet.create({
    flexCenter: {
        flex: 1,
    }
});

export default SubNav;
