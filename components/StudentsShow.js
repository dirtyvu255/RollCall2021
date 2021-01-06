import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class Student extends React.Component{
    render(){
        const {info} = this.props
        
        return(
            <View style={styles.container}>
                <Text style={styles.id}>{info.idStudent}</Text>
                <Text style={styles.name}>{info.name}</Text>                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        paddingTop: 10,
        paddingBottom: 5,
        marginHorizontal: 15,
        justifyContent: 'space-between',
        flex:1, 
        flexDirection: 'row'
    },
    name: {
        flex: 3.1,
        fontSize: 17,
    },
    id: {
        flex: 1,
        fontSize: 17,
    }
})
