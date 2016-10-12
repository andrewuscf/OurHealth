'use strict';

import React, {Component} from 'react';
import {ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput} from 'react-native';

const Login = React.createClass({
    propTypes: {
        login: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            email: null,
            password: null,
            forgotCreds: false
        }
    },

    toggleForgotCreds: function () {
        this.setState({
            forgotCreds: !this.state.forgotCreds
        });
    },

    onPress: function () {
        // sign in + forgot credentials
        if (!this.state.forgotCreds) {
            if (this.state.email && this.state.password) {
                this.props.login(this.state.email, this.state.password)
            }
        } else {
            if (this.state.email) {
                alert('Send reset for ' + this.state.email);
                this.props.resetPassword(this.state.email);
                this.toggleForgotCreds();
            }
        }
    },

    onChangeEmail(text) {
        this.setState({
            email: text
        })
    },

    onChangePassword(text) {
        this.setState({
            password: text
        })
    },

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    {(this.props.error) ? <Text>{this.props.error}</Text> : null}
                    <View style={styles.inputWrap}>
                        <TextInput ref="email" style={styles.textInput} autoCapitalize='none'
                                   keyboardType='email-address'
                                   placeholderTextColor='#4d4d4d' onChangeText={this.onChangeEmail}
                                   value={this.state.email}
                                   placeholder="Email"/>
                    </View>
                    {(!this.state.forgotCreds) ? <View style={styles.inputWrap}>
                        <TextInput ref="password" style={styles.textInput} autoCapitalize='none' secureTextEntry={true}
                                   placeholderTextColor='#4d4d4d' onChangeText={this.onChangePassword}
                                   value={this.state.password}
                                   placeholder="Password"/>
                    </View> : null}
                    <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>{(!this.state.forgotCreds) ? 'SIGN IN' : 'RESET'}</Text>
                    </TouchableHighlight>
                </ScrollView>
                <View style={styles.extraButtons}>
                    <TouchableOpacity style={styles.buttonForgot} onPress={this.toggleForgotCreds}>
                        <Text style={styles.buttonForgotText}>{(!this.state.forgotCreds) ? 'Forgot?' : 'Cancel'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signUpButton}>
                        <Text style={styles.buttonForgotText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    logo: {
        width: 154,
        height: 40,
        marginTop: 100,
        marginBottom: 100,
    },
    inputWrap: {
        alignSelf: 'stretch',
        marginTop: 12,
        marginBottom: 12,
        paddingLeft: 3,
        borderBottomWidth: 2,
        borderBottomColor: '#e1e3df',
        height: 20
    },
    textInput: {
        color: '#4d4d4e',
        fontSize: 17,
        // fontFamily: 'OpenSans-Semibold',
        borderWidth: 0,
        backgroundColor: 'transparent',
        padding: 3,
        height: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        // fontFamily: 'OpenSans-Bold',
    },
    button: {
        marginTop: 80,
        backgroundColor: '#00BFFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 21
    },
    buttonForgotText: {
        color: 'white',
        fontSize: 14,
        // fontFamily: 'OpenSans-Bold',
        textDecorationLine: 'underline'
    },
    extraButtons: {
        height: 50,
        bottom: 0,
        left: 0,
        flexDirection: 'row'
    },
    buttonForgot: {
        flex: 2,
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpButton: {
        flex: 2,
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Login;
