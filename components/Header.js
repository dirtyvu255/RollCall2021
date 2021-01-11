import React from 'react'
import {Text, View, Image,TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
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

const styles = EStyleSheet.create({  
    wrapper1:{
      width: '100%',
      flexDirection: 'row',
      paddingTop: '5rem',
      paddingBottom: '1.5rem',
      justifyContent:'center'
    },
    title:{
      fontSize: 25,
      fontWeight: '500',
      // textTransform: 'uppercase',
      width: '24rem',
      textAlign: 'center'
    },
    icon: {
      height: '2.5rem',
      width: '2.5rem',
      position: 'absolute',
      marginTop: '0.3rem',
      left: '4rem'
    },
    iconExit: {
      height: '2.5rem',
      width: '2.5rem',
      position: 'absolute',
      marginTop: '0,3rem',
      right: '4rem'
    }
  });
