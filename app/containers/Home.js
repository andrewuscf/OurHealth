'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    ScrollView
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as HomeActions from '../actions/HomeActions';

import {getRoute} from '../Routes';

import JobBox from '../components/JobBox';
import SubmitButton from '../components/SubmitButton';
import WorkRequestBox from '../components/WorkRequestBox';


const Home = React.createClass({

    componentDidMount() {
        if (!this.props.WorkRequests.length) {
            this.getNeeded();
        }
    },

    getNeeded(refresh = false) {
        if (this.props.RequestUser.type == 'Client') {
            this.props.actions.getWorkRequests(refresh);
        } else {
            this.props.actions.getJobs(refresh);
        }
    },

    refresh() {
        this.getNeeded(true);
    },

    onEndReached() {
        console.log('End reach')
    },

    _redirect(routeName, props = null) {
        if (routeName == 'JobDetail') {
            props = {
                ...props,
                acceptJob: this.props.actions.acceptJob
            }
        }
        this.props.navigator.push(getRoute(routeName, props));
    },


    render() {
        if (this.props.WorkRequests.length) {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            const dataSource = ds.cloneWithRows(this.props.WorkRequests);
            return (
                <ListView
                    refreshControl={<RefreshControl refreshing={this.props.Refreshing} onRefresh={this.refresh}/>}
                    style={styles.container} enableEmptySections={true}
                    dataSource={dataSource} onEndReached={this.onEndReached} onEndReachedThreshold={50}
                    renderRow={(WorkRequest, i) => <WorkRequestBox key={i} WorkRequest={WorkRequest}
                                                                   inviteWorker={this.props.actions.inviteWorker}
                                                                   _redirect={this._redirect}/>}
                />
            );
        } else if (this.props.Jobs.length) {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            const dataSource = ds.cloneWithRows(this.props.Jobs);
            return (
                <ListView
                    refreshControl={<RefreshControl refreshing={this.props.Refreshing} onRefresh={this.refresh}/>}
                    style={styles.container} enableEmptySections={true}
                    dataSource={dataSource} onEndReached={this.onEndReached} onEndReachedThreshold={50}
                    renderRow={(job, i) => <JobBox key={i} job={job} _redirect={this._redirect}/>}
                />
            );
        }

        if (this.props.RequestUser.type == 'Client') {
            return (
                <View style={styles.noRequests}>
                    <Text style={styles.noRequestTitle}>You have to add a request in order to view nurses.</Text>
                </View>
            )
        } else {
            return (
                <ScrollView contentContainerStyle={styles.noRequests}
                            refreshControl={<RefreshControl refreshing={this.props.Refreshing} onRefresh={this.refresh}/>}>
                    <Text style={styles.noRequestTitle}>You have not matched with any jobs.</Text>
                    <Text style={styles.safeSpace}>To fix this you can:</Text>
                    <SubmitButton buttonStyle={styles.button}
                                  textStyle={styles.submitText} onPress={this._redirect.bind(null, 'EditProfile')}
                                  text='Adjust your average rate'/>
                    <SubmitButton buttonStyle={styles.button}
                                  textStyle={styles.submitText} onPress={this.props.openModal}
                                  text='Update your availability'/>
                    <View style={styles.rectangle}/>
                    <View style={styles.triangleDown}/>

                </ScrollView>
            )
        }
    }
});


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    noRequests: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        // alignSelf: 'center'
    },
    noRequestTitle: {
        fontSize: 20,
        color: '#494949',
        // fontFamily: 'OpenSans-Semibold'
    },
    safeSpace: {
        paddingTop: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#00BFFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5
    },
    submitText: {
        color: 'white',
        fontSize: 15,
    },
    rectangle: {
        width: 10,
        height: 20 * 2,
        backgroundColor: '#00BFFF'
    },
    triangleDown: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderBottomWidth: 30,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#00BFFF',
        transform: [
            {rotate: '180deg'}
        ]
    }
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
