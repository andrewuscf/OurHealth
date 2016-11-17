'use strict';

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
//
// import * as GlobalActions from '../../actions/GlobalActions';


const JobDetail = React.createClass({
    propTypes: {
        job: React.PropTypes.object.isRequired,
    },

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>JobDetail</Text>
            </View>
        );
    }
});


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
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