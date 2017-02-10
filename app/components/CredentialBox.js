import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


const CredentialBox = React.createClass({
    propTypes: {
        credential: React.PropTypes.object.isRequired,
        canEdit: React.PropTypes.bool.isRequired,
    },

    _edit() {
        console.log('hit')
    },

    render() {
        const credential = this.props.credential;
        console.log(this.props.credential)
        return (
            <View style={styles.sectionItem}>
                <View style={styles.details}>
                    <Text>{credential.type_display}</Text>
                </View>
                <View style={styles.rightSide}>
                    <Icon name="check" size={20} color='green'/>
                    {this.props.canEdit ?
                        <TouchableOpacity onPress={this._edit} underlayColor='#99d9f4' style={styles.edit}>
                            <Icon name="pencil" size={20} color='rgba(0,0,0,.55)'/>
                        </TouchableOpacity>
                        : null
                    }
                </View>
            </View>
        );
    }
});


const styles = StyleSheet.create({
    sectionItem: {
        borderBottomWidth: 0.5,
        borderColor: '#d6d7da',
        paddingBottom: 5,
        paddingTop: 5,
        flexDirection: 'row',
    },
    details: {
        flexDirection: 'column',
        paddingTop: 5,
        paddingLeft: 10,
    },
    rightSide: {
        top: 5,
        right: 5,
        position: 'absolute',
        flexDirection: 'row',
    },
    edit: {
        paddingLeft: 20,
        paddingRight: 5,
    }
});

export default CredentialBox;