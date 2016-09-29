'use strict';

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as HomeActions from '../actions/HomeActions';


const Today = React.createClass({

    componentDidUpdate(prevProps) {
        if (this.props.RequestUser  != prevProps.RequestUser) {
            // Get workers if current user is client and vice verus.
            if (this.props.RequestUser.profile.type == 'Client') {
                // this.props.actions.loadWorkers();
            } else {
                // this.props.actions.loadClients();
            }
        }
    },

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>Home</Text>
            </View>
        );
    }
});


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
});

const stateToProps = (state) => {
    return {
        RequestUser: state.Global.RequestUser,
        ...state.Home
    };
};

const dispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(HomeActions, dispatch)
    }
};

export default connect(stateToProps, dispatchToProps)(Today);
