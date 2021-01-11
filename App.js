import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet'
import {Dimensions, StatusBar} from 'react-native'

import Login from './screens/MainScreens/LoginScreen'
import SignUp from './screens/FacultyScreens/SignUpScreen'
import RollCallChooseClass from './screens/TeacherScreens/RollCallChooseClass'
import RollCallChooseDay from './screens/TeacherScreens/RollCallChooseDay'
import MenuFaculty from './screens/FacultyScreens/MenuScreenFaculty'
import MenuStudent from './screens/StudentScreens/MenuScreenStudent'
import ListRollCall from './screens/TeacherScreens/ListRollCall'
import Role from './screens/MainScreens/RolesScreen'
import JoinClass from './screens/StudentScreens/JoinClass'
import CheckIn from './screens/StudentScreens/CheckIn'

const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      // <AppContainer />
      <NavigationContainer>
        <StatusBar
        barStyle='dark-content'
        ></StatusBar>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name="Role" component={Role} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="RollCallChooseClass" component={RollCallChooseClass} />
        <Stack.Screen name="RollCallChooseDay" component={RollCallChooseDay} />
        <Stack.Screen name="MenuFaculty" component={MenuFaculty}/>
        <Stack.Screen name="ListRollCall" component={ListRollCall}/>
        <Stack.Screen name="MenuStudent" component={MenuStudent}/>
        <Stack.Screen name="JoinClass" component={JoinClass}/>
        <Stack.Screen name="CheckIn" component={CheckIn}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
  }
}
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 41});



