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
            case 'Profile':
                return <SceneComponent navigator={ nav } route={route} {...route.passProps}/>;
            // case 'CreatePoll':
            //     return <SceneComponent createPoll={this.props.actions.createPoll} navigator={ nav }
            //                            route={route}/>;
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
        BackgroundGeolocation.configure({
            desiredAccuracy: 10,
            stationaryRadius: 50,
            distanceFilter: 50,
            locationTimeout: 30,
            notificationTitle: 'Background tracking',
            notificationText: 'enabled',
            debug: true,
            startOnBoot: false,
            stopOnTerminate: false,
            locationProvider: BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
            interval: 10000,
            fastestInterval: 5000,
            activitiesInterval: 10000,
            stopOnStillActivity: false,
        });
        BackgroundGeolocation.on('location', (location) => {
            //handle your locations here
            this.props.actions.updateLocation(location);
        });
        // BackgroundGeolocation.on('stationary', (stationaryLocation) => {
        //     //handle stationary locations here
        //     console.log(stationaryLocation)
        // });
        BackgroundGeolocation.on('error', (error) => {
            console.log('[ERROR] BackgroundGeolocation error:', error);
        });

        BackgroundGeolocation.start(() => {
            console.log('[DEBUG] BackgroundGeolocation started successfully');
        });
    },


    componentWillMount() {
        AsyncStorage.getItem('USER_TOKEN', (err, result) => {
            if (result) {
                this.props.actions.setTokenInRedux(result);
            }
            this.setState({splashArt: false});
        });
    },

    openModal() {
        this.refs.modal1.open();
    },

    closeModal() {
        this.refs.modal1.close();
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
                                           openModal={this.openModal}
                                           RequestUser={this.props.RequestUser}
                                           checkInColor="red"/> }
                            />
                            {user.type == "Worker" ?
                                <Modal style={[styles.modal]} backdrop={false} ref={"modal1"}
                                       swipeToClose={true}>
                                    <Text style={styles.text}>Worker Check In Modal</Text>
                                </Modal> :
                                <Modal style={[styles.modal]} backdrop={false} ref={"modal1"}
                                       swipeToClose={false}>
                                    <SearchModal closeModal={this.closeModal}
                                                 createRequest={this.props.actions.createRequest}/>
                                </Modal>
                            }
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
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        flex: 1,
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
