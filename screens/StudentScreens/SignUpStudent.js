import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Logo from '../../images/logo.png'


export default class SignUpStudent extends React.Component {
  state = { 
    email: '', password: '', errorMessage: null, confirmPassword: '', idStudent: '', name: '', id: ''
  }

createAccount() {
  auth()
  .createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then(
    data => {  
        this.setState({id : data.user.uid})
    },   
    userCredentials => {
        return userCredentials.user.updateProfile({
          displayName: "Student"
        })
      }
    )
  .catch(error => this.setState({ errorMessage: error.message }))
}
handleSignUp = async() => {
    await this.createAccount()
    await firestore().collection(`students/${this.state.id}`).add({
        name: this.state.name,
        idStudent: this.state.idStudent,
    })
    await Alert.alert("Đã tạo tài khoản!!")
}

render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView>
        <View style={{alignItems: 'center', marginTop: 30}}>
          <Image source={Logo} style={styles.logoBLock}/>
        </View>
        <View style={styles.container}>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <Text style={styles.textInputTitle}>Email</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Nhập email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <Text style={styles.textInputTitle}>Tên</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Nhập Tên"
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
          <Text style={styles.textInputTitle}>MSSV</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Nhập MSSV"
            onChangeText={idStudent => this.setState({ idStudent })}
            value={this.state.idStudent}
          />
          <Text style={styles.textInputTitle}>Mật khẩu</Text>
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Nhập mật khẩu"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Text style={styles.textInputTitle}>Xác nhận mật khẩu</Text>
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Nhập lại mật khẩu"
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            value={this.state.confirmPassword}
          />
          <View style={{alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity onPress={this.handleSignUp}>
                <View style={styles.confirmBlock}>
                    <Text style={styles.confirmText}>Xác nhận</Text>
                </View>
            </TouchableOpacity>          
          </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: 50,
  },
  logoBLock: {
    height: 220,
    width: 280,
  },
  textInputTitle: {
    fontWeight: '600',
    fontSize: 15,
    marginVertical: 5,
    marginTop: 10
  },
  textInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
  },
  listCalendar: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //marginLeft: 20
},
  loginBlock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBlock: {
    backgroundColor: '#67e2d9',
    height: 50,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
      borderRadius: 100
  },
  confirmText: {
    fontWeight: 'bold',
    fontSize: 20
}
})