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

import * as HomeActions from '../actions/HomeActions';

import {getRoute} from '../Routes';

import WorkRequestBox from '../components/WorkRequestBox';


const Home = React.createClass({

    componentDidMount() {
        if (!this.props.WorkRequests.length) {
            this.props.actions.getWorkRequests();
        }
    },

    refresh() {
    },

    onEndReached() {
        console.log('End reach')
    },

    _redirect(routeName, props = null) {
        this.props.navigator.push(getRoute(routeName, props));
    },

    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dataSource = ds.cloneWithRows(this.props.WorkRequests);
        if (this.props.WorkRequests.length) {
            return (
                <ListView
                    refreshControl={<RefreshControl refreshing={this.props.Refreshing} onRefresh={this.refresh}/>}
                    style={styles.container} enableEmptySections={true}
                    dataSource={dataSource} onEndReached={this.onEndReached} onEndReachedThreshold={50}
                    renderRow={(WorkRequest, i) => <WorkRequestBox key={i} WorkRequest={WorkRequest} _redirect={this._redirect}/>}
                />
            );
        }
        console.log(this.props.RequestUser);
        return <View><Text>You have to add a request in order to view nurses.</Text></View>
    }
});


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
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
