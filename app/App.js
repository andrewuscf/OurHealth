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

import * as GlobalActions from './actions/GlobalActions';

import Login from './containers/Login';
import Home from './containers/Home';

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
            // case 'CreateLoop':
            //     return <SceneComponent createLoop={this.props.actions.createLoop} navigator={ nav }
            //                            route={route}/>;
            // case 'CreatePoll':
            //     return <SceneComponent createPoll={this.props.actions.createPoll} navigator={ nav }
            //                            route={route}/>;
            default :
                return <SceneComponent navigator={ nav } route={route}/>;

        }

    },

    itemChangedFocus(route) {
        this.props.actions.setActiveRoute(route.name);
    },
    

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.UserToken != this.props.UserToken) {
            this.props.actions.getRequestUser();
        }
    },

    componentWillMount() {
        AsyncStorage.getItem('USER_TOKEN', (err, result) => {
            if (result) {
                this.props.actions.setTokenInRedux(result);
            }
            this.setState({splashArt: false});
        });
    },


    render() {
        if (!this.state.splashArt) {
            if (this.props.UserToken) {
                return (
                    <View style={styles.container}>
                        <Navigator initialRoute={{component: Home, name: 'Home'}}
                                   ref={(nav) => { navigator = nav; }}
                                   renderScene={ this._renderScene }
                                   onDidFocus={this.itemChangedFocus}
                                   navigationBar={<NavBar
                                    activeRoute={this.props.Route}
                                    thisUser={this.props.RequestUser}
                                    checkInColor="red"/> }
                        />
                    </View>
                );
            }
            return <Login login={this.props.actions.login} error={this.props.Error}/>;
        }
        // Should replace this with a splash art.
        return null;
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 20 : 0
    }
});

const stateToProps = (state) => {
    return state;
};

const dispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(GlobalActions, dispatch)
    }
};

export default connect(stateToProps, dispatchToProps)(App);
