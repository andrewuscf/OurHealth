'use strict';
import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';


const HireFooter = React.createClass({
    propTypes: {
        workerId: React.PropTypes.number.isRequired
    },

    getInitialState() {
        return {
            isModalOpen: false
        }
    },

    openModal() {
        this.setState({isModalOpen: true});
    },

    closeModal() {
        this.setState({isModalOpen: false});
    },


    render() {
        return (
            <TouchableOpacity style={styles.newCommentSection}>
                <Text style={styles.text}>Hire</Text>
            </TouchableOpacity>
        )
    }
});

const styles = StyleSheet.create({
    newCommentSection: {
        padding: 5,
        backgroundColor: 'green'
    },
    text: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center'
    }

});

export default HireFooter;