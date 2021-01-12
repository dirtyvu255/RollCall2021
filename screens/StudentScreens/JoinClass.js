import React from 'react'
import {View, Text, Alert} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import EStyleSheet from 'react-native-extended-stylesheet'
import Header from '../../components/Header'
import firestore from '@react-native-firebase/firestore'
export default class JoinClass extends React.Component{
    constructor(props){
        super(props)
        this.state={
            userIDTeacher: '',
            classID: '',
            days: 0
        }
    }
    joinInClass = async() => {
        const {userIDTeacher, classID, days} = this.state
        const {idStudent, nameStudent, userID} = this.props.route.params
        let temp = []
        for(let i = 0; i < days; i++){
            temp.push(false)
        }
        firestore().collection(`users/${userIDTeacher}/lists/${classID}/students`)
        .doc(idStudent)
        .set({
            idStudent: idStudent,
            nameStudent: nameStudent,
            alphabet: nameStudent.split(' ').slice(-1)[0],
            dayChecked: temp,
        }).then( () => {
            Alert.alert(
                "Thông báo",
                "Đã tham gia lớp học!!",
                // [{ text: "OK", onPress: () => this.toggleByHand() }]
            )
        })
    }
    configData(data){
        console.log(data)
        let temp = data.search(":");
        this.setState({userIDTeacher: data.substring(0,temp)})
        let temp3 = data.search("/");
        let temp4 = data.length;
        this.setState({classID: data.substring(temp + 1, temp3)})
        this.setState({days: data.substring(temp3 + 1, temp4)})
    }
    onSuccess = async e => {
       if(e.data){
           await this.configData(e.data)
           await this.joinInClass()
       }
    };

    render(){
        return(
            <View>
                <Header 
                name='Vào lớp'
                buttonBack={() => this.props.navigation.goBack()} 
                iconBack='Back'
                ></Header>
                <Text style={styles.titleCamera}>Scan để vào lớp</Text>
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