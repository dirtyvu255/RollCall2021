import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import CheckBox from "@react-native-community/checkbox"

export default class Role extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {data, checked} = this.props
        return(
                <View style={styles.calendarBlock}>
                    <Image source={data.image} style={styles.icon}/>
                    <Text >{data.name}</Text>
                    <CheckBox
                        style={{width: 25, height: 25, marginVertical: 5}}
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
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 65
    },
    icon: {
        height: 55,
        width: 55
    },
})