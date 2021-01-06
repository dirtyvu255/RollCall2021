import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class Button extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {data, onPress} = this.props
        return(
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Text style={styles.name}>{data.class}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#67e2d9',
        borderRadius: 30,
        width: 300,
        marginTop: 25
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingVertical: 20,
        alignSelf: 'center',
        textAlign: 'center'
    }
})