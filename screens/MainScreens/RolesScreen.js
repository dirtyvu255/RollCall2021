import React, { Component } from 'react';
import {StyleSheet, View  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'




export default class Roles extends Component {
    componentDidMount(){
        this.getUser();
    }
    getUser = async() =>{
        try{
            const userID = await AsyncStorage.getItem('userID')
            const role = await AsyncStorage.getItem('role')
            if(role == "Faculty"){
                this.props.navigation.navigate('MenuFaculty',{userID: userID })
            }
            else if(role == "Student"){
                this.props.navigation.navigate('MenuStudent',{userID: userID })
            }
            else if(role == "Teacher"){
                this.props.navigation.navigate('RollCallChooseClass',{userID: userID })
            }
            else{
                this.props.navigation.navigate('Login')
            }
            console.log(role, userID)
        }catch(e){
        }
    }
  render() {
    return (
        <View  style={styles.container}>
        </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    imageCustom: {
        height: 265,
        width: 265
    }
  })