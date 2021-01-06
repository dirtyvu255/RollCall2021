import React from 'react'
import {View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, YellowBox, Modal, Image, Alert} from 'react-native'
import Close from '../../images/close.png'
import StudentShow from '../../components/StudentsShow'
import firestore from '@react-native-firebase/firestore'

export default class AddStudent extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            idStudent: '',
            name: '',
            dayChecked: [],
            isVisible: false,
            class : this.props.route.params.class,
            userID : this.props.route.params.userID,
        }
    }
    createDayChecked(){
        let temp = []
        days = this.state.class[1].info.days
        for(let i = 0; i < days; i++){
            temp.push(false)
        }
        this.setState({dayChecked: temp})
    }

    addStudent = async() => {
        idClass = this.state.class[0].id
        await this.createDayChecked()
        await firestore().collection(`users/${this.state.userID}/lists/${idClass}/students`).add({
            idStudent: this.state.idStudent,
            name: this.state.name,
            dayChecked: this.state.dayChecked,
        })
        Alert.alert(
            "Thông báo",
            "Đã thêm!!",
            // [{ text: "OK", onPress: () => this.props.navigation.navigate("MenuTeacher") }]
          );
    }
    toggleModal = () => {
        this.setState({isVisible: !this.state.isVisible})
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.tag}>
                    <Text style={styles.tagItem}>ID</Text>
                    <Text style={[styles.tagItem, {marginLeft: 60}]}>Họ và Tên</Text>
                </View>
                <View style={{height: 670}}>
                    <FlatList    
                        style={{paddingVertical: 20}}
                        data={this.state.class[2].students}
                        renderItem={({ item }) => 
                        <StudentShow
                            info = {item[1].infoStudent}
                        />}
                    />
                </View>
                <View>
                <Modal 
                animationType="fade"
                transparent={true}
                visible={this.state.isVisible}
                >
                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', height: '100%'}}> 
                        <View style={{backgroundColor: "#f1f1f1", borderRadius: 20, marginTop: 280, height: 250, marginHorizontal: 10}}>
                            <TouchableOpacity onPress={this.toggleModal} >
                                <View style={[styles.closeBlock, {alignSelf: "flex-end", position:'relative', marginTop: -7, marginRight: -7}]}>
                                    <Image source={Close} style={styles.imgClose}></Image>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.inputBlock}>
                                <Text style={styles.textInput}>ID</Text>
                                <TextInput 
                                style={styles.placeHolder}
                                onChangeText = {text => this.setState({idStudent: text})}
                                value={this.state.idStudent}
                                ></TextInput>
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.textInput}>Tên sinh viên</Text>
                                <TextInput style={styles.placeHolder}
                                onChangeText = {text => this.setState({name: text})}
                                value={this.state.name}
                                ></TextInput>
                            </View> 
                            <TouchableOpacity onPress={this.addStudent}>
                                <View style={[styles.confirmBlock, {alignSelf: "center",marginTop: 25}]}>
                                    <Text style={styles.confirmText}>Xác nhận</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity onPress={this.toggleModal}>
                    <View style={styles.confirmBlock}>
                        <Text style={styles.confirmText}>Thêm sinh viên</Text>
                    </View>
                </TouchableOpacity> 
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#fff"
    },
    tag:{
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: -20,
        marginHorizontal: 15
    },
    tagItem: {
        fontSize: 16,
        color: 'grey'
    },
    inputBlock:{
        marginTop: 15,
        marginHorizontal: 15,
    },
    textInput: {
        fontSize: 18,
        fontWeight: '600',
    },
    placeHolder: {
        height: 35,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10
    },
    confirmBlock: {
        backgroundColor: '#67e2d9',
        height: 50,
        width: 180,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: 20
    },
    imgClose: {
        height: 25,
        width: 25
    },
    confirmText: {
        fontWeight: 'bold',
        fontSize: 20
    }
    
})