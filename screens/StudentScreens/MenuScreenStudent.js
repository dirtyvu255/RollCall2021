import React from 'react'
import {Text, TouchableOpacity, StyleSheet, View, ScrollView, Image, TextInput, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Modal from 'react-native-modal'
import firestore from '@react-native-firebase/firestore'
import AddStudent from '../../images/addStudent.png'
import Check from '../../images/check.png'
import Header from '../../components/Header'

export default class MenuStudent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            idStudent: '',
            nameStudent: '',
            isVisible: false
        }
    }
    componentDidMount(){
        this.getData()
    }
    logOut = async() =>{
        try{
            await AsyncStorage.removeItem('userID')
            await AsyncStorage.removeItem('role')
            await this.props.navigation.navigate('Login')
          } catch (e){
            console.log(e)
          }
    }
    getData(){
        const {userID} = this.props.route.params
        firestore()
        .collection(`students`)
        .doc(`${userID}`)
        .onSnapshot(snap => {
            let data = snap.data()
            this.setState({idStudent: data.idStudent, nameStudent: data.nameStudent})
            })
    }
    updateInfo = async() => {
        const {userID} = this.props.route.params
        await firestore()
          .collection('students')
          .doc(`${userID}`)
          .update({
            idStudent: this.state.idStudent,
            nameStudent: this.state.nameStudent
          })
          .then( () => {
            Alert.alert(
                "Thông báo",
                "Điểm danh thành công!",
                [{ text: "OK", onPress: () => this.toggleInfo() }]
              )
          })
    }
    toggleInfo = async() =>{
        this.getData()
        this.setState({isVisible: !this.state.isVisible})
    }
render(){
    const {userID} = this.props.route.params
    return(
        <View style={styles.mainContainer}>
            <Header 
                name={`Hi Chau`}
                buttonExit={() => this.logOut()} 
                iconExit='Exit'
                button={() => this.toggleInfo()} 
                icon='AddList' 
                ></Header>
            <ScrollView>
                <TouchableOpacity 
                    style={styles.buttonStyle}
                    onPress= {() => this.props.navigation.navigate('JoinClass', {idStudent: this.state.idStudent, nameStudent: this.state.nameStudent, userID: userID})}
                >
                    <Image source={AddStudent} style={styles.iconStyle}/>
                    <View style={styles.textButtonContainer}>
                        <Text style={styles.textButton}>Tham gia lớp học</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttonStyle}
                    onPress= {() => this.props.navigation.navigate('CheckIn', {userID: userID})}
                >
                    <Image source={AddStudent} style={styles.iconStyle}/>
                    <View style={styles.textButtonContainer}>
                        <Text style={styles.textButton}>Đi học</Text>
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
            <Modal isVisible={this.state.isVisible} onBackdropPress={() => this.toggleInfo()}>
                <View style={{backgroundColor: '#fff', borderRadius: 20, padding: 10}}>
                    <Text style={{textAlign: 'center', fontSize: 22, fontWeight: 'bold', marginTop: 20}}>THÔNG TIN SINH VIÊN</Text>
                    <View style={styles.inputBlock}>
                        <Text style={styles.infoInput}>ID</Text>
                        <TextInput 
                        style={styles.textInput}
                        onChangeText = {text => this.setState({idStudent: text})}
                        value={this.state.idStudent}
                        />
                    </View>
                    <View style={styles.inputBlock}>
                        <Text style={styles.infoInput}>Tên sinh viên</Text>
                        <TextInput style={styles.textInput}
                        onChangeText = {text => this.setState({nameStudent: text})}
                        value={this.state.nameStudent}
                        />
                    </View> 
                    <TouchableOpacity style={styles.confirmBlock} onPress={() => this.updateInfo()}>
                        <Text style={styles.confirmText}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>    
            </Modal>
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
    confirmBlock: {
        backgroundColor: '#67e2d9',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: 20,
        paddingHorizontal: 30
    },
    confirmText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    inputBlock:{
        marginTop: 15,
        marginHorizontal: 5,
    },
    infoInput: {
        fontSize: 18,
        fontWeight: '600',
    },
    textInput: {
        height: 35,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10
    },
})