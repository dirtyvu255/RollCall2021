import React from 'react'
import {Text, TouchableOpacity, StyleSheet, View, ScrollView, Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AddStudent from '../../images/addStudent.png'
import Check from '../../images/check.png'
import Header from '../../components/Header'

export default class MenuStudent extends React.Component{

    logOut = async() =>{
        try{
            await AsyncStorage.removeItem('userID')
            await AsyncStorage.removeItem('role')
            await this.props.navigation.navigate('Login')
          } catch (e){
            console.log(e)
          }
    }
render(){
    return(
        <View style={styles.mainContainer}>
            <Header 
                buttonExit={() => this.logOut()} 
                iconExit='Exit'
                ></Header>
            <ScrollView>
                <TouchableOpacity 
                    style={styles.buttonStyle}
                    onPress= {() => this.props.navigation.navigate('SignUp')}
                >
                    <Image source={AddStudent} style={styles.iconStyle}/>
                    <View style={styles.textButtonContainer}>
                        <Text style={styles.textButton}>Tham gia lớp học</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttonStyle}
                >
                    <Image source={Check} style={styles.iconStyle}/>
                    <View style={styles.textButtonContainer}>
                        <Text style={styles.textButton}>Xem danh sách</Text>
                    </View>
                </TouchableOpacity>
                
            </ScrollView>
        </View>
    )
}
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonStyle: {
        height: 100,
        backgroundColor: '#67e2d9',
        borderRadius: 50,
        margin: 20,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    iconStyle: {
        height: 60,
        width: 60
    },
    textButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        fontSize: 22,
        fontWeight: 'bold'
    },
})