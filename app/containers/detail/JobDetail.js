'use strict';

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
// import * as GlobalActions from '../../actions/GlobalActions';

import BackBar from '../../components/BackBar';


const JobDetail = React.createClass({
    propTypes: {
        job: React.PropTypes.object.isRequired,
    },
    
    getInitialState() {
        return {
            daysAccepted: []
        }
    },


    render() {
        const job = this.props.job;
        console.log(job);
        return (
            <View style={styles.mainContainer}>
                <BackBar back={this.props.navigator.pop}/>
                <Text>JobDetail</Text>
            </View>
        );
    }
});


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
});

// const stateToProps = (state) => {
//     return state;
// };
//
// const dispatchToProps = (dispatch) => {
//     return {
//         actions: bindActionCreators(GlobalActions, dispatch)
//     }
// };

// export default connect(stateToProps, dispatchToProps)(Calendar);

export default JobDetail;