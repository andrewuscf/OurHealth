import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import GlobalActions from '../../actions/GlobalActions';

import BackBar from '../../components/BackBar';
import SubmitButton from '../../components/SubmitButton';



const EditCredentials = React.createClass({
    getInitialState() {
        return {
            text: null,
            type: null
        }
    },

    asyncActions(start){
        if (start) {
            this.refs.postbutton.setState({busy: true});
        } else {
            this.refs.postbutton.setState({busy: false});
        }
    },


    _back() {
        this.props.navigator.pop();
    },

    checkAllRequired() {
        return !!(this.state.text && this.state.type);
    },

    _onSubmit(){
        if (this.checkAllRequired()) {
            // this.props.actions.updateProfile(profileData, this.asyncActions);
        }
    },

    render() {
        if (this.props.credentials.length) {
            return (
                <View style={styles.mainContainer}>
                    <BackBar back={this._back} backText="Done"/>
                    <ScrollView scrollEventThrottle={16} refs="credentials">
                    </ScrollView>
                </View>
            );
        } else {
            return <Text>Loading...</Text>
        }

    }
});



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
});

const stateToProps = (state) => {
    return {
        RequestUser: state.Global.RequestUser
    };
};

const dispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(GlobalActions, dispatch)
    }
};

export default connect(stateToProps, dispatchToProps)(EditCredentials);
