import React from 'react'
import {Text, TouchableOpacity, StyleSheet, View, SafeAreaView, ScrollView, Image} from 'react-native'
import AddStudent from '../../images/addStudent.png'
import Check from '../../images/check.png'


export default class MenuFaculty extends React.Component{

render(){
    return(
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <TouchableOpacity 
                    style={styles.buttonStyle}
                    onPress= {() => this.props.navigation.navigate('SignUp')}
                >
                    <Image source={AddStudent} style={styles.iconStyle}/>
                    <View style={styles.textButtonContainer}>
                        <Text style={styles.textButton}>Tạo tài khoản mới</Text>
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
        </SafeAreaView>
    )
}
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        //justifyContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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