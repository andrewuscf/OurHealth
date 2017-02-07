'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    AsyncStorage,
    BackAndroid,
    Platform,
    Alert
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import Modal from 'react-native-modalbox';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

import * as GlobalActions from './actions/GlobalActions';

import Login from './containers/Login';
import Home from './containers/Home';
import EditProfile from './containers/edit/EditProfile';

import NavBar from './components/Navbar';
import SearchModal from './components/SearchModal';
import CheckInModal from './components/CheckInModal';


var navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    return false;
});

const App = React.createClass({

    getInitialState: function () {
        return {
            splashArt: true
        };
    },

    _renderScene: function (route, nav) {
        var SceneComponent = route.component;
        switch (route.name) {
            case 'Home':
                return <SceneComponent navigator={ nav } route={route} {...route.passProps}
                                       openModal={this.openSearchModal}/>;
            case 'Calendar':
                return <SceneComponent navigator={ nav } route={route} {...route.passProps}
                                       openModal={this.openCheckInModal}/>;
            default :
                return <SceneComponent navigator={ nav } route={route} {...route.passProps}/>;

        }

    },

    itemChangedFocus(route) {
        this.props.actions.setActiveRoute(route.name);
    },

    componentDidUpdate(prevProps, prevState) {
        if (this.props.Error) {
            const Error = JSON.parse(this.props.Error);
            Alert.alert(
                Error.title,
                Error.text,
                [
                    {text: 'OK', onPress: () => this.props.actions.clearAPIError()},
                ]
            );
        }
        if (!prevProps.RequestUser && this.props.RequestUser) {
            this.setupLocationService();
        }
    },


    setupLocationService() {
        // Need to change these settings before release!!!!
        BackgroundGeolocation.configure({
            desiredAccuracy: 100,
            stationaryRadius: 30,
            distanceFilter: 30,
            locationTimeout: 30,
            notificationTitle: 'Background tracking',
            notificationText: 'enabled',
            notificationIconColor: '#4CAF50',
            debug: true, // Set to false to not make sound.
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
            interval: 60000,
            fastestInterval: 60000,
            activitiesInterval: 60000
        });
        BackgroundGeolocation.on('location', (location) => {
            //handle your locations here
            this.props.actions.updateLocation(location);
        });
        BackgroundGeolocation.on('error', (error) => {
            console.log('[ERROR] BackgroundGeolocation error:', error);
        });

        BackgroundGeolocation.start(() => {
            console.log('[DEBUG] BackgroundGeolocation started successfully');
        });
    },


    componentWillMount() {
        // AsyncStorage.removeItem('USER_TOKEN');
        AsyncStorage.getItem('USER_TOKEN', (err, result) => {
            if (result) {
                this.props.actions.setTokenInRedux(result);
            }
            this.setState({splashArt: false});
        });
    },

    openCheckInModal() {
        this.refs.check_in_modal.open();
    },

    closeCheckInModal() {
        this.refs.check_in_modal.close();
    },

    openSearchModal() {
        this.refs.search_modal.open();
    },

    closeSearchModal() {
        this.refs.search_modal.close();
    },

    render() {
        if (!this.state.splashArt) {
            if (this.props.UserToken) {
                if (this.props.RequestUser && this.props.RequestUser.profile.completed) {
                    const user = this.props.RequestUser;
                    return (
                        <View style={styles.container}>
                            <Navigator initialRoute={{component: Home, name: 'Home'}}
                                       ref={(nav) => {
                                           navigator = nav;
                                       }}
                                       renderScene={ this._renderScene }
                                       onDidFocus={this.itemChangedFocus}
                                       navigationBar={<NavBar
                                           activeRoute={this.props.Route}
                                           openModal={this.openSearchModal}
                                           RequestUser={this.props.RequestUser}
                                           checkInColor="red"/> }
                            />
                            <Modal style={[styles.modal]} backdrop={false} ref={"search_modal"}
                                   swipeToClose={false}>
                                <SearchModal closeModal={this.closeSearchModal}
                                             RequestUser={this.props.RequestUser}
                                             updateAvailability={this.props.actions.updateAvailability}
                                             createRequest={this.props.actions.createRequest}/>
                            </Modal>
                            <Modal style={[styles.modal]} backdrop={false} ref={"check_in_modal"}
                                   swipeToClose={false}>
                                <CheckInModal closeModal={this.closeCheckInModal} day={this.props.SelectedDay}/>
                            </Modal>
                        </View>
                    );
                } else {
                    return <View style={styles.container}><EditProfile /></View>
                }

            }
            return <View style={styles.container}>
                <Login login={this.props.actions.login}
                       resetPassword={this.props.actions.resetPassword}
                       register={this.props.actions.register}
                       error={this.props.Error}/></View>;
        }
        // Should replace this with a splash art.
        return null;
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 20 : 0
    },
    modal: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
});

const stateToProps = (state) => {
    return state.Global;
};

const dispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(GlobalActions, dispatch)
    }
};

export default connect(stateToProps, dispatchToProps)(App);
