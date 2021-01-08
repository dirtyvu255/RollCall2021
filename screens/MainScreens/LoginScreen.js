import React from 'react'
import { StyleSheet, Text, TextInput, View,TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Logo from '../../images/logo.png'


export default class Login extends React.Component {

  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    const { email, password } = this.state
      auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const {displayName} = auth().currentUser 
        const userID = auth().currentUser.uid
        this.storeUser(userID, displayName)
        if(displayName == 'Faculty')
          this.props.navigation.navigate('MenuFaculty')
        else if(displayName == 'Teacher')
          this.props.navigation.navigate('RollCallChooseClass',{userID: userID })
        else if(displayName == 'Student')
          this.props.navigation.navigate('MenuStudent',{userID: userID })
      })
      .catch(error => this.setState({ errorMessage: 'Sai Email hoặc PassWord' }))
  }
  storeUser = async(userID,role) => {
    try{
      await AsyncStorage.setItem('userID', userID)
      await AsyncStorage.setItem('role', role)
    } catch (e){
      console.log(e)
    }
  }
  render() {
    return (
      <View style={styles.mainContainer}>
          <View style={{alignItems: 'center', marginTop: 30}}>
            <Image source={Logo} style={styles.logoBLock}/>
            <Text style={styles.textWelcome}>Welcome to RollCall!</Text>
          </View>
          <View style={styles.container}>
            <View style={{marginTop: 5, marginBottom: 25}}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor='#000'
                autoCapitalize="none"
                placeholder="Nhập email"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </View>
            <View style={{marginBottom: 5}}>
              <TextInput
                secureTextEntry
                style={styles.textInput}
                placeholderTextColor='#000'
                autoCapitalize="none"
                placeholder="Nhập mật khẩu"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </View>
            {this.state.errorMessage &&
              Alert.alert("Thông báo", this.state.errorMessage)
              }
          </View>
          <TouchableOpacity style={{alignItems: 'flex-end', marginTop: 20}}>
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
          </TouchableOpacity>          
          <TouchableOpacity onPress={this.handleLogin} style={styles.confirmBlock}> 
                <Text style={styles.confirmText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    marginTop: -100
  },
  container: {
    marginHorizontal: 30,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 25,
    paddingTop: 10,
    paddingBottom: 30,
  },
  logoBLock: {
    marginBottom: 50,
    height: 240,
    width: 280,
  },
  textWelcome: {
    marginTop: -40, 
    fontWeight: '600', 
    fontSize: 20, 
    marginBottom: 25
  },
  textInput: {
    height: 45,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
  },
  loginBlock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotText: {
    marginBottom: 30,
    color: '#67e2d9', 
    fontWeight: '700', 
    fontSize: 15, 
    marginRight: 30
  },
  confirmBlock: {
    backgroundColor: '#67e2d9',
    height: 50,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    borderRadius: 100,
    alignSelf: 'center'
  },
  confirmText: {
    fontWeight: 'bold',
    fontSize: 20
}
})