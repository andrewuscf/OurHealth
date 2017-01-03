import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const CredentialBox = React.createClass({
    propTypes: {
        credential: React.PropTypes.object.isRequired,
    },

    render() {
        // "fa fa-ellipsis-v
        return (
            <View style={[styles.CredentialBox, this.props.style]}>
                <Text>{this.props.credential.text}</Text>
            </View>
        )
    }
});

var styles = StyleSheet.create({
    CredentialBox: {
        height: 60,
        borderTopWidth: 1,
        borderColor: '#b1aea5',
        flexDirection: 'row',
    },
});

export default CredentialBox;
