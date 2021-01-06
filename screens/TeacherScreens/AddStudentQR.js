import React from 'react'
import {View,StyleSheet, TouchableOpacity, Text} from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import Logo from '../../images/logo.png'

export default class CreateList extends React.Component{
    state={
        class : this.props.route.params.class,
        userID : this.props.route.params.userID,
        classID: this.props.route.params.classID,
        value : '',
    }
    componentDidMount(){     
        this.setState({value: this.state.userID.concat(":", this.state.classID)})
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.QRposition}>
                    <QRCode
                        size = '2825'
                        logo = {Logo}
                        logoSize = '500'
                        logoMargin = '1'
                        value = {this.state.userID}
                    />
                </View>
                <View style={styles.QRborder}>
                </View>
                <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={styles.textButton}>Confirm!</Text>
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
    QRborder: {
        height: 300,
        width: 300,
        borderWidth: 5,
        alignSelf: 'center',
        marginTop: 71
    },
    QRposition: {
        position: 'absolute',
        marginLeft: 65,
        marginTop: 80
    },
    buttonStyle: {
        backgroundColor: '#67e2d9',
        borderRadius: 50,
        marginTop: 120,
        marginHorizontal: 100,
        alignItems: 'center',
    },
    textButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 20
    },
    
})


