'use strict';

import React, { Component } from 'react';
import { BackAndroid, Modal, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SelectInput = React.createClass({

    getInitialState: function () {
        return {
            showOverlay: false, // show overlay for selecting value
            options: this.props.options, // options to display
            value: this.props.options[0][1], // second item value
            selected: this.props.options[0][0] // first item label
        };
    },

    toggleOverlay: function () {
        this.setState({
            showOverlay: !this.state.showOverlay
        });
    },

    selectOption(value, label) {
        this.setState({
            value: value,
            selected: label
        });
        if(this.props.onChange){
            this.props.onChange(value);
        }
        this.toggleOverlay();
    },

    _renderOverlay: function () {
        if (this.state.showOverlay) {

            // build list of items
            const optionslist = [];
            for (var i = 0; i < this.props.options.length; i++) {
                let value = this.props.options[i][1],
                    label = this.props.options[i][0];
                optionslist.push(
                    <TouchableOpacity activeOpacity={1} key={i} style={styles.itemView} onPress={this.selectOption.bind(this, value, label)}>
                        <Text style={styles.itemText}>{label}</Text>
                    </TouchableOpacity>
                );
            }

            return (
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    onRequestClose={()=>{}}
                    visible={this.state.showOverlay}>
                    <ScrollView style={styles.popup} contentContainerStyle={styles.popupContainer}>
                        <TouchableOpacity activeOpacity={1} style={styles.closeableArea} onPress={this.toggleOverlay}></TouchableOpacity>
                        <View style={styles.card}>
                            {optionslist}
                        </View>
                    </ScrollView>
                </Modal>
            );
        } else {
            return null;
        }
    },

    render() {
        return (
            <View>
                <TouchableOpacity activeOpacity={1} onPress={this.toggleOverlay}>
                    <View style={styles.selectView}>
                        <Text style={styles.selectText}>{this.state.selected}</Text>
                    </View>
                </TouchableOpacity>
                {this._renderOverlay()}
            </View>
        );
    }
});

var styles = StyleSheet.create({
    popup: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)'
    },
    popupContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    closeableArea: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    card: {
        position: 'relative',
        backgroundColor: '#fff'
    },
    itemView: {
        borderBottomWidth: 1,
        borderBottomColor: '#e1e3df',
        marginLeft: 10,
        marginRight: 10,
        padding: 15
    },
    itemText: {
        textAlign: 'center',
        color: '#4d4d4e',
        fontSize: 17,
        // fontFamily: 'OpenSans-Semibold'
    },
    selectView: {},
    selectText: {
        flex: 1,
        color: '#4d4d4e',
        fontSize: 17,
        // fontFamily: 'OpenSans-Semibold',
        textDecorationLine: 'underline'
    }
});

export default SelectInput;
