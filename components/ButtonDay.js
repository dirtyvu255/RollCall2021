import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class Button extends React.Component{
    constructor(props){
        super(props)
    }
    dayOfWeek(day){
        if(day===0)
            return "Chủ Nhật"
        if(day===1)
            return "Thứ Hai"
        if(day===2)
            return "Thứ Ba"
        if(day===3)
            return "Thứ Tư"
        if(day===4)
            return "Thứ Năm"
        if(day===5)
            return "Thứ Sáu"
        if(day===6)
            return "Thứ Bảy"
    }
    render(){
        const {data, onPress} = this.props
        const day = new Date(data.toDate())
        return(
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Text style={[styles.name,{paddingBottom: -20}]}>{this.dayOfWeek(day.getDay())}</Text>
                <Text style={styles.name}>{day.getDate()}/{day.getMonth() + 1}/{day.getFullYear()}</Text>
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