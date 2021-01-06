import React from 'react'
import {Text, TouchableOpacity, StyleSheet, View, SafeAreaView, Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AddList from '../../images/addList.png'
import AddStudent from '../../images/addStudent.png'
import Check from '../../images/check.png'
import FixList from '../../images/fixList.png'
import Export from '../../images/export.png'


export default class MenuTeacher extends React.Component{
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
        const lists = this.props.route.params.lists
        const userID = this.props.route.params.userID
        return(
            <View style={styles.mainContainer}>
                <TouchableOpacity onPress={this.logOut} style={{height: 20, width: 20, backgroundColor: 'black'}}></TouchableOpacity>
                <View>
                    <TouchableOpacity 
                        style={styles.buttonStyle}
                        onPress= {() => this.props.navigation.navigate('RollCallChooseClass', {lists: lists, userID: userID})}
                    >
                        <Image source={Check} style={styles.iconStyle}/>
                        <View style={styles.textButtonContainer}>
                            <Text style={styles.textButton}>Điểm danh</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.buttonStyle}
                        onPress= {() => this.props.navigation.navigate('AddList', {userID: userID})}
                    >
                        <Image source={AddList} style={styles.iconStyle}/>
                        <View style={styles.textButtonContainer}>
                            <Text style={styles.textButton}>Tạo danh sách mới</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.buttonStyle}
                        onPress= {() => this.props.navigation.navigate('FixListChoose', {lists: lists, userID: userID})}
                    >
                        <Image source={FixList} style={styles.iconStyle}/>
                        <View style={styles.textButtonContainer}>
                            <Text style={styles.textButton}>Chỉnh sửa thông tin danh sách</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.buttonStyle}
                        onPress= {() => this.props.navigation.navigate('AddStudentChoose', {lists: lists, userID: userID})}
                    >
                        <Image source={AddStudent} style={styles.iconStyle}/>
                        <View style={styles.textButtonContainer}>
                            <Text style={styles.textButton}>Thêm sinh viên vào danh sách</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.buttonStyle}
                        onPress= {() => this.props.navigation.navigate('ExportFile', {lists: lists, userID: userID})}
                    >
                        <Image source={Export} style={styles.iconStyle}/>
                        <View style={styles.textButtonContainer}>
                            <Text style={styles.textButton}>Xuất danh sách</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    }
    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: '#fff',
            marginTop: 40
        },
        container: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        textContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonStyle: {
            height: 100,
            backgroundColor: '#70c1b3',
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