'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    AsyncStorage,
    BackAndroid,
    Platform
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import Modal from 'react-native-modalbox';

import * as GlobalActions from './actions/GlobalActions';

import Login from './containers/Login';
import Home from './containers/Home';
import EditProfile from './containers/edit/EditProfile';

import NavBar from './components/Navbar';


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
                return <SceneComponent openHireModal={this.openHireModal} navigator={ nav }
                                       route={route} {...route.passProps}/>;
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


    componentWillMount() {
        AsyncStorage.getItem('USER_TOKEN', (err, result) => {
            if (result) {
                this.props.actions.setTokenInRedux(result);
            }
            this.setState({splashArt: false});
        });
    },

    openHireModal: function (id) {
        this.refs.modal1.open();
    },


    render() {
        if (!this.state.splashArt) {
            if (this.props.UserToken) {
                if (this.props.RequestUser && this.props.RequestUser.profile.completed) {
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
                                       RequestUser={this.props.RequestUser}
                                       checkInColor="red"/> }
                            />
                            <Modal style={[styles.modal, styles.hireModal]} backdrop={false} ref={"modal1"}
                                   swipeToClose={true}>
                                <Text style={styles.text}>Basic modal</Text>
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
                       clearAPIError={this.props.actions.clearAPIError}
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
        left: 0
    },
    hireModal: {
        flex: 1,
        backgroundColor: "#3B5998"
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
