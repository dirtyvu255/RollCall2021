import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import CheckBox from "@react-native-community/checkbox"

export default class Student extends React.Component{
    render(){
        const {item, checked, isChecked} = this.props
        console.log(isChecked)
        return(
            <View style={styles.container}>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <Text style={styles.id}>{item.idStudent}</Text>
                    <Text style={styles.name}>{item.nameStudent}</Text>
                </View>
                <CheckBox
                    style={{marginRight: 26, width: 23, height: 23}}
                    value={isChecked}
                    onChange={checked}
                    animationDuration={0.1}
                    boxType={'square'}
                />
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
        justifyContent: 'space-between'
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
