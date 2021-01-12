import React from 'react'
import {View, Text, Alert} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import firestore from '@react-native-firebase/firestore'
import EStyleSheet from 'react-native-extended-stylesheet'
import Header from '../../components/Header'

export default class CheckIn extends React.Component{
    constructor(props){
        super(props)
        this.state={
            userIDTeacher: '',
            classID: '',
            index: 0
        }
    }
    checkIn = async() => {
        const {userIDTeacher, classID, index} = this.state
        const {userID, idStudent} = this.props.route.params
        const date = new Date()
        const time = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        const tempData = await firestore().collection(`users/${userIDTeacher}/lists/${classID}/students`)
        .doc(idStudent)
        .get()
        const classData = await firestore().collection(`users/${userIDTeacher}/lists`)
        .doc(classID)
        .get()
        let dayChecked = tempData.data().dayChecked
        dayChecked[index] = true
        {classData.isAllowToScan ? (
            firestore().collection(`users/${userIDTeacher}/lists/${classID}/students`)
                .doc(idStudent)
                .update({
                    dayChecked: dayChecked,
                })
                .then( () => {
                    firestore()
                        .collection(`students/${userID}/history`)
                        .add({
                            class: classData.data().class,
                            time: time
                        })
                })
                .then( () => {
                    Alert.alert(
                        "Thông báo",
                        "Đã đi học !!!",
                        // [{ text: "OK", onPress: () => this.toggleByHand() }]
                    )
                })
        ):(
            Alert.alert(
                "Thông báo",
                "Hết giờ điểm danh !!!",
                // [{ text: "OK", onPress: () => this.toggleByHand() }]
            )
        )}
        
    }
    configData(data){
        let temp = data.search(":");
        this.setState({userIDTeacher: data.substring(0,temp)})
        let temp3 = data.search("/");
        let temp4 = data.length;
        this.setState({classID: data.substring(temp + 1, temp3)})
        this.setState({index: data.substring(temp3 + 1, temp4)})
    }
    onSuccess = async e => {
       if(e.data){
           await this.configData(e.data)
           await this.checkIn()
       }
    };

    render(){
        return(
            <View>
                <Header 
                name='Đi học'
                buttonBack={() => this.props.navigation.goBack()} 
                iconBack='Back'
                ></Header>
                <Text style={styles.titleCamera}>Scan để đi học</Text>
                <View style={styles.cameraContainer}>
                    <QRCodeScanner 
                        showMarker={true}
                        onRead={this.onSuccess}
                        cameraStyle={styles.cameraStyle}
                    />
                </View>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    container: {
    },
    cameraContainer: {
        marginLeft: '4.5rem',
        
    },
    cameraStyle:{
        width: '32rem',
        height: '32rem',
        marginTop: '2rem'
    },
    titleCamera: {
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '3rem',
    }
})