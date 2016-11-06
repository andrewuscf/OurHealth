'use strict';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    ListView
} from 'react-native';

import AvatarImage from './AvatarImage';
import TriangleCorner from './TriangleCorner';
import WorkerBox from './WorkerBox';

const WorkRequestBox = React.createClass({
    propTypes: {
        WorkRequest: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return {
            showUsers: false
        }
    },

    _toggleShow() {
        this.setState({showUsers: !this.state.showUsers})
    },


    render() {
        const workRequest = this.props.WorkRequest;
        console.log(workRequest.matches)
        let users = null;
        if (this.state.showUsers) {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            const dataSource = ds.cloneWithRows(workRequest.matches);
            users = <ListView
                style={styles.container} enableEmptySections={true}
                dataSource={dataSource} onEndReached={this.onEndReached} onEndReachedThreshold={50}
                renderRow={(worker, i) => <WorkerBox key={i}  worker={worker} _redirect={this.props._redirect}/>}
            />;
        }
        return (
            <View>
                <TouchableHighlight style={styles.container} onPress={this._toggleShow} underlayColor='#99d9f4'>
                    <Text>{workRequest.rate}</Text>
                </TouchableHighlight>
                {users}
            </View>
        )
    }
});

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: .5,
        borderBottomColor: 'rgba(0,0,0,.15)'
    }
});

export default WorkRequestBox;