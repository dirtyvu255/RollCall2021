import React from 'react'
import {Text, TouchableOpacity, View, SafeAreaView, ScrollView, Image} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
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
const styles = EStyleSheet.create({
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
        height: '10rem',
        backgroundColor: '#67e2d9',
        borderRadius: '5rem',
        margin: '2rem',
        marginHorizontal: '3rem',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    iconStyle: {
        height: '6rem',
        width: '6rem'
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