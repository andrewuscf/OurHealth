import React, {Component} from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import BackBar from '../components/BackBar';
import SubmitButton from './SubmitButton';


var {width: deviceWidth} = Dimensions.get('window');


var CheckInModal = React.createClass({
    propTypes: {
        closeModal: React.PropTypes.func.isRequired,
        day: React.PropTypes.object
    },


    asyncActions(start){
        if (start) {
            this.refs.postbutton.setState({busy: true});
        } else {
            this.refs.postbutton.setState({busy: false});
            this.props.closeModal();
        }
    },

    componentDidUpdate(prevProps, prevState) {
        if (this.state.addError) {
            Alert.alert(
                this.state.addError,
                this.state.addError,
                [
                    {text: 'OK', onPress: () => this.setState({addError: null})},
                ]
            );
        }
    },

    isValid() {

    },


    _onSubmit() {
        if (this.isValid()) {

        }
    },


    render: function () {
        console.log(this.props)
        return (
            <ScrollView style={styles.flexCenter} contentContainerStyle={styles.contentContainerStyle}>
                <BackBar back={this.props.closeModal} backText="Cancel">
                    <SubmitButton buttonStyle={[styles.topNavButton, styles.submitButton]}
                                  textStyle={[styles.cancel, this.isValid() ? styles.blueText : null]}
                                  onPress={this._onSubmit} ref='postbutton'
                                  text='Submit'/>
                </BackBar>

            </ScrollView>
        )
    }
});


var styles = StyleSheet.create({
    flexCenter: {
        flex: 1,
        width: deviceWidth
    },
    topNavButton: {
        padding: 5,
        flexDirection: 'row'
    },
    submitButton: {
        right: 0,
        alignSelf: 'center'
    },
    cancel: {
        marginLeft: 5,
        color: '#d4d4d4',
        fontSize: 15
    },
    blueText: {
        color: '#00BFFF'
    },
});


export default CheckInModal;
