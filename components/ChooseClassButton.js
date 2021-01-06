import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class Button extends React.Component{
    constructor(props){
        super(props)
    }
    checkDone(done){
        if(done) {
            return styles.containerDone
        }
        else {
            return styles.containerUnDone
        }
    }
    render(){
        const {item, onPress, done, onLongPress} = this.props
        const day = new Date(item.dayStart.toDate())
        return(
            <TouchableOpacity style={this.checkDone(done)} onPress={onPress} onLongPress={onLongPress}>
                <View style={{paddingVertical: 20}}>
                    <Text style={[styles.name, {marginBottom: 5, textTransform: 'uppercase'}]}>{item.class}</Text>
                    <Text style={[styles.name, {marginBottom: 5}]}>{item.group}</Text>
                    <Text style={styles.name}>{day.getDate()}/{day.getMonth() + 1}/{day.getFullYear()}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    containerDone:{
        backgroundColor: '#ad343e',
        borderRadius: 30,
        width: 300,
        marginTop: 25
    },
    containerUnDone:{
        backgroundColor: '#67e2d9',
        borderRadius: 30,
        width: 300,
        marginTop: 25
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        // paddingVertical: 20,
        alignSelf: 'center',
        textAlign: 'center'
    }
})