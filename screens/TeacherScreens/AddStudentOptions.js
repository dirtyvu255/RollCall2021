import React from 'react'
import {View,StyleSheet, Text,TouchableOpacity, Image} from 'react-native'
import AddStudent from '../../images/addStudent.png'

export default class CreateList extends React.Component{
    state={
        class : this.props.route.params.class,
        userID : this.props.route.params.userID,
        
    }
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.buttonStyle}
                    onPress={() => this.props.navigation.navigate("AddStudentQR", {class: this.state.class, userID: this.state.userID, classID: this.state.class[0].id} )}
                    >
                    <Image source={AddStudent} style={styles.iconStyle}/>
                    <View style={styles.textButtonContainer}>
                        <Text style={styles.textButton}>Thêm sinh viên bằng QR</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttonStyle}
                    onPress={() => this.props.navigation.navigate("AddStudent", {class: this.state.class, userID: this.state.userID} )}
                    >
                    <Image source={AddStudent} style={styles.iconStyle}/>
                    <View style={styles.textButtonContainer}>
                        <Text style={styles.textButton}>Thêm sinh viên thủ công</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
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


