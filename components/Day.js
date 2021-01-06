import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import CheckBox from "@react-native-community/checkbox"

export default class Day extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {data, checked} = this.props
        return(
            <View style={styles.calendarBlock}>
                <Image source={require('../images/calendar.png')} style={styles.calendar}/>
                <Text>{data.name}</Text>
                <CheckBox
                    style={{width: 25, height: 25, marginTop: 5}}
                    onChange={checked}
                    value={data.isChecked}
                    animationDuration={0.1}
                    boxType={'square'}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    calendarBlock: {
        flexDirection: 'column',
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    calendar: {
        height:45,
        width: 45,
        marginLeft: 6
    },
})