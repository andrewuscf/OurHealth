'use strict';

import React, {Component} from 'react';
import {
    ScrollView,
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Alert
} from 'react-native';

const Login = React.createClass({
    propTypes: {
        login: React.PropTypes.func.isRequired,
        clearAPIError: React.PropTypes.func.isRequired,
        resetPassword: React.PropTypes.func.isRequired,
        register: React.PropTypes.func.isRequired,
    },

    getInitialState() {
        return {
            email: null,
            password: null,
            first_name: null,
            last_name: null,
            forgotCreds: false,
            signUp: false
        }
    },

    toggleForgotCreds() {
        this.setState({
            forgotCreds: !this.state.forgotCreds,
            signUp: false
        });
    },

    toggleSignUp() {
        this.setState({
            forgotCreds: false,
            signUp: !this.state.signUp
        });
    },

    onPress() {
        // sign in + forgot credentials
        if (this.state.forgotCreds) {
            if (this.state.email) {
                this.props.resetPassword(this.state.email.toLowerCase());
                this.toggleForgotCreds();
            }
        } else if (this.state.signUp) {
            if (this.state.email && this.state.password && this.state.first_name && this.state.last_name) {
                this.props.register(this.state.email.toLowerCase(), this.state.password, this.state.first_name, this.state.last_name)
            }
        } else {
            if (this.state.email && this.state.password) {
                this.props.login(this.state.email.toLowerCase(), this.state.password)
            }
        }
    },

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.error)
        if (this.props.error) {
            const error = JSON.parse(this.props.error);
            Alert.alert(
                error.title,
                error.text,
                [
                    {text: 'OK', onPress: () => this.props.clearAPIError()},
                ]
            )
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

    onChangeFirst(text) {
        this.setState({
            first_name: text
        })
    },

    onChangeLast(text) {
        this.setState({
            last_name: text
        })
    },


    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    {(this.state.signUp) ? <View style={styles.inputWrap}>
                        <TextInput ref="first" style={styles.textInput} autoCapitalize='words'
                                   keyboardType='default'
                                   autoCorrect={false}
                                   placeholderTextColor='#4d4d4d' onChangeText={this.onChangeFirst}
                                   value={this.state.first_name}
                                   placeholder="First Name"/>
                    </View> : null}

                    {(this.state.signUp) ? <View style={styles.inputWrap}>
                        <TextInput ref="last" style={styles.textInput} autoCapitalize='words'
                                   keyboardType='default'
                                   autoCorrect={false}
                                   placeholderTextColor='#4d4d4d' onChangeText={this.onChangeLast}
                                   value={this.state.last_name}
                                   placeholder="Last Name"/>
                    </View> : null}

                    <View style={styles.inputWrap}>
                        <TextInput ref="email" style={styles.textInput} autoCapitalize='none'
                                   keyboardType='email-address'
                                   autoCorrect={false}
                                   placeholderTextColor='#4d4d4d' onChangeText={this.onChangeEmail}
                                   value={this.state.email}
                                   placeholder="Email"/>
                    </View>

                    {(!this.state.forgotCreds) ? <View style={styles.inputWrap}>
                        <TextInput ref="password" style={styles.textInput} autoCapitalize='none' secureTextEntry={true}
                                   autoCorrect={false}
                                   placeholderTextColor='#4d4d4d' onChangeText={this.onChangePassword}
                                   value={this.state.password}
                                   placeholder="Password"/>
                    </View> : null}

                    <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>{(!this.state.forgotCreds) ? 'SIGN IN' : 'RESET'}</Text>
                    </TouchableHighlight>
                </ScrollView>
                <View style={styles.extraButtons}>
                    <TouchableOpacity style={styles.bottomButtons} onPress={this.toggleForgotCreds}>
                        <Text style={styles.buttonForgotText}>{(!this.state.forgotCreds) ? 'Forgot?' : 'Cancel'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButtons} onPress={this.toggleSignUp}>
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
    bottomButtons: {
        flex: 2,
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Login;
