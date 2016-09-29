'use strict';

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as HomeActions from '../actions/HomeActions';


const Today = React.createClass({

    getInitialState() {
        return {
            position: null
        }
    },


    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({position: position});
            },
            (error) => console.log(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

        this.watchID = navigator.geolocation.watchPosition((position) => {
            this.setState({position: position});
        });
    },

    getUsers() {
        // Get workers if current user is client and vice verus.
        if (this.props.RequestUser.profile.type == 'Client') {
            this.props.actions.loadWorkers(this.state.position, true);
        } else {
            // this.props.actions.loadClients();
        }
    },

    componentDidUpdate(prevProps, prevState) {
        if (this.state.position != prevState.position && this.props.RequestUser) {
            this.getUsers();
        }
        if (this.props.RequestUser != prevProps.RequestUser && this.state.position) {
            this.getUsers();
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
