import React from 'react'
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import QRCode from 'react-native-qrcode-svg'
import EStyleSheet from 'react-native-extended-stylesheet'
import Modal from 'react-native-modal'
import Student from '../../components/Students'
import Header from '../../components/Header'
import Logo from '../../images/logo.png'

export default class ListRollCall extends React.Component{
    state = {
        students: [],
        isShowQR: false,
        valueQR: ''
    }

    componentDidMount(){
        this.getData()
    }
    getData = () => {
        const {userID, classID} = this.props.route.params
        firestore()
        .collection(`users/${userID}/lists/${classID}/students`)
        .onSnapshot(snapshot => {
            let data = []
            snapshot.forEach( doc => {
                data.push({...doc.data(), id: doc.id})
            })
            this.setState({students: data})
            console.log(data)
        })
      }
    updateData = () => {
        const {userID, classID} = this.props.route.params
        this.state.students.map((ele) => 
        firestore()
          .collection(`users/${userID}/lists/${classID}/students`)
          .doc(`${ele.id}`)
          .update({
            dayChecked: ele.dayChecked
          })
        )
        Alert.alert(
            "Thông báo",
            "Điểm danh thành công!",
            // [{ text: "OK", onPress: () => this.props.navigation.navigate("MenuTeacher") }]
          )
    }
    toggleQR() {
        const {idDay,userID,classID} = this.props.route.params
            firestore()
              .collection(`users/${userID}/lists`)
              .doc(`${classID}`)
              .update({
                isAllowToScan: !this.state.isShowQR
              })
        this.setState({isShowQR: !this.state.isShowQR, valueQR: userID + ':' + classID + '/' + idDay})
    }
    render(){
        const {idDay} = this.props.route.params
        return(
        <View style={styles.container}>     
            <Header name='Danh sách' button={() => this.toggleQR()} icon='QR'></Header>
            <View style={styles.tag}>
                <Text style={styles.tagItem}>ID</Text>
                <Text style={[styles.tagItem, {marginLeft: -85}]}>Họ và Tên</Text>
                <Text style={styles.tagItem}>Điểm danh</Text>
            </View>
            <FlatList    
                showsVerticalScrollIndicator={false}
                style={{paddingVertical: 20}}
                data={this.state.students}
                renderItem={({ item }) => 
                <Student
                    item = {item}
                    isChecked = {item.dayChecked[idDay]}
                    checked = { () => {
                        this.setState(prevState => ({
                            students: prevState.students.map(
                                ele => ele.idStudent == item.idStudent ? { ...ele, dayChecked: ele.dayChecked.map((ele, index) => index == idDay ? !ele : ele)} : ele
                        )}))
                    }
                    }
                />}
            />
            <TouchableOpacity style={styles.confirmBlock} onPress={this.updateData}>
                <Text style={styles.confirmText}>Xác nhận</Text>
            </TouchableOpacity>
            {this.state.isShowQR ? (
                <Modal isVisible={this.state.isShowQR} onBackdropPress={() => this.toggleQR()}>
                    <View style={styles.qrContainer}>
                        <View style={{marginLeft: 30, marginTop: 40}}>
                            <QRCode
                                size={350}
                                logo = {Logo}
                                logoMargin = '1'
                                value = {this.state.valueQR}
                            />
                        </View>
                    </View>
                </Modal>
            ): null}
        </View>
        )
    }
}

const styles = EStyleSheet.create({
    container:{
        backgroundColor: '#fff',
        borderRadius: 15,
        flex: 1
    },
    tag:{
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2rem',
        marginBottom: '-2rem',
        marginHorizontal: '1.5rem'
    },
    tagItem: {
        fontSize: 16,
        color: 'grey'
    },
    confirmBlock: {
        backgroundColor: '#67e2d9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5rem',
        borderRadius: 30,
        marginHorizontal: '6rem'
    },
    confirmText: {
        fontWeight: 'bold',
        fontSize: 20,
        padding: '1.5rem',
        paddingHorizontal: '10rem'
    },
    qrContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: '-2rem',
        marginTop: '42rem',
        marginBottom: '-5rem',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})