'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

import * as HomeActions from '../actions/HomeActions';

import {getRoute} from '../Routes';

import WorkerBox from '../components/WorkerBox';


const Home = React.createClass({

    getInitialState() {
        return {
            location: null
        }
    },

    componentWillMount() {
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
            this.getUsers(location);
            this.setState({location: location})
        });
        BackgroundGeolocation.on('stationary', (stationaryLocation) => {
            //handle stationary locations here
            console.log(stationaryLocation)
        });
        BackgroundGeolocation.on('error', (error) => {
            console.log('[ERROR] BackgroundGeolocation error:', error);
        });

        BackgroundGeolocation.start(() => {
            console.log('[DEBUG] BackgroundGeolocation started successfully');
        });
    },

    getUsers(location, refresh = false) {
        // Get workers if current user is client and vice verus.
        if (this.props.RequestUser.type == 'Client') {
            this.props.actions.loadWorkers(location, refresh);
        } else {
            // this.props.actions.loadClients();
        }
    },


    refresh() {
        this.getUsers(this.state.location, true);
    },

    onEndReached() {
        console.log('hit')
    },

    _redirect(routeName, props = null) {
        this.props.navigator.push(getRoute(routeName, props));
    },

    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dataSource = ds.cloneWithRows(this.props.Workers);
        return (
            <ListView
                refreshControl={<RefreshControl refreshing={this.props.Refreshing} onRefresh={this.refresh}/>}
                style={styles.container} enableEmptySections={true}
                dataSource={dataSource} onEndReached={this.onEndReached} onEndReachedThreshold={50}
                renderRow={(worker, i) => <WorkerBox key={i} 
                worker={worker} _redirect={this._redirect} />}
            />
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

export default connect(stateToProps, dispatchToProps)(Home);
