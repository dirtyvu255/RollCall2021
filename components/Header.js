import React from 'react'
import {Text, View, StyleSheet, Image,TouchableOpacity } from 'react-native';
import iconAdd from '../images/add.png'
import Exit from '../images/exit.png'
import QR from '../images/qr.png'
import addStudent from '../images/addStudent.png'


export default class Header extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
      const{name,button,icon, buttonExit, iconExit} = this.props
    return(
    <View style={styles.wrapper1}>
      {iconExit === 'Exit'? (
          <TouchableOpacity onPress={buttonExit} >
            <Image 
                source={Exit}    
                style={styles.iconExit}
            />
        </TouchableOpacity>
      ): null}
      <Text style={styles.title} numberOfLines={1}>{name}</Text>
      {icon === 'AddList'? (
          <TouchableOpacity onPress={button} >
            <Image 
                source={iconAdd}    
                style={styles.icon}
            />
        </TouchableOpacity>
      ): null}
      {icon === 'AddStudent'? (
          <TouchableOpacity onPress={button} >
            <Image 
                source={addStudent}    
                style={styles.icon}
            />
        </TouchableOpacity>
      ): null}
      {icon === 'QR'? (
          <TouchableOpacity onPress={button} >
            <Image 
                source={QR}    
                style={styles.icon}
            />
        </TouchableOpacity>
      ): null}
    </View>
    )
  }
}

const styles = StyleSheet.create({  
    wrapper1:{
      width: '100%',
      flexDirection: 'row',
      paddingTop: 45,
      paddingBottom: 15,
      justifyContent:'center'
    },
    title:{
      fontSize: 25,
      fontWeight: '500',
      textTransform: 'uppercase',
      width: 240,
      textAlign: 'center'
    },
    icon: {
      height: 25,
      width: 25,
      position: 'absolute',
      marginTop: 5,
      left: 40
    },
    iconExit: {
      height: 25,
      width: 25,
      position: 'absolute',
      marginTop: 5,
      right: 40
    }
  });
